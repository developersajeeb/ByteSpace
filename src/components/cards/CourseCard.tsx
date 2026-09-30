import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { courseAvatars, type Course } from "@/data/courses";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  course: Course;
  className?: string;
  priority?: boolean;
  /** "feature" = the copy shown in the Growth section (taller line-heights, dark learners bubble). */
  variant?: "default" | "feature";
};

export function CourseCard({ course, className, priority, variant = "default" }: CourseCardProps) {
  const feature = variant === "feature";
  const stats = [`${course.lessons} Lessons`, course.duration, `${course.comments} Comments`];

  return (
    <article
      className={cn(
        "group relative flex w-full max-w-[373px] flex-col rounded-3xl border border-gray-200 bg-white p-[15px] pb-5 transition-shadow hover:shadow-float",
        className,
      )}
    >
      <div className="relative aspect-[341/195] overflow-hidden rounded-xl bg-[#443131]">
        <Image
          src={course.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 341px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <ul className={cn("absolute right-3 left-3", feature ? "bottom-[13px]" : "bottom-[19px]", " flex flex-wrap gap-3")}>
          {stats.map((s) => (
            <li key={s} className={cn("rounded-3xl bg-chip/60 px-3 py-1.5 type-label-xs text-neutral-700 backdrop-blur-[4px]", feature && "leading-5")}>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[21px] flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="min-w-0">
            <h3 className={cn("truncate type-heading-xs text-black", feature && "leading-7")}>
              <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
                {course.title}
              </Link>
            </h3>
            <p className={cn("type-body-xs text-neutral-700", feature && "leading-5")}>
              by <span className="text-blue-800">{course.creator}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 items-center gap-1 rounded-3xl bg-gray-50 px-3 type-label-xs text-gray-700">
              <Icon name="signal-cellular-alt-outlined" size={20} />
              {course.level}
            </span>
            <AvatarStack avatars={courseAvatars} more={course.learners} moreClassName={feature ? "bg-black text-white type-label-xs" : undefined} />
          </div>

          <p className="flex items-end">
            <span className="type-heading-xs text-blue-800">
              <span className={cn(feature && "font-medium")}>$</span>
              {course.price}
            </span>
            <span className="type-body-xs text-neutral-700">/lifetime</span>
          </p>
        </div>

        <p className={cn("flex shrink-0 items-center type-body-l text-neutral-700", feature && "leading-7 font-medium")}>
          {course.rating}
          <Icon name="star-rate-round" className="ml-1 text-gray-200" />
          <span className="sr-only">out of 5 stars</span>
        </p>
      </div>
    </article>
  );
}
