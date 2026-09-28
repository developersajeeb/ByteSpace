import Form from "next/form";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  defaultValue?: string;
  className?: string;
};

/** Course search (GET /courses?q=…). */
export function SearchBar({ defaultValue, className }: SearchBarProps) {
  return (
    <Form action="/courses" role="search" className={cn("flex w-full max-w-[581px] gap-3 sm:gap-4", className)}>
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-3xl bg-white px-6 focus-within:ring-2 focus-within:ring-lime-400">
        <Icon name="search-outlined" className="shrink-0 text-gray-400" />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Course, topic, creator"
          className="w-full min-w-0 bg-transparent type-body-l text-gray-950 outline-none placeholder:text-gray-400"
        />
      </label>
      <button
        type="submit"
        className="h-[46px] shrink-0 rounded-3xl bg-lime-400 px-6 type-label-l text-gray-950 transition-colors hover:bg-lime-300"
      >
        Search
      </button>
    </Form>
  );
}
