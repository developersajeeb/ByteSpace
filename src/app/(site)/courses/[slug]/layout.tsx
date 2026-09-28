import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import { courseDetail } from "@/data/course-detail";
import { courses, getCourse } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

/** The long-form title from Figma belongs to "Build Digital Asset"; other courses use their card title. */
const headlineFor = (slug: string, title: string) => (slug === "build-digital-asset" ? courseDetail.headline : title);

export async function generateMetadata({ params }: LayoutProps<"/courses/[slug]">): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course ? { title: headlineFor(course.slug, course.title), description: courseDetail.subtitle } : {};
}

export default async function CourseLayout({ children, params }: LayoutProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <CourseHero
        title={headlineFor(course.slug, course.title)}
        subtitle={courseDetail.subtitle}
        creator={course.creator}
        level={courseDetail.level}
        rating={courseDetail.rating}
        students={courseDetail.students}
        video={courseDetail.video}
      />
      <div className="container-page relative flex flex-col gap-12 pt-10 pb-16 xl:block xl:py-0">
        <CourseSidebar price={course.price} className="xl:absolute xl:-top-[541px] xl:right-4 xl:w-[412px]" />
        <div className="w-full xl:w-[725px]">{children}</div>
      </div>
    </>
  );
}
