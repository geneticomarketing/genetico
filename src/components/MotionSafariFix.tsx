"use client";

/** Side-effect import runs before page bundles hydrate Motion scroll tracking. */
import "@/lib/motion/apply-safari-scroll-fix";

export function MotionSafariFix() {
  return null;
}
