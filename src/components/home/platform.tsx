"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { ComingSoonTag } from "@/components/coming-soon";
import { HOME_PLATFORM_DEMO, HOME_PLATFORM_HREF, type HomePlatformContent } from "@/content/home";
import {
  CASE,
  CASE_HPO,
  DICTATION,
  DISEASE_COMPARE,
  FOLLOW_UPS,
  LAB_EXTRACT,
  LIMS_ORDER,
  PHENOTYPE_ANALYTICS,
  RAPID_RANKED,
  RAPID_TOTAL,
} from "@/content/sample-case";
import type { SectionMeta } from "@/lib/cms/sections";

import { WindowBar } from "./hero";
import { useMedia, useScrub, WIDE_QUERY } from "./hooks";
import { H2, Label, MONO, SECTION } from "./label";

const pad = (i: number) => String(i + 1).padStart(2, "0");

const CARD = "border-rule flex flex-col rounded-xl border p-[18px]";

/**
 * 03 — IndiGeneUs.AI: which name is which, then one workflow in four layers,
 * each with its own screen on the sample case.
 *
 * The layers' titles, bodies and tags are the CMS entries the home page has
 * always read. The screens are drawn in code and paired with the layers by
 * position — capture, decide, connect, analyse — so only the first four
 * layers are shown. Each screen is a feature the platform has today, drawn on
 * the shared sample case; Analyse (cohorts, registries) is built but not yet
 * live, so it carries the "Coming soon" tag.
 *
 * At 1040px and up the section is scroll-scrubbed like 02. The screen's body
 * has a fixed height there, so the sticky block never changes size between
 * steps — a change of height would make the page jump back as you scroll.
 */
