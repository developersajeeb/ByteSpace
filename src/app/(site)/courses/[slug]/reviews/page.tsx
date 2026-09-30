import type { Metadata } from "next";
import { TabHeading } from "@/components/course/CheckList";
import { CourseTabs } from "@/components/course/CourseTabs";
import { ReviewList } from "@/components/course/ReviewList";
import { Stars } from "@/components/course/Stars";
import { courseDetail } from "@/data/course-detail";

export const metadata: Metadata = { title: "Course Reviews" };

export default async function CourseReviewsPage({ params }: PageProps<"/courses/[slug]/reviews">) {
  const { slug } = await params;
  const { ratings, reviews, reviewsIntro } = courseDetail;
  return (
    <div className="flex flex-col gap-10 xl:pt-[78px] xl:pb-[91px]">
      <CourseTabs slug={slug} />
      <div className="flex flex-col gap-6">
        <TabHeading>What Learners Are Saying</TabHeading>
        <p data-reveal className="type-body-m text-gray-700">{reviewsIntro}</p>

        <div data-reveal="zoom" className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:justify-center sm:p-10">
          <div className="flex h-[140px] w-[129px] shrink-0 flex-col items-center justify-center rounded-lg bg-lime-400">
            <p className="type-label-s text-gray-950">Ratings</p>
            <p className="type-heading-s text-gray-950">{ratings.average}</p>
          </div>
          <ul className="flex w-full max-w-[490px] flex-col gap-1">
            {ratings.breakdown.map((row) => (
              <li key={row.stars} className="flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-3xl bg-gray-100 sm:w-[282px] sm:flex-none">
                  <div className="h-full rounded-3xl bg-lime-400" style={{ width: `${(row.fill / 282) * 100}%` }} />
                </div>
                <Stars value={row.stars} className="max-sm:hidden" />
                <span className="ml-auto w-10 text-right type-body-m text-gray-700">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <TabHeading>Individual Reviews:</TabHeading>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
