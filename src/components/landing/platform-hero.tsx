"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EASE } from "@/components/motion/reveal";
import { DEFAULT_PLATFORM_PAGE } from "@/lib/cms/defaults/platform";
import type { PlatformPageData } from "@/lib/cms/types";

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

export function PlatformHero({
  hero = DEFAULT_PLATFORM_PAGE.hero,
}: {
  hero?: PlatformPageData["hero"];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative h-dvh overflow-hidden"
      style={{
        background:
          "radial-gradient(75% 65% at 28% 42%, #12325a 0%, #07101f 46%, #03060e 78%, #010207 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        {...heroBgEntrance(reduce)}
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
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(75%_65%_at_28%_42%,rgba(18,50,90,0.55)_0%,rgba(7,16,31,0.72)_46%,rgba(3,6,14,0.85)_78%)]"
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,#010207)]"
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col items-center justify-center px-gutter pt-24 pb-8 text-center sm:pt-28">
        <div className="t-intro-lg t-intro">
          <motion.h1 {...heroEntrance(1, reduce)} className="t-display text-white">
            {hero.title}
          </motion.h1>
          <motion.p
            {...heroEntrance(2, reduce)}
            className="t-subhead mt-6 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            {hero.subtitle}
          </motion.p>
        </div>
        <motion.div {...heroEntrance(3, reduce)} className="mt-8">
          <button
            onClick={() => {
              document.querySelector("#cta")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="btn-glass"
          >
            {hero.ctaLabel}
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
