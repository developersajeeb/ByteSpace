import type { ReactNode } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard } from "@/components/cards/FloatingCards";
import { GridLines } from "@/components/decor/GridLines";
import { Ornaments, type Ornament } from "@/components/decor/Ornaments";
import { Logo } from "@/components/layout/Logo";
import { courses } from "@/data/courses";
import { stagger } from "@/lib/motion";

const ornaments: Ornament[] = [
  { src: "e3b55902d6-white", x: 643.4, y: 626, size: 175.8 },
  { src: "8670b841ea-lime", x: 149.5, y: 319.7, size: 146.7 },
  { src: "f9c0e0fd05-lime", x: 95, y: 701.6, size: 188.9 },
];

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

/** Shared Login / Register layout: promo column with floating cards + white form card. */
export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-blue-800 xl:min-h-[1024px]">
      <GridLines />

      <div className="container-page relative h-[88px] lg:h-[120px]">
        <Logo className="absolute top-6 lg:top-[35px] lg:left-[calc(1rem+2px)]" />
      </div>

      <div className="container-page relative flex flex-col items-center gap-10 pb-16 xl:flex-row xl:items-start xl:justify-between xl:pb-[120px]">
        <div className="relative w-full max-w-[579px] text-center xl:max-w-[475px] xl:translate-x-0.5 xl:text-left">
          <h1 className="intro type-heading-xs text-gray-50">{title}</h1>
          <p style={stagger(1)} className="intro mt-4 type-body-l text-gray-50">{description}</p>

          {/* Promo collage (desktop only); offsets are the Figma positions relative to the text column origin (122, 120). */}
          <div aria-hidden style={stagger(2)} className="intro-zoom absolute inset-x-0 top-0 hidden xl:block">
            <CourseCard course={courses[1]} variant="feature" className="absolute top-[274px] left-0" />
            <CourseCard course={courses[2]} variant="feature" className="absolute top-[185px] left-[111px]" />
            <HappyStudentsCard tone="lime" roomy className="float absolute top-[620px] left-[226px]" />
          </div>
        </div>

        <div style={stagger(1)} className="intro w-full rounded-3xl bg-white px-6 py-10 sm:px-[63px] sm:pt-[61px] sm:pb-10 max-w-[579px] xl:min-h-[784px] xl:w-[579px] xl:shrink-0">
          {children}
        </div>
      </div>

      <Ornaments items={ornaments} className="max-xl:hidden" />
    </div>
  );
}
