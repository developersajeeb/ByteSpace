import { GridLines } from "@/components/decor/GridLines";
import { Ornaments, type Ornament } from "@/components/decor/Ornaments";
import { ButtonLink } from "@/components/ui/Button";

const ornaments: Ornament[] = [
  { src: "f9c0e0fd05-lime", x: 1078, y: -0.4, size: 188.9, desktopOnly: true },
  { src: "cda676feaf-lime", x: 1106.9, y: 289, size: 331.5 },
  { src: "e3b55902d6-lime", x: -121.6, y: -162, size: 386.8 },
  { src: "e3b55902d6-white", x: 351.4, y: 5, size: 175.8, desktopOnly: true },
  { src: "5b3686bc5e-white", x: -50, y: 224.6, size: 188.9, desktopOnly: true },
  { src: "8670b841ea-lime", x: 16.4, y: 298.3, size: 343.7, desktopOnly: true },
  { src: "92fc70a39c-white", x: 1222.1, y: 5.2, size: 371.8, desktopOnly: true },
];

export function CreatorCta() {
  return (
    <section className="relative isolate overflow-hidden bg-blue-800 py-24 lg:h-[488px] lg:py-0 lg:pt-[85px]">
      <GridLines />
      <div className="container-page relative flex max-w-[996px] flex-col items-center gap-10 text-center">
        <h2 className="max-w-[710px] font-poppins text-[32px] leading-[1.2] font-semibold tracking-[-0.01em] text-gray-50 sm:text-[44px]">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="type-body-m text-gray-50 sm:type-body-l">
          Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by publishing your
          finest course on the ByteSpace Course Library.
        </p>
        <ButtonLink href="/register" className="relative z-10">
          Join as Creator
        </ButtonLink>
      </div>
      <Ornaments items={ornaments} />
    </section>
  );
}
