"use client";

import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/chrome/eyebrow";
import { CHALLENGE_GROUNDS } from "@/content/solution-demos";
import type { SolutionContent } from "@/lib/cms/solution-page-data";

/**
 * The sections the Hospital and Life Science pages share: the challenge
 * carousel, the walkthrough's step pills and rows, and the outcomes band.
 *
 * Only the copy and the pictures differ between the two pages, so the
 * structure lives here once and each page passes its own.
 */

/** The centred eyebrow, heading and standfirst that opens each section. */
function SectionHead({
  num,
  eyebrow,
  heading,
  description,
  width,
  tone = "light",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  description: string;
  /** Max width of the heading, which the handoff varies per section. */
  width: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <>
      {dark ? (
        <div className="flex items-center justify-center gap-[22px]">
          <span
            aria-hidden
            className="block h-px w-[72px] shrink-0 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.55))]"
          />
          <span className="font-mono-label text-center text-[11px] tracking-[0.2em] text-white uppercase">
            {num} · {eyebrow}
          </span>
          <span
            aria-hidden
            className="block h-px w-[72px] shrink-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]"
          />
        </div>
      ) : (
        <Eyebrow>
          {num} · {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={`font-headline mx-auto mt-6 mb-3.5 text-center text-[clamp(32px,4vw,50px)] leading-[1.08] tracking-[-0.02em] text-pretty ${
          dark ? "text-white" : ""
        }`}
        style={{ maxWidth: width }}
      >
        {heading}
      </h2>

      {description ? (
        <p
          className={`m-0 mx-auto max-w-[640px] text-center text-base leading-[1.75] text-pretty ${
            dark ? "text-sky" : "text-ink-body"
          }`}
        >
          {description}
        </p>
      ) : null}
    </>
  );
}

/**
 * The challenge carousel: four dark panels, one open at a time.
 *
 * The open panel takes most of the row and shows its body; the rest stay as
 * titles, which is what makes the set readable at a glance and the open one
 * worth reading. It advances on its own until the reader touches it, and the
 * arrows and dots below are the accessible way through — the panels
 * themselves are buttons too, so either works.
 *
 * Below 1040px only the open panel is drawn: four narrow columns of dark text
 * would be unreadable, and the controls still move between them.
 */
export function Challenge({
  content,
  num,
}: {
  content: SolutionContent["challenge"];
  num: string;
}) {
  const count = content.items.length;
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => setOpen((current) => (current + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (!count) return null;

  return (
    <section
      id="challenge"
      data-reveal
      className="bg-sheet-soft border-rule px-edge scroll-mt-32 border-t border-b py-[clamp(67px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionHead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
          width="820px"
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mid:gap-4 mt-13 flex items-stretch gap-0"
        >
          {content.items.map((item, i) => {
            const isOpen = i === open;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={isOpen}
                style={{ background: CHALLENGE_GROUNDS[i % CHALLENGE_GROUNDS.length] }}
                className={`rounded-card relative min-h-[230px] cursor-pointer overflow-hidden p-7 text-left transition-[flex,opacity] duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] ${
                  isOpen
                    ? "mid:flex-[2.4_1_0] flex-[1_1_100%] opacity-100"
                    : "mid:flex-[1_1_0] mid:block hidden opacity-[0.86]"
                }`}
              >
                <span className="flex h-full flex-col justify-end">
                  <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#8FC6EF] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-headline mt-2.5 block leading-[1.16] tracking-[-0.015em] text-pretty text-white transition-[font-size] duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] ${
                      isOpen ? "text-[clamp(21px,2.4vw,26px)]" : "text-[15px]"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`block max-w-[420px] overflow-hidden text-[14.5px] leading-[1.7] text-pretty text-[#C3D6E6] transition-[opacity,max-height,margin-top] duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
                      isOpen ? "mt-3 max-h-[220px] opacity-100" : "mt-0 max-h-0 opacity-0"
                    }`}
                  >
                    {item.body}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6.5 flex items-center justify-center gap-[18px]">
          <CarouselButton
            label="Previous challenge"
            onClick={() => setOpen((current) => (current + count - 1) % count)}
          >
            ←
          </CarouselButton>
          <div className="flex items-center gap-2">
            {content.items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show challenge ${i + 1}: ${item.title}`}
                aria-current={i === open}
                onClick={() => setOpen(i)}
                className={`h-1 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-300 ${
                  i === open ? "bg-primary w-6.5" : "w-2 bg-[#C3D2DC]"
                }`}
              />
            ))}
          </div>
          <CarouselButton
            label="Next challenge"
            onClick={() => setOpen((current) => (current + 1) % count)}
          >
            →
          </CarouselButton>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="hover:bg-primary-tint text-primary flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#C3D2DC] bg-white text-sm transition-colors"
    >
      {children}
    </button>
  );
}

/**
 * Tracks which walkthrough step is on screen.
 *
 * The step whose row sits in the middle band of the viewport wins, so the
 * pills follow the reader rather than the scroll position of the section.
 */
function useActiveStep(count: number) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      for (let i = 1; i <= count; i++) {
        const el = document.getElementById(`step-${i}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.62 && rect.bottom > window.innerHeight * 0.24) {
          setStep(i);
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  return step;
}

/**
 * The walkthrough: the step pills, then one row per step.
 *
 * Rows alternate sides, and `panels` supplies the picture for each — pinned
 * by position, which is why the CMS warns that adding a step shifts them.
 */
export function Walkthrough({
  content,
  num,
  panels,
}: {
  content: SolutionContent["solution"];
  num: string;
  /** One picture per step, in the same order. */
  panels: React.ReactNode[];
}) {
  const steps = content.steps;
  const active = useActiveStep(steps.length);

  if (!steps.length) return null;

  return (
    <section
      id="solution"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(73px,7.6vw,104px)] pb-[clamp(67px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionHead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
          width="780px"
        />

        <div aria-hidden className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {steps.map((step, i) => (
            <span
              key={step.title}
              className={`font-mono-label flex items-center gap-2 rounded-full px-[13px] py-[7px] text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                active === i + 1
                  ? "bg-primary-tint text-primary-deep font-medium"
                  : "text-ink-soft bg-[#F4F6F8] font-normal"
              }`}
            >
              {String(i + 1).padStart(2, "0")} {step.short}
            </span>
          ))}
        </div>

        {steps.map((step, i) => {
          // Even rows put the words first; odd rows start with the picture.
          const picturesFirst = i % 2 === 1;
          return (
            <div
              key={step.title}
              id={`step-${i + 1}`}
              className={`mid:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] grid grid-cols-[minmax(0,1fr)] items-center gap-x-14 gap-y-10 ${
                i === 0 ? "mt-14" : "mt-26"
              }`}
            >
              <div className={`flex min-w-0 flex-col gap-4 ${picturesFirst ? "mid:order-2" : ""}`}>
                <div className="flex flex-col gap-2">
                  <span className="font-mono-label text-ink-dim text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={`block h-[3px] rounded-sm bg-teal transition-[width,opacity] duration-500 ${
                      active === i + 1 ? "w-14 opacity-100" : "w-[22px] opacity-45"
                    }`}
                  />
                </div>
                <span className="font-mono-label text-ink-soft text-[11px] tracking-[0.2em] uppercase">
                  {step.kicker}
                </span>
                <h3 className="font-headline text-primary m-0 text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.015em] text-pretty">
                  {step.title}
                </h3>
                <p className="text-ink-body m-0 max-w-[480px] text-base leading-[1.75] text-pretty">
                  {step.body}
                </p>
                {step.callout ? (
                  <div className="bg-primary-tint rounded-card mt-1.5 flex items-center gap-3 px-[18px] py-4">
                    <span
                      aria-hidden
                      className="bg-primary flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[13px] text-white"
                    >
                      ✓
                    </span>
                    <span className="text-primary-deep text-[14.5px] font-medium">
                      {step.callout}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className={`min-w-0 ${picturesFirst ? "mid:order-1" : ""}`}>{panels[i]}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** The dark band: one figure per column, with the before and after beneath. */
export function Outcomes({ content, num }: { content: SolutionContent["outcomes"]; num: string }) {
  if (!content.items.length) return null;

  return (
    <section
      id="outcomes"
      data-reveal
      className="bg-dark-band px-edge scroll-mt-32 py-[clamp(67px,7vw,96px)] text-white"
    >
      <div className="max-w-site mx-auto">
        <SectionHead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
          width="760px"
          tone="dark"
        />

        <div className="rounded-card mid:grid-cols-3 mt-14 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden border border-white/20 bg-white/20">
          {content.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3.5 bg-[rgba(4,39,67,0.34)] p-[clamp(26px,3vw,36px)]"
            >
              <span className="font-headline text-[clamp(34px,4.2vw,50px)] leading-none tracking-[-0.02em] text-white">
                {item.figure}
              </span>
              <span className="font-mono-label text-sky-bright text-[11px] tracking-[0.2em] uppercase">
                {item.label}
              </span>
              <div className="flex flex-wrap items-center gap-2.5 text-[14.5px] leading-[1.6]">
                <span className="text-sky-soft line-through">{item.before}</span>
                <span aria-hidden className="text-sky-bright">
                  →
                </span>
                <span className="font-medium text-white">{item.after}</span>
              </div>
              {item.note ? (
                <p className="m-0 mt-1.5 border-t border-white/20 pt-4 text-sm leading-[1.7] text-sky text-pretty">
                  {item.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {content.footnote ? (
          <p className="mx-auto mt-5.5 mb-0 max-w-[760px] text-center text-[13px] leading-[1.7] text-sky-soft">
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
