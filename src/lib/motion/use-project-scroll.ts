"use client";

import "./apply-safari-scroll-fix";

import { useScroll, type UseScrollOptions } from "motion/react";
import { useEffect, useLayoutEffect } from "react";

import { computeElementScrollProgress } from "./ios-scroll-progress";
import { isIOS, needsScrollTimelineFallback } from "./platform";

type ScrollMotionValue = { accelerate?: unknown };
type TargetRef = UseScrollOptions["target"];

function stripAccelerate(value: ScrollMotionValue) {
  delete value.accelerate;
}

function readTarget(target: TargetRef): HTMLElement | null {
  if (!target || !("current" in target)) return null;
  return target.current;
}

/**
 * Drop-in replacement for `useScroll`.
 * On iOS WebKit, Motion's scroll tracking is overridden with getBoundingClientRect polling
 * because native ScrollTimeline and Lenis both break scroll-linked animations there.
 */
export function useProjectScroll(options: UseScrollOptions = {}) {
  const result = useScroll(options);
  const offsetKey = JSON.stringify(options.offset ?? ["start end", "end start"]);

  useLayoutEffect(() => {
    if (!needsScrollTimelineFallback()) return;
    stripAccelerate(result.scrollX);
    stripAccelerate(result.scrollY);
    stripAccelerate(result.scrollXProgress);
    stripAccelerate(result.scrollYProgress);
  });

  useEffect(() => {
    if (!isIOS()) return;

    const offsets = (options.offset ?? ["start end", "end start"]) as string[];
    let frameId = 0;

    const update = () => {
      const target = readTarget(options.target);

      if (target) {
        result.scrollYProgress.set(computeElementScrollProgress(target.getBoundingClientRect(), offsets));
        return;
      }

      if (options.target) return;

      const root = document.documentElement;
      const range = root.scrollHeight - window.innerHeight;
      const progress = range > 0 ? window.scrollY / range : 0;
      result.scrollYProgress.set(Math.min(1, Math.max(0, progress)));
    };

    const loop = () => {
      update();
      frameId = requestAnimationFrame(loop);
    };

    update();
    frameId = requestAnimationFrame(loop);

    window.addEventListener("scroll", update, { passive: true });
    window.visualViewport?.addEventListener("scroll", update);
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, [options.target, offsetKey, result.scrollYProgress]);

  return result;
}
