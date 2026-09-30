import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  size?: "m" | "s";
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
};

/** Heading M / Heading S title with a Body L description, as used across the landing sections. */
export function SectionHeading({ title, description, size = "m", align = "center", className, titleClassName }: SectionHeadingProps) {
  return (
    <div data-reveal className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start", className)}>
      <h2
        className={cn(
          "font-poppins font-semibold tracking-[-0.01em] text-vulcan-950",
          size === "m" ? "text-[32px] sm:text-[44px]" : "text-[28px] sm:text-[36px]",
          "leading-[1.2]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && <p className="max-w-[917px] type-body-m text-gray-400 sm:type-body-l">{description}</p>}
    </div>
  );
}
