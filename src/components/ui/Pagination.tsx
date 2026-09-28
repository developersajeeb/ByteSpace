import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  total: number;
  /** Builds the href for a page number. */
  href: (page: number) => string;
  className?: string;
};

const arrow = "flex h-12 w-14 items-center justify-center rounded-3xl border border-gray-200 bg-white transition-colors hover:border-gray-400";

export function Pagination({ page, total, href, className }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-6", className)}>
      {page > 1 ? (
        <Link href={href(page - 1)} aria-label="Previous page" className={cn(arrow, "text-gray-950")}>
          <Icon name="arrow-back-ios-new-outlined" />
        </Link>
      ) : (
        <span aria-disabled className={cn(arrow, "text-gray-700 hover:border-gray-200")}>
          <Icon name="arrow-back-ios-new-outlined" />
        </span>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn("type-heading-xs leading-7 transition-colors hover:text-blue-800", p === page ? "text-gray-200" : "text-gray-950")}
        >
          {p}
        </Link>
      ))}
      {page < total ? (
        <Link href={href(page + 1)} aria-label="Next page" className={cn(arrow, "text-gray-950")}>
          <Icon name="arrow-forward-ios-outlined" />
        </Link>
      ) : (
        <span aria-disabled className={cn(arrow, "text-gray-700 hover:border-gray-200")}>
          <Icon name="arrow-forward-ios-outlined" />
        </span>
      )}
    </nav>
  );
}
