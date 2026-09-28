"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

/** Uses the Web Share API when available, otherwise copies the page URL. */
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "flex h-10 items-center gap-2 rounded-3xl bg-lime-400 px-6 text-base leading-6 font-medium text-gray-950 backdrop-blur-[20px] transition-colors hover:bg-lime-300",
        className,
      )}
    >
      <Icon name="share-outlined" />
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
