import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/cards/CourseCard";
import { CatalogToolbar } from "@/components/courses/CatalogToolbar";
import { FollowButton } from "@/components/creator/FollowButton";
import { BlueBand } from "@/components/decor/BlueBand";
import { courses } from "@/data/courses";
import { creators, getCreator } from "@/data/creators";

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  return creator ? { title: creator.name, description: creator.tagline } : {};
}

export default async function CreatorPage({ params }: PageProps<"/creators/[slug]">) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  return (
    <>
      <BlueBand className="xl:h-[592px]">
        <div className="container-page flex flex-col gap-10 pt-[120px] pb-12 lg:pt-[172px] xl:pb-0">
          <div className="flex flex-col gap-10 lg:translate-x-0.5">
            <div className="flex items-center gap-6">
              <Image src={creator.avatar} alt="" width={96} height={96} priority className="size-16 rounded-3xl object-cover sm:size-24" />
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-start gap-2">
                  <h1 className="font-poppins text-[28px] font-semibold tracking-[-0.01em] text-gray-50 sm:text-[36px] leading-[43px]">{creator.name}</h1>
                  <span className="rounded-3xl bg-lime-400 px-6 py-2 type-label-m text-gray-950 backdrop-blur-[20px]">Creator</span>
                </div>
                <p className="type-body-l text-gray-50">{creator.tagline}</p>
              </div>
            </div>
            <div className="type-body-l text-gray-50">
              {creator.bio.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex h-[46px] items-center gap-2 rounded-3xl bg-white px-6 type-label-l text-gray-950 backdrop-blur-[20px]">
              <span className="text-blue-800">{creator.products}</span> Products
            </span>
            <FollowButton followers={creator.followers} />
          </div>
        </div>
      </BlueBand>

      <section className="container-page pt-[62px] pb-[61px]" aria-label={`Courses by ${creator.name}`}>
        <CatalogToolbar />
        <ul className="mt-10 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug} className="w-full max-w-[373px]">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
