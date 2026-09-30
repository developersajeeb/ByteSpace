import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "lime" | "mindaro" | "outline" | "blue";

const variants: Record<Variant, string> = {
  lime: "bg-lime-400 text-gray-950 hover:bg-lime-300",
  mindaro: "bg-mindaro-400 text-gray-900 hover:bg-lime-400",
  outline: "border border-gray-200 bg-white text-gray-950 hover:bg-gray-50",
  blue: "bg-blue-800 text-gray-50 hover:bg-blue-700",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-3xl px-6 py-3 type-label-l whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800";

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "lime", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "lime", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
