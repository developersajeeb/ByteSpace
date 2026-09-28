import { Icon } from "@/components/icons/Icon";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { cn } from "@/lib/cn";

const glass = "rounded-2xl p-4 backdrop-blur-[10px]";

const students = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/avatar-${n}.webp`);

type Variant = { className?: string; roomy?: boolean };

/** `roomy` = the taller copy of the card used in the "Growth" section (24px label line-height). */
export function ProgressCard({ className, roomy, value = 55 }: Variant & { value?: number }) {
  return (
    <div className={cn(glass, "flex w-[232px] flex-col gap-2 bg-white", className)}>
      <p className={cn("text-sm font-medium text-gray-950", roomy ? "leading-6" : "leading-[1.2]")}>Learning Progress</p>
      <p className="font-poppins text-5xl leading-[1.2] font-semibold tracking-[-0.01em] text-gray-950">{value}%</p>
      <div className="h-2 w-[200px] overflow-hidden rounded-3xl bg-chip" role="progressbar" aria-label="Learning progress" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full w-[112px] rounded-3xl bg-lime-400" />
      </div>
    </div>
  );
}

/** tone="lime" is the auth-page version (lime card, blue star, dark counter). */
export function HappyStudentsCard({ className, roomy, tone = "white" }: Variant & { tone?: "white" | "lime" }) {
  const lime = tone === "lime";
  return (
    <div className={cn(glass, "flex w-[258px] flex-col justify-center gap-2", lime ? "bg-lime-400" : "bg-white", className)}>
      <div>
        <p className={cn("text-base font-medium text-gray-950", roomy ? "leading-6" : "leading-[1.2]")}>Happy Students</p>
        {roomy ? (
          <p className={cn("flex items-center text-[10px] leading-[1.5]", lime ? "text-gray-800" : "text-gray-400")}>
            <b className="font-bold">4.5</b>&nbsp;(240)
            <Icon name="star" size={16} className={lime ? "text-blue-800" : "text-lime-400"} />
          </p>
        ) : (
          <p className="flex items-center type-body-xs text-gray-400">
            4.5 (240)
            <Icon name="star" size={16} className={lime ? "text-blue-800" : "text-lime-400"} />
          </p>
        )}
      </div>
      <AvatarStack avatars={students} more="2K+" size={43} overlap={16} moreClassName={cn("text-xs leading-[1.5] font-bold", lime ? "bg-gray-950 text-gray-50" : "bg-lime-400 text-gray-950")} />
    </div>
  );
}

export function CategoryStatCard({ className }: { className?: string }) {
  return (
    <div className={cn(glass, "w-[208px] bg-white", className)}>
      <p className="type-label-m text-gray-950">UI/UX Design</p>
      <p className="flex gap-2 type-body-xs text-gray-400">
        <span>200 Courses</span>
        <span aria-hidden>•</span>
        <span>1000+ Students</span>
      </p>
    </div>
  );
}
