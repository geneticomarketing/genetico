"use client";

import Image from "next/image";
import { useRef } from "react";

import { scrollToSection } from "@/components/chrome/page-sections";
import { HERO_DEMO, SAMPLE_DIFFERENTIALS, SAMPLE_HPO, type HomeHeroContent } from "@/content/home";

import { useClock, useOnScreen, useReducedMotion } from "./hooks";

const FADE_UP = "motion-safe:animate-[fade-up_.85s_ease_both]";
const MONO_CHIP = "font-mono-label rounded-md px-2 py-1 text-[10.5px]";

/* The demo's timeline, in ms from the start of each loop: the note types at
   20ms a character, the phenotype rows follow 300ms after it ends, 260ms
   apart, and the differentials arrive 1.9s after it ends. The loop holds the
   finished state for nine seconds before starting again. */
const TYPE_MS = 20;
const TYPED_AT = HERO_DEMO.note.length * TYPE_MS;
const CHIPS_AT = TYPED_AT + 300;
const CHIP_GAP = 260;
const DX_AT = TYPED_AT + 1900;
const LOOP_MS = TYPED_AT + 9000;

const STATUS = {
  capturing: { label: "Capturing note", className: "bg-[#FFF6E5] text-[#8A5A00]" },
  structuring: { label: "Structuring", className: "bg-primary-tint text-primary" },
  done: { label: "Structured · 3 candidates", className: "bg-teal-tint text-teal-deep" },
};

/**
 * The hero: what Genetico is, over a dark band, then a sample case in
 * IndiGeneUs.AI that fills itself in — the note types, its findings become
 * HPO terms, and ranked differentials follow. The window lies tilted back and
 * flattens as the page scrolls; the header turns solid when it arrives.
 */
