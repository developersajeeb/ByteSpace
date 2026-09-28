"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type CategoryPillsProps = {
  /** Each inner array is one centred row on desktop (matches the Figma line breaks). */
  rows: string[][];
  moreLabel?: string;
  className?: string;
};

export function CategoryPills({ rows, moreLabel, className }: CategoryPillsProps) {
  const [active, setActive] = useState(rows[0][0]);

  return (
    <div className={cn("flex flex-wrap justify-center gap-x-4 gap-y-3 lg:gap-y-[21px]", className)} role="tablist" aria-label="Course categories">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-wrap justify-center gap-3 max-lg:contents lg:w-full lg:gap-4">
          {row.map((label) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active === label}
              onClick={() => setActive(label)}
              className={cn(
                "rounded-3xl px-4 py-3 text-base leading-[1.2] font-medium transition-colors",
                active === label ? "bg-lime-400 text-gray-950" : "bg-gray-50 text-gray-700 hover:bg-gray-100",
              )}
            >
              {label}
            </button>
          ))}
          {moreLabel && i === rows.length - 1 && (
            <button type="button" className="px-0 py-3 text-base leading-[1.2] font-medium text-blue-800 hover:underline">
              {moreLabel}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
