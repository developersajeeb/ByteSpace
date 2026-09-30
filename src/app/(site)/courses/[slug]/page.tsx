import Image from "next/image";
import { CheckList, TabHeading } from "@/components/course/CheckList";
import { CourseTabs } from "@/components/course/CourseTabs";
import { courseDetail } from "@/data/course-detail";
import { reveal } from "@/lib/motion";

export default async function CourseAboutPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  return (
    <div className="flex flex-col gap-10 xl:pt-[62px] xl:pb-[62px]">
      <CourseTabs slug={slug} />
      <div className="flex flex-col gap-6">
        <TabHeading>Description</TabHeading>
        <div data-reveal className="flex flex-col gap-[26px] type-body-m text-gray-700">
          {courseDetail.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <TabHeading>Sneak Peak</TabHeading>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-[19px]">
          {courseDetail.gallery.map((src, i) => (
            <li key={src} {...reveal("zoom", i)} className="relative aspect-[167/125] overflow-hidden rounded-2xl bg-[#d9d9d9]">
              <Image src={src} alt={`Course preview ${i + 1}`} fill sizes="(min-width: 640px) 167px, 45vw" className="object-cover" />
            </li>
          ))}
        </ul>
        <TabHeading>Key Points</TabHeading>
        <CheckList items={courseDetail.keyPoints} />
      </div>
    </div>
  );
}
