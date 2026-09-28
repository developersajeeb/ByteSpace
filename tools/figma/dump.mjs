// Usage: node tools/figma/dump.mjs <nodeId> [maxDepth]
// Prints a readable spec tree (position, size, layout, fills, text styles).
import { decode, hex, hashHex } from "./decode.mjs";

const [id, maxDepthArg] = process.argv.slice(2);
const maxDepth = maxDepthArg ? +maxDepthArg : 99;
const { map } = decode();

const r = (v) => Math.round(v * 10) / 10;

function paint(p) {
  if (p.visible === false) return null;
  const op = p.opacity ?? 1;
  if (p.type === "SOLID") return hex(p.color, op);
  if (p.type === "IMAGE") return `img:${hashHex(p.image?.hash).slice(0, 10)}(${p.imageScaleMode || ""})`;
  if (p.type.startsWith("GRADIENT")) {
    const stops = (p.stops || []).map((s) => `${hex(s.color)}@${r(s.position)}`).join(" ");
    const t = p.transform;
    return `${p.type.replace("GRADIENT_", "").toLowerCase()}[${stops}]${op < 1 ? " op" + r(op) : ""}${t ? ` t=${[t.m00, t.m01, t.m02, t.m10, t.m11, t.m12].map((v) => r(v)).join(",")}` : ""}`;
  }
  return p.type;
}

function effect(e) {
  if (e.visible === false) return null;
  if (e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW")
    return `${e.type === "DROP_SHADOW" ? "shadow" : "inset"}(${r(e.offset?.x || 0)} ${r(e.offset?.y || 0)} ${r(e.radius || 0)} ${r(e.spread || 0)} ${hex(e.color)})`;
  return `${e.type.toLowerCase()}(${r(e.radius || 0)})`;
}

function line(n, depth) {
  const t = n.transform || {};
  const parts = [`${"  ".repeat(depth)}${n.type} "${n.name}" [${n.id}]`, `@${r(t.m02 || 0)},${r(t.m12 || 0)}`, `${r(n.size?.x || 0)}x${r(n.size?.y || 0)}`];
  if (t.m01 && Math.abs(t.m01) > 0.001) parts.push(`rot=${r((Math.atan2(t.m10, t.m00) * 180) / Math.PI)}deg`);
  if (n.opacity != null && n.opacity < 1) parts.push(`opacity=${r(n.opacity)}`);
  if (n.blendMode && !["NORMAL", "PASS_THROUGH"].includes(n.blendMode)) parts.push(`blend=${n.blendMode}`);
  if (n.mask) parts.push("MASK");
  if (n.fillStyle) parts.push(`$${n.fillStyle}`);
  if (n.textStyle) parts.push(`$T:${n.textStyle}`);
  const fills = (n.fillPaints || []).map(paint).filter(Boolean);
  if (fills.length && n.type !== "TEXT") parts.push(`fill=${fills.join(" + ")}`);
  const strokes = (n.strokePaints || []).map(paint).filter(Boolean);
  if (strokes.length && n.strokeWeight) parts.push(`stroke=${r(n.strokeWeight)} ${strokes.join(",")} ${n.strokeAlign || ""}`.trim());
  if (n.cornerRadius) parts.push(`r=${r(n.cornerRadius)}`);
  if (n.rectangleCornerRadiiIndependent)
    parts.push(`radii=${[n.rectangleTopLeftCornerRadius, n.rectangleTopRightCornerRadius, n.rectangleBottomRightCornerRadius, n.rectangleBottomLeftCornerRadius].map((v) => r(v || 0)).join("/")}`);
  if (n.stackMode && n.stackMode !== "NONE") {
    const pad = [n.stackVerticalPadding, n.stackPaddingRight ?? n.stackHorizontalPadding, n.stackPaddingBottom ?? n.stackVerticalPadding, n.stackHorizontalPadding].map((v) => r(v || 0));
    parts.push(`flex-${n.stackMode === "HORIZONTAL" ? "row" : "col"} gap=${r(n.stackSpacing || 0)} pad=${pad.join("/")} main=${n.stackPrimaryAlignItems || "MIN"} cross=${n.stackCounterAlignItems || "MIN"}${n.stackWrap === "WRAP" ? " wrap" : ""}`);
  }
  if (n.frameMaskDisabled === false || n.clipsContent) parts.push("clip");
  const fx = (n.effects || []).map(effect).filter(Boolean);
  if (fx.length) parts.push(`fx=${fx.join(" ")}`);
  if (n.type === "TEXT") {
    const lh = n.lineHeight ? (n.lineHeight.units === "PERCENT" ? `${r(n.lineHeight.value)}%` : n.lineHeight.units === "RAW" ? `${r(n.lineHeight.value)}x` : `${r(n.lineHeight.value)}px`) : "auto";
    const ls = n.letterSpacing?.value ? ` ls=${r(n.letterSpacing.value)}${n.letterSpacing.units === "PERCENT" ? "%" : "px"}` : "";
    parts.push(`font=${n.fontName?.family} ${n.fontName?.style} ${r(n.fontSize)}/${lh}${ls} color=${fills.join(",")} align=${n.textAlignHorizontal || "LEFT"}${n.textCase && n.textCase !== "ORIGINAL" ? " case=" + n.textCase : ""}${n.textDecoration && n.textDecoration !== "NONE" ? " deco=" + n.textDecoration : ""}`);
    const overrides = n.textData?.styleOverrideTable || [];
    for (const o of overrides) {
      const of = (o.fillPaints || []).map(paint).filter(Boolean).join(",");
      parts.push(`{run${o.styleID}: ${o.fontName ? o.fontName.family + " " + o.fontName.style : ""} ${o.fontSize ? r(o.fontSize) : ""} ${of}}`);
    }
    parts.push(`text=${JSON.stringify(n.textData?.characters || "")}`);
  }
  return parts.join(" ");
}

function walk(n, depth) {
  if (n.visible === false) return;
  console.log(line(n, depth));
  if (depth < maxDepth) for (const c of n.children) walk(c, depth + 1);
}

walk(map[id], 0);
