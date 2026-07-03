"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/motion/reveal";
import { useScrollMappedValue } from "@/lib/motion/scroll-value";

// Body copy as segments; `hl` marks keyword phrases highlighted in light blue (footer gradient tone).
// Each segment is split into words so they can light up one-by-one on scroll.
const PARAGRAPHS: { text: string; hl?: boolean }[][] = [
  [
    { text: "Genetico is building the" },
    { text: "digital backbone", hl: true },
    { text: "for the" },
    { text: "rare and genetic disease ecosystem", hl: true },
    { text: "." },
  ],
  [
    {
      text: "For over seven years, we have worked with clinicians, institutions, government programs, and researchers to solve",
    },
    { text: "fragmented rare disease data", hl: true },
    { text: "." },
  ],
  [
    { text: "Our" },
    { text: "AI platform", hl: true },
    {
      text: "unifies workflows, registries, decision support, analytics, and research into",
    },
    { text: "one ecosystem", hl: true },
    {
      text: ", turning fragmented data into",
    },
    { text: "actionable intelligence", hl: true },
    {
      text: "that improves care, accelerates research, strengthens public health, and supports better decisions.",
    },
  ],
];

// Flatten to a single ordered word list. Every word reveals in reading order —
// left-to-right, line after line — as the block scrolls through the viewport.
type Word = { text: string; hl: boolean; pIndex: number; leadingSpace: boolean };
const WORDS: Word[] = PARAGRAPHS.flatMap((segments, pIndex) =>
  segments.flatMap((seg) => {
    // A segment that starts with punctuation (e.g. ", Genetico…") should hug the
    // previous word, so its first token carries no leading space.
    const startsTight = /^[,.;:]/.test(seg.text);
    return seg.text
      .trim()
      .split(/\s+/)
      .map((text, i) => ({
        text,
        hl: Boolean(seg.hl),
        pIndex,
        leadingSpace: !(i === 0 && startsTight),
      }));
  }),
);

const WORD_COUNT = WORDS.length;

function ScrollWord({
  word,
  range,
  progress,
}: {
  word: Word;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useScrollMappedValue(progress, range, [0.15, 1]);
  return (
    <>
      {word.leadingSpace ? " " : ""}
      <motion.span
        style={{ opacity }}
        className={word.hl ? "font-semibold text-[#DDEEFF]" : "text-[#ffffff90]"}
      >
        {word.text}
      </motion.span>
    </>
  );
}

export function FoundationalPlatform() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Drive the word reveal off this block's position: empty when it enters from the
  // bottom, fully lit once it reaches the upper-middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.75"],
  });

  // Each word lights up over a window a few words wide, so the reading reveal flows smoothly.
  const window = 4 / WORD_COUNT;
  // Spread the reveals across [0, REVEAL_END] so the LAST word finishes before scroll
  // progress runs out — otherwise the per-word window overshoots 1 and the tail stays dim.
  const REVEAL_END = 0.92;
  const span = REVEAL_END - window;

  return (
    <section id="platform" className="bg-[#010207] px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mx-auto w-full max-w-4xl text-center">
        <p className="text-sm font-medium tracking-[0.08em] text-white/45">Who We Are</p>
      </Reveal>

      <Reveal>
        <div
          ref={ref}
          className="mx-auto mt-12 w-full max-w-4xl space-y-6 text-center text-xl leading-relaxed text-white/85 sm:text-2xl sm:leading-relaxed"
        >
          {PARAGRAPHS.map((_, pIndex) => (
            <p key={pIndex}>
              {WORDS.map((word, i) =>
                word.pIndex !== pIndex ? null : reduce ? (
                  <span key={i} className={word.hl ? "font-semibold text-[#DDEEFF]" : ""}>
                    {word.leadingSpace ? " " : ""}
                    {word.text}
                  </span>
                ) : (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[(i / (WORD_COUNT - 1)) * span, (i / (WORD_COUNT - 1)) * span + window]}
                  />
                ),
              )}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
