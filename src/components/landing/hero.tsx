"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { EASE } from "@/components/motion/reveal";
import { DEFAULT_HERO_SLIDES } from "@/lib/cms/defaults/home";
import type { HeroSlide } from "@/lib/cms/types";

const STAGGER_S = 0.3;
const ENTRANCE_DURATION = 1.5;
const BG_DURATION = 1;

function heroEntrance(contentIndex: number, reduce: boolean | null) {
  if (reduce) return { initial: false as const };
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: ENTRANCE_DURATION,
      ease: EASE,
      delay: BG_DURATION + (contentIndex - 0.1) * STAGGER_S,
    },
  };
}

function heroBgEntrance(reduce: boolean | null) {
  if (reduce) return { initial: false as const };
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: BG_DURATION, ease: EASE, delay: 0 },
  };
}

const POINTER_STAGGER_S = 0.12;
const POINTER_ENTRANCE_DELAY = BG_DURATION + (4 - 0.1) * STAGGER_S;

const AUTOPLAY_MS = 6000;

export function Hero({ slides = DEFAULT_HERO_SLIDES }: { slides?: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, active]);

  return (
    <section
      id="home"
      className="relative h-dvh overflow-hidden"
      style={{
        background:
          "radial-gradient(75% 65% at 28% 42%, #12325a 0%, #07101f 46%, #03060e 78%, #010207 100%)",
      }}
    >
      {/* Full hero artwork — one image per slide, crossfades with the carousel. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        // {...heroBgEntrance(reduce)}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              unoptimized
              className="object-cover object-top"
            />
          </div>
        ))}
      </motion.div>
      {/* Fade the artwork's lower edge into the navy base so the hero blends seamlessly
          into the "What Do We Do?" section below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_bottom,transparent,#010207)]"
      />

      {/* Prev / next slide controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-8"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-8"
      >
        <ChevronRight size={20} strokeWidth={2} />
      </button>

      {/* Centered stage — locked to one viewport; slides share one grid cell. */}
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col px-6 pt-24 pb-8 text-center sm:pt-28">
        <div className="relative min-h-0 w-full flex-1">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              aria-hidden={i !== active}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-16 transition-opacity duration-700 ease-out ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="flex flex-col">
                <motion.h1
                  {...heroEntrance(1, reduce)}
                  className="t-display mx-auto text-white capitalize"
                >
                  {slide.title}
                </motion.h1>
                <motion.div {...heroEntrance(2, reduce)} className="mt-6 sm:mt-8">
                  <a
                    href={slide.href}
                    className="--backdrop-blur-md inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/50 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
                  >
                    {slide.cta}
                    <ArrowRight size={16} strokeWidth={2} />
                  </a>
                </motion.div>
              </div>

              <motion.p
                {...heroEntrance(3, reduce)}
                className="min-h-36 max-w-xl shrink-0 text-sm leading-relaxed text-white/55 sm:text-base"
              >
                {slide.body}
              </motion.p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex shrink-0 items-center justify-center gap-2.5">
          {slides.map((slide, i) => {
            const entranceDelay = reduce ? 0 : POINTER_ENTRANCE_DELAY + i * POINTER_STAGGER_S;
            return (
              <motion.button
                key={slide.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className="h-1.5 rounded-full"
                initial={reduce ? false : { opacity: 0, y: 40, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  width: i === active ? 32 : 6,
                  backgroundColor: i === active ? "rgb(255,255,255)" : "rgba(255,255,255,0.4)",
                }}
                whileHover={
                  reduce || i === active ? undefined : { backgroundColor: "rgba(255,255,255,0.7)" }
                }
                transition={{
                  opacity: { duration: ENTRANCE_DURATION, ease: EASE, delay: entranceDelay },
                  y: { duration: ENTRANCE_DURATION, ease: EASE, delay: entranceDelay },
                  scale: { duration: ENTRANCE_DURATION, ease: EASE, delay: entranceDelay },
                  width: { duration: 0.3, ease: EASE },
                  backgroundColor: { duration: 0.3, ease: EASE },
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
