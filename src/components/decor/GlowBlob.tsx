import { cn } from "@/lib/cn";

type GlowBlobProps = {
  color: "lime" | "blue";
  size: number;
  opacity: number;
  /** Position relative to the section's 1440px Figma frame. */
  x: number;
  y: number;
  className?: string;
};

const rgb = { lime: "203 252 1", blue: "0 59 226" };

/** Soft radial glow used behind the light sections (Figma radial gradient + 40px blur). */
export function GlowBlob({ color, size, opacity, x, y, className }: GlowBlobProps) {
  const c = rgb[color];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[20px]", className)}
      style={{
        left: `calc(50% - 720px + ${x}px)`,
        top: y,
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(closest-side, rgb(${c}) 0%, rgb(${c} / 0.23) 50%, rgb(${c} / 0.06) 80%, rgb(${c} / 0) 100%)`,
      }}
    />
  );
}
