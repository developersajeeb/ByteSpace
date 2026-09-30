import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GridLines } from "./GridLines";

/** Blue top band with the 120px grid; the site header floats on top of it. */
export function BlueBand({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-blue-800", className)}>
      <GridLines />
      <div className="relative">{children}</div>
    </section>
  );
}
