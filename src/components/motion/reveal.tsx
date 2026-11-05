"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { UseInViewOptions } from "motion/react";

// Shared "expo out" curve — a confident, pronounced settle.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Viewport settings tuned for mobile Safari (URL bar + IntersectionObserver quirks). */
const VIEWPORT: UseInViewOptions = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
};

function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  viewport: UseInViewOptions = VIEWPORT,
) {
  const reduce = useReducedMotion();
  const ref = useRef<T>(null);
  const inView = useInView(ref, viewport);
  const visible = Boolean(reduce) || inView;

  return { ref, visible, reduce };
}

/**
 * Fades + slides its children up as they scroll into view (once).
 * Used for whole sections, so it animates opacity + transform only — no scale,
 * which would briefly inset a full-bleed section's background from the edges.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, visible, reduce } = useInViewAnimation();

  /* The starting state is the same on server and client — the server cannot
     know the visitor's motion setting, so branching `initial` on it made every
     reduced-motion visit a hydration mismatch. With motion reduced the reveal
     simply takes no time. */
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
