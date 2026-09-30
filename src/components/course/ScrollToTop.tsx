"use client";

import { useEffect } from "react";

// Back/forward navigations should keep the position the browser restores.
let poppedState = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    poppedState = true;
  });
}

/**
 * Next.js scrolls to the first element of the new *page* segment on navigation. Course
 * routes keep the hero in a shared layout, so that element sits below the hero and the
 * page would open mid-way. Mounted in that layout, this resets to the top when a course
 * is entered; switching tabs keeps the layout mounted, so their position is preserved.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (poppedState) {
      poppedState = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
