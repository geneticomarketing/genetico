"use client";

import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { useMemo, useRef } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import { segmentsToWords, splitTextByHighlights } from "@/lib/cms/split-text-highlights";
import type { WhoWeAreParagraph } from "@/lib/cms/types";
import { useScrollMappedValue } from "@/lib/motion/scroll-value";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";

type HighlightWord = ReturnType<typeof segmentsToWords>[number];

function ScrollWord({
  word,
  range,
  progress,
}: {
  word: HighlightWord;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useScrollMappedValue(progress, range, [0.15, 1]);
  return (
    <>
      {word.leadingSpace ? " " : ""}
      <motion.span
        style={{ opacity }}
        className={word.hl ? "font-bold text-brand relative" : "text-brand font-thin"}
      >
        {word.hl && (
          <motion.div
            style={{
              opacity,
            }}
            className="absolute bottom-0 left-0 w-[125%] bg-white h-px"
          ></motion.div>
        )}
        {word.text}
      </motion.span>
    </>
  );
}

export function FoundationalPlatform({
  eyebrow = DEFAULT_HOME_PAGE.whoWeAre.eyebrow,
  paragraphs = DEFAULT_HOME_PAGE.whoWeAre.paragraphs,
}: {
  eyebrow?: string;
  paragraphs?: WhoWeAreParagraph[];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { segmentGroups, words } = useMemo(() => {
    const segmentGroups = paragraphs.map((paragraph) =>
      splitTextByHighlights(paragraph.text, paragraph.highlights),
    );
    const words = segmentGroups.flatMap((segments, pIndex) => segmentsToWords(segments, pIndex));
    return { segmentGroups, words };
  }, [paragraphs]);

  const wordCount = words.length;

  const { scrollYProgress } = useProjectScroll({
    target: ref,
    offset: ["start 0.85", "end 0.75"],
  });

  const window = wordCount > 0 ? 4 / wordCount : 0;
  const REVEAL_END = 0.92;
  const span = REVEAL_END - window;

  return (
    <section id="platform" className="bg-white px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mx-auto w-full max-w-4xl text-center">
        <p className="font-jetbrains-mono text-sm font-medium tracking-[0.08em] text-[#010207]">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal>
        <div
          ref={ref}
          className="mx-auto mt-12 w-full max-w-4xl space-y-6 text-center text-xl leading-relaxed text-white/85 sm:text-2xl"
        >
          {segmentGroups.map((_, pIndex) => (
            <p key={pIndex}>
              {words.map((word, i) =>
                word.pIndex !== pIndex ? null : reduce ? (
                  <span key={i} className={word.hl ? "font-semibold " : ""}>
                    {word.leadingSpace ? " " : ""}
                    {word.text}
                  </span>
                ) : (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[
                      (i / Math.max(wordCount - 1, 1)) * span,
                      (i / Math.max(wordCount - 1, 1)) * span + window,
                    ]}
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
