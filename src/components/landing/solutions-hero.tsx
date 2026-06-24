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

export function SolutionsHero() {
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative h-dvh overflow-hidden bg-white">
      {/* Subtle hex grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solutions-hex-grid" width="56" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L56 84L56 100L28 100L0 100L0 84Z"
                fill="none"
                stroke="#e4e8ef"
                strokeWidth="0.75"
              />
            </pattern>
            <radialGradient id="solutions-hex-fade" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#solutions-hex-grid)" opacity="0.55" />
          <rect width="100%" height="100%" fill="url(#solutions-hex-fade)" />
        </svg>
      </div>

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col px-6 pt-24 pb-6 text-center sm:px-8 sm:pt-28">
        <motion.h1
          {...heroEntrance(1, reduce)}
          className="t-display mx-auto text-balance text-[#121212]"
        >
          For Centers of
          <br />
          <span className="text-brand">Excellence</span>
        </motion.h1>

        <motion.p
          {...heroEntrance(2, reduce)}
          className="secondaryFont mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#8f8f8f] sm:mt-7 sm:text-base"
        >
          Genetico helps clinicians spend less time on data and more time on patients
        </motion.p>

        <motion.div
          {...heroBgEntrance(reduce)}
          className="relative mt-8 min-h-0 w-full flex-1 sm:mt-10"
        >
          <div className="relative mx-auto h-full w-full max-w-3xl">
            <div className="absolute inset-x-0 -bottom-1/2 flex justify-center">
              <Image
                src="/solhero.png"
                alt=""
                width={960}
                height={720}
                priority
                unoptimized
                className="h-auto w-[min(100%,42rem)] max-w-none"
              />
            </div>

            {/* Document processed pill */}
            <motion.div
              {...heroEntrance(3, reduce)}
              className="absolute top-[8%] left-[2%] hidden items-center gap-2 rounded-full border border-[#e8ebf0] bg-white px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex"
            >
              <span className="size-2 shrink-0 rounded-full bg-[#2b7623]" />
              <span className="secondaryFont text-xs text-[#6e6e73]">Document processed</span>
            </motion.div>

            {/* HPO extraction card */}
            <motion.div
              {...heroEntrance(3.5, reduce)}
              className="absolute top-[2%] right-0 hidden w-[min(100%,15.5rem)] rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="secondaryFont text-brand text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
                  HPO Extraction
                </span>
                <span className="rounded-full bg-[#2b7623] px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white uppercase">
                  Auto
                </span>
              </div>
              <ul className="secondaryFont mt-3 space-y-2 border-t border-[#eef1f5] pt-3 text-[0.72rem] text-[#6e6e73]">
                <li>HP:0001250 · Seizures</li>
                <li>HP:0000924 · Skeletal anomaly</li>
                <li>HP:0004322 · Short stature</li>
              </ul>
            </motion.div>

            {/* Rapid score card */}
            <motion.div
              {...heroEntrance(4, reduce)}
              className="absolute bottom-[12%] left-0 hidden w-[min(100%,16rem)] rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:block"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="secondaryFont text-brand text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
                  Rapid Score
                </span>
                <span className="secondaryFont text-[0.62rem] text-[#a3afc4]">AI · Ranked</span>
              </div>
              <div className="secondaryFont mt-3 space-y-3 border-t border-[#eef1f5] pt-3">
                <div>
                  <div className="flex items-center justify-between text-[0.72rem] text-[#121212]">
                    <span>Marfan Syndrome</span>
                    <span className="text-brand font-semibold">94%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8ebf0]">
                    <div className="bg-brand h-full w-[94%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.72rem] text-[#121212]">
                    <span>Ehlers-Danlos Synd.</span>
                    <span className="text-brand font-semibold">67%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8ebf0]">
                    <div className="bg-brand h-full w-[67%] rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
