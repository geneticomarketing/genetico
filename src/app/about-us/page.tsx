"use client";

import CustomersCarousel from "@/components/Customers";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { GrantsTimeline } from "@/components/ScrollSection";
import { LeadershipCarousel } from "@/components/Testimonials";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutUs() {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  const reduce = useReducedMotion();
  const foundations = [
    {
      index: "01",
      title: "The Core Challenge",
      body: "The absence of structured, usable clinical data is the core challenge that holds back diagnosis, treatment, and policy-level action.",
    },
    {
      index: "02",
      title: "The Mission",
      body: "Its mission is to enable clinicians and institutions with the tools required to capture, analyze, and act on complex genetic information.",
    },
    {
      index: "03",
      title: "The Vision",
      body: "Its vision is to build a unified digital infrastructure that supports patient care, research, and public health systems at scale.",
    },
  ];

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
                Building Infrastructure For <span className="text-brand">Clinical Genetics</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-pretty text-black/70 sm:text-base">
                A platform designed to bring structure, intelligence, and continuity to rare disease
                care.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#platform"
                  className="bg-brand hover:bg-brand/70 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors"
                >
                  Explore services
                  <span aria-hidden className="text-lg leading-none">
                    →
                  </span>
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="pointer-events-none relative">
                <StaggerItem>
                  <img src="/race.svg" className="rotate w-196" alt="" />
                </StaggerItem>
                {["Clinical Workflows", "Patient tracking", "AI Decision Support"].map((x, i) => {
                  return (
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 1.8 + (i + 1) / 10,
                      }}
                      key={i.toString()}
                    >
                      <div
                        key={i.toString()}
                        className={`absolute ${i === 0 ? "top-48 left-36" : i === 1 ? "top-10 left-1/2" : "top-48 right-0"} text-brand flex w-fit -translate-x-1/2 items-center justify-center gap-3 border border-zinc-400 bg-white p-3 px-2 text-sm whitespace-nowrap opacity-75 shadow-lg`}
                      >
                        <p>0{i + 1}</p> <div className="text-black">{x}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </StaggerItem>
          </StaggerGroup>

          {/* <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,rgba(1,4,10,0.95))]"
          /> */}
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
                  Our Vision
                </p>
                <span aria-hidden className="h-px w-12 shrink-0 bg-[#b8cce0] sm:w-20 md:w-28" />
              </div>

              <h2 className="mainFont mx-auto mt-8 max-w-4xl text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-[#111111]">
                Genetico was built to solve the foundational problem in rare disease care.
              </h2>
            </Reveal>

            <motion.ul
              className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12"
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
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
          <LeadershipCarousel></LeadershipCarousel>
        </section>
        <section>
          <GrantsTimeline></GrantsTimeline>
        </section>
        <section className="">
          <CustomersCarousel></CustomersCarousel>
        </section>
        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 py-20 sm:px-10 sm:py-24 lg:py-32"
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
            <h2 className="t-heading mx-auto text-balance text-[#121212]">
              Different conversation,
              <br />
              depending on who you are
            </h2>
            <p className="secondaryFont mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8f8f8f] sm:mt-6">
              Take the stress out of UI design with ready-to-use content.
            </p>
            <Link
              href="https://calendly.com/genetico"
              className="bg-brand mt-8 inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b] sm:mt-10"
            >
              Book a Demo
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
