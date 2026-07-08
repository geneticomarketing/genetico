"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";
import { getSolutionsContent, type SolutionsVariant } from "@/lib/solutions-content";

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

function HexGridBackground() {
  return (
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
  );
}

function HeroHeading({
  reduce,
  hero,
}: {
  reduce: boolean | null;
  hero: import("@/lib/solutions-content").SolutionsContent["hero"];
}) {
  const content = hero;

  return (
    <>
      {content.eyebrow ? (
        <motion.p
          {...heroEntrance(0.5, reduce)}
          className="t-eyebrow secondaryFont mx-auto mb-4 text-[0.7rem] tracking-[0.36em] text-brand md:mb-5"
        >
          {content.eyebrow}
        </motion.p>
      ) : null}

      <motion.h1
        {...heroEntrance(1, reduce)}
        className="t-display mx-auto text-balance text-[#121212]"
      >
        {content.titleLine1}
        <br />
        <span className="text-brand">{content.titleHighlight}</span>
      </motion.h1>

      <motion.p
        {...heroEntrance(2, reduce)}
        className="secondaryFont mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#8f8f8f] md:mt-7 md:text-base"
      >
        {content.subtitle}
      </motion.p>
    </>
  );
}

function MultiSiteSyncPill({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(3, reduce)}
      className={`inline-flex items-center gap-2 rounded-full border border-[#e8ebf0] bg-white px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}
    >
      <span className="size-2 shrink-0 rounded-full bg-[#2b7623]" />
      <span className="secondaryFont text-xs text-[#6e6e73]">12 research sites synchronized</span>
    </motion.div>
  );
}

function CohortDatasetCard({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(3.5, reduce)}
      className={`rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="secondaryFont text-brand text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
          Research Cohort
        </span>
        <span className="rounded-full bg-[#eef4f9] px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-brand uppercase">
          Live
        </span>
      </div>
      <div className="secondaryFont mt-3 grid grid-cols-3 gap-2 border-t border-[#eef1f5] pt-3 text-center">
        <div>
          <p className="text-brand text-lg font-semibold tabular-nums">247</p>
          <p className="text-[0.62rem] text-[#a3afc4]">Patients</p>
        </div>
        <div>
          <p className="text-brand text-lg font-semibold tabular-nums">12</p>
          <p className="text-[0.62rem] text-[#a3afc4]">Centers</p>
        </div>
        <div>
          <p className="text-brand text-lg font-semibold tabular-nums">98%</p>
          <p className="text-[0.62rem] text-[#a3afc4]">HPO coded</p>
        </div>
      </div>
    </motion.div>
  );
}

function NaturalHistoryCard({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(4, reduce)}
      className={`rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="secondaryFont text-brand text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
          Natural History Study
        </span>
        <span className="secondaryFont text-[0.62rem] text-[#a3afc4]">Longitudinal</span>
      </div>
      <div className="secondaryFont mt-3 space-y-2.5 border-t border-[#eef1f5] pt-3">
        {[
          { label: "Baseline capture", value: "Complete" },
          { label: "Follow-up visits", value: "186 tracked" },
          { label: "Registry export", value: "Ready" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between text-[0.72rem]">
            <span className="text-[#6e6e73]">{row.label}</span>
            <span className="font-semibold text-[#121212]">{row.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LifeScienceHeroVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[5/3] w-full ${className}`} aria-hidden>
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-[#e8ebf0] bg-gradient-to-br from-[#eef4f9] via-white to-[#f8fafc] shadow-[0_24px_70px_rgba(2,67,133,0.1)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 480 288" fill="none">
          <circle cx="360" cy="72" r="44" fill="#ddeaf5" opacity="0.55" />
          <circle cx="96" cy="210" r="56" fill="#e8f4fc" opacity="0.65" />
          <path
            d="M120 88h48M144 64v48M248 196h40M268 176v40"
            stroke="#c5d4e8"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <circle cx="144" cy="88" r="10" fill="#fff" stroke="#b8cce0" strokeWidth="1.5" />
          <circle cx="268" cy="216" r="10" fill="#fff" stroke="#b8cce0" strokeWidth="1.5" />
          <circle cx="332" cy="128" r="14" fill="#fff" stroke="#7eb8e8" strokeWidth="1.5" />
          <line x1="154" y1="88" x2="318" y2="128" stroke="#d4dce6" strokeWidth="1.25" />
          <line x1="268" y1="206" x2="332" y2="142" stroke="#d4dce6" strokeWidth="1.25" />
          <path
            d="M372 52l8 8-8 8M372 60h24"
            stroke="#024385"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="absolute top-[8%] left-[5%] w-[min(58%,13.5rem)] overflow-hidden rounded-xl border border-[#e8ebf0] bg-white shadow-[0_12px_36px_rgba(2,67,133,0.1)] sm:w-[min(54%,15rem)]">
        <img src="/platform/patient-timeline.svg" alt="" className="block h-auto w-full" />
      </div>

      <div className="absolute right-[5%] bottom-[8%] w-[min(52%,12.5rem)] overflow-hidden rounded-xl border border-[#e8ebf0] bg-white shadow-[0_12px_36px_rgba(2,67,133,0.1)] sm:w-[min(48%,14rem)]">
        <img src="/platform/hpo-extraction.svg" alt="" className="block h-auto w-full" />
      </div>

      <div className="absolute top-[8%] right-[6%] inline-flex items-center gap-2 rounded-full border border-[#e8ebf0] bg-white px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <span className="size-2 shrink-0 rounded-full bg-[#2b7623]" />
        <span className="secondaryFont text-[0.65rem] font-medium tracking-[0.12em] text-[#6e6e73] uppercase">
          Research-ready datasets
        </span>
      </div>
    </div>
  );
}

function DocumentProcessedPill({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(3, reduce)}
      className={`inline-flex items-center gap-2 rounded-full border border-[#e8ebf0] bg-white px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}
    >
      <span className="size-2 shrink-0 rounded-full bg-[#2b7623]" />
      <span className="secondaryFont text-xs text-[#6e6e73]">Document processed</span>
    </motion.div>
  );
}

function HpoExtractionCard({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(3.5, reduce)}
      className={`rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}
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
  );
}

