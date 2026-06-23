"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";

type Gap = {
  tab: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
};

const GAPS: Gap[] = [
  {
    tab: "Diagnosis & Access",
    problemTitle: "High Diagnostic Burden",
    problemDesc:
      "Time to diagnosis is significantly high. Access to therapies is limited. Epidemiological data is scarce. Most rare diseases are chronic, and a large percentage affect children with low survival rates.",
    solutionTitle: "Structured, Earlier Diagnosis",
    solutionDesc:
      "Accessible screening and structured diagnostic pathways shorten the road to an accurate, earlier diagnosis and improved access to therapies.",
  },
  {
    tab: "Primary Care Gap",
    problemTitle: "Delayed Identification",
    problemDesc: "Lack of screening and triaging at the primary care level delays identification.",
    solutionTitle: "AI-Based Triaging",
    solutionDesc:
      "AI-based triaging systems integrated into primary healthcare infrastructure enable early identification and referral.",
  },
  {
    tab: "Secondary Care Gap",
    problemTitle: "Limited Referral Frameworks",
    problemDesc:
      "District hospitals lack tools and frameworks to identify and refer rare disease patients effectively.",
    solutionTitle: "Integrated Referral Models",
    solutionDesc:
      "Structured referral systems, awareness programs, and hub-and-spoke models enable seamless patient movement to specialized centers.",
  },
  {
    tab: "Tertiary Care Overload",
    problemTitle: "Operational Overload",
    problemDesc:
      "Centres of Excellence face operational overload due to fragmented workflows and redundant data entry across multiple systems.",
    solutionTitle: "Centralized Workflows",
    solutionDesc:
      "IndiGeneUs.AI centralizes workflows, eliminates redundancy, and enables structured care delivery across the patient lifecycle.",
  },
  {
    tab: "Policy & Planning Gap",
    problemTitle: "No Evidence Base for Policy",
    problemDesc:
      "Lack of reliable data prevents effective policy-making and long-term care planning.",
    solutionTitle: "Data-Driven Planning",
    solutionDesc:
      "Structured data and analytics from IndiGeneUs.AI support government decision-making and program design.",
  },
];

// Single source of truth for the shared type scale, so it isn't repeated inline
// across the Problem / Solution panels. Colours come from theme tokens (globals.css).
const PANEL_MIN_H = "min-h-[460px]";
const LABEL_CLASS = "text-[14px] font-semibold tracking-[0.18em] uppercase";
const TITLE_CLASS = "t-card-title mt-4 max-w-[460px] text-black";
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

export function EcosystemProblems() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="bg-white px-6 py-28 lg:px-10 lg:py-10">
      <Reveal>
        <div className="mx-auto max-w-[1280px]">
          {/* Heading */}
          <h2 className="t-heading mx-auto text-center text-black">
            Ecosystem challenges within services <br /> and the healthcare system
          </h2>

          {/* Tabs */}
          <div className="mt-16 flex justify-center">
            <div className="border-line flex flex-wrap items-center gap-1.5 rounded-[16px] border bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              {GAPS.map((gap, index) => (
                <button
                  key={gap.tab}
                  onClick={() => setActive(index)}
                  className={`h-[44px] rounded-[10px] px-5 text-[15px] font-medium transition-all duration-300 ${
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
          <div className="bg-surface mt-14 grid gap-8 rounded-r-lg lg:grid-cols-2">
            {/* PROBLEM */}
            <div className={`${PANEL_MIN_H} px-0 py-14 sm:px-14`}>
              {GAPS.map((gap, index) => (
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
                {GAPS.map((gap, index) => (
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