export function Platform({
  section,
  num,
  content,
}: {
  section: SectionMeta;
  num: string;
  content: HomePlatformContent;
}) {
  const shown = content.layers.slice(0, HOME_PLATFORM_DEMO.urls.length);
  const count = shown.length;
  const wide = useMedia(WIDE_QUERY);
  const track = useRef<HTMLDivElement | null>(null);
  const { pos, scrubTo } = useScrub(track, count, wide);
  const [picked, setPicked] = useState(0);

  const active = wide ? Math.min(count - 1, Math.floor(pos)) : picked;
  const fraction = pos - Math.floor(pos);

  return (
    <section id={section.id} className={`${SECTION} bg-sheet-cool`}>
      <div className="max-w-site mx-auto">
        <div className="mid:grid-cols-2 grid grid-cols-[minmax(0,1fr)] items-end gap-x-[72px] gap-y-8">
          <div data-reveal className="flex min-w-0 flex-col items-start gap-6">
            <Label num={num}>{section.eyebrow}</Label>
            <Image
              src="/brand/indigeneus-mark-black.png"
              sizes="52px"
              alt="IndiGeneUs.AI"
              width={1065}
              height={1061}
              className="block h-[52px] w-[52px] motion-safe:animate-[spin-mark_18s_linear_infinite]"
            />
            <h2 className={`${H2} text-[clamp(36px,4.6vw,60px)]`}>{content.heading}</h2>
          </div>
          <div data-reveal className="flex min-w-0 flex-col items-start gap-6">
            <p className="text-ink-body m-0 max-w-[520px] text-lg leading-[1.75] text-pretty">
              {content.body}
            </p>
            <Link
              href={HOME_PLATFORM_HREF}
              className="bg-primary-deep hover:bg-primary inline-flex items-center gap-2.5 rounded-[10px] px-[26px] py-[15px] text-[15px] font-bold text-white transition-colors hover:text-white"
            >
              {content.ctaLabel} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div ref={track} className="relative mt-[clamp(56px,7vw,88px)]">
          <div className="mid:sticky mid:top-[clamp(130px,15vh,160px)]">
            <div className="mid:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] grid grid-cols-[minmax(0,1fr)] items-start gap-x-14 gap-y-10">
              <div className="flex min-w-0 flex-col gap-2">
                <span className={`${MONO} text-ink-soft pb-2.5`}>{content.layersLabel}</span>
                {shown.map((layer, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={layer.title}
                      type="button"
                      aria-pressed={on}
                      onClick={() => (wide ? scrubTo(i) : setPicked(i))}
                      className={`border-rule relative w-full cursor-pointer border-0 border-b p-[22px] text-left transition-[background-color,box-shadow] duration-[250ms] ${
                        on
                          ? "rounded-xl bg-white shadow-[0_18px_44px_rgba(7,59,104,0.08)]"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono-label text-primary text-xs tracking-[0.16em]">
                          {pad(i)}
                        </span>
                        <span className="font-headline text-ink text-[clamp(24px,2.4vw,30px)] leading-[1.1] tracking-[-0.015em]">
                          {layer.title}
                        </span>
                        <span className="ml-auto flex flex-wrap items-center justify-end gap-2">
                          <span className={`${MONO} text-ink-soft text-right tracking-[0.14em]`}>
                            {layer.tag}
                          </span>
                          {i === HOME_PLATFORM_DEMO.comingSoon && <ComingSoonTag />}
                        </span>
                      </div>
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ${
                          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="text-ink-body m-0 pt-3 pl-[38px] text-base leading-[1.7]">
                            {layer.body}
                          </p>
                        </div>
                      </div>
                      <div aria-hidden className="absolute right-0 -bottom-px left-0 h-0.5">
                        <div
                          className="bg-primary h-0.5 rounded-sm"
                          style={{ width: `${on && wide ? (fraction * 100).toFixed(1) : 0}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-rule min-w-0 overflow-hidden rounded-2xl border bg-white shadow-[0_40px_100px_rgba(7,59,104,0.12)]">
                <WindowBar url={HOME_PLATFORM_DEMO.urls[active]} tag="Illustrative" />
                <div className="mid:h-[500px] mid:overflow-hidden box-border p-[clamp(18px,2.2vw,28px)]">
                  <Screen i={active} />
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="mid:block hidden h-[150vh]" />
        </div>
      </div>
    </section>
  );
}

/** The sample case as each layer sees it. */
function Screen({ i }: { i: number }) {
  if (i === 0) return <CaptureScreen />;
  if (i === 1) return <DecideScreen />;
  if (i === 2) return <ConnectScreen />;
  return <AnalyseScreen />;
}

/** Capture: dictated fields awaiting approval, extracted HPO terms, a lab report read in. */
function CaptureScreen() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
        <div className={`${CARD} gap-2`}>
          <div className="flex items-start justify-between gap-2">
            <span className={`${MONO} text-primary`}>Ambient dictation</span>
            <span className="font-mono-label bg-teal-tint text-teal-deep flex-none rounded-md px-2 py-1 text-[10px] tracking-[0.1em] uppercase">
              Approve
            </span>
          </div>
          <p className="text-ink-soft m-0 text-[13px] leading-[1.5] italic">
            {DICTATION.transcript[0].who}: “{DICTATION.transcript[0].line}”
          </p>
          {DICTATION.proposed.map((f) => (
            <div key={f.section} className="flex flex-col gap-0.5 border-t border-[#F1F3F5] pt-2">
              <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.12em] uppercase">
                {f.section}
              </span>
              <span className="truncate text-[13.5px]">{f.value}</span>
            </div>
          ))}
        </div>
        <div className={`${CARD} gap-2.5 bg-[#FAFBFC]`}>
          <span className={`${MONO} text-primary`}>Extracted HPO terms</span>
          <div className="flex flex-wrap gap-1.5">
            {CASE_HPO.map((h) => (
              <span
                key={h.code}
                className="bg-primary-tint text-primary-deep rounded-lg border border-[#D3E2EF] px-2.5 py-[5px] text-[13px]"
              >
                {h.name}{" "}
                <span className="font-mono-label text-ink-soft text-[10.5px]">{h.code}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={`${CARD} gap-1`}>
        <div className="flex flex-wrap justify-between gap-2 pb-2">
          <span className={`${MONO} text-primary`}>Smart investigation extract</span>
          <span className="font-mono-label text-ink-soft text-[11px]">
            {LAB_EXTRACT.test} · {LAB_EXTRACT.date}
          </span>
        </div>
        {LAB_EXTRACT.rows.slice(1, 4).map((r) => (
          <div
            key={r.field}
            className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2.5 border-t border-[#F1F3F5] py-1.5 text-[13.5px]"
          >
            <span className="text-ink-soft truncate">{r.field}</span>
            <span className={`font-medium ${r.high ? "text-[#B4432F]" : ""}`}>
              {r.value} {r.unit}
            </span>
            <span className="font-mono-label text-ink-soft text-right text-[11px]">{r.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Decide: the RAPID ranking, what drives the leader, and the diseases picked to compare. */
function DecideScreen() {
  const top = RAPID_RANKED.slice(0, 4);
  const best = PHENOTYPE_ANALYTICS.observed[0].score;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
        <div className={`${CARD} gap-1`}>
          <div className="flex justify-between gap-2 pb-2">
            <span className={`${MONO} text-primary`}>Ranked list · RAPID Score</span>
            <span className="font-mono-label text-ink-soft text-[11px]">
              {top.length} of {RAPID_TOTAL}
            </span>
          </div>
          {top.map((d, j) => (
            <div
              key={d.id}
              className={`flex items-center gap-3 rounded-lg px-2 py-2 ${j === 0 ? "bg-primary-tint" : ""}`}
            >
              <span className="font-mono-label text-ink-soft w-4 flex-none text-[11px]">
                {d.rank}
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[14px] font-medium">{d.name}</span>
                <span className="font-mono-label text-ink-soft text-[10.5px]">{d.id}</span>
              </div>
              <span className="font-mono-label text-primary flex-none text-[13px]">
                {d.score.toFixed(3)}
              </span>
            </div>
          ))}
        </div>
        <div className={`${CARD} gap-2 bg-[#FAFBFC]`}>
          <span className={`${MONO} text-ink-soft`}>
            Phenotype analytics · {PHENOTYPE_ANALYTICS.disease}
          </span>
          {PHENOTYPE_ANALYTICS.observed.map((p) => (
            <div key={p.term} className="flex flex-col gap-1">
              <div className="flex justify-between gap-2 text-[13px]">
                <span className="truncate">{p.term}</span>
                <span className="font-mono-label text-ink-soft text-[11px]">
                  {p.score.toFixed(2)}
                </span>
              </div>
              <span className="block h-1 overflow-hidden rounded-sm bg-[#EDF0F2]">
                <span
                  className="bg-primary block h-full rounded-sm"
                  style={{ width: `${(p.score / best) * 100}%` }}
                />
              </span>
            </div>
          ))}
          <span className={`${MONO} text-teal-deep pt-2`}>Not yet observed · check next</span>
          <div className="flex flex-wrap gap-1.5">
            {PHENOTYPE_ANALYTICS.unobserved.slice(0, 3).map((p) => (
              <span
                key={p.term}
                className="bg-teal-tint text-teal-deep rounded-md px-2 py-1 text-[12px]"
              >
                {p.term}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={`${CARD} flex-row flex-wrap items-center gap-2 py-3`}>
        <span className={`${MONO} text-ink-soft mr-1`}>Compare</span>
        {DISEASE_COMPARE.diseases.map((d) => (
          <span
            key={d.id}
            className="rounded-md border border-[#D3E2EF] bg-white px-2 py-1 text-[12px]"
          >
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Where the sample order is in its LIMS status chain: the step being worked on now. */
const ORDER_AT = 4;

/** Connect: a test ordered from the case, tracked in the lab's LIMS, and the visits around it. */
function ConnectScreen() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2.5">
        <span className="font-headline text-2xl">
          {CASE.id} · {LIMS_ORDER.orderId}
        </span>
        <span className="font-mono-label text-ink-soft text-[11px] tracking-[0.14em] uppercase">
          Sent to the laboratory LIMS
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[LIMS_ORDER.department, LIMS_ORDER.test, LIMS_ORDER.sample, LIMS_ORDER.priority].map(
          (v) => (
            <span
              key={v}
              className="bg-primary-tint text-primary-deep rounded-md px-2.5 py-1 text-[12.5px]"
            >
              {v}
            </span>
          ),
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,92px),1fr))] gap-3">
        {LIMS_ORDER.statuses.map((label, j) => (
          <div
            key={label}
            className="relative flex flex-col gap-2 border-t-2 border-[#D3E2EF] pt-[22px]"
          >
            <span
              aria-hidden
              className={`absolute -top-[7px] left-0 block h-3 w-3 rounded-full border-[3px] ${
                j < ORDER_AT
                  ? "border-teal-mid bg-teal-mid"
                  : j === ORDER_AT
                    ? "border-primary bg-white"
                    : "border-[#D3E2EF] bg-white"
              }`}
            />
            <span
              className={`text-[13px] leading-[1.35] ${
                j === ORDER_AT ? "text-primary font-bold" : j > ORDER_AT ? "text-ink-dim" : ""
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className={`${CARD} gap-0.5`}>
        <span className={`${MONO} text-ink-soft pb-2`}>Follow-up visits</span>
        {FOLLOW_UPS.map((f) => (
          <div key={f.date} className="flex gap-4 border-t border-[#F1F3F5] py-2.5 text-sm">
            <span className="font-mono-label text-primary w-[86px] flex-none text-[12px]">
              {f.date}
            </span>
            <span>{f.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Analyse: cohort and registry views — built, not yet live. */
function AnalyseScreen() {
  const content = HOME_PLATFORM_DEMO;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <ComingSoonTag />
        <span className="text-ink-soft text-[13px]">Registry and cohort views, launching soon</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        <div className={`${CARD} gap-4`}>
          <span className={`${MONO} text-primary`}>Cohort · lysosomal storage · by age band</span>
          <div className="border-rule flex h-[200px] items-end gap-3.5 border-b pb-1">
            {content.cohort.map((b, j) => (
              <div
                key={b.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className={`w-full max-w-14 rounded-[6px_6px_2px_2px] ${j === 1 ? "bg-primary" : "bg-[#BCD3E8]"}`}
                  style={{ height: `${b.value}%` }}
                />
                <span className="font-mono-label text-ink-soft text-[11px]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${CARD} gap-1 bg-[#FAFBFC]`}>
          <span className={`${MONO} text-ink-soft pb-2.5`}>Registry completeness · by centre</span>
          {content.centres.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3.5 border-t border-[#EDF0F2] py-3 text-sm"
            >
              <span className="w-[84px] flex-none">{c.name}</span>
              <span className="bg-rule block h-1.5 flex-1 overflow-hidden rounded-[3px]">
                <span
                  className="bg-teal-mid block h-full rounded-[3px]"
                  style={{ width: `${c.value}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
