import { Icon } from "@/components/icons/Icon";

/** Five 24px stars; filled ones are Shuttle Gray/700, the rest Shuttle Gray/200. */
export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${value} out of 5 stars`}>
      <span className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Icon key={n} name="star-rate-filled" className={n <= value ? "text-gray-700" : "text-gray-200"} />
        ))}
      </span>
    </span>
  );
}
