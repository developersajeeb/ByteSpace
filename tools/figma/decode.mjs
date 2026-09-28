// Decodes the local Figma .fig export (zip: canvas.fig kiwi binary + images/)
// into a plain node tree. Dev-only tooling used to pull exact design specs.
import { execSync } from "node:child_process";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const FIG = path.join(root, "design/bytespace.fig");

export function unzip(entry) {
  return execSync(`unzip -p "${FIG}" "${entry}"`, { maxBuffer: 1 << 30 });
}

function reader(b) {
  let p = 0;
  const f32 = new Float32Array(1);
  const u32 = new Uint32Array(f32.buffer);
  return {
    get p() { return p; },
    byte: () => b[p++],
    bool: () => !!b[p++],
    uint() { let v = 0, s = 0, x; do { x = b[p++]; v += (x & 127) * 2 ** s; s += 7; } while (x & 128); return v; },
    int() { const v = this.uint(); return v % 2 ? -(v + 1) / 2 : v / 2; },
    float() {
      if (b[p] === 0) { p++; return 0; }
      let bits = b[p] | (b[p + 1] << 8) | (b[p + 2] << 16) | (b[p + 3] << 24);
      p += 4;
      u32[0] = (bits << 23) | (bits >>> 9);
      return f32[0];
    },
    string() { const s = p; while (b[p]) p++; const r = b.toString("utf8", s, p); p++; return r; },
    uint64() { return this.uint(); },
    int64() { return this.int(); },
  };
}

const inflate = (b) => { try { return zlib.inflateRawSync(b); } catch { return zlib.zstdDecompressSync(b); } };

export function decode() {
  const buf = unzip("canvas.fig");
  let o = 12;
  const parts = [];
  while (o < buf.length) { const n = buf.readUInt32LE(o); o += 4; parts.push(buf.subarray(o, o + n)); o += n; }
  const schema = inflate(parts[0]);
  const data = inflate(parts[1]);

  const r = reader(schema);
  const kinds = ["ENUM", "STRUCT", "MESSAGE"];
  const prim = ["bool", "byte", "int", "uint", "float", "string", "int64", "uint64"];
  const defs = [];
  const count = r.uint();
  for (let i = 0; i < count; i++) {
    const name = r.string(), kind = kinds[r.byte()], fc = r.uint(), fields = [];
    for (let j = 0; j < fc; j++) {
      const fname = r.string(), t = r.int(), arr = r.byte(), v = r.uint();
      fields.push({ name: fname, type: t < 0 ? prim[~t] : t, arr, v });
    }
    defs.push({ name, kind, fields });
  }

  const d = reader(data);
  const read = (t) => {
    if (typeof t === "string") return d[t]();
    const def = defs[t];
    if (def.kind === "ENUM") { const v = d.uint(); return def.fields.find((f) => f.v === v)?.name ?? v; }
    const out = {};
    if (def.kind === "STRUCT") { for (const f of def.fields) out[f.name] = field(f); return out; }
    for (;;) {
      const id = d.uint();
      if (!id) return out;
      const f = def.fields.find((f) => f.v === id);
      out[f.name] = field(f);
    }
  };
  const field = (f) => {
    if (!f.arr) return read(f.type);
    const c = d.uint();
    const a = [];
    for (let i = 0; i < c; i++) a.push(read(f.type));
    return a;
  };

  const msg = read(defs.findIndex((x) => x.name === "Message"));
  const nodes = msg.nodeChanges;
  const map = {};
  for (const n of nodes) { n.id = key(n.guid); n.children = []; map[n.id] = n; }
  for (const n of nodes) if (n.parentIndex) map[key(n.parentIndex.guid)]?.children.push(n);
  for (const n of nodes) n.children.sort((a, b) => (a.parentIndex.position < b.parentIndex.position ? -1 : 1));
  applyStyles(nodes, map);
  return { nodes, map, blobs: msg.blobs || [] };
}

// Node paints can be stale; the referenced shared style is the source of truth.
function applyStyles(nodes, map) {
  const byKey = {};
  for (const n of nodes) if (n.styleType && n.key) byKey[n.key] = n;
  const find = (ref) => (ref?.guid ? map[key(ref.guid)] : ref?.assetRef ? byKey[ref.assetRef.key] : null);
  for (const n of nodes) {
    if (n.styleType) continue;
    const fill = find(n.styleIdForFill);
    if (fill?.fillPaints) n.fillPaints = fill.fillPaints;
    const stroke = find(n.styleIdForStrokeFill);
    if (stroke?.fillPaints) n.strokePaints = stroke.fillPaints;
    const fx = find(n.styleIdForEffect);
    if (fx?.effects) n.effects = fx.effects;
    const text = find(n.styleIdForText);
    if (text) for (const k of ["fontName", "fontSize", "lineHeight", "letterSpacing", "textCase", "textDecoration"]) if (text[k] != null) n[k] = text[k];
    n.fillStyle = fill?.name;
    n.textStyle = text?.name;
  }
}

export const key = (g) => `${g.sessionID}:${g.localID}`;
export const hashHex = (h) => Buffer.from(h || []).toString("hex");
export const hex = (c, op = 1) => {
  const h = "#" + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
  const a = (c.a ?? 1) * op;
  return a < 0.999 ? `${h}/${Math.round(a * 100)}` : h;
};
