import { Icon, type IconName } from "@/components/icons/Icon";

const filters: { label: string; icon: IconName }[] = [
  { label: "Filter", icon: "filter-alt-outlined" },
  { label: "Level", icon: "signal-cellular-alt-outlined" },
  { label: "Category", icon: "category-outlined" },
];

function ToolbarButton({ label, icon }: { label: string; icon: IconName }) {
  return (
    <button
      type="button"
      className="flex h-12 items-center gap-1 rounded-3xl border border-gray-200 bg-white px-4 type-label-m text-gray-700 transition-colors hover:border-gray-400"
    >
      <Icon name={icon} className="text-gray-950" />
      {label}
    </button>
  );
}

export function CatalogToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {filters.map((f) => (
          <ToolbarButton key={f.label} {...f} />
        ))}
      </div>
      <ToolbarButton label="Most relevant" icon="sort-filled" />
    </div>
  );
}
