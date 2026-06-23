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

export function ResourcesHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative h-dvh overflow-hidden"
      style={
        {
          // background: "linear-gradient(280deg, #12325a 0%, #024385 46%, #00101f 78%, #00101f 100%)",
        }
      }
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Image
          src="/rhero.png"
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div
          aria-hidden
          style={{
            background:
              "linear-gradient(280deg, #12325a 0%, #024385 46%, #00101f 78%, #00101f 100%)",
          }}
          className="absolute inset-0 opacity-65"
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,#010207)]"
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-8 text-center sm:pt-28">
        <motion.h1 {...heroEntrance(1, reduce)} className="t-display mx-auto text-white">
          Insights From <br /> The Rare Disease Ecosystem
        </motion.h1>
        <motion.p
          {...heroEntrance(3, reduce)}
          className="secondaryFont mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base"
        >
          Genetico helps clinicians spend less time on data and more time on patients
        </motion.p>
      </div>
    </section>
  );
}
