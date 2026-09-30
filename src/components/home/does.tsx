"use client";

import { useRef, useState } from "react";

import { HOME_DOES_DEMO, type HomeDoesContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";

import { useMedia, useScrub, WIDE_QUERY } from "./hooks";
import { H2, LEAD, Label, SECTION } from "./label";

const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * 02 — what Genetico does: five areas, and what one structured record
 * produces for each.
 *
 * At 1040px and up the section is scroll-scrubbed: the grid sticks while the
 * page scrolls through a tall spacer, and each fifth of that distance opens
 * one area and lights its output on the record. Clicking an area scrolls to
 * its step. Narrower, clicking simply selects it.
 *
 * `overflow: clip`, never `hidden` — hidden would make the section a scroll
 * container and break the sticky grid inside it.
 */
export function Does({
  section,
  num,
  content,
}: {
  section: SectionMeta;
  num: string;
  content: HomeDoesContent;
}) {
  const demo = HOME_DOES_DEMO;
  const count = content.areas.length;
  const wide = useMedia(WIDE_QUERY);
  const track = useRef<HTMLDivElement | null>(null);
  const { pos, scrubTo } = useScrub(track, count, wide);
  const [picked, setPicked] = useState(0);

  const active = wide ? Math.min(count - 1, Math.floor(pos)) : picked;
  const fraction = pos - Math.floor(pos);

  return (
    <section
      id={section.id}
      className={`${SECTION} relative overflow-clip bg-[radial-gradient(120%_90%_at_100%_0%,#0B3E6C_0%,#062039_50%,#040E1A_100%)] text-white`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,#000,transparent)] bg-[linear-gradient(rgba(143,198,239,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(143,198,239,0.06)_1px,transparent_1px)] bg-[size:64px_64px]"
      />
      <div className="max-w-site relative mx-auto">
        <div data-reveal className="flex max-w-[880px] flex-col gap-6">
          <Label num={num} tone="dark">
            {section.eyebrow}
          </Label>
          <h2 className={`${H2} text-white`}>{content.heading}</h2>
          <p className={`${LEAD} text-sky`}>{content.description}</p>
        </div>

        <div ref={track} className="relative mt-[clamp(56px,7vw,88px)]">
          <div className="mid:sticky mid:top-[clamp(136px,18vh,180px)]">
            <div className="mid:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-12">
              <div className="flex min-w-0 flex-col">
                {content.areas.map((area, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={area.title}
                      type="button"
                      aria-pressed={on}
                      onClick={() => (wide ? scrubTo(i) : setPicked(i))}
                      className={`relative w-full cursor-pointer border-0 border-b border-white/14 px-[22px] py-5 text-left transition-colors duration-300 ${
                        on ? "rounded-xl bg-white/7" : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono-label text-mint text-xs tracking-[0.16em]">
                          {pad(i)}
                        </span>
                        <span
                          className={`font-headline text-[clamp(22px,2.2vw,28px)] leading-[1.12] tracking-[-0.015em] transition-colors duration-300 ${
                            on ? "text-white" : "text-sky-soft"
                          }`}
                        >
                          {area.title}
                        </span>
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows] duration-[400ms] ${
                          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="text-sky m-0 pt-2.5 pl-[38px] text-base leading-[1.7]">
                            {area.body}
                          </p>
                        </div>
                      </div>
                      <div aria-hidden className="absolute right-0 -bottom-px left-0 h-0.5">
                        <div
                          className="bg-teal h-0.5 rounded-sm"
                          style={{ width: `${on && wide ? (fraction * 100).toFixed(1) : 0}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="min-w-0 overflow-hidden rounded-2xl border border-white/12 bg-[rgba(10,32,56,0.72)] shadow-[0_40px_120px_rgba(0,0,0,0.35),0_0_0_1px_rgba(79,179,160,0.08)] backdrop-blur-[8px]">
                <div className="flex h-[42px] items-center gap-3.5 border-b border-white/10 bg-white/5 px-4">
                  <div aria-hidden className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="block h-2.5 w-2.5 rounded-full bg-white/18" />
                    ))}
                  </div>
                  <span className="font-mono-label text-sky-soft mx-auto min-w-0 truncate rounded-[7px] border border-white/10 bg-white/6 px-3.5 py-[5px] text-[11.5px]">
                    {demo.panelUrl}
                  </span>
                  <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.12em] whitespace-nowrap uppercase">
                    Illustrative
                  </span>
                </div>
                <div className="flex flex-col gap-[18px] p-[clamp(18px,2.4vw,30px)]">
                  <div className="text-ink flex flex-wrap items-center gap-x-[18px] gap-y-3 rounded-xl bg-white px-[18px] py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                        {demo.recordLabel}
                      </span>
                      <span className="font-headline text-[22px] tracking-[-0.01em]">GX-2041</span>
                    </div>
                    <div className="ml-auto flex flex-wrap gap-1.5">
                      {demo.recordChips.map((chip) => (
                        <span
                          key={chip.label}
                          className={`font-mono-label rounded-[7px] px-[9px] py-[5px] text-[10.5px] ${
                            "teal" in chip
                              ? "bg-teal-tint text-teal-deep"
                              : "bg-primary-tint text-primary-deep"
                          }`}
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex flex-col gap-2 pl-[26px]">
                    <span
                      aria-hidden
                      className="absolute top-0 bottom-[18px] left-2 w-px bg-[linear-gradient(180deg,#4FB3A0,rgba(79,179,160,0.15))]"
                    />
                    {content.areas.map((area, i) => {
                      const on = i === active;
                      return (
                        <div
                          key={area.title}
                          className={`relative flex items-center gap-3.5 rounded-xl border px-4 py-[13px] transition-[background-color,border-color,transform] duration-[350ms] ${
                            on
                              ? "translate-x-1.5 border-[rgba(79,179,160,0.55)] bg-[rgba(79,179,160,0.12)]"
                              : "border-white/8 bg-white/3"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute top-1/2 -left-[23px] -mt-[5.5px] h-[11px] w-[11px] rounded-full transition-all duration-[350ms] ${
                              on
                                ? "bg-teal shadow-[0_0_0_5px_rgba(79,179,160,0.22)]"
                                : "border-[1.5px] border-[rgba(143,198,239,0.5)] bg-[#0A2038]"
                            }`}
                          />
                          <div className="flex min-w-0 flex-col gap-[3px]">
                            <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.14em] uppercase">
                              {area.title}
                            </span>
                            <span className="text-[15px] font-medium text-white">
                              {area.output}
                            </span>
                          </div>
                          <span
                            className={`font-mono-label nav:inline ml-auto hidden flex-none rounded-full px-2.5 py-[5px] text-[10px] tracking-[0.12em] uppercase transition-colors duration-[350ms] ${
                              on ? "bg-teal text-[#04253F]" : "bg-white/6 text-[#8FA3B5]"
                            }`}
                          >
                            {area.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="mid:block hidden h-[170vh]" />
        </div>
      </div>
    </section>
  );
}
