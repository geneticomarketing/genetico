"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { scrollToSection, type NumberedSection } from "@/components/chrome/page-sections";
import { CASE_ROTATE_MS, HERO_CASES } from "@/content/platform-demo";
import type { PlatformContent } from "@/lib/cms/platform-page-data";

/**
 * The Platform hero: a full-height dark band with the IndiGeneUs mark turning
 * behind it, and a RAPID Score card working through three cases.
 *
 * The cases advance on their own until someone picks one, at which point the
 * rotation stops for good — taking a choice away from a reader who has just
 * made one is worse than never having moved at all. The bars fill in shortly
 * after mount, staggered, so the ranking reads as being computed.
 *
 * Under reduced motion the mark holds still, the cases do not advance, and
 * the bars snap to their final width instead of filling — the transition is
 * behind Tailwind's motion-safe variant, so CSS decides rather than JS.
 */
export function PlatformHero({
  content,
  sections,
}: {
  content: PlatformContent["hero"];
  sections: NumberedSection[];
}) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [picked, setPicked] = useState(false);
  const [barsIn, setBarsIn] = useState(false);

  useEffect(() => {
    const bars = setTimeout(() => setBarsIn(true), 160);
    return () => clearTimeout(bars);
  }, []);

  useEffect(() => {
    if (picked) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setCaseIndex((i) => (i + 1) % HERO_CASES.length),
      CASE_ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [picked]);

  const current = HERO_CASES[caseIndex];

  return (
    <section
      id="top"
      className="relative flex min-h-screen scroll-mt-32 flex-col overflow-hidden bg-[#04101C] px-[clamp(20px,4vw,32px)] pt-[clamp(72px,7.3vw,100px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-7%] aspect-square w-[min(720px,72vw)] -translate-y-1/2"
      >
        <Image
          src="/brand/indigeneus-mark-white.png"
          alt=""
          width={1065}
          height={1061}
          priority
          className="block h-full w-full opacity-[0.11] motion-safe:animate-[spin-mark_140s_linear_infinite]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(104deg,rgba(3,13,23,0.95)_0%,rgba(4,20,36,0.86)_44%,rgba(6,40,70,0.58)_100%)]"
      />

      <div className="max-w-site relative mx-auto flex w-full flex-1 flex-col">
        <div className="nav:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] nav:gap-[clamp(40px,5vw,72px)] grid flex-1 grid-cols-[minmax(0,1fr)] items-center gap-11 py-[clamp(32px,5vh,64px)] [align-content:center]">
          <div className="flex flex-col items-start gap-[26px]">
            <div className="flex items-center gap-4">
              <span className="font-mono-label text-[11px] tracking-[0.2em] whitespace-nowrap text-[#7FA9CC] uppercase">
                {content.eyebrow}
              </span>
              <span aria-hidden className="block h-px w-[72px] bg-white/28" />
            </div>

            <h1 className="font-headline m-0 max-w-[15em] text-[clamp(36px,4.4vw,58px)] leading-[1.06] tracking-[-0.022em] text-white text-pretty">
              {content.title}
              {content.titleEmphasis ? <em className="italic"> {content.titleEmphasis}</em> : null}
            </h1>

            {content.blurb ? (
              <p className="m-0 max-w-[34em] text-base leading-[1.68] text-[#C6D6E4]">
                {content.blurb}
              </p>
            ) : null}

            <a
              href={content.ctaHref}
              onClick={(e) => {
                if (!content.ctaHref.startsWith("#")) return;
                e.preventDefault();
                scrollToSection(content.ctaHref.slice(1));
              }}
              className="inline-flex items-center gap-[11px] rounded-full bg-white px-[26px] py-3.5 text-[14.5px] font-bold text-[#0A1F33] transition-colors hover:bg-[#E6EEF5]"
            >
              {content.ctaLabel}
              <span
                aria-hidden
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0A1F33] text-[10px] text-white"
              >
                →
              </span>
            </a>
          </div>

          <div className="rounded-2xl border border-white/18 bg-[rgba(4,22,40,0.62)] p-5 pb-[22px] shadow-[0_32px_80px_rgba(0,0,0,0.42)] backdrop-blur-[10px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                RAPID Score™
              </span>
              <span className="font-mono-label rounded-full border border-white/22 px-2.5 py-1 text-[10.5px] tracking-[0.16em] text-[#9FBDD6] uppercase">
                Illustrative
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Example case">
              {HERO_CASES.map((demo, i) => (
                <button
                  key={demo.label}
                  type="button"
                  aria-pressed={i === caseIndex}
                  onClick={() => {
                    setCaseIndex(i);
                    setPicked(true);
                  }}
                  className={`cursor-pointer rounded-full border px-[13px] py-[7px] text-xs transition-colors ${
                    i === caseIndex
                      ? "border-[#6FD8C2]/55 bg-[#6FD8C2]/16 font-bold text-[#9FE7D6]"
                      : "border-white/18 text-[#9FBDD6] hover:border-white/42"
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>

            {/* Fixed height so the bars below do not jump as the meta wraps. */}
            <p className="mt-4 mb-0 min-h-[3.2em] text-[13px] leading-[1.6] text-[#9FBDD6]">
              {current.meta}
            </p>

            <div className="mt-2 flex flex-col gap-3.5">
              {current.rows.map((row, i) => (
                <div key={row.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-sm font-medium ${i === 0 ? "text-white" : "text-[#E4EDF5]"}`}
                    >
                      {row.name}
                    </span>
                    <span
                      className={`font-mono-label text-sm ${
                        i === 0 ? "text-[#6FD8C2]" : "text-[#8FD8FF]"
                      }`}
                    >
                      {row.score}%
                    </span>
                  </div>
                  <div className="mt-[7px] h-[5px] rounded-[3px] bg-white/12">
                    <div
                      className={`h-[5px] rounded-[3px] motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out ${
                        i === 0 ? "bg-[#6FD8C2]" : "bg-[#4FA6D8]"
                      }`}
                      style={{
                        width: barsIn ? `${row.score}%` : 0,
                        transitionDelay: `${i * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5 border-t border-white/14 pt-4">
              {current.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-mono-label block text-[15px] text-white">{stat.value}</span>
                  <span className="mt-0.5 block text-[11px] text-[#8FB2CE]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-white/16 pt-5 pb-6">
          <span className="font-mono-label text-[10.5px] tracking-[0.2em] text-[#7FA9CC] uppercase">
            Inside the platform
          </span>
          <div className="nav:grid-cols-5 mt-4 grid grid-cols-2 gap-2.5">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                className="flex flex-col gap-1.5 rounded-[11px] border border-white/14 bg-white/4 px-[15px] pt-3.5 pb-[15px] transition-colors hover:border-white/34 hover:bg-white/11"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[10.5px] tracking-[0.12em] text-[#6FD8C2]">
                    {section.num}
                  </span>
                  <span aria-hidden className="text-xs text-white/40">
                    →
                  </span>
                </span>
                <span className="text-sm leading-[1.3] font-medium text-white">
                  {section.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
