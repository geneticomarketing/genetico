"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";
import { DEFAULT_PLATFORM_PAGE } from "@/lib/cms/defaults/platform";
import type { PlatformFeature, PlatformPageData } from "@/lib/cms/types";

type Feature = PlatformFeature;

function FeatureIllustration({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center sm:min-h-[380px]">
      <Image
        src={src}
        alt={alt}
        width={520}
        height={400}
        unoptimized
        className="h-auto w-full max-w-[520px] object-contain"
      />
    </div>
  );
}

export function PlatformFeatures({
  section = DEFAULT_PLATFORM_PAGE.featuresSection,
}: {
  section?: PlatformPageData["featuresSection"];
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const switchTransition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };
  const FEATURES = section.features;

  return (
    <section
      id="platform-features"
      className="bg-white px-gutter py-section text-black"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <p className="t-eyebrow text-brand text-[0.7rem] tracking-[0.32em]">
                {section.eyebrow}
              </p>
              <span aria-hidden className="throbbing-bgH h-px w-10 rounded-full sm:w-14" />
            </div>
            <h2 className="t-heading mt-5 max-w-xl text-[#121212]">{section.heading}</h2>
          </div>
          <p className="text-ink-muted max-w-sm text-[15px] leading-relaxed sm:text-base lg:justify-self-end lg:pb-1">
            {section.description}
          </p>
        </div>

        {/* Tab bar */}
        <div className="border-line mt-14 border-y">
          <div className="flex flex-col lg:flex-row lg:divide-x lg:divide-[#e2e5e9]">
            {FEATURES.map((feature, index) => {
              const isActive = index === active;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className={`relative flex flex-1 flex-col items-start px-4 py-5 text-left transition-colors sm:px-6 sm:py-6 ${
                    index < FEATURES.length - 1 ? "border-line border-b lg:border-b-0" : ""
                  } ${isActive ? "bg-white" : "bg-white hover:bg-[#fafbfc]"}`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#5fd7cb_0%,#024385_100%)]"
                    />
                  )}
                  <span
                    className={`text-[13px] font-semibold tracking-wide ${
                      isActive ? "text-brand" : "text-[#b8c4d4]"
                    }`}
                  >
                    {feature.number}
                  </span>
                  <span
                    className={`mt-1.5 text-[15px] leading-snug sm:text-base ${
                      isActive ? "font-medium text-black" : "text-[#b8c4d4]"
                    }`}
                    style={
                      isActive
                        ? {
                            fontFamily: "var(--font-display)",
                            fontVariationSettings: '"SERF" 100',
                          }
                        : undefined
                    }
                  >
                    {feature.tabTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature detail */}
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative min-h-[420px]">
            {FEATURES.map((feature, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={feature.id}
                  aria-hidden={!isActive}
                  className="absolute inset-0 flex flex-col"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 16,
                  }}
                  transition={switchTransition}
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 1 : 0,
                  }}
                >
                  <span className="t-badge inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#02438524] bg-[#f2f5f7] px-3 py-3 text-[12px] font-semibold tracking-[0.14em] text-[#02438580] uppercase">
                    <span aria-hidden className="bg-accent size-1.5 rounded-full" />
                    {feature.category}
                  </span>

                  <p className="text-ink-faint t-badge mt-5 text-[11px] font-semibold tracking-[0.18em] uppercase">
                    {feature.subheading}
                  </p>

                  <h3
                    className="t-card-title mt-4 max-w-none text-[#121212]"
                    style={{ fontVariationSettings: '"SERF" 100' }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-ink-muted mt-5 max-w-lg text-[15px] leading-relaxed sm:text-base">
                    {feature.description}
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-ink-muted flex items-start gap-3 text-[15px] leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-2.5 pt-10">
                    {FEATURES.map((_, dotIndex) => {
                      const isDotActive = dotIndex === active;
                      return (
                        <button
                          key={dotIndex}
                          type="button"
                          onClick={() => setActive(dotIndex)}
                          aria-label={`Go to feature ${dotIndex + 1}`}
                          aria-current={isDotActive}
                          className={`throbbing-bg h-1.5 rounded-full transition-all duration-300 ${
                            isDotActive ? "bg-accent w-8" : "w-1.5 bg-[#d4dce6] hover:bg-[#b8c4d4]"
                          }`}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative min-h-[320px] sm:min-h-[380px]">
            {FEATURES.map((feature, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={feature.id}
                  aria-hidden={!isActive}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 16,
                  }}
                  transition={switchTransition}
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 1 : 0,
                  }}
                >
                  <FeatureIllustration src={feature.illustration} alt={feature.title} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