function RapidScoreCard({
  reduce,
  className = "",
}: {
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      {...heroEntrance(4, reduce)}
      className={`rounded-xl border border-[#e8ebf0] bg-white p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}
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
  );
}

function SolutionsHeroMobile({
  reduce,
  variant,
  hero,
}: {
  reduce: boolean | null;
  variant: SolutionsVariant;
  hero: import("@/lib/solutions-content").SolutionsContent["hero"];
}) {
  const isPharma = variant === "pharma";

  return (
    <div className="relative mx-auto w-full max-w-lg px-5 pt-24 pb-12 text-center md:hidden">
      <HeroHeading reduce={reduce} hero={hero} />

      <motion.div {...heroBgEntrance(reduce)} className="relative mt-8 w-full">
        {isPharma ? (
          <>
            <LifeScienceHeroVisual className="max-w-[20rem]" />
            <div className="mt-5 flex justify-center">
              <MultiSiteSyncPill reduce={reduce} />
            </div>
            <div className="mt-4 grid gap-3">
              <CohortDatasetCard reduce={reduce} className="w-full" />
              <NaturalHistoryCard reduce={reduce} className="w-full" />
            </div>
          </>
        ) : (
          <>
            <Image
              src="/solhero.png"
              alt=""
              width={960}
              height={720}
              priority
              unoptimized
              className="mx-auto h-auto w-full max-w-[15rem]"
            />
            <div className="mt-5 flex justify-center">
              <DocumentProcessedPill reduce={reduce} />
            </div>
            <div className="mt-4 grid gap-3">
              <HpoExtractionCard reduce={reduce} className="w-full" />
              <RapidScoreCard reduce={reduce} className="w-full" />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function HeroInfographicStage({
  reduce,
  variant,
}: {
  reduce: boolean | null;
  variant: SolutionsVariant;
}) {
  const isPharma = variant === "pharma";

  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl xl:max-w-[42rem]">
      <div className="absolute inset-[14%_10%_6%_10%] flex items-center justify-center">
        {isPharma ? (
          <LifeScienceHeroVisual className="h-full max-h-full w-full max-w-full" />
        ) : (
          <Image
            src="/solhero.png"
            alt=""
            width={960}
            height={720}
            priority
            unoptimized
            className="h-full w-full object-contain"
          />
        )}
      </div>

      {isPharma ? (
        <>
          <MultiSiteSyncPill reduce={reduce} className="absolute top-[2%] left-0 sm:left-[1%]" />
          <CohortDatasetCard
            reduce={reduce}
            className="absolute top-0 right-0 w-[min(100%,15.5rem)]"
          />
          <NaturalHistoryCard
            reduce={reduce}
            className="absolute bottom-[4%] left-0 w-[min(100%,16rem)]"
          />
        </>
      ) : (
        <>
          <DocumentProcessedPill reduce={reduce} className="absolute top-[2%] left-0 sm:left-[1%]" />
          <HpoExtractionCard
            reduce={reduce}
            className="absolute top-0 right-0 w-[min(100%,15.5rem)]"
          />
          <RapidScoreCard
            reduce={reduce}
            className="absolute bottom-[4%] left-0 w-[min(100%,16rem)]"
          />
        </>
      )}
    </div>
  );
}

function SolutionsHeroDesktop({
  reduce,
  variant,
  hero,
}: {
  reduce: boolean | null;
  variant: SolutionsVariant;
  hero: import("@/lib/solutions-content").SolutionsContent["hero"];
}) {
  return (
    <div className="relative mx-auto hidden h-full min-h-0 w-full max-w-6xl flex-col px-8 pt-28 pb-8 text-center md:flex">
      <HeroHeading reduce={reduce} hero={hero} />

      <motion.div
        {...heroBgEntrance(reduce)}
        className="relative mt-8 flex min-h-0 flex-1 items-center justify-center"
      >
        <HeroInfographicStage reduce={reduce} variant={variant} />
      </motion.div>
    </div>
  );
}

export function SolutionsHero({
  content,
  variant = "hospital",
}: {
  content: import("@/lib/solutions-content").SolutionsContent["hero"];
  variant?: SolutionsVariant;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative bg-white md:h-dvh md:min-h-[720px] md:overflow-x-hidden"
    >
      <HexGridBackground />
      <SolutionsHeroMobile reduce={reduce} variant={variant} hero={content} />
      <SolutionsHeroDesktop reduce={reduce} variant={variant} hero={content} />
    </section>
  );
}
