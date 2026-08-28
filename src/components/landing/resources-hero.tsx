"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { ResourcesPageData } from "@/lib/cms/types";

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

export function ResourcesHero({
  hero = DEFAULT_RESOURCES_PAGE.hero,
}: {
  hero?: ResourcesPageData["hero"];
}) {
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative h-dvh overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={hero.image}
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div aria-hidden className="bg-brand-deep absolute inset-0 opacity-65" />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,#010207)]"
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col items-center justify-center px-gutter pt-24 pb-8 text-center sm:pt-28">
        <div className="t-intro-lg t-intro">
          <motion.h1 {...heroEntrance(1, reduce)} className="t-display text-white">
            {hero.title}
          </motion.h1>
          <motion.p
            {...heroEntrance(2, reduce)}
            className="secondaryFont t-subhead mt-6 text-base leading-relaxed text-white/85 sm:mt-7 sm:text-[1rem]"
          >
            {hero.subtitle}
          </motion.p>
          <motion.p
            {...heroEntrance(3, reduce)}
            className="secondaryFont  mt-5 text-sm leading-relaxed text-white/65 sm:text-base"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
