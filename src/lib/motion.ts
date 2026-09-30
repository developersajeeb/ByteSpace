import type { CSSProperties } from "react";

type RevealKind = "up" | "left" | "right" | "zoom";

/** Stagger index as a CSS variable (read by the motion styles in globals.css). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Props for a scroll-driven reveal; `i` staggers siblings. */
export const reveal = (kind: RevealKind = "up", i = 0) => ({
  "data-reveal": kind === "up" ? "" : kind,
  style: stagger(i),
});
