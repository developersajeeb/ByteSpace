import { cn } from "@/lib/cn";

/** 120px white grid (10% opacity) used behind the blue hero and CTA sections. */
export function GridLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(255 255 255 / 0.1) 2px, transparent 2px), linear-gradient(to bottom, rgb(255 255 255 / 0.1) 2px, transparent 2px)",
        backgroundSize: "120px 120px",
        backgroundPosition: "calc(50% + 59px) -1px",
      }}
    />
  );
}
