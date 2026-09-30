import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({ tone = "light", className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex h-[37px] w-[171px] shrink-0 items-start", className)} aria-label="ByteSpace home">
      <Image src="/svg/logo-mark.svg" alt="" width={29} height={32} priority className="h-[31.5px] w-[28.9px]" />
      <span
        className={cn(
          "ml-2 mt-[7px] font-clash text-2xl leading-none font-bold",
          tone === "light" ? "text-gray-50" : "text-gray-950",
        )}
      >
        ByteSpace
      </span>
    </Link>
  );
}
