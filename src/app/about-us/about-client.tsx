"use client";

import { Reveal, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { GrantsTimeline } from "@/components/ScrollSection";
import { LeadershipCarousel } from "@/components/Testimonials";
import { CtaButtons } from "@/components/landing/cta-buttons";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { DEFAULT_HERO_LABELS } from "@/lib/cms/defaults/about";
import type { AboutPageData } from "@/lib/cms/types";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { motion, useReducedMotion, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const LABEL_POSITIONS = DEFAULT_HERO_LABELS;

export function AboutClient({ data }: { data: AboutPageData }) {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useProjectScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  const reduce = useReducedMotion();
  const { ref: foundationsRef, visible: foundationsVisible } =
    useInViewAnimation<HTMLUListElement>();

  const heroLabels = data.hero.labels.map((label, i) => ({
    label,
    position: LABEL_POSITIONS[i]?.position ?? "",
  }));

  return (
    <main ref={pageRef} className="min-h-screen bg-[#050b14] text-white">
      <motion.div
        className="fixed w-full"
        style={{
          scale: heroScale,
          y: heroY,
        }}
      >
        <section className="isolate flex min-h-screen items-center overflow-hidden bg-white">
          <StaggerGroup
            className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-8 lg:py-28"
            stagger={0.4}
            delayChildren={0.08}
          >
            <StaggerItem>
              <h1 className="t-display max-w-4xl text-balance text-black sm:max-w-5xl">
                {data.hero.titleLine1}
                <br />
                For <span className="text-brand">{data.hero.titleHighlight}</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-pretty text-black/70 sm:text-base">
                {data.hero.subtitle}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="relative z-9999999999 mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={data.hero.ctaHref}
                  className="bg-brand hover:bg-brand/70 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors"
                >
                  {data.hero.ctaLabel}
                  <span aria-hidden className="text-lg leading-none">
                    →
                  </span>
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="relative mx-auto mt-10 w-full max-w-[49rem]">
                <img src="/race.svg" className="rotate mx-auto h-auto w-full lg:w-196" alt="" />
                {heroLabels.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + (i + 1) / 10 }}
                    className="hidden lg:block"
                  >
                    <div
                      className={`text-brand pointer-events-none absolute flex w-fit max-w-[11rem] items-center justify-center gap-2.5 border border-zinc-400 bg-white p-3 px-3 text-sm shadow-lg ${item.position}`}
                    >
                      <p className="shrink-0 font-medium">0{i + 1}</p>
                      <div className="text-left text-black">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 lg:hidden">
                  {heroLabels.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 + (i + 1) / 10 }}
                      className="text-brand flex w-full items-center justify-center gap-2 border border-zinc-400 bg-white p-2.5 px-3 text-xs opacity-90 shadow-lg sm:text-sm"
                    >
                      <p className="shrink-0 font-medium">0{i + 1}</p>
                      <div className="text-center text-black">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </section>
      </motion.div>

      <div className="min-h-screen"></div>

      <div className="relative z-999999999">
        <section className="mainFont bg-white px-3 py-20 text-[#121212] md:px-8 lg:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal className="mx-auto max-w-4xl text-center" y={56}>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <span aria-hidden className="h-px w-12 shrink-0 bg-[#b8cce0] sm:w-20 md:w-28" />
                <p className="t-eyebrow secondaryFont shrink-0 text-[0.7rem] tracking-[0.36em] text-[#9ba8be]">
                  {data.vision.eyebrow}
                </p>
                <span aria-hidden className="h-px w-12 shrink-0 bg-[#b8cce0] sm:w-20 md:w-28" />
              </div>

              <h2 className="mainFont mx-auto mt-8 max-w-4xl text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-[#111111]">
                {data.vision.heading}
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
              {data.foundations.map((item) => (
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
                    <span className="secondaryFont text-[0.68rem] tracking-[0.28em] text-[#a3afc4]">
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

        <section>
          <LeadershipCarousel team={data.team} leadership={data.leadership} />
        </section>

        <section>
          <GrantsTimeline section={data.grants} items={data.grantItems} />
        </section>

        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 pt-20 sm:px-10 sm:pt-24 lg:pt-32"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/dna.svg"
              alt=""
              className="absolute top-1/2 right-[-18%] h-[140%] w-auto max-w-none -translate-y-1/2 scale-x-[-1] opacity-90"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,#F4F6F9_35%,transparent_100%)]" />
          </div>

          <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="t-heading mx-auto text-balance text-[#121212]">{data.cta.heading}</h2>
            <p className="secondaryFont mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8f8f8f] sm:mt-6">
              {data.cta.description}
            </p>
            <CtaButtons buttons={data.cta.buttons} className="mt-8 mb-10 sm:mt-10" />
          </Reveal>

          <GetInTouch embedded />
        </section>
      </div>
    </main>
  );
}
