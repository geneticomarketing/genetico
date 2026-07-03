"use client";

import "./apply-safari-scroll-fix";

import { useScroll, type UseScrollOptions } from "motion/react";
import { useLayoutEffect } from "react";

import { isSafari } from "./safari";

type ScrollMotionValue = { accelerate?: unknown };

function stripAccelerate(value: ScrollMotionValue) {
  delete value.accelerate;
}

/** Drop-in replacement for `useScroll` with Safari-safe scroll tracking. */
export function useProjectScroll(options: UseScrollOptions = {}) {
  const result = useScroll(options);

  useLayoutEffect(() => {
    if (!isSafari()) return;
    stripAccelerate(result.scrollX);
    stripAccelerate(result.scrollY);
    stripAccelerate(result.scrollXProgress);
    stripAccelerate(result.scrollYProgress);
  });

  return result;
}
