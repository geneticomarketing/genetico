"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "@/lib/cms/defaults/public-health";
import type { PublicHealthPageData } from "@/lib/cms/types";

const STAGGER_S = 0.3;
const ENTRANCE_DURATION = 1.5;
const BG_DURATION = 1;

function heroEntrance(contentIndex: number, reduce: boolean | null) {
  // Keep above-fold copy visible in SSR HTML; animate only after hydration.
  if (reduce) return { initial: false as const };
  return {
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: ENTRANCE_DURATION,
      ease: EASE,
      delay: BG_DURATION + (contentIndex - 0.1) * STAGGER_S,
    },
  };
}

function heroBgEntrance(reduce: boolean | null) {
  if (reduce) return { initial: false as const };
  return {
    initial: false as const,
    animate: { opacity: 1 },
    transition: { duration: BG_DURATION, ease: EASE, delay: 0 },
  };
}

export function PublicHealthHero({
  hero = DEFAULT_PUBLIC_HEALTH_PAGE.hero,
}: {
  hero?: PublicHealthPageData["hero"];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative h-dvh overflow-hidden"
      style={{
        // background:
        //   "radial-gradient(80% 70% at 22% 58%, #12325a 0%, #07101f 42%, #03060e 72%, #010207 100%)",
        background: hero.image ? `url('${hero.image}')` : "url('/phero.png')",
      }}
    >
      {/*  */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,#010207)]"
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-8 text-center sm:px-8 sm:pt-28">
        <motion.h1
          {...heroEntrance(1, reduce)}
          className="t-display mx-auto text-balance text-white"
        >
          Digital Backbone for
          <br />
          {hero.titleLine2.includes("India") ? (
            <>
              India&apos;s <span className="text-brand">rare disease ecosystem</span>
            </>
          ) : (
            hero.titleLine2
          )}
        </motion.h1>

        <motion.p
          {...heroEntrance(2, reduce)}
          className="secondaryFont mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-7 sm:text-base"
        >
          {hero.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
