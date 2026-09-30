"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { Stars } from "./Stars";

type Review = { name: string; role: string; avatar: string; rating: number; when: string; text: string };

const filters = [0, 5, 4, 3, 2, 1];

export function ReviewList({ reviews }: { reviews: Review[] }) {
  const [rating, setRating] = useState(0);
  const shown = rating ? reviews.filter((r) => r.rating === rating) : reviews;

  return (
    <>
      <div className="flex flex-wrap gap-4" role="group" aria-label="Filter reviews by rating">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={rating === f}
            onClick={() => setRating(f)}
            className={cn(
              "flex h-12 items-center gap-1 rounded-3xl px-4 type-label-m transition-colors",
              f === 0 && "h-[43px]",
              rating === f ? "bg-lime-400 text-gray-950" : "bg-gray-50 text-gray-700 hover:bg-gray-100",
            )}
          >
            {f === 0 ? (
              "All rating"
            ) : (
              <>
                <Icon name="star-rate-filled" className="text-gray-700" />
                {f}
              </>
            )}
          </button>
        ))}
      </div>

      {shown.length ? (
        <ul className="flex flex-col gap-6">
          {shown.map((r, i) => (
            <li key={r.name} data-reveal className="flex flex-col gap-6 rounded-3xl border border-gray-200 p-6 sm:p-[39px]">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-3">
                    <Image src={r.avatar} alt="" width={52} height={52} className="size-[52px] rounded-full object-cover" />
                    <div>
                      <p className="type-label-l text-gray-950">{r.name}</p>
                      <p className={cn("type-body-m text-gray-700", i === 0 && "leading-6")}>{r.role}</p>
                    </div>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className={cn("shrink-0 type-body-m text-gray-700", i === 0 && "leading-6")}>{r.when}</p>
              </div>
              <p className={cn("type-body-m text-gray-700", i === 0 && "leading-6")}>{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body-m text-gray-700">No {rating}-star reviews yet.</p>
      )}
    </>
  );
}
