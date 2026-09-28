"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function CourseTabs({ slug, className }: { slug: string; className?: string }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/courses/${slug}`, label: "About" },
    { href: `/courses/${slug}/lessons`, label: "Lessons" },
    { href: `/courses/${slug}/reviews`, label: "Reviews" },
  ];
  return (
    <nav aria-label="Course sections" className={cn("flex gap-4", className)}>
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-3xl px-4 py-3 type-label-m transition-colors",
              active ? "bg-lime-400 text-gray-950" : "bg-gray-50 text-gray-700 hover:bg-gray-100",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
