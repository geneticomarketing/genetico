"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";

const CATEGORIES = ["All", "Short Films", "Deep Dives", "Research", "Events", "Blogs"] as const;

const SAMPLE_VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const FEATURED = {
  duration: "28:34",
  tags: "CASE STUDY • AIIMS DELHI • DOCUMENTARY",
  title: "How AIIMS Delhi reduced rare disease diagnosis time from 3 weeks to 4 days",
  poster: "/hero/hero-bg.webp",
  articleHref: "#",
};

export function ResourcesLibrary() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;
    void videoRef.current.play();
  }, [isPlaying]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section id="resources-library" className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-12 shrink-0 bg-[#b8cce0] sm:w-20 md:w-28" />
            <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
              Three-Tier Model
            </p>
            <span aria-hidden className="h-px w-12 shrink-0 bg-[#b8cce0] sm:w-20 md:w-28" />
          </div>

          <h2 className="t-heading mx-auto mt-8 text-black">How It Works</h2>

          <p className="secondaryFont mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#8f8f8f] sm:mt-6 sm:text-base">
            Genetico operates across all three levels of India&apos;s healthcare system — connecting
            frontline workers to national policy data through a single platform.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-4 sm:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full [scrollbar-width:none] overflow-x-auto lg:w-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-1 rounded-md bg-[#eef1f5] p-1.5">
              {CATEGORIES.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-md px-4 py-2 text-[13px] font-medium transition-colors sm:px-5 sm:text-sm ${
                      isActive
                        ? "bg-brand text-white shadow-[0_4px_14px_rgba(2,67,133,0.28)]"
                        : "text-[#6e6e73] hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="relative w-full shrink-0 lg:max-w-[280px]">
            <span className="sr-only">Search library</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search library..."
              className="secondaryFont focus:border-brand/40 w-full rounded-md border border-[#e2e5e9] bg-white px-5 py-2.5 text-sm text-black placeholder:text-[#b8bcc4] placeholder:italic focus:outline-none"
            />
          </label>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.08}>
          <article className="relative min-h-[420px] overflow-hidden rounded-[10px] bg-black sm:min-h-[480px] lg:min-h-[520px]">
            {!isPlaying && (
              <Image
                src={FEATURED.poster}
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized
                className="object-cover object-center"
              />
            )}

            <video
              ref={videoRef}
              src={SAMPLE_VIDEO_SRC}
              poster={FEATURED.poster}
              controls={isPlaying}
              playsInline
              onEnded={handleVideoEnd}
              className={`absolute inset-0 h-full w-full object-cover ${
                isPlaying ? "z-10" : "pointer-events-none opacity-0"
              }`}
            >
              <track kind="captions" />
            </video>

            {!isPlaying && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.82)_100%)]"
                />

                <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                  <span className="inline-flex items-center gap-2 rounded-md bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm sm:px-3.5 sm:text-xs">
                    <span aria-hidden className="size-2 rounded-md bg-[#34d399]" />
                    Now Showing
                  </span>
                </div>

                <span className="absolute top-5 right-5 rounded-md bg-black/55 px-2.5 py-1 text-sm font-medium text-white sm:top-6 sm:right-6">
                  {FEATURED.duration}
                </span>

                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play featured video"
                  className="text-brand absolute top-1/2 left-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:size-20"
                >
                  <Play className="ml-1 size-7 fill-current sm:size-8" strokeWidth={0} />
                </button>

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7 lg:p-8">
                  <div className="max-w-3xl">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase sm:text-xs">
                      {FEATURED.tags}
                    </p>
                    <h3 className="secondaryFont mt-3 text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.15] font-semibold text-white">
                      {FEATURED.title}
                    </h3>
                  </div>

                  <div className="flex shrink-0 flex-col items-start sm:items-end">
                    <button
                      type="button"
                      onClick={handlePlay}
                      className="bg-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
                    >
                      <Play className="size-4 fill-current" strokeWidth={0} />
                      Watch Now
                    </button>
                    <a
                      href={FEATURED.articleHref}
                      className="secondaryFont mt-3 inline-flex items-center gap-1 text-sm text-white/85 transition-colors hover:text-white"
                    >
                      Read article
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
