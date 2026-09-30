import Image from "next/image";
import { cn } from "@/lib/cn";
import { stagger } from "@/lib/motion";

export type Ornament = {
  /** File name in /public/images/ornaments (without extension). */
  src: string;
  /** Position and size in the 1440px-wide Figma frame. */
  x: number;
  y: number;
  size: number;
  /** Hide on small screens where the shape would cover content. */
  desktopOnly?: boolean;
};

type OrnamentsProps = {
  items: Ornament[];
  className?: string;
};

/**
 * Colorized 3D shapes. They are laid out on a 1440px canvas centred in the
 * section, exactly like the Figma frame, and scaled down on smaller screens.
 * They fade in on load and then drift gently (see the motion styles in globals.css).
 */
export function Ornaments({ items, className }: OrnamentsProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="intro-zoom absolute top-0 left-1/2 h-full w-[1440px] origin-top -translate-x-1/2 max-lg:scale-[0.6] max-sm:scale-[0.4]">
        {items.map((o, i) => (
          <Image
            key={`${o.src}-${o.x}-${o.y}`}
            src={`/images/ornaments/${o.src}.webp`}
            alt=""
            width={Math.round(o.size)}
            height={Math.round(o.size)}
            sizes={`${Math.round(o.size)}px`}
            className={cn("float-slow absolute max-w-none select-none", o.desktopOnly && "max-lg:hidden")}
            style={{ ...stagger(i), left: o.x, top: o.y, width: o.size, height: o.size }}
          />
        ))}
      </div>
    </div>
  );
}
