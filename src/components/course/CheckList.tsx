import { Icon } from "@/components/icons/Icon";

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 type-body-m text-gray-700">
          <Icon name="check-circle-filled" className="shrink-0 text-blue-800" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TabHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="type-heading-xs text-gray-950">{children}</h2>;
}
