"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DEFAULT_ECOSYSTEM_GAPS, DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import type { EcosystemGap } from "@/lib/cms/types";

// Single source of truth for the shared type scale, so it isn't repeated inline
// across the Problem / Solution panels. Colours come from theme tokens (globals.css).
const PANEL_MIN_H = "min-h-[460px] max-md:min-h-[400px]";
const LABEL_CLASS = "t-badge text-[14px] font-semibold tracking-[0.18em] uppercase";
const TITLE_CLASS = "t-card-title mt-4 max-w-[460px] text-[#121212]";
const DESC_CLASS = "text-ink-muted max-w-[440px] text-[16px] leading-[1.6]";

/** Label + title + description, shared by both the Problem and Solution panels.
 *  `layout="center"` stacks tightly and centres; `layout="split"` pushes the
 *  description to the bottom. */
function PanelBody({
  label,
  labelColor,
  title,
  desc,
  layout,
}: {
  label: string;
  labelColor: string;
  title: string;
  desc: string;
  layout: "center" | "split";
}) {
  const head = (
    <>
      <span className={`${LABEL_CLASS} ${labelColor}`}>{label}</span>
      <h3 className={TITLE_CLASS}>{title}</h3>
    </>
  );

  if (layout === "split") {
    return (
      <div className="flex h-full flex-col justify-center">
        <div>{head}</div>
        <p className={`${DESC_CLASS} mt-6`}>{desc}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center">
      {head}
      <p className={`${DESC_CLASS} mt-5`}>{desc}</p>
    </div>
  );
}

export function EcosystemProblems({
  heading = DEFAULT_HOME_PAGE.ecosystemGapsSection.heading,
  description = DEFAULT_HOME_PAGE.ecosystemGapsSection.description,
  gaps = DEFAULT_ECOSYSTEM_GAPS,
}: {
  heading?: string;
  description?: string;
  gaps?: EcosystemGap[];
}) {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="bg-white px-gutter py-section">
      <Reveal>
        <div className="mx-auto max-w-[1280px]">
          {/* Heading */}
          <div className="t-intro mx-auto text-center">
            <h2 className="t-heading text-[#121212]">{heading}</h2>
            <p className="t-subhead mt-5 text-base text-ink-muted sm:text-[1rem]">{description}</p>
          </div>

          {/* Tabs */}
          <div className="mt-16 flex justify-center">
            <div className="border-line flex flex-wrap items-center gap-1.5 rounded-[16px] border bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)] max-md:flex-nowrap max-md:overflow-x-scroll max-md:overflow-y-hidden">
              {gaps.map((gap, index) => (
                <button
                  key={gap.tab}
                  onClick={() => setActive(index)}
                  className={`h-[44px] rounded-[10px] px-5 text-[15px] font-medium transition-all duration-300 max-md:whitespace-nowrap ${
                    active === index
                      ? "bg-brand --shadow-[0_8px_24px_rgba(2,67,133,0.25)] text-white"
                      : "text-ink-muted hover:text-black"
                  }`}
                >
                  {gap.tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="bg-surface mt-14 grid gap-8 rounded-r-lg max-md:px-4 lg:grid-cols-2">
            {/* PROBLEM */}
            <div
              className={`${"PANEL_MIN_H"} min-h-[460px] max-md:min-h-[250px] px-0 py-0 sm:px-14`}
            >
              {gaps.map((gap, index) => (
                <div key={gap.tab} className={`h-full ${active === index ? "block" : "hidden"}`}>
                  <PanelBody
                    label="Problem"
                    labelColor="text-ink-faint"
                    title={gap.problemTitle}
                    desc={gap.problemDesc}
                    layout="center"
                  />
                </div>
              ))}
            </div>

            {/* SOLUTION */}
            <div className={`relative ${PANEL_MIN_H} overflow-hidden rounded-lg`}>
              {/* Gradient */}
              <div className="to-brand absolute inset-0 bg-gradient-to-br from-[#B6C7D8] via-[#3C73B0]" />

              {/* Halftone pattern (Figma: image 411) */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: "url('/images/ecosystem-dots.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* White card */}
              <div className="absolute inset-5 rounded-[20px] bg-white px-7 py-8 shadow-[0_15px_50px_rgba(0,0,0,0.12)] sm:inset-[58px] sm:px-[46px] sm:py-[42px]">
                {gaps.map((gap, index) => (
                  <div key={gap.tab} className={`h-full ${active === index ? "block" : "hidden"}`}>
                    <PanelBody
                      label="Solution"
                      labelColor="text-brand"
                      title={gap.solutionTitle}
                      desc={gap.solutionDesc}
                      layout="split"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
