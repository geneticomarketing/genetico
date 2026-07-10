"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { UseInViewOptions } from "motion/react";

// Shared "expo out" curve — a confident, pronounced settle.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Viewport settings tuned for mobile Safari (URL bar + IntersectionObserver quirks). */
export const VIEWPORT: UseInViewOptions = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
};

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
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

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers its <StaggerItem> children into view. Pair the two:
 * <StaggerGroup className="grid ..."><StaggerItem>…</StaggerItem>…</StaggerGroup>
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.15,
  delayChildren = 0.1,
  /** When true, children are visible in SSR HTML (use for above-fold heroes). */
  ssrVisible = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  ssrVisible?: boolean;
}) {
  const { ref, visible, reduce } = useInViewAnimation();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce || ssrVisible ? false : "hidden"}
      animate={visible || ssrVisible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}
