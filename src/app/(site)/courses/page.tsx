import type { Metadata } from "next";
import { CourseCard } from "@/components/cards/CourseCard";
import { CatalogToolbar } from "@/components/courses/CatalogToolbar";
import { BlueBand } from "@/components/decor/BlueBand";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { catalogTopics } from "@/data/categories";
import { catalog } from "@/data/courses";
import { reveal, stagger } from "@/lib/motion";

export const metadata: Metadata = { title: "Find Your Next Course" };

const TOTAL_PAGES = 5;

export default async function CoursesPage({ searchParams }: PageProps<"/courses">) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const current = Math.min(Math.max(Number(page) || 1, 1), TOTAL_PAGES);
  const results = query ? catalog.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())) : catalog;

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/courses?${qs}` : "/courses";
  };

  return (
    <>
      <BlueBand className="z-10 h-[300px] overflow-visible sm:h-[360px]">
        <div className="container-page flex flex-col items-center gap-8 pt-[120px] sm:pt-[164px]">
          <h1 className="intro text-center font-poppins text-[28px] font-semibold tracking-[-0.01em] text-gray-50 sm:text-[36px] leading-[1.2]">
            Find Your Next Course
          </h1>
          <div style={stagger(1)} className="intro flex w-full justify-center">
            <SearchBar variant="scope" placeholder="Search" defaultValue={query} />
          </div>
        </div>
      </BlueBand>

      <div className="container-page pt-[72px] pb-[72px]">
        <div data-reveal>
          <CatalogToolbar />
          <CategoryPills rows={[catalogTopics]} spread className="mt-8" />
        </div>

        {results.length ? (
          <ul className="mt-10 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:mt-[77px] lg:grid-cols-3">
            {results.map((course, i) => (
              <li key={course.key} {...reveal("up", i % 3)} className="w-full max-w-[373px]">
                <CourseCard course={course} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-20 text-center type-body-l text-gray-700">
            No courses match “{query}”. Try another keyword.
          </p>
        )}

        <Pagination page={current} total={TOTAL_PAGES} href={pageHref} className="mt-[72px] xl:translate-x-[25px]" />
      </div>
    </>
  );
}
