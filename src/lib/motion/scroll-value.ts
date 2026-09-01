"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useState } from "react";

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
  // The mapped value is derived on every render rather than mirrored into state,
  // so it always reflects the current progress and the ranges currently passed in.
  // The subscription exists only to schedule a re-render as the value changes.
  const [, setTick] = useState(0);

  useMotionValueEvent(progress, "change", () => {
    if (!enabled) return;
    setTick((tick) => tick + 1);
  });

  return enabled ? mapProgress(progress.get(), inputRange, outputRange) : outputRange[1];
}
