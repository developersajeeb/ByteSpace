// Exports every asset the site needs from design/bytespace.fig:
//   public/images/*.webp  - photos, avatars, colorized 3D ornaments
//   public/svg/*.svg      - logos
//   src/components/icons/icon-data.ts - Material icon paths (rendered with currentColor)
// Usage: node tools/figma/assets.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { decode, unzip, key, hashHex } from "./decode.mjs";
import { blobToPath, instanceChildren, toSvg } from "./geometry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = (p) => { const f = path.join(root, p); fs.mkdirSync(path.dirname(f), { recursive: true }); return f; };
const { nodes, map, blobs } = decode();
const img = (hash) => unzip(`images/${hash}`);
const full = (prefix) => {
  const n = nodes.flatMap((n) => n.fillPaints || []).find((p) => p.type === "IMAGE" && hashHex(p.image?.hash).startsWith(prefix));
  return hashHex(n.image.hash);
};

// Photos: [hash prefix, output name, output width]
const photos = [
  ["29a52a24e5", "hero-student", 1156],
  ["0d6596fb1d", "creator-student", 870],
  ["93ad9f9e6b", "course-figma", 682],
  ["c88264191d", "course-digital-asset", 682],
  ["4f3bdea568", "course-big-data", 682],
  ["72e18d90fb", "course-productivity", 682],
  ["a897894553", "course-money", 682],
  ["69362b0262", "course-startup", 682],
  ["71d7929ee0", "course-video", 1440],
  ["a7c9406fd0", "gallery-1", 334],
  ["d443b5217b", "gallery-2", 334],
  ["2e1b62a246", "gallery-3", 334],
  ["0c1762672f", "gallery-4", 334],
  ["9ef8cb329b", "avatar-1", 160],
  ["b44979e1c9", "avatar-2", 160],
  ["83fb3e0405", "avatar-3", 160],
  ["f3cf29a8fe", "avatar-4", 160],
  ["5824acacb3", "avatar-5", 160],
  ["7fdccc7832", "avatar-6", 160],
  ["1e078348a5", "avatar-7", 160],
  ["3fe5591817", "avatar-8", 160],
  ["0577f0e9b7", "avatar-9", 160],
  ["d0cd3adb50", "avatar-10", 160],
  ["63c4be8322", "avatar-11", 160],
  ["728c3b1d33", "avatar-12", 160],
  ["efb6f62056", "avatar-13", 160],
  ["13d1f8e83d", "avatar-14", 160],
  ["bfd09b20f2", "avatar-creator", 160],
];

for (const [prefix, name, width] of photos) {
  await sharp(img(full(prefix))).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out(`public/images/${name}.webp`));
}
console.log("photos", photos.length);

// 3D ornaments: matcap image tinted by a HARD_LIGHT color layer, clipped to the image alpha.
const colorName = { "#d4fb20": "lime", "#f5f5f6": "white" };
const toHex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const combos = new Map();
for (const n of nodes) {
  if (n.name !== "Mask Group") continue;
  const [mask, tint] = n.children;
  const hash = mask?.fillPaints?.find((p) => p.type === "IMAGE") && hashHex(mask.fillPaints.find((p) => p.type === "IMAGE").image.hash);
  const color = tint?.blendMode === "HARD_LIGHT" && tint.fillPaints?.[0]?.color && toHex(tint.fillPaints[0].color);
  if (hash && color) combos.set(`${hash.slice(0, 10)}-${colorName[color] || color.slice(1)}`, { hash, color });
}
for (const [name, { hash, color }] of combos) {
  const base = sharp(img(hash)).resize(800);
  const src = await base.png().toBuffer();
  const tinted = await sharp(src)
    .composite([{ input: { create: { width: 800, height: 800, channels: 4, background: color } }, blend: "hard-light" }])
    .png().toBuffer();
  await sharp(tinted).composite([{ input: src, blend: "dest-in" }]).webp({ quality: 85 }).toFile(out(`public/images/ornaments/${name}.webp`));
}
console.log("ornaments", [...combos.keys()].join(", "));

// Logos as standalone SVG files.
const svgs = { "logo-mark": "1:1788", "partner-1": "1:1709", "partner-2": "1:1720", "partner-3": "1:1736", "partner-4": "1:1747", "partner-5": "1:1758", "social-facebook": "50:356", "social-google": "50:360" };
for (const [name, id] of Object.entries(svgs)) fs.writeFileSync(out(`public/svg/${name}.svg`), toSvg(map[id], map, blobs));
console.log("svgs", Object.keys(svgs).length);

// Icons: every Material component used by an instance, plus a few one-off vector groups.
const iconPaths = (node) => {
  const paths = [];
  const walk = (n, tx, ty) => {
    if (n.visible === false) return;
    const t = n.transform || { m00: 1, m01: 0, m10: 0, m11: 1, m02: 0, m12: 0 };
    const x = tx + t.m02, y = ty + t.m12;
    const kids = n.type === "INSTANCE" ? instanceChildren(n, map) : n.children;
    if (n.fillGeometry?.length && !kids.length && (n.fillPaints || []).some((p) => p.visible !== false))
      for (const g of n.fillGeometry) {
        const p = { d: blobToPath(blobs[g.commandsBlob]) };
        if (x || y || t.m00 !== 1 || t.m11 !== 1) p.transform = `matrix(${[t.m00, t.m10, t.m01, t.m11, x, y].map((v) => Math.round(v * 1000) / 1000).join(" ")})`;
        if (g.windingRule === "ODD") p.evenOdd = true;
        paths.push(p);
      }
    for (const c of kids) walk(c, x, y);
  };
  for (const c of node.children) walk(c, 0, 0);
  return paths;
};
const icons = {};
const used = new Set(nodes.filter((n) => n.type === "INSTANCE").map((n) => key(n.symbolData.symbolID)));
for (const id of used) {
  const c = map[id];
  const name = `${map[key(c.parentIndex.guid)].name}-${c.name.replace("Style=", "").replace(" ", "-")}`.toLowerCase().replace(/_/g, "-");
  icons[name] = { size: [c.size.x, c.size.y], paths: iconPaths(c) };
}
const extra = { "design": "11:71", "star": "1:1826" };
for (const [name, id] of Object.entries(extra)) {
  const n = map[id];
  icons[name] = { size: [Math.round(n.size.x * 100) / 100, Math.round(n.size.y * 100) / 100], paths: n.children.length ? iconPaths(n) : iconPaths({ children: [{ ...n, transform: null, children: [] }] }) };
}
const ts = `// Generated by tools/figma/assets.mjs — do not edit by hand.
export type IconPath = { d: string; transform?: string; evenOdd?: boolean };
export const iconData = ${JSON.stringify(icons, null, 2)} satisfies Record<string, { size: number[]; paths: IconPath[] }>;
export type IconName = keyof typeof iconData;
`;
fs.writeFileSync(out("src/components/icons/icon-data.ts"), ts);
console.log("icons", Object.keys(icons).join(", "));
