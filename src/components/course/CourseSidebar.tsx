import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { courseDetail } from "@/data/course-detail";

type CourseSidebarProps = {
  price: number;
  className?: string;
};

/** Enrolment card shown beside every course tab (Figma: 412px wide, 40px padding). */
export function CourseSidebar({ price, className }: CourseSidebarProps) {
  const { syllabus, cta, includes, creator } = courseDetail;
  return (
    <aside className={className}>
      <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-[39px]">
        <section className="flex flex-col gap-6">
          <h2 className="type-heading-xs text-gray-950">{syllabus.summary}</h2>
          <ol className="flex max-w-[323px] flex-col gap-3">
            {syllabus.preview.map((l) => (
              <li key={l.no} className="flex items-start justify-between gap-4">
                <span className="flex gap-2 type-label-m text-gray-950">
                  <span className="w-6 shrink-0">{l.no}</span>
                  <span className="max-w-[198px]">{l.title}</span>
                </span>
                <span className="shrink-0 type-body-m text-blue-800">{l.duration}</span>
              </li>
            ))}
            <li className="type-body-m text-gray-700">{syllabus.more}</li>
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <p className="type-body-m text-gray-700">{cta}</p>
          <p className="flex items-end">
            <span className="font-poppins text-4xl leading-[38px] font-semibold tracking-[-0.01em] text-blue-800">${price}</span>
            <span className="type-body-m text-gray-700">/lifetime</span>
          </p>
          <ButtonLink href="/register" className="w-full">
            Enroll Now
          </ButtonLink>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="type-heading-xs text-gray-950">This course include</h2>
          <ul className="flex flex-col gap-3">
            {includes.map((item) => (
              <li key={item.label} className="flex items-start gap-2 type-body-m text-gray-700">
                <Icon name={item.icon} className="shrink-0 text-blue-800" />
                {item.label}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-neutral-200" />

        <section className="flex flex-col items-start gap-6">
          <div className="flex gap-3">
            <Image src={creator.avatar} alt="" width={52} height={52} className="size-[52px] rounded-full bg-[#d9d9d9] object-cover" />
            <div>
              <p className="type-label-l text-gray-950">{creator.name}</p>
              <p className="type-body-m text-gray-700">{creator.role}</p>
            </div>
          </div>
          <p className="type-body-m text-gray-700">{cta}</p>
          <Link
            href={`/creators/${creator.slug}`}
            className="rounded-3xl border border-gray-200 px-4 py-2 type-label-m text-gray-700 transition-colors hover:border-gray-400"
          >
            See Full Profile
          </Link>
        </section>
      </div>
    </aside>
  );
}
