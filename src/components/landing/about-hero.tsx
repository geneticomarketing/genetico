"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DEFAULT_HERO_LABELS } from "@/lib/cms/defaults/about";
import type { AboutPageData } from "@/lib/cms/types";
import { motion } from "motion/react";
import Link from "next/link";

const LABEL_POSITIONS = DEFAULT_HERO_LABELS;

export function AboutHero({ hero }: { hero: AboutPageData["hero"] }) {
  const heroLabels = hero.labels.map((label, i) => ({
    label,
    position: LABEL_POSITIONS[i]?.position ?? "",
  }));

  return (
    <section className="isolate flex min-h-screen items-center overflow-hidden bg-white">
      <StaggerGroup
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-8 lg:py-28"
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
          <div className="relative z-9999999999 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.ctaHref}
              className="bg-brand hover:bg-brand/70 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors"
            >
              {hero.ctaLabel}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="relative mx-auto mt-10 w-full max-w-[49rem]">
            <img src="/race.svg" className="rotate mx-auto h-auto w-full lg:w-196" alt="" />
            {heroLabels.map((item, i) => (
              <motion.div
                key={item.label}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + (i + 1) / 10 }}
                className="hidden lg:block"
              >
                <div
                  className={`text-brand pointer-events-none absolute flex w-fit max-w-[11rem] items-center justify-center gap-2.5 border border-zinc-400 bg-white p-3 px-3 text-sm shadow-lg ${item.position}`}
                >
                  <p className="shrink-0 font-medium">0{i + 1}</p>
                  <div className="text-left text-black">{item.label}</div>
                </div>
              </motion.div>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 lg:hidden">
              {heroLabels.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 + (i + 1) / 10 }}
                  className="text-brand flex w-full items-center justify-center gap-2 border border-zinc-400 bg-white p-2.5 px-3 text-xs opacity-90 shadow-lg max-md:-translate-y-16 sm:text-sm"
                >
                  <p className="shrink-0 font-medium">0{i + 1}</p>
                  <div className="text-center text-black">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
