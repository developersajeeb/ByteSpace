"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function FollowButton({ followers }: { followers: number }) {
  const [following, setFollowing] = useState(false);
  return (
    <>
      <span className="flex h-[46px] items-center gap-2 rounded-3xl bg-white px-6 type-label-l text-gray-950 backdrop-blur-[20px] max-sm:order-2">
        <span className="text-blue-800">{followers + (following ? 1 : 0)}</span> Followers
      </span>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((v) => !v)}
        className={cn(
          "h-[46px] rounded-3xl px-6 type-label-l text-vulcan-950 transition-colors sm:ml-auto",
          following ? "bg-white" : "bg-lime-400 hover:bg-lime-300",
        )}
      >
        {following ? "Following" : "Follow"}
      </button>
    </>
  );
}
