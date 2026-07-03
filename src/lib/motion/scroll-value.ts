"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useLayoutEffect, useState } from "react";

export function mapProgress(
  progress: number,
  [i0, i1]: [number, number],
  [o0, o1]: [number, number],
): number {
  if (i0 === i1) return o1;
  const t = Math.min(1, Math.max(0, (progress - i0) / (i1 - i0)));
  return o0 + t * (o1 - o0);
}

/**
 * Maps scroll progress to a numeric output without Motion's native ScrollTimeline
 * path, which leaves opacity stuck on iOS Safari.
 */
export function useScrollMappedValue(
  progress: MotionValue<number>,
  inputRange: [number, number],
  outputRange: [number, number],
  enabled = true,
): number {
  const [value, setValue] = useState(() =>
    enabled ? mapProgress(progress.get(), inputRange, outputRange) : outputRange[1],
  );

  useMotionValueEvent(progress, "change", (v) => {
    if (!enabled) return;
    setValue(mapProgress(v, inputRange, outputRange));
  });

  useLayoutEffect(() => {
    if (!enabled) return;
    setValue(mapProgress(progress.get(), inputRange, outputRange));
  }, [enabled, progress, inputRange, outputRange]);

  return enabled ? value : outputRange[1];
}
