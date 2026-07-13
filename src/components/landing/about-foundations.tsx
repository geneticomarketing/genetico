"use client";

import { Reveal, useInViewAnimation } from "@/components/motion/reveal";
import type { AboutPageData } from "@/lib/cms/types";
import { motion, useReducedMotion } from "motion/react";

export function AboutFoundations({
  vision,
  foundations,
}: {
  vision: AboutPageData["vision"];
  foundations: AboutPageData["foundations"];
}) {
  const reduce = useReducedMotion();
  const { ref: foundationsRef, visible: foundationsVisible } =
    useInViewAnimation<HTMLUListElement>();

  return (
    <section className="mainFont bg-white px-3 py-20 text-[#121212] md:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-4xl text-center" y={56}>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span
              aria-hidden
              className="throbbing-bgH h-1 w-12 shrink-0 rounded-full sm:w-20 md:w-28"
            />
            <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
              {vision.eyebrow}
            </p>
            <span
              aria-hidden
              className="throbbing-bgH h-1 w-12 shrink-0 rounded-full sm:w-20 md:w-28"
            />
          </div>

          <h2 className="mainFont mx-auto mt-8 max-w-4xl text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-[#111111]">
            {vision.heading}
          </h2>
        </Reveal>

        <motion.ul
          ref={foundationsRef}
          className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12"
          initial={reduce ? false : "hidden"}
          animate={foundationsVisible ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
        >
          {foundations.map((item) => (
            <motion.li
              key={item.index}
              className="flex min-w-0"
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 40 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
            >
              <div aria-hidden className="mt-0.5 w-[2px] shrink-0 self-stretch bg-[#b8cce0]" />
              <div className="min-w-0 pl-5 sm:pl-6">
                <span className="t-badge secondaryFont text-[0.68rem] tracking-[0.28em] text-[#a3afc4]">
                  {item.index}
                </span>
                <h3 className="mainFont mt-3 text-[1.15rem] leading-tight text-[#111111] sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="secondaryFont mt-3 text-sm leading-relaxed text-[#8f8f8f] sm:text-[0.98rem]">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
