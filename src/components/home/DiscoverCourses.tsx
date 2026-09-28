import { CourseCard } from "@/components/cards/CourseCard";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { topicRows } from "@/data/categories";
import { courses } from "@/data/courses";

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
      <CategoryPills rows={topicRows} moreLabel="+ More" className="mt-[42px]" />
      <div className="mt-[77px] grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
