"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/creators/purepearl-studio", label: "Creators" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

/** Transparent header that sits on top of each page's blue hero. */
export function Header() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close on Escape or a tap outside the header while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-30 h-[88px] lg:h-[120px]">
      <div className="container-page relative flex h-full items-center lg:block">
        <Logo onClick={close} className="lg:absolute lg:top-[35px] lg:left-[calc(1rem+2px)]" />

        <nav aria-label="Main" className="hidden lg:absolute lg:top-[47px] lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-base text-gray-50 transition-opacity hover:opacity-80",
                isActive(pathname, href) ? "leading-[1.2] font-medium" : "leading-[1.6]",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:absolute lg:top-[48px] lg:right-4 lg:flex lg:items-center lg:gap-6">
          <Link href="/login" className="text-base leading-6 text-gray-50 hover:opacity-80">
            Sign In
          </Link>
          <Link href="/register" className="text-base leading-6 text-gray-50 hover:opacity-80">
            Join Us
          </Link>
          <button type="button" aria-label="Cart" className="text-gray-50 hover:opacity-80">
            <Icon name="shopping-bag-outlined" />
          </button>
        </div>

        <button
          type="button"
          className="ml-auto flex size-10 items-center justify-center rounded-full text-gray-50 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="container-page lg:hidden">
          {/* Any tap on a link closes the menu right away, even before the next page renders. */}
          <nav aria-label="Mobile" onClick={(e) => (e.target as HTMLElement).closest("a") && close()} className="flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-float">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-xl px-4 py-3 type-label-l text-gray-950 hover:bg-gray-50",
                  isActive(pathname, href) && "bg-gray-50",
                )}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 border-t border-gray-100 pt-4">
              <Link href="/login" className="flex-1 rounded-3xl border border-gray-200 py-3 text-center type-label-m">
                Sign In
              </Link>
              <Link href="/register" className="flex-1 rounded-3xl bg-lime-400 py-3 text-center type-label-m">
                Join Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
