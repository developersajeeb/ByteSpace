import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, className, ...props }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-label-s text-gray-950">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-[52px] w-full rounded-xl border bg-white px-6 type-body-l text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-800",
          error ? "border-red-500" : "border-gray-100",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="type-body-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
