export type Course = {
  slug: string;
  title: string;
  image: string;
  creator: string;
  lessons: number;
  duration: string;
  comments: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  learners: string;
};

const base = {
  creator: "purepearl studio",
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  level: "Beginner",
  price: 25,
  rating: 4.5,
  learners: "26+",
} as const;

export const courses: Course[] = [
  { ...base, slug: "learn-figma-from-basic", title: "Learn Figma from Basic", image: "/images/course-figma.webp" },
  { ...base, slug: "build-digital-asset", title: "Build Digital Asset", image: "/images/course-digital-asset.webp" },
  { ...base, slug: "the-power-of-big-data", title: "the Power of Big Data", image: "/images/course-big-data.webp" },
  {
    ...base,
    slug: "balancing-productivity-and-self-care",
    title: "Balancing Productivity and Self-Care",
    image: "/images/course-productivity.webp",
  },
  { ...base, slug: "mastering-money-management", title: "Mastering Money Management", image: "/images/course-money.webp" },
  { ...base, slug: "from-idea-to-startup-success", title: "From Idea to Startup Success", image: "/images/course-startup.webp" },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const courseAvatars = ["/images/avatar-2.webp", "/images/avatar-8.webp", "/images/avatar-9.webp", "/images/avatar-10.webp"];

/** The catalog page lists three "pages" worth of the sample courses (18 cards in the design). */
export const catalog = [0, 1, 2].flatMap((page) => courses.map((course) => ({ ...course, key: `${course.slug}-${page}` })));
