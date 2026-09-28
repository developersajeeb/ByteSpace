import { CreatorCta } from "@/components/home/CreatorCta";
import { DiscoverCourses } from "@/components/home/DiscoverCourses";
import { Growth } from "@/components/home/Growth";
import { Hero } from "@/components/home/Hero";
import { LearningPaths } from "@/components/home/LearningPaths";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <DiscoverCourses />
      <LearningPaths />
      <Growth />
      <CreatorCta />
      <Testimonials />
    </>
  );
}
