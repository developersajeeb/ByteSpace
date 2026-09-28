// Vector path helpers: Figma commands blobs -> SVG path data, and instance expansion.
import { key, hex } from "./decode.mjs";

export function blobToPath(blob) {
  const b = Buffer.from(blob.bytes);
  let p = 0;
  const f = () => { const v = b.readFloatLE(p); p += 4; return Math.round(v * 1000) / 1000; };
  const out = [];
  while (p < b.length) {
    const cmd = b[p++];
    if (cmd === 0) out.push("Z");
    else if (cmd === 1) out.push(`M${f()} ${f()}`);
    else if (cmd === 2) out.push(`L${f()} ${f()}`);
    else if (cmd === 3) out.push(`Q${f()} ${f()} ${f()} ${f()}`);
    else if (cmd === 4) out.push(`C${f()} ${f()} ${f()} ${f()} ${f()} ${f()}`);
    else break;
  }
  return out.join("");
}

// Resolve the children an INSTANCE renders: its component's subtree with overrides applied.
export function instanceChildren(inst, map) {
  const comp = map[key(inst.symbolData.symbolID)];
  if (!comp) return [];
  const overrides = {};
  for (const o of inst.symbolData.symbolOverrides || []) {
    const g = o.guidPath?.guids;
    if (g?.length) overrides[g.map(key).join("/")] = o;
  }
  const clone = (n, pathIds) => {
    const id = [...pathIds, n.id].join("/");
    const o = overrides[n.id] || overrides[id] || {};
    const c = { ...n, ...o };
    if (o.styleIdForFill?.guid && map[key(o.styleIdForFill.guid)]?.fillPaints) c.fillPaints = map[key(o.styleIdForFill.guid)].fillPaints;
    c.children = n.children.map((ch) => clone(ch, pathIds));
    return c;
  };
  return comp.children.map((c) => clone(c, []));
}

// Render a subtree of vector shapes into a standalone SVG string.
export function toSvg(node, map, blobs, { color } = {}) {
  const paths = [];
  const walk = (n, tx, ty) => {
    if (n.visible === false) return;
    const t = n.transform || { m02: 0, m12: 0, m00: 1, m01: 0, m10: 0, m11: 1 };
    const x = tx + t.m02, y = ty + t.m12;
    const kids = n.type === "INSTANCE" ? instanceChildren(n, map) : n.children;
    if (n.fillGeometry?.length && !kids.length) {
      const paint = (n.fillPaints || []).find((p) => p.visible !== false && p.type === "SOLID");
      const fill = color || (paint ? hex(paint.color, paint.opacity ?? 1).split("/")[0] : "currentColor");
      const op = paint ? (paint.color.a ?? 1) * (paint.opacity ?? 1) : 1;
      const m = `matrix(${t.m00} ${t.m10} ${t.m01} ${t.m11} ${x} ${y})`;
      for (const g of n.fillGeometry)
        paths.push(`<path transform="${m}" fill-rule="${g.windingRule === "ODD" ? "evenodd" : "nonzero"}" fill="${fill}"${op < 1 ? ` fill-opacity="${op}"` : ""} d="${blobToPath(blobs[g.commandsBlob])}"/>`);
    }
    for (const c of kids) walk(c, x, y);
  };
  for (const c of node.type === "INSTANCE" ? instanceChildren(node, map) : node.children) walk(c, 0, 0);
  if (!node.children.length && node.fillGeometry) walk({ ...node, transform: null, children: [] }, 0, 0);
  const w = Math.round(node.size.x * 100) / 100, h = Math.round(node.size.y * 100) / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">${paths.join("")}</svg>`;
}
