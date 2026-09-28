import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: string[];
  /** Label shown in the trailing counter bubble, e.g. "26+". */
  more?: string;
  size?: number;
  overlap?: number;
  moreClassName?: string;
  className?: string;
};

export function AvatarStack({ avatars, more, size = 32, overlap = 8, moreClassName = "bg-lime-400 text-gray-950 type-label-xs", className }: AvatarStackProps) {
  return (
    <div className={cn("flex", className)}>
      {avatars.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt=""
          width={size}
          height={size}
          className="shrink-0 rounded-full object-cover"
          style={{ width: size, height: size, marginLeft: i ? -overlap : 0 }}
        />
      ))}
      {more && (
        <span
          className={cn("flex shrink-0 items-center justify-center rounded-full", moreClassName)}
          style={{ width: size, height: size, marginLeft: avatars.length ? -overlap : 0 }}
        >
          {more}
        </span>
      )}
    </div>
  );
}
