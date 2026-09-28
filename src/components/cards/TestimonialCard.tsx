import Image from "next/image";
import { cn } from "@/lib/cn";

type TestimonialCardProps = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  /** Figma uses a 28px name line-height on all but the first card. */
  roomy?: boolean;
};

export function TestimonialCard({ name, role, avatar, quote, roomy }: TestimonialCardProps) {
  return (
    <figure className="flex w-full max-w-[374px] flex-col gap-6 rounded-3xl bg-white p-6">
      <Image src={avatar} alt="" width={80} height={80} className="size-20 rounded-full object-cover" />
      <figcaption>
        <p className={cn("type-heading-xs text-black", roomy && "leading-7")}>{name}</p>
        <p className="type-body-l text-blue-800">{role}</p>
      </figcaption>
      <blockquote className="type-body-l text-neutral-700">&quot;{quote}&quot;</blockquote>
    </figure>
  );
}
