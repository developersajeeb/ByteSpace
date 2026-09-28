import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom text-style utilities so they don't get dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "type-style": [{ type: [(v: string) => /^(heading|display|label|body)-/.test(v)] }],
    },
  },
});

/** Joins class names; later Tailwind classes win over conflicting earlier ones. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
