"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";

const STAGGER_S = 0.3;
const ENTRANCE_DURATION = 1.5;
const BG_DURATION = 1;

function heroEntrance(contentIndex: number, reduce: boolean | null) {
  if (reduce) return { initial: false as const };
  return {
    initial: { opacity: 0, y: 40 },
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
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: BG_DURATION, ease: EASE, delay: 0 },
  };
}

export function PublicHealthHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative h-dvh overflow-hidden"
      style={{
        // background:
        //   "radial-gradient(80% 70% at 22% 58%, #12325a 0%, #07101f 42%, #03060e 72%, #010207 100%)",
        background: "url('/phero.png')",
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
          The Digital Backbone For
          <br />
          India&apos;s Rare Disease Ecosystem
        </motion.h1>

        <motion.p
          {...heroEntrance(2, reduce)}
          className="secondaryFont mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:mt-7 sm:text-base"
        >
          Genetico helps clinicians spend less time on data and more time on patients
        </motion.p>
      </div>
    </section>
  );
}
