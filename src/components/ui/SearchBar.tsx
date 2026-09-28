"use client";

import Form from "next/form";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  /** "scope" swaps the Search button for a Courses/Creators scope picker (catalog page). */
  variant?: "default" | "scope";
  className?: string;
};

const scopes = ["Courses", "Creators"] as const;

/** Course search (GET /courses?q=…). */
export function SearchBar({ defaultValue, placeholder = "Course, topic, creator", variant = "default", className }: SearchBarProps) {
  const [scope, setScope] = useState<(typeof scopes)[number]>("Courses");
  const [open, setOpen] = useState(false);

  return (
    <Form action="/courses" role="search" className={cn("flex w-full gap-3 sm:gap-4", variant === "scope" ? "max-w-[624px]" : "max-w-[581px]", className)}>
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-3xl bg-white px-6 focus-within:ring-2 focus-within:ring-lime-400 sm:max-w-[461px]">
        <Icon name="search-outlined" className="shrink-0 text-gray-400" />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent type-body-l text-gray-950 outline-none placeholder:text-gray-400"
        />
      </label>

      {variant === "default" ? (
        <button
          type="submit"
          className="h-[46px] shrink-0 rounded-3xl bg-lime-400 px-6 type-label-l text-gray-950 transition-colors hover:bg-lime-300"
        >
          Search
        </button>
      ) : (
        <div className="relative shrink-0">
          <input type="hidden" name="scope" value={scope.toLowerCase()} />
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 items-center gap-2 rounded-3xl bg-lime-400 px-6 type-label-l text-gray-950 transition-colors hover:bg-lime-300"
          >
            {scope}
            <Icon name="keyboard-arrow-down-filled" className={cn("transition-transform", open && "rotate-180")} />
          </button>
          {open && (
            <ul role="listbox" className="absolute top-full right-0 z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white py-2 shadow-float">
              {scopes.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={scope === s}
                    onClick={() => {
                      setScope(s);
                      setOpen(false);
                    }}
                    className={cn("w-full px-6 py-2 text-left type-label-m hover:bg-gray-50", scope === s && "text-blue-800")}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Form>
  );
}
