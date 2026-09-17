"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ANTHROPOMETRY,
  CLINICAL_NOTE,
  DEMO_STAGES,
  DEMO_TIMINGS_MS,
  HPO_TERMS,
  RAPID_CANDIDATES,
  Z_SCORE_FLAG,
} from "@/content/home-clinical-sample";

/** Intrinsic size of the collage; it is scaled from here, never re-laid out. */
const COLLAGE_W = 560;
const COLLAGE_H = 640;
const MIN_SCALE = 0.62;
/** Vertical room the header and hero padding claim before the collage starts. */
const VERTICAL_CHROME = 190;

const CARD_BASE =
  "border-rule flex min-w-0 flex-col gap-2.5 rounded-[12px] border bg-white px-[15px] pt-3.5 pb-[13px] " +
  "shadow-[0_14px_34px_rgba(7,59,104,0.08)] nav:shadow-[0_22px_48px_rgba(7,59,104,0.16)]";

/** Cards flow in a column on narrow screens and are placed absolutely above it. */
const CARD_PLACEMENT = {
  hpo: "nav:absolute nav:top-0 nav:left-0 nav:z-[3] nav:w-[300px] motion-safe:nav:animate-[card-in-tl_.62s_cubic-bezier(.22,.61,.36,1)_both]",
  anthro:
    "nav:absolute nav:top-[18px] nav:left-[344px] nav:z-[4] nav:w-[216px] motion-safe:nav:animate-[card-in-tr_.62s_cubic-bezier(.22,.61,.36,1)_both]",
  dx: "nav:absolute nav:top-[410px] nav:left-[296px] nav:z-[5] nav:w-[264px] motion-safe:nav:animate-[card-in-br_.62s_cubic-bezier(.22,.61,.36,1)_both]",
  pedigree:
    "nav:absolute nav:top-[418px] nav:left-0 nav:z-[2] nav:w-[252px] motion-safe:nav:animate-[card-in-bl_.62s_cubic-bezier(.22,.61,.36,1)_both]",
} as const;

const CARD_ENTER = "motion-safe:animate-[chip-in_.5s_cubic-bezier(.22,.61,.36,1)_both]";

/**
 * Where the note panel sits inside the collage.
 *
 * `running` is the design's placement, sized to leave room for the four cards
 * that surround it. Before the demo runs there are no cards, so the panel is
 * wider and centred instead — at the design's size it reads as a small object
 * adrift in an empty column. It eases back as soon as extraction starts, which
 * is what the prototype's otherwise-unused `transition: width` anticipates.
 */
const IDLE_PANEL_PLACEMENT = {
  idle: "nav:top-[190px] nav:left-[42px] nav:h-[228px] nav:w-[476px]",
  running: "nav:top-[164px] nav:left-[112px] nav:h-[262px] nav:w-[336px]",
} as const;

/**
 * The hero's right-hand panel: a free-text clinical note that, on demand,
 * resolves into the structured fields the platform would produce from it.
 *
 * Four stages reveal phenotype, growth, ranked differentials and pedigree.
 * Under reduced motion the demo jumps straight to the finished state — the
 * point of the panel is the structured record, and that is still shown; only
 * the theatre of getting there is dropped.
 *
 * The collage is laid out at a fixed 560×640 and scaled to fit, so the cards
 * keep their exact relationship to each other at any width. Below the `nav`
 * breakpoint the placement classes stop applying and the cards simply stack,
 * or run as a swipe row when `narrowLayout` asks for one.
 */
