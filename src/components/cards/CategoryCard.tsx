import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";

type CategoryCardProps = {
  label: string;
  icon: IconName;
  href?: string;
};

export function CategoryCard({ label, icon, href = "/courses" }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex aspect-square w-full max-w-[167px] flex-col items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-lime-400 hover:shadow-float"
    >
      <span className="flex size-[60px] items-center justify-center rounded-[40px] bg-lime-400 text-gray-950">
        <Icon name={icon} size={36} />
      </span>
      <span className="type-label-xl text-gray-950">{label}</span>
    </Link>
  );
}
