import { CourseCard } from "@/components/cards/CourseCard";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { topicRows } from "@/data/categories";
import { courses } from "@/data/courses";
import { reveal } from "@/lib/motion";

export function DiscoverCourses() {
  return (
    <section className="container-page pt-[72px]">
      <SectionHeading
        title={
          <>
            Discover Your Passion,
            <br className="max-sm:hidden" /> Build Your Skills
          </>
        }
        description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
      />
      <div data-reveal className="mt-[42px]">
        <CategoryPills rows={topicRows} moreLabel="+ More" />
      </div>
      <div className="mt-[77px] grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <div key={course.slug} {...reveal("up", i % 3)} className="flex w-full justify-center">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}
