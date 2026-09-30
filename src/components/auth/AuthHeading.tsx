import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

export function AuthHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="type-body-l text-blue-800">{eyebrow}</p>
      <h2 className="font-poppins text-[36px] leading-[1.2] font-semibold tracking-[-0.01em] text-gray-950 sm:text-[44px]">{title}</h2>
    </div>
  );
}

export function AuthSuccess({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-start gap-6 xl:min-h-[683px] xl:justify-center" role="status">
      <Icon name="check-circle-filled" size={56} className="text-blue-800" />
      <AuthHeading eyebrow="Success" title={title} />
      <p className="type-body-l text-gray-700">{message}</p>
      <ButtonLink href="/courses">Browse Courses</ButtonLink>
    </div>
  );
}