export function Hero({ content: hero }: { content: HomeHeroContent }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const onScreen = useOnScreen(ref);
  const clock = useClock(onScreen && !reduced);

  const t = clock % LOOP_MS;
  const typed = reduced
    ? HERO_DEMO.note.length
    : Math.min(HERO_DEMO.note.length, Math.floor(t / TYPE_MS));
  const chips = reduced ? 5 : Math.max(0, Math.min(5, Math.floor((t - CHIPS_AT) / CHIP_GAP) + 1));
  const dxOn = reduced || t > DX_AT;
  const status =
    typed < HERO_DEMO.note.length ? STATUS.capturing : dxOn ? STATUS.done : STATUS.structuring;

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <>
      <section
        id="top"
        ref={ref}
        className="px-edge relative overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#0B3E6C_0%,#062039_46%,#040E1A_100%)] pt-[calc(64px+clamp(56px,8vw,112px))] text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_30%,#000_0%,transparent_100%)] bg-[linear-gradient(rgba(143,198,239,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(143,198,239,0.07)_1px,transparent_1px)] bg-[size:64px_64px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[48%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(79,179,160,0.20),rgba(79,179,160,0))]"
        />

        <div className="relative mx-auto flex max-w-[1040px] flex-col items-center gap-[30px] text-center">
          <h1
            className={`font-headline m-0 text-[clamp(44px,6.6vw,88px)] leading-[1.02] font-normal tracking-[-0.025em] text-balance text-white ${FADE_UP}`}
            style={{ animationDelay: "120ms" }}
          >
            {hero.headline} <span className="text-sky-bright">{hero.headlineAccent}</span>
          </h1>
          <p
            className={`text-sky-soft m-0 max-w-[700px] text-[clamp(16.5px,1.5vw,19px)] leading-[1.75] text-pretty ${FADE_UP}`}
            style={{ animationDelay: "240ms" }}
          >
            {hero.blurb}
          </p>
          <div
            className={`flex flex-wrap justify-center gap-3 ${FADE_UP}`}
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#why"
              onClick={(e) => jump(e, "why")}
              className="text-primary-deep hover:bg-sky hover:text-primary-deep inline-flex items-center gap-2.5 rounded-[10px] bg-white px-7 py-[15px] text-[15px] font-bold transition-colors"
            >
              {hero.primaryCta.label} <span aria-hidden>↓</span>
            </a>
            <a
              href="#platform"
              onClick={(e) => jump(e, "platform")}
              className="hover:border-sky-bright inline-flex items-center gap-2.5 rounded-[10px] border border-white/28 px-7 py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-white/6 hover:text-white"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div
          data-hero-shot
          className="relative mx-auto mt-[clamp(48px,6vw,80px)] max-w-[1160px] [perspective-origin:50%_100%] [perspective:1800px]"
        >
          <div className="mb-4 flex justify-center">
            <span className="font-mono-label text-sky-soft inline-flex items-center gap-2 rounded-full border border-[rgba(143,198,239,0.28)] bg-[rgba(4,14,26,0.4)] px-3 py-1.5 text-[10.5px] tracking-[0.14em] uppercase">
              <span aria-hidden className="bg-teal block h-1.5 w-1.5 rounded-full" />
              {hero.shotLabel}
            </span>
          </div>

          {/* Two findings lifted out of the window, bobbing in front of it. */}
          <div
            aria-hidden
            className="mid:flex text-ink absolute top-[34%] -left-[1%] z-[4] hidden w-[232px] flex-col gap-2.5 rounded-xl bg-white px-4 py-3.5 text-left shadow-[0_34px_80px_rgba(2,10,20,0.5),0_0_0_1px_rgba(255,255,255,0.4)] motion-safe:animate-[float-y_7s_ease-in-out_infinite]"
          >
            <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.14em] uppercase">
              Extracted from note
            </span>
            <div className="flex flex-wrap gap-[5px]">
              {["HP:0001263", "HP:0001250", "HP:0001433"].map((code) => (
                <span key={code} className={`${MONO_CHIP} bg-primary-tint text-primary-deep`}>
                  {code}
                </span>
              ))}
              <span className={`${MONO_CHIP} bg-teal-tint text-teal-deep`}>+2</span>
            </div>
          </div>
          <div
            aria-hidden
            className="mid:flex text-ink absolute top-[56%] -right-[1%] z-[4] hidden w-[224px] flex-col gap-2 rounded-xl bg-white px-4 py-3.5 text-left shadow-[0_34px_80px_rgba(2,10,20,0.5),0_0_0_1px_rgba(255,255,255,0.4)] [animation-delay:-3s] motion-safe:animate-[float-y_8s_ease-in-out_infinite]"
          >
            <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.14em] uppercase">
              Top candidate · RAPID
            </span>
            <div className="flex justify-between gap-2">
              <span className="text-sm font-bold">MPS I · IDUA</span>
              <span className="font-mono-label text-primary text-[13px]">0.92</span>
            </div>
            <span className="block h-1 overflow-hidden rounded-sm bg-[#EDF0F2]">
              <span className="bg-primary block h-full w-[92%] rounded-sm" />
            </span>
          </div>

          <div
            data-flat
            role="img"
            aria-label="Illustrative IndiGeneUs.AI case screen: a free-text consultation note turned into structured HPO terms and ranked differential diagnoses."
            className="text-ink origin-bottom overflow-hidden rounded-t-2xl bg-white text-left shadow-[0_-40px_120px_rgba(79,179,160,0.24),inset_0_1px_0_rgba(255,255,255,0.6),0_0_0_1px_rgba(255,255,255,0.14)] [transform:rotateX(9deg)_scale(.965)]"
          >
            <WindowBar url={HERO_DEMO.url} />
            <div className="nav:grid-cols-[210px_minmax(0,1fr)] grid grid-cols-[minmax(0,1fr)]">
              <aside className="border-rule nav:flex hidden flex-col gap-1 border-r bg-[#FAFBFC] px-3 py-[18px]">
                <span className="font-mono-label text-ink-soft px-2.5 pb-2.5 text-[10.5px] tracking-[0.16em] uppercase">
                  Cases · {HERO_DEMO.cases.length}
                </span>
                {HERO_DEMO.cases.map((c, i) => (
                  <div
                    key={c.id}
                    className={`flex flex-col gap-1 rounded-[9px] border p-2.5 ${
                      i === 0
                        ? "border-[#D3E2EF] bg-white shadow-[0_6px_16px_rgba(7,59,104,0.06)]"
                        : "border-transparent"
                    }`}
                  >
                    <span className="font-mono-label text-ink text-[12.5px] font-medium">
                      {c.id}
                    </span>
                    <span className="text-ink-soft flex items-center gap-1.5 text-xs">
                      <span
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ background: c.dot }}
                      />
                      {c.label}
                    </span>
                  </div>
                ))}
              </aside>

              <div className="flex min-w-0 flex-col gap-4 p-[clamp(16px,2vw,26px)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-[3px]">
                    <span className="font-headline text-2xl tracking-[-0.01em]">
                      {HERO_DEMO.caseId}
                    </span>
                    <span className="text-ink-soft text-[13px]">{HERO_DEMO.patient}</span>
                  </div>
                  <span
                    className={`font-mono-label rounded-full px-[13px] py-[7px] text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="nav:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] grid grid-cols-[minmax(0,1fr)] gap-4">
                  <div className="border-rule flex min-h-[170px] min-w-0 flex-col gap-2.5 rounded-xl border px-[18px] py-4">
                    <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                      Consultation note · free text
                    </span>
                    <p className="text-ink m-0 text-[15px] leading-[1.75]">
                      {HERO_DEMO.note.slice(0, typed)}
                      <span
                        aria-hidden
                        className="bg-primary ml-0.5 inline-block h-[17px] w-0.5 align-[-3px] motion-safe:animate-[caret-blink_1s_steps(1)_infinite]"
                      />
                    </p>
                  </div>
                  <div className="border-rule flex min-w-0 flex-col gap-2.5 rounded-xl border bg-[#FAFBFC] px-[18px] py-4">
                    <div className="flex justify-between gap-2.5">
                      <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                        Phenotype · HPO
                      </span>
                      <span className="font-mono-label text-ink-soft text-[11px]">{chips} / 5</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {SAMPLE_HPO.map((h, i) => (
                        <div
                          key={h.code}
                          className={`flex items-center justify-between gap-2.5 rounded-lg border border-[#D3E2EF] bg-white px-[11px] py-2 transition-[opacity,transform] duration-[350ms] ${
                            i < chips ? "opacity-100" : "translate-y-1.5 opacity-0"
                          }`}
                        >
                          <span className="text-ink min-w-0 truncate text-[13.5px] font-medium">
                            {h.name}
                          </span>
                          <span className="font-mono-label text-primary flex-none text-[11px]">
                            {h.code}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-rule flex flex-col gap-3 rounded-xl border px-[18px] py-4">
                  <div className="flex justify-between gap-2.5">
                    <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                      Decision support · RAPID score
                    </span>
                    <span className="font-mono-label text-ink-soft text-[11px]">
                      Ranked differentials
                    </span>
                  </div>
                  {SAMPLE_DIFFERENTIALS.map((d, i) => (
                    <div
                      key={d.name}
                      className="transition-opacity duration-[400ms]"
                      style={{ opacity: dxOn ? 1 : 0.25, transitionDelay: `${i * 120}ms` }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                        <span className="text-ink text-[14.5px] font-bold">
                          {d.name}
                          <span className="font-mono-label text-ink-soft ml-1.5 text-[11px] font-normal">
                            {d.gene} · {d.match}
                          </span>
                        </span>
                        <span className="font-mono-label text-primary text-[13px]">
                          {d.score.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-sm bg-[#EDF0F2]">
                        <div
                          className={`h-full rounded-sm transition-[width] duration-1000 ease-[cubic-bezier(.22,.61,.36,1)] ${
                            i === 0 ? "bg-primary" : "bg-[#8FB3D3]"
                          }`}
                          style={{
                            width: `${dxOn ? d.score * 100 : 0}%`,
                            transitionDelay: `${i * 150}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-edge border-b border-[#EDF0F2] bg-white py-[26px]">
        <div className="max-w-site mx-auto flex items-center gap-7">
          <span className="font-mono-label text-ink-soft flex-none text-[10.5px] tracking-[0.18em] uppercase">
            {hero.marqueeLabel}
          </span>
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex">
                  {hero.marquee.map(({ name }) => (
                    <span
                      key={name}
                      className="font-mono-label text-ink-body flex flex-none items-center gap-[22px] pr-[22px] text-[11.5px] tracking-[0.14em] whitespace-nowrap uppercase"
                    >
                      {name}
                      <span aria-hidden className="block h-1 w-1 rounded-full bg-[#C6CCD2]" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** A browser window's title bar: three dots, the address, and the IndiGeneUs mark. */
export function WindowBar({ url, tag }: { url: string; tag?: string }) {
  return (
    <div className="border-rule flex h-[42px] items-center gap-3.5 border-b bg-[#F4F6F8] px-4">
      <div aria-hidden className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-2.5 w-2.5 rounded-full bg-[#DDE3E8]" />
        ))}
      </div>
      <span className="border-rule font-mono-label text-ink-soft mx-auto min-w-0 truncate rounded-[7px] border bg-white px-3.5 py-[5px] text-[11.5px]">
        {url}
      </span>
      {tag ? (
        <span className="font-mono-label text-ink-dim text-[10.5px] tracking-[0.12em] whitespace-nowrap uppercase">
          {tag}
        </span>
      ) : (
        <Image
          src="/brand/indigeneus-mark-black.png"
          alt=""
          width={1065}
          height={1061}
          className="block h-[18px] w-[18px] opacity-80"
        />
      )}
    </div>
  );
}
