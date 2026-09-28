// Usage: node tools/figma/render.mjs <nodeId> <out.html> <imagesUrlPrefix>
// Renders a Figma frame as absolutely-positioned HTML: a visual reference to compare
// the hand-built pages against (not used by the app itself).
import fs from "node:fs";
import { decode, hex, hashHex } from "./decode.mjs";
import { blobToPath, instanceChildren } from "./geometry.mjs";

const [id, out, imgPrefix = "images/"] = process.argv.slice(2);
const { map, blobs } = decode();
const W = { Thin: 100, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
const css = (c, op = 1) => `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${Math.round((c.a ?? 1) * op * 1000) / 1000})`;

function invert(t) {
  const det = t.m00 * t.m11 - t.m01 * t.m10;
  return { m00: t.m11 / det, m01: -t.m01 / det, m10: -t.m10 / det, m11: t.m00 / det, m02: (t.m01 * t.m12 - t.m11 * t.m02) / det, m12: (t.m10 * t.m02 - t.m00 * t.m12) / det };
}
const apply = (t, x, y) => [t.m00 * x + t.m01 * y + t.m02, t.m10 * x + t.m11 * y + t.m12];

function background(p, w, h) {
  const op = p.opacity ?? 1;
  if (p.type === "SOLID") return `linear-gradient(${css(p.color, op)},${css(p.color, op)})`;
  if (p.type === "IMAGE") {
    const size = p.imageScaleMode === "FIT" ? "contain" : p.imageScaleMode === "TILE" ? "auto" : "cover";
    return { img: `url(${imgPrefix}${hashHex(p.image.hash)}) center/${size} no-repeat`, op };
  }
  const inv = invert(p.transform || { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 });
  const stops = p.stops.map((s) => `${css(s.color, op)} ${Math.round(s.position * 1000) / 10}%`).join(",");
  if (p.type === "GRADIENT_LINEAR") {
    const [x1, y1] = apply(inv, 0, 0.5), [x2, y2] = apply(inv, 1, 0.5);
    const dx = (x2 - x1) * w, dy = (y2 - y1) * h;
    const ang = (Math.atan2(dx, -dy) * 180) / Math.PI;
    // CSS gradient line length for this angle; rescale stops to the Figma handle length.
    const rad = (ang * Math.PI) / 180;
    const L = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
    const len = Math.hypot(dx, dy);
    const cx = (x1 * w + x2 * w) / 2 - w / 2, cy = (y1 * h + y2 * h) / 2 - h / 2;
    const off = (cx * Math.sin(rad) - cy * Math.cos(rad));
    const s2 = p.stops.map((s) => `${css(s.color, op)} ${Math.round(((L / 2 + off - len / 2 + s.position * len) / L) * 1000) / 10}%`).join(",");
    return `linear-gradient(${ang}deg,${s2})`;
  }
  const [cx, cy] = apply(inv, 0.5, 0.5);
  const [ex, ey] = apply(inv, 1, 0.5), [fx, fy] = apply(inv, 0.5, 1);
  const rx = Math.hypot((ex - cx) * w, (ey - cy) * h), ry = Math.hypot((fx - cx) * w, (fy - cy) * h);
  return `radial-gradient(${rx}px ${ry}px at ${cx * w}px ${cy * h}px,${stops})`;
}

function textHtml(n) {
  const chars = n.textData?.characters || "";
  const ids = n.textData?.characterStyleIDs || [];
  const table = Object.fromEntries((n.textData?.styleOverrideTable || []).map((o) => [o.styleID, o]));
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  if (!ids.length) return esc(chars);
  let html = "", run = "", cur = ids[0] || 0;
  const flush = () => {
    const o = table[cur];
    if (!o || !cur) { html += esc(run); return; }
    const st = [];
    if (o.fontName) st.push(`font-family:'${o.fontName.family}';font-weight:${W[o.fontName.style.replace(" Italic", "")] || 400}`);
    if (o.fontSize) st.push(`font-size:${o.fontSize}px`);
    const f = (o.fillPaints || [])[0];
    if (f?.color) st.push(`color:${css(f.color, f.opacity ?? 1)}`);
    html += `<span style="${st.join(";")}">${esc(run)}</span>`;
  };
  for (let i = 0; i < chars.length; i++) {
    const s = ids[i] ?? 0;
    if (s !== cur) { flush(); run = ""; cur = s; }
    run += chars[i];
  }
  flush();
  return html;
}

function render(n) {
  if (n.visible === false) return "";
  const t = n.transform || { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 };
  const w = n.size?.x || 0, h = n.size?.y || 0;
  const st = [`position:absolute;left:0;top:0;width:${w}px;height:${h}px;transform:matrix(${t.m00},${t.m10},${t.m01},${t.m11},${t.m02},${t.m12});transform-origin:0 0`];
  if (n.opacity != null && n.opacity < 1) st.push(`opacity:${n.opacity}`);
  if (n.blendMode && !["NORMAL", "PASS_THROUGH"].includes(n.blendMode)) st.push(`mix-blend-mode:${n.blendMode.toLowerCase().replace("_", "-")}`);
  const fills = (n.fillPaints || []).filter((p) => p.visible !== false);
  const vector = ["VECTOR", "STAR", "BOOLEAN_OPERATION", "REGULAR_POLYGON"].includes(n.type) && n.fillGeometry?.length;
  let inner = "";

  if (n.type === "TEXT") {
    const f = fills[0];
    st.push(`font-family:'${n.fontName.family}';font-weight:${W[n.fontName.style.replace(" Italic", "")] || 400};font-size:${n.fontSize}px`);
    const lh = n.lineHeight;
    if (lh?.units === "PIXELS") st.push(`line-height:${lh.value}px`);
    else if (lh?.units === "PERCENT") st.push(`line-height:${lh.value / 100}`);
    else if (lh?.units === "RAW") st.push(`line-height:${lh.value}`);
    if (n.letterSpacing?.value) st.push(`letter-spacing:${n.letterSpacing.units === "PERCENT" ? n.letterSpacing.value / 100 + "em" : n.letterSpacing.value + "px"}`);
    if (f?.type === "SOLID") st.push(`color:${css(f.color, f.opacity ?? 1)}`);
    else if (f) st.push(`background:${background(f, w, h)};-webkit-background-clip:text;color:transparent`);
    st.push(`text-align:${(n.textAlignHorizontal || "LEFT").toLowerCase().replace("justified", "justify")};white-space:pre-wrap`);
    if (n.textCase === "UPPER") st.push("text-transform:uppercase");
    inner = textHtml(n);
  } else if (vector || n.type === "LINE") {
    const paths = [];
    const f = fills.find((p) => p.type === "SOLID");
    for (const g of n.fillGeometry || []) if (f) paths.push(`<path fill="${css(f.color, f.opacity ?? 1)}" fill-rule="${g.windingRule === "ODD" ? "evenodd" : "nonzero"}" d="${blobToPath(blobs[g.commandsBlob])}"/>`);
    const s = (n.strokePaints || []).find((p) => p.visible !== false && p.type === "SOLID");
    for (const g of n.strokeGeometry || []) if (s && n.strokeWeight) paths.push(`<path fill="${css(s.color, s.opacity ?? 1)}" d="${blobToPath(blobs[g.commandsBlob])}"/>`);
    inner = `<svg width="${w || 1}" height="${h || 1}" style="overflow:visible;position:absolute">${paths.join("")}</svg>`;
  } else {
    const bgs = fills.slice().reverse().map((p) => background(p, w, h));
    const plain = bgs.filter((b) => typeof b === "string");
    if (plain.length) st.push(`background:${plain.join(",")}`);
    for (const b of bgs.filter((b) => typeof b !== "string")) inner += `<div style="position:absolute;inset:0;background:${b.img};opacity:${b.op};border-radius:inherit"></div>`;
    if (n.type === "ELLIPSE") st.push("border-radius:50%");
    else if (n.rectangleCornerRadiiIndependent) st.push(`border-radius:${n.rectangleTopLeftCornerRadius || 0}px ${n.rectangleTopRightCornerRadius || 0}px ${n.rectangleBottomRightCornerRadius || 0}px ${n.rectangleBottomLeftCornerRadius || 0}px`);
    else if (n.cornerRadius) st.push(`border-radius:${n.cornerRadius}px`);
    const s = (n.strokePaints || []).find((p) => p.visible !== false && p.type === "SOLID");
    if (s && n.strokeWeight) {
      const c = css(s.color, s.opacity ?? 1), sw = n.strokeWeight;
      const sides = n.borderStrokeWeightsIndependent ? [n.borderTopWeight, n.borderRightWeight, n.borderBottomWeight, n.borderLeftWeight] : [sw, sw, sw, sw];
      const outset = n.strokeAlign === "OUTSIDE" ? sw : n.strokeAlign === "CENTER" ? sw / 2 : 0;
      inner += `<div style="position:absolute;inset:${-outset}px;border-style:solid;border-color:${c};border-width:${sides.map((v) => (v || 0) + "px").join(" ")};border-radius:${n.type === "ELLIPSE" ? "50%" : (n.cornerRadius ? n.cornerRadius + outset : 0) + "px"};pointer-events:none;z-index:9"></div>`;
    }
    if (n.type === "FRAME" && n.frameMaskDisabled === false) st.push("overflow:hidden");
  }

  const sh = [], filters = [];
  for (const e of n.effects || []) {
    if (e.visible === false) continue;
    if (e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW") sh.push(`${e.type === "INNER_SHADOW" ? "inset " : ""}${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread || 0}px ${css(e.color)}`);
    if (e.type === "FOREGROUND_BLUR") filters.push(`blur(${e.radius / 2}px)`);
    if (e.type === "BACKGROUND_BLUR") st.push(`backdrop-filter:blur(${e.radius / 2}px)`);
  }
  if (sh.length) st.push(n.type === "TEXT" || vector ? `filter:${sh.map((s) => `drop-shadow(${s.replace(/ [\d.]+px rgba/, " rgba")})`).join(" ")}` : `box-shadow:${sh.join(",")}`);
  if (filters.length) st.push(`filter:${filters.join(" ")}`);

  const kids = n.type === "INSTANCE" ? instanceChildren(n, map) : n.children;
  if (!vector && n.type !== "TEXT") {
    // Mask layers clip every sibling that follows them.
    let i = 0, parts = [];
    while (i < kids.length) {
      const k = kids[i];
      if (k.mask && k.visible !== false) {
        const mt = k.transform;
        const f = (k.fillPaints || []).find((p) => p.type === "IMAGE");
        const maskCss = f ? `url(${imgPrefix}${hashHex(f.image.hash)})` : "linear-gradient(#000,#000)";
        const rest = kids.slice(i + 1).map(render).join("");
        const rad = k.type === "ELLIPSE" ? "50%" : (k.cornerRadius || 0) + "px";
        parts.push(`<div style="position:absolute;left:${mt.m02}px;top:${mt.m12}px;width:${k.size.x}px;height:${k.size.y}px;-webkit-mask:${maskCss} center/cover no-repeat;mask:${maskCss} center/cover no-repeat;border-radius:${rad};overflow:hidden;isolation:isolate"><div style="position:absolute;left:${-mt.m02}px;top:${-mt.m12}px">${rest}</div></div>`);
        break;
      }
      parts.push(render(k));
      i++;
    }
    inner += parts.join("");
  }
  return `<div data-name="${(n.name || "").replace(/"/g, "'")}" style="${st.join(";")}">${inner}</div>`;
}

const root = map[id];
const frame = { ...root, transform: null };
const html = `<!doctype html><html><head><meta charset="utf-8"><title>REF ${root.name}</title>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@500,600,700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&display=swap">
<style>body{margin:0}*{box-sizing:border-box}</style></head>
<body><div style="position:relative;width:${root.size.x}px;height:${root.size.y}px;overflow:hidden">${render(frame)}</div></body></html>`;
fs.writeFileSync(out, html);
console.log("wrote", out, (html.length / 1024).toFixed(0) + "KB");
