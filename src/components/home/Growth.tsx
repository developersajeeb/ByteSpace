import Image from "next/image";
import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard, ProgressCard } from "@/components/cards/FloatingCards";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { Icon } from "@/components/icons/Icon";
import { courses } from "@/data/courses";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const perks = ["Share Your Expertise", "Monetize Your Passion", "Flexibility and Autonomy", "Build a Community"];

const heading = "font-poppins text-[32px] leading-[1.2] font-semibold tracking-[-0.01em] text-gray-950 sm:text-[44px]";
const ornament = "pointer-events-none absolute size-[216px] max-w-none";

function RevenueCards() {
  return (
    <>
      <div className="absolute top-11 left-0 flex w-[232px] flex-col gap-2 rounded-2xl bg-blue-800 p-4 text-gray-50">
        <div>
          <p className="text-base leading-[1.2] font-medium">Total Revenue</p>
          <p className="text-[10px] leading-[1.2]">July 1-28</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-poppins text-2xl leading-8 font-semibold tracking-[-0.01em]">$120.29</p>
          <span className="rounded-3xl bg-lime-500 px-2 py-0.5 text-[10px] leading-5 font-medium text-gray-950">+12$</span>
        </div>
        <div className="h-2 w-[200px] overflow-hidden rounded-3xl bg-white">
          <div className="h-full w-[112px] rounded-3xl bg-lime-400" />
        </div>
      </div>
      <div className="absolute top-[194px] left-0 flex w-[134px] flex-col items-start gap-2 rounded-2xl bg-blue-800 p-4 text-gray-50">
        <div>
          <p className="text-base leading-[1.2] font-medium">Year to Date</p>
          <p className="text-[10px] leading-[1.2]">2023</p>
        </div>
        <p className="font-poppins text-2xl leading-8 font-semibold tracking-[-0.01em]">$1,200.38</p>
        <span className="rounded-3xl bg-lime-500 px-2 py-0.5 text-[10px] leading-5 font-medium text-gray-950">+12$</span>
      </div>
    </>
  );
}

export function Growth() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-20 xl:h-[1460px] xl:py-[120px]">
      <GlowBlob color="blue" size={1137} opacity={0.2} x={722} y={788} />
      <GlowBlob color="lime" size={1137} opacity={0.4} x={-152} y={-466} />
      <GlowBlob color="blue" size={1137} opacity={0.2} x={-508} y={183} />
      <GlowBlob color="blue" size={1137} opacity={0.1} x={811} y={-458} />
      <GlowBlob color="lime" size={672} opacity={0.6} x={-287} y={946} />

      <div className="container-page relative flex flex-col gap-20 xl:gap-[72px]">
        {/* Row 1: text + course/student composite */}
        <div className="flex flex-col items-center gap-12 xl:w-[1258px] xl:translate-x-px xl:flex-row xl:gap-[63px]">
          <div className="flex w-full max-w-[574px] flex-col gap-10">
            <h2 className={`${heading} max-w-[577px]`}>Your Path to Professional Growth Starts Here!</h2>
            <p className="max-w-[477px] type-body-l text-gray-700">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are
              looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need.
            </p>
            <dl className="flex gap-14">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="type-body-l text-gray-700">{s.label}</dt>
                  <dd className="type-display-xs text-blue-800">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative h-[552px] w-[621px] shrink-0 max-md:[zoom:0.8] max-sm:[zoom:0.52]">
            <CourseCard course={courses[0]} variant="feature" className="absolute top-0 left-0" />
            <Image
              src="/images/hero-student.webp"
              alt="Student taking an online course"
              width={577}
              height={540}
              sizes="577px"
              className="absolute top-3 left-0 h-[540px] w-[577px] drop-shadow-[25px_37px_36px_rgb(0_0_0/0.1)]"
            />
            <ProgressCard roomy className="absolute top-[213px] left-[345px]" />
            <Image src="/images/ornaments/cda676feaf-lime.webp" alt="" width={216} height={216} className={`${ornament} top-[67px] left-[404px]`} />
          </div>
        </div>

        {/* Row 2: creator composite + text */}
        <div className="flex flex-col-reverse items-center gap-12 xl:translate-x-px xl:flex-row xl:gap-[79px]">
          <div className="relative h-[596px] w-[541px] shrink-0 max-md:[zoom:0.8] max-sm:[zoom:0.56]">
            <RevenueCards />
            <Image
              src="/images/creator-student.webp"
              alt="Creator holding a tablet"
              width={435}
              height={596}
              sizes="435px"
              className="absolute top-0 left-7 h-[596px] w-[435px] object-fill drop-shadow-[25px_37px_36px_rgb(0_0_0/0.1)]"
            />
            <HappyStudentsCard roomy className="absolute top-[413px] left-[283px]" />
            <Image src="/images/ornaments/e3b55902d6-lime.webp" alt="" width={216} height={216} className={`${ornament} top-[114px] left-[303px]`} />
          </div>

          <div className="flex w-full max-w-[580px] flex-col gap-10">
            <h2 className={`${heading} max-w-[391px]`}>Create &amp; Manage Courses Easily.</h2>
            <p className="max-w-[574px] type-body-l leading-7 text-gray-700">
              <strong className="font-bold">ByteSpace</strong> supports individuals or entities in the creation, publication, and administration of
              educational courses.
            </p>
            <ul className="flex flex-col gap-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-end gap-2 type-label-l text-gray-950">
                  <Icon name="check-circle-filled" className="shrink-0 text-blue-800" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
