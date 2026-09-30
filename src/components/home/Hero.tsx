import Image from "next/image";
import { CategoryStatCard, HappyStudentsCard, ProgressCard } from "@/components/cards/FloatingCards";
import { GridLines } from "@/components/decor/GridLines";
import { Ornaments, type Ornament } from "@/components/decor/Ornaments";
import { SearchBar } from "@/components/ui/SearchBar";
import { stagger } from "@/lib/motion";

const ornaments: Ornament[] = [
  { src: "e3b55902d6-lime", x: -121.6, y: 221, size: 386.8, desktopOnly: true },
  { src: "8670b841ea-lime", x: 14.4, y: 681.3, size: 343.7 },
  { src: "e3b55902d6-white", x: 356.4, y: 477, size: 175.8, desktopOnly: true },
  { src: "92fc70a39c-white", x: 1227.1, y: 220.2, size: 371.8, desktopOnly: true },
  { src: "f9c0e0fd05-lime", x: 1104, y: 463.6, size: 188.9, desktopOnly: true },
  { src: "cda676feaf-lime", x: 1123.9, y: 672, size: 331.5 },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-blue-800 lg:h-[1024px]">
      <GridLines />

      <div className="container-page relative z-[3] flex flex-col items-center pt-[120px] lg:pt-[169px]">
        <div className="flex max-w-[935px] flex-col items-center gap-6 text-center lg:gap-8">
          <h1 style={stagger(0)} className="intro font-poppins text-[40px] leading-[1.2] font-semibold tracking-[-0.01em] text-white sm:text-[56px] lg:text-[72px]">
            Get Access to Hundreds Courses Available
          </h1>
          <p style={stagger(1)} className="intro max-w-[819px] type-body-m text-gray-100 sm:type-body-l">
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </p>
        </div>
        <div style={stagger(2)} className="intro mt-10 flex w-full justify-center lg:mt-[60px]">
          <SearchBar />
        </div>
      </div>

      {/* 578×541 stage: the ring, student photo and floating cards keep their Figma offsets. */}
      <div style={stagger(3)} className="intro-zoom relative mx-auto mt-12 h-[541px] w-[578px] max-md:[zoom:0.75] max-sm:[zoom:0.55] lg:-mt-0.5">
        <div
          aria-hidden
          className="absolute top-[70px] left-[-286px] size-[1149px] rounded-full border-[320px] border-lime-500"
        />
        <Image
          src="/images/hero-student.webp"
          alt="Smiling student with headphones holding a laptop"
          width={578}
          height={541}
          priority
          sizes="578px"
          className="absolute inset-0 z-[1] h-[541px] w-[578px] drop-shadow-[25px_37px_36px_rgb(0_0_0/0.1)]"
        />
        <ProgressCard className="float absolute top-[139px] left-[411px] z-[1]" />
        <HappyStudentsCard style={stagger(1)} className="float absolute top-[325px] left-[-103px] z-[1] max-sm:hidden" />
        <CategoryStatCard style={stagger(2)} className="float absolute top-[127px] left-[-27px] z-[3]" />
      </div>

      <Ornaments items={ornaments} className="z-[2]" />
    </section>
  );
}
