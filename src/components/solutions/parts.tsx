"use client";

import { useEffect, useState } from "react";

/**
 * The small pieces the Hospital and Life Science pages build their product
 * mock-ups out of: the browser frame, the progress meter, the "Live" pill.
 *
 * They are here rather than in each page because the two designs draw them
 * identically — the pages differ in what goes inside the frame, not in the
 * frame.
 */

/** The blue-to-teal progress fill used in every mock-up. */
export function Meter({ percent, height = 6 }: { percent: number; height?: number }) {
  return (
    <div
      className="bg-[#EDF0F2] overflow-hidden rounded-full"
      style={{ height }}
      role="presentation"
    >
      <div
        className="bg-meter rounded-full transition-[width] duration-500"
        style={{ height, width: `${percent}%` }}
      />
    </div>
  );
}

/** The green "Live" chip, with a ring pulsing out of its dot. */
export function LivePill() {
  return (
    <span className="font-mono-label flex items-center gap-[7px] rounded-full bg-teal-tint px-2.5 py-[5px] text-[10px] tracking-[0.16em] text-teal-deep uppercase">
      <span aria-hidden className="relative block h-1.5 w-1.5">
        <span className="absolute inset-0 block rounded-full bg-teal-mid" />
        <span className="absolute inset-0 block rounded-full bg-teal-mid opacity-0 motion-safe:animate-[live-dot_2.4s_ease-out_infinite]" />
      </span>
      Live
    </span>
  );
}

/**
 * A mock-up of the product, in a browser frame.
 *
 * Hovering lifts it and slides a caption over its bottom edge — the caption
 * says what the picture is arguing, which the picture alone cannot.
 *
 * Hidden from assistive tech by default: every mock-up restates a point the
 * prose beside it already makes, and reading out a screenshot's worth of
 * invented clinical values would be noise at best and misleading at worst.
 * Two of them have controls that actually do something, and those pass
 * `interactive` — hiding a panel that contains focusable buttons would strand
 * a keyboard user inside something a screen reader says is not there.
 */
export function Panel({
  title,
  caption,
  interactive = false,
  children,
}: {
  /** Sits in the frame's title bar. */
  title: string;
  caption: string;
  /** Set when the panel contains controls a reader can use. */
  interactive?: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      aria-hidden={interactive ? undefined : true}
      role={interactive ? "group" : undefined}
      aria-label={interactive ? title : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border-rule rounded-card relative min-w-0 overflow-hidden border bg-white transition-[transform,box-shadow] duration-[350ms] ${
        hovered
          ? "motion-safe:-translate-y-1 shadow-[0_26px_60px_rgba(7,59,104,0.16)]"
          : "shadow-[0_18px_44px_rgba(7,59,104,0.08)]"
      }`}
    >
      <div className="bg-sheet-soft flex items-center gap-2.5 border-b border-[#EDF0F2] px-4 py-3">
        <span className="block h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#28C840]" />
        <span aria-hidden className="text-ink-soft mx-auto text-[13px]">
          {title}
        </span>
      </div>

      {children}

      <span
        aria-hidden
        className={`pointer-events-none absolute right-0 bottom-0 left-0 bg-[rgba(7,18,28,0.86)] px-[18px] py-3 text-[13px] text-white transition-[opacity,transform] duration-300 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {caption}
      </span>
    </div>
  );
}

/** The label-and-rule that opens a block inside a mock-up. */
export function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
      {children}
    </span>
  );
}

/** A bordered list inside a mock-up, with a labelled header strip. */
export function PanelTable({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-rule overflow-hidden rounded-[10px] border">
      <div className="border-rule border-b bg-[#F4F6F8] px-3.5 py-[11px]">
        <PanelLabel>{label}</PanelLabel>
      </div>
      {children}
    </div>
  );
}

/** One row of a `PanelTable`: a muted label and a value against the edge. */
export function PanelRow({
  label,
  value,
  mono = true,
  last = false,
  dimmed = false,
  good = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
  /** Rows that have not "arrived" yet in the extraction animation. */
  dimmed?: boolean;
  good?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-3.5 py-3 transition-[opacity,transform] duration-[400ms] ${
        last ? "" : "border-b border-[#EDF0F2]"
      } ${dimmed ? "translate-y-1 opacity-[0.18]" : "translate-y-0 opacity-100"}`}
    >
      <span className="text-ink-soft flex-none text-[13px]">{label}</span>
      <span
        className={`text-right text-[12.5px] ${mono ? "font-mono-label" : "font-bold"} ${
          good ? "text-teal-deep" : "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * A counter that ticks up and starts over.
 *
 * The hero's cohort card claims to be live, so it has to move. It holds still
 * when motion is reduced: the number is decoration, and a figure changing
 * under a reader who asked for stillness is worse than a static one.
 */
export function useTicker(from: number, to: number, everyMs: number) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setValue((current) => (current >= to ? from : current + 1));
    }, everyMs);

    return () => clearInterval(id);
  }, [from, to, everyMs]);

  return value;
}

/**
 * A step that advances on a timer and stops at `steps`, then starts over.
 *
 * Drives the document-extraction mock-up: the bar fills, rows arrive one at a
 * time, then it holds a moment before repeating. Returns the last step
 * straight away when motion is reduced, so the panel shows its finished state
 * rather than a half-filled one.
 */
export function useCycle(steps: number, everyMs: number, hold = 2) {
  const [step, setStep] = useState(steps);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setStep((current) => (current >= steps + hold ? 0 : current + 1));
    }, everyMs);

    return () => clearInterval(id);
  }, [steps, everyMs, hold]);

  return Math.min(step, steps);
}
