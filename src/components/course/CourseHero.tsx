import Image from "next/image";
import { BlueBand } from "@/components/decor/BlueBand";
import { Icon, type IconName } from "@/components/icons/Icon";
import { ShareButton } from "./ShareButton";
import { stagger } from "@/lib/motion";

type CourseHeroProps = {
  title: string;
  subtitle: string;
  creator: string;
  level: string;
  rating: string;
  students: string;
  video: string;
};

function MetaPill({ icon, label }: { icon: IconName; label: string }) {
  return (
    <li className="flex h-10 items-center gap-2 rounded-3xl bg-white px-6 type-label-m text-gray-950 backdrop-blur-[20px]">
      <Icon name={icon} className="text-blue-800" />
      {label}
    </li>
  );
}

/** Blue course header with title, meta pills and the preview video (1440×957 in Figma). */
export function CourseHero({ title, subtitle, creator, level, rating, students, video }: CourseHeroProps) {
  return (
    <BlueBand className="xl:h-[957px]">
      <div className="container-page relative pt-[120px] pb-12 lg:pt-[172px] xl:pb-0">
        <div className="intro flex flex-col gap-6 lg:max-w-[820px] lg:translate-x-0.5">
          <div className="flex flex-col gap-2 text-gray-50">
            <h1 className="font-poppins text-[28px] font-semibold tracking-[-0.01em] sm:text-[36px] leading-[1.2]">{title}</h1>
            <p className="type-heading-xs">{subtitle}</p>
          </div>
          <p className="type-label-l text-[#f1f4fe]">by {creator}</p>
          <ul className="flex flex-wrap gap-4">
            <MetaPill icon="signal-cellular-alt-outlined" label={level} />
            <MetaPill icon="star-rate-round" label={rating} />
            <MetaPill icon="people-alt-outlined" label={students} />
          </ul>
        </div>

        <ShareButton title={title} className="intro mt-6 xl:absolute xl:top-[172px] xl:left-[calc(1rem+1163px)] xl:mt-0" />

        <div style={stagger(2)} className="intro-zoom relative mt-10 aspect-[720/479] w-full max-w-[720px] overflow-hidden rounded-3xl bg-[#443131] xl:absolute xl:top-[416px] xl:left-[calc(1rem+5px)] xl:mt-0 xl:w-[720px]">
          <Image src={video} alt="Course preview" fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-contain" />
          <button
            type="button"
            aria-label="Play course preview"
            className="absolute top-[42.6%] left-[45%] flex size-[72px] items-center justify-center rounded-3xl border border-neutral-700 bg-[#3d3d3d]/25 text-violet-50 backdrop-blur-[20px] transition-transform hover:scale-105 sm:size-[104px]"
          >
            <Icon name="play" size={72} className="max-sm:size-12" />
          </button>
        </div>
      </div>
    </BlueBand>
  );
}