export function HeroDemoPanel({
  autoRunSection,
  fitToViewport = true,
  narrowLayout = "stack",
  className = "",
}: {
  /**
   * Run the demo once, unprompted, when the section with this id is just past
   * the middle of the viewport. Used where the panel sits below the fold and
   * a reader might otherwise scroll past without pressing the button.
   */
  autoRunSection?: string;
  /**
   * Also shrink the collage to fit the viewport's height. Right for the hero,
   * where it must share the first screen; further down the page it can take
   * its full size.
   */
  fitToViewport?: boolean;
  narrowLayout?: "stack" | "swipe";
  /** Extra classes for the outer box, e.g. to lift its width cap. */
  className?: string;
} = {}) {
  const [stage, setStage] = useState<number>(DEMO_STAGES.idle);
  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    const measure = () => {
      const width = wrapRef.current?.clientWidth ?? COLLAGE_W;
      const fit = Math.min(
        1,
        width / COLLAGE_W,
        fitToViewport ? (window.innerHeight - VERTICAL_CHROME) / COLLAGE_H : 1,
      );
      setScale(Math.max(MIN_SCALE, fit));
    };

    measure();
    window.addEventListener("resize", measure);

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (wrapRef.current) observer?.observe(wrapRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [fitToViewport]);

  const run = useCallback(() => {
    clearTimers();

    if (stage >= DEMO_STAGES.complete) {
      setStage(DEMO_STAGES.idle);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStage(DEMO_STAGES.complete);
      return;
    }

    setStage(DEMO_STAGES.scanning);
    [DEMO_STAGES.phenotype, DEMO_STAGES.anthropometry, DEMO_STAGES.complete].forEach((next, i) => {
      timers.current.push(setTimeout(() => setStage(next), DEMO_TIMINGS_MS[i]));
    });
  }, [clearTimers, stage]);

  // `run` changes with every stage, so the listener reads it through a ref
  // rather than re-subscribing on each one. A reader who has already pressed
  // the button is left alone.
  const autoRunRef = useRef(() => {});
  useEffect(() => {
    autoRunRef.current = () => {
      if (stage === DEMO_STAGES.idle) run();
    };
  }, [run, stage]);

  useEffect(() => {
    if (!autoRunSection) return;

    let frame = 0;
    const check = () => {
      frame = 0;
      const section = document.getElementById(autoRunSection);
      if (!section || section.getBoundingClientRect().top >= window.innerHeight * 0.55) return;
      window.removeEventListener("scroll", onScroll);
      autoRunRef.current();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [autoRunSection]);

  const running = stage > DEMO_STAGES.idle && stage < DEMO_STAGES.complete;
  const done = stage >= DEMO_STAGES.complete;

  return (
    <div
      ref={wrapRef}
      style={{ "--collage-scale": scale } as React.CSSProperties}
      className={`nav:relative nav:h-[calc(640px*var(--collage-scale,1))] max-w-[600px] min-w-0 ${className}`}
    >
      <div
        className={`nav:absolute nav:top-0 nav:left-1/2 nav:block nav:h-[640px] nav:w-[560px] nav:origin-top nav:[transform:translateX(-50%)_scale(var(--collage-scale,1))] flex flex-col gap-[14px] ${
          narrowLayout === "swipe" ? "swipe-row items-start" : ""
        }`}
        style={{ "--swipe-col": "82%" } as React.CSSProperties}
      >
        {/* ── The note, and the control that structures it ─────────────── */}
        <div
          className={`bg-note-panel nav:absolute nav:z-20 nav:overflow-hidden nav:shadow-[0_30px_70px_rgba(4,39,67,0.32)] relative z-[1] flex flex-col gap-3 rounded-[12px] p-[18px] text-white shadow-[0_22px_52px_rgba(7,59,104,0.20)] motion-safe:transition-[width,left,top,height] motion-safe:duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${IDLE_PANEL_PLACEMENT[stage === DEMO_STAGES.idle ? "idle" : "running"]}`}
        >
          <div className="flex items-center justify-between gap-3.5">
            <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.16em] uppercase">
              {done
                ? "IndiGeneUs.AI · structured record"
                : running
                  ? "IndiGeneUs.AI · extracting"
                  : "IndiGeneUs.AI · try it"}
            </span>
            <Image
              src="/brand/indigeneus-mark-white.png"
              alt=""
              width={1065}
              height={1061}
              className="block h-5 w-auto opacity-90"
            />
          </div>

          <div className="relative flex flex-col gap-[7px] overflow-hidden rounded-[10px] border border-white/18 bg-white/6 px-[13px] pt-3 pb-[13px]">
            <span className="font-mono-label text-sky-soft text-[10.5px] tracking-[0.16em] uppercase">
              Free-text clinical note
            </span>
            <p className="text-sky m-0 line-clamp-3 text-[12.5px] leading-[1.6]">{CLINICAL_NOTE}</p>
            {stage === DEMO_STAGES.scanning ? (
              <span
                aria-hidden
                className="absolute top-0 right-0 left-0 h-0.5 bg-[linear-gradient(90deg,rgba(143,198,239,0),#8FC6EF,rgba(143,198,239,0))] motion-safe:animate-[scan-line_1s_ease-out_infinite]"
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={run}
              aria-live="polite"
              className={`inline-flex flex-none cursor-pointer items-center gap-2 self-start rounded-full px-[18px] py-2.5 text-[13.5px] font-bold transition-colors ${
                running ? "text-sky bg-white/14" : "bg-teal hover:bg-[#5FC0AD] text-[#04253F]"
              }`}
            >
              {done ? "Run again" : running ? "Extracting…" : "Extract with IndiGeneUs.AI"}
            </button>
            {stage === DEMO_STAGES.idle ? (
              <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.12em] uppercase">
                <span className="nav:hidden">Illustrative interface · sample case</span>
                <span className="nav:inline hidden">Sample case</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* ── Phenotype ─────────────────────────────────────────────────── */}
        {stage >= DEMO_STAGES.phenotype ? (
          <div className={`${CARD_BASE} ${CARD_ENTER} ${CARD_PLACEMENT.hpo}`}>
            <div className="flex items-center justify-between gap-2.5">
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                Phenotype · HPO
              </span>
              <span className="font-mono-label text-ink-soft text-[10.5px]">
                {HPO_TERMS.length} terms
              </span>
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {HPO_TERMS.map((hpo, i) => (
                <span
                  key={hpo.code}
                  aria-label={hpo.term}
                  className="font-mono-label bg-teal-tint text-ink rounded-full border border-[#D2E6E0] px-2 py-1 text-[11px] leading-[1.3] tracking-[0.04em] motion-safe:animate-[chip-in_.4s_cubic-bezier(.22,.61,.36,1)_both]"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {hpo.code}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── Growth ────────────────────────────────────────────────────── */}
        {stage >= DEMO_STAGES.anthropometry ? (
          <div className={`${CARD_BASE} ${CARD_ENTER} ${CARD_PLACEMENT.anthro}`}>
            <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
              Anthropometry · z
            </span>
            <div className="flex flex-col gap-2">
              {ANTHROPOMETRY.map((row) => {
                const flagged = parseFloat(row.z) <= Z_SCORE_FLAG;
                return (
                  <div key={row.label} className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.1em] uppercase">
                        {row.label}
                      </span>
                      <span className="text-ink text-[12.5px] font-bold">{row.value}</span>
                    </div>
                    <span className="bg-rule-light block h-[3px] overflow-hidden rounded-sm">
                      <span
                        className={`block h-[3px] origin-left rounded-sm motion-safe:animate-[bar-grow_.6s_cubic-bezier(.22,.61,.36,1)_both] ${
                          flagged ? "bg-[#D9822B]" : "bg-teal"
                        }`}
                        style={{ width: `${row.barPercent}%` }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* ── Ranked differentials, and the pedigree they sit against ───── */}
        {done ? (
          <>
            <div className={`${CARD_BASE} ${CARD_ENTER} ${CARD_PLACEMENT.dx}`}>
              <div className="flex items-center justify-between gap-2.5">
                <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                  CDSS · RAPID
                </span>
                <span className="font-mono-label text-ink-soft text-[10.5px]">
                  {RAPID_CANDIDATES.length}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {RAPID_CANDIDATES.map((candidate, i) => {
                  const top = i === 0;
                  return (
                    <div
                      key={candidate.name}
                      className={`rounded-[10px] border px-[11px] py-[9px] motion-safe:animate-[chip-in_.45s_cubic-bezier(.22,.61,.36,1)_both] ${
                        top ? "border-[#BFE0D8] bg-[#F4FAF8]" : "border-rule-light bg-sheet-soft"
                      }`}
                      style={{ animationDelay: `${i * 90}ms` }}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-ink min-w-0 overflow-hidden text-[12.5px] font-bold text-ellipsis whitespace-nowrap">
                          {candidate.name}
                        </span>
                        <span className="font-mono-label text-primary flex-none text-[11.5px]">
                          {candidate.score.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-rule-light mt-[5px] h-[3px] overflow-hidden rounded-sm">
                        <div
                          className={`h-1 origin-left rounded-sm motion-safe:animate-[bar-grow_.7s_cubic-bezier(.22,.61,.36,1)_both] ${
                            top ? "bg-teal-mid" : "bg-[#9FBDD6]"
                          }`}
                          style={{
                            width: `${candidate.score * 100}%`,
                            animationDelay: `${i * 90 + 120}ms`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${CARD_BASE} ${CARD_ENTER} ${CARD_PLACEMENT.pedigree} border-[#D9EAE4]! bg-[#F6FBF9]!`}
            >
              <div className="flex items-center justify-between gap-2.5">
                <span className="font-mono-label text-teal-deep text-[10.5px] tracking-[0.16em] uppercase">
                  Family pedigree
                </span>
                <span className="font-mono-label text-ink-soft text-[10.5px]">2 gen</span>
              </div>
              <svg
                viewBox="0 0 200 96"
                role="img"
                aria-label="Two-generation pedigree: a consanguineous union with an affected proband"
                className="block h-auto w-full overflow-visible"
              >
                <g fill="none" stroke="#3C434A" strokeWidth="1.4">
                  <rect x="52" y="6" width="18" height="18" />
                  <circle cx="139" cy="15" r="9" />
                  <path d="M70 13 H130 M70 17 H130" />
                  <path d="M100 17 V50 M46 50 H154 M46 50 V62 M100 50 V62 M154 50 V62" />
                  <circle cx="46" cy="71" r="9" />
                  <rect x="91" y="62" width="18" height="18" fill="#0B4C86" stroke="#0B4C86" />
                  <circle cx="154" cy="71" r="9" />
                  <path d="M145 80 L163 62" />
                  <path d="M76 92 L88 81 M88 81 L82 82 M88 81 L87 87" />
                </g>
                <g fontFamily="var(--font-mono-label)" fontSize="8" fill="#9AA6B1">
                  <text x="14" y="18">
                    I
                  </text>
                  <text x="14" y="75">
                    II
                  </text>
                </g>
              </svg>
              <span className="text-ink-body text-xs leading-[1.45]">
                Consanguineous union · affected proband (II-2)
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
