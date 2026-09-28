import { CategoryCard } from "@/components/cards/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";

export function LearningPaths() {
  return (
    <section className="container-page pt-[72px] pb-[120px]">
      <SectionHeading
        size="s"
        title="Explore Diverse Learning Paths at Bytespace"
        description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
      />
      <ul className="mt-[68px] grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-[repeat(6,167px)] xl:justify-center xl:gap-10">
        {categories.map((c) => (
          <li key={c.label} className="w-full max-w-[167px]">
            <CategoryCard {...c} />
          </li>
        ))}
      </ul>
    </section>
  );
}
