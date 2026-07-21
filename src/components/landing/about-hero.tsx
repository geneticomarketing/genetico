"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DEFAULT_HERO_LABELS } from "@/lib/cms/defaults/about";
import type { AboutPageData } from "@/lib/cms/types";
import { motion } from "motion/react";
import Link from "next/link";

type LabelAnchor = (typeof DEFAULT_HERO_LABELS)[number]["anchor"];

const ANCHOR_CLASS: Record<LabelAnchor, string> = {
  "top-left": "top-[5%] left-[1%] xl:left-[3%]",
  "top-right": "top-[5%] right-[1%] xl:right-[3%]",
  "mid-left": "top-[52%] left-0 -translate-y-1/2 xl:left-[2%]",
  "mid-right": "top-[52%] right-0 -translate-y-1/2 xl:right-[2%]",
};

function LabelCard({
  index,
  label,
  className = "",
}: {
  index: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`text-brand pointer-events-none flex items-center gap-2 border border-zinc-300/90 bg-white/95 shadow-[0_8px_24px_rgba(2,67,133,0.08)] backdrop-blur-sm ${className}`}
    >
      <span className="shrink-0 font-medium tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0 text-left leading-snug text-black">{label}</span>
    </div>
  );
}

export function AboutHero({ hero }: { hero: AboutPageData["hero"] }) {
  const heroLabels = hero.labels.map((label, i) => ({
    label,
    anchor: DEFAULT_HERO_LABELS[i]?.anchor ?? "top-left",
  }));

  return (
    <section className="isolate flex min-h-[100svh] items-center overflow-hidden bg-white">
      <StaggerGroup
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28"
        stagger={0.4}
        delayChildren={0.08}
        ssrVisible
      >
        <StaggerItem>
          <h1 className="t-display max-w-4xl text-balance text-black sm:max-w-5xl">
            {hero.titleLine1}
            <br />
            For <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-pretty text-black/70 sm:text-base">
            {hero.subtitle}
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <Link
              href={hero.ctaHref}
              className="bg-brand hover:bg-brand/70 inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors"
            >
              {hero.ctaLabel}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
        </StaggerItem>

        <StaggerItem className="w-full">
          <div className="relative mx-auto mt-8 w-full max-w-[52rem] sm:mt-10">
            {/* Mobile / tablet: crop-zoom the circular graphic, labels stacked cleanly below */}
            <div className="lg:hidden">
              <div className="relative mx-auto aspect-square w-[min(100%,19rem)] overflow-hidden sm:w-[min(100%,24rem)]">
                <img
                  src="/race.svg"
                  alt=""
                  className="rotate absolute top-1/2 left-1/2 w-[170%] max-w-none -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <ul className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-2 sm:mt-6 sm:max-w-xl sm:gap-3">
                {heroLabels.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + (i + 1) / 10 }}
                  >
                    <LabelCard
                      index={i}
                      label={item.label}
                      className="w-full gap-2 rounded-md px-3 py-2.5 text-xs sm:text-sm"
                    />
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Desktop: full landscape stage with floating labels */}
            <div className="@container relative mx-auto hidden aspect-[800/480] w-full lg:block">
              <img
                src="/race.svg"
                alt=""
                className="rotate absolute inset-0 h-full w-full object-contain"
              />

              {heroLabels.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 + (i + 1) / 10 }}
                  className={`absolute z-10 ${ANCHOR_CLASS[item.anchor]}`}
                >
                  <LabelCard
                    index={i}
                    label={item.label}
                    className="w-[clamp(9rem,17cqi,11rem)] gap-2 rounded-md p-2.5 text-[clamp(0.75rem,2cqi,0.875rem)] xl:gap-2.5 xl:p-3"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
