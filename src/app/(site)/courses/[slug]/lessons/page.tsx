import type { Metadata } from "next";
import { TabHeading } from "@/components/course/CheckList";
import { CourseTabs } from "@/components/course/CourseTabs";
import { Icon } from "@/components/icons/Icon";
import { courseDetail } from "@/data/course-detail";

export const metadata: Metadata = { title: "Course Lessons" };

export default async function CourseLessonsPage({ params }: PageProps<"/courses/[slug]/lessons">) {
  const { slug } = await params;
  const progress = 55;
  return (
    <div className="flex flex-col gap-10 xl:pt-[78px] xl:pb-[83px]">
      <CourseTabs slug={slug} />
      <div className="flex flex-col gap-6">
        <TabHeading>Explore the Modules</TabHeading>
        <p data-reveal className="type-body-m text-gray-700">{courseDetail.lessonsIntro}</p>
        <TabHeading>Lesson List</TabHeading>
        <ol className="flex flex-col gap-6">
          {courseDetail.modules.map((m) => (
            <li key={m.title} data-reveal className="flex items-center gap-[13px]">
              <span className="flex size-[72px] shrink-0 items-center justify-center rounded-3xl bg-lime-400 text-gray-950">
                <Icon name="videocam-outlined" size={40} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="type-label-m text-gray-950">{m.title}</h3>
                <p className="type-body-m text-gray-700">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <TabHeading>Lesson Content</TabHeading>
        <p data-reveal className="type-body-m text-gray-700">{courseDetail.lessonContent}</p>
        <TabHeading>Lesson Progress Tracking</TabHeading>
        <p data-reveal className="type-body-m text-gray-700">{courseDetail.progressIntro}</p>
        <div data-reveal className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4">
          <p className="type-label-s text-gray-950">Learning Progress</p>
          <p className="type-heading-s text-gray-950">{progress}%</p>
          <div className="h-2 overflow-hidden rounded-3xl bg-gray-100" role="progressbar" aria-label="Learning progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full w-[56%] rounded-3xl bg-lime-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
