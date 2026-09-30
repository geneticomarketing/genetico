"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import {
  HOME_PLATFORM_DEMO,
  HOME_PLATFORM_HREF,
  SAMPLE_DIFFERENTIALS,
  SAMPLE_HPO,
  type HomePlatformContent,
} from "@/content/home";
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
 * layers are shown.
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
                        <span
                          className={`${MONO} text-ink-soft ml-auto text-right tracking-[0.14em]`}
                        >
                          {layer.tag}
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
  const content = HOME_PLATFORM_DEMO;

  if (i === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4">
        <div className={`${CARD} gap-0.5`}>
          <span className={`${MONO} text-ink-soft pb-2.5`}>Intake · structured fields</span>
          {content.fields.map((f) => (
            <div
              key={f.k}
              className="flex justify-between gap-2.5 border-t border-[#F1F3F5] py-2.5 text-sm"
            >
              <span className="text-ink-soft">{f.k}</span>
              <span className="font-medium">{f.v}</span>
            </div>
          ))}
        </div>
        <div className={`${CARD} gap-2.5 bg-[#FAFBFC]`}>
          <span className={`${MONO} text-primary`}>Phenotype · HPO</span>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_HPO.map((h) => (
              <span
                key={h.code}
                className="bg-primary-tint text-primary-deep rounded-lg border border-[#D3E2EF] px-[11px] py-[7px] text-[13px]"
              >
                {h.name}{" "}
                <span className="font-mono-label text-ink-soft text-[10.5px]">{h.code}</span>
              </span>
            ))}
          </div>
        </div>
        <div className={`${CARD} gap-3.5`}>
          <span className={`${MONO} text-ink-soft`}>Growth · z-score</span>
          {content.growth.map((g) => (
            <div key={g.label} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-ink-soft">
                  {g.label} · {g.value}
                </span>
                <span className="font-mono-label text-[#B4432F]">{g.z}</span>
              </div>
              <span className="block h-[5px] overflow-hidden rounded-[3px] bg-[#EDF0F2]">
                <span
                  className="bg-primary block h-full rounded-[3px]"
                  style={{ width: `${g.width}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (i === 1) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
        <div className={`${CARD} gap-3.5`}>
          <span className={`${MONO} text-primary`}>Ranked differentials · RAPID</span>
          {SAMPLE_DIFFERENTIALS.map((d, j) => (
            <div
              key={d.name}
              className={`flex flex-col gap-2 rounded-[10px] border p-3.5 ${
                j === 0 ? "bg-primary-tint border-[#BCD3E8]" : "border-[#EDF0F2]"
              }`}
            >
              <div className="flex justify-between gap-2.5">
                <span className="text-[15px] font-bold">{d.name}</span>
                <span className="font-mono-label text-primary text-sm">{d.score.toFixed(2)}</span>
              </div>
              <span className="font-mono-label text-ink-soft text-[11px]">
                {d.gene} · {d.match}
              </span>
              <div className="h-[5px] overflow-hidden rounded-[3px] bg-[#EDF0F2]">
                <div
                  className={`h-full rounded-[3px] ${j === 0 ? "bg-primary" : "bg-[#8FB3D3]"}`}
                  style={{ width: `${d.score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`${CARD} gap-1 bg-[#FAFBFC]`}>
          <span className={`${MONO} text-ink-soft pb-2.5`}>
            Evidence · {SAMPLE_DIFFERENTIALS[0].name}
          </span>
          {SAMPLE_HPO.map((h) => (
            <div
              key={h.code}
              className="flex items-center gap-3 border-t border-[#EDF0F2] py-2.5 text-sm"
            >
              <span
                aria-hidden
                className="bg-teal-tint text-teal-deep flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs"
              >
                ✓
              </span>
              <span>{h.name}</span>
              <span className="font-mono-label text-ink-soft ml-auto text-[11px]">{h.code}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (i === 2) {
    return (
      <div className="flex flex-col gap-[26px] py-2.5">
        <div className="flex flex-wrap justify-between gap-2.5">
          <span className="font-headline text-2xl">GX-2041 · longitudinal record</span>
          <span className="font-mono-label text-ink-soft text-[11px] tracking-[0.14em] uppercase">
            5 events · 4 sources · 0 re-entry
          </span>
        </div>
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,112px),1fr))] gap-[18px]">
          {content.timeline.map((e) => (
            <div
              key={e.m}
              className="relative flex flex-col gap-2 border-t-2 border-[#D3E2EF] pt-[30px]"
            >
              <span
                aria-hidden
                className="border-primary absolute -top-2 left-0 block h-3.5 w-3.5 rounded-full border-[3px] bg-white"
              />
              <span className="font-mono-label text-primary text-xs">{e.m}</span>
              <span className="text-[15.5px] leading-[1.4] font-medium">{e.title}</span>
              <span className="font-mono-label bg-teal-tint text-teal-deep self-start rounded-md px-[9px] py-1 text-[10.5px] tracking-[0.1em] uppercase">
                {e.src}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
      <div className={`${CARD} gap-4`}>
        <span className={`${MONO} text-primary`}>Cohort · MPS spectrum · by age band</span>
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
  );
}
