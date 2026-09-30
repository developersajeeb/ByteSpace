import { iconData, type IconName } from "./icon-data";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

/** Icons exported from the Figma file; they inherit `currentColor`. */
export function Icon({ name, size = 24, className, title }: IconProps) {
  const icon = iconData[name];
  const [w, h] = icon.size;
  return (
    <svg
      width={size}
      height={(size * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {icon.paths.map((p, i) => (
        <path key={i} d={p.d} transform={"transform" in p ? p.transform : undefined} fillRule={"evenOdd" in p ? "evenodd" : undefined} />
      ))}
    </svg>
  );
}

export type { IconName };
