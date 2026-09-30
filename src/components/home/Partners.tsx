import Image from "next/image";
import { reveal } from "@/lib/motion";

const partners = [
  { src: "/svg/partner-1.svg", width: 167, height: 41 },
  { src: "/svg/partner-2.svg", width: 168, height: 41 },
  { src: "/svg/partner-3.svg", width: 170, height: 41 },
  { src: "/svg/partner-4.svg", width: 170, height: 41 },
  { src: "/svg/partner-5.svg", width: 169, height: 42 },
];

export function Partners() {
  return (
    <section aria-label="Our partners" className="bg-gray-50 py-12 xl:h-[202px] xl:py-0 xl:pt-20">
      <ul className="container-page flex flex-wrap items-end justify-center gap-x-10 gap-y-6 xl:flex-nowrap xl:gap-[72px]">
        {partners.map((p, i) => (
          <li key={p.src} {...reveal("up", i)}>
            <Image src={p.src} alt={`Partner logo ${i + 1}`} width={p.width} height={p.height} className="h-auto max-w-[120px] sm:max-w-none" />
          </li>
        ))}
      </ul>
    </section>
  );
}
