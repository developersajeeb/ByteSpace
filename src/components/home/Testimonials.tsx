import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-20 lg:h-[784px] lg:pt-[74px] lg:pb-0">
      <GlowBlob color="lime" size={1137} opacity={0.4} x={842} y={-241} />
      <GlowBlob color="lime" size={672} opacity={0.6} x={395} y={-138} />
      <GlowBlob color="blue" size={1137} opacity={0.2} x={-442} y={149} />

      <div className="container-page relative flex max-w-[1236px] flex-col gap-12 lg:gap-[72px]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:gap-[43px]">
          <h2 className="font-poppins text-[32px] leading-[1.2] font-semibold tracking-[-0.01em] text-black sm:text-[44px] xl:w-[577px] xl:shrink-0">
            Discover What Our Community Is Saying
          </h2>
          <p className="type-body-l text-neutral-700 xl:w-[580px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[41px]">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} roomy={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
