"use client";

import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";

const SAMPLE_VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

type DeepDive = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
  sourceLabel: string;
  thumbnail: string;
  videoLeft: boolean;
};

const DEEP_DIVES: DeepDive[] = [
  {
    id: "rare-disease-policy",
    category: "EVENT",
    categoryColor: "#d97706",
    title: "National Rare Disease Policy: From Framework to Implementation",
    description:
      "A comprehensive panel session unpacking India's national rare disease policy framework, implementation challenges across states, and the infrastructure required to deliver on its promise.",
    tags: ["Policy", "Infrastructure", "Genetics"],
    duration: "1:12:08",
    sourceLabel: "Global Rare Disease Summit · Geneva",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(180,95,45,0.45) 0%, rgba(48,28,18,0.92) 55%, rgba(18,10,8,1) 100%)",
    videoLeft: true,
  },
  {
    id: "genomic-infrastructure",
    category: "RESEARCH",
    categoryColor: "#059669",
    title: "Building India's Genomic Data Infrastructure for Rare Disease Research",
    description:
      "Leading researchers discuss how structured genomic data, national registries, and cross-institutional collaboration are accelerating rare disease discovery and translational outcomes.",
    tags: ["Research", "Data", "Registry"],
    duration: "58:24",
    sourceLabel: "ICMR National Symposium · New Delhi",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(45,130,95,0.45) 0%, rgba(16,36,28,0.92) 55%, rgba(8,16,12,1) 100%)",
    videoLeft: false,
  },
];

function DeepDiveVideoPanel({
  dive,
  isPlaying,
  onPlay,
  onEnd,
}: {
  dive: DeepDive;
  isPlaying: boolean;
  onPlay: () => void;
  onEnd: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;
    void videoRef.current.play();
  }, [isPlaying]);

  return (
    <div className="relative min-h-[220px] bg-[#0a1018] sm:min-h-[260px] lg:min-h-[320px]">
      {!isPlaying ? (
        <>
          <span
            aria-hidden
            className="absolute inset-0"
            style={{ background: dive.thumbnail }}
          />
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${dive.title}`}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white/25 backdrop-blur-sm sm:size-16">
              <Play className="ml-1 size-6 fill-[#121212] text-[#121212] sm:size-7" strokeWidth={0} />
            </span>
          </button>
          <span className="absolute top-4 right-4 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
            {dive.duration}
          </span>
          <p className="secondaryFont absolute bottom-4 left-4 max-w-[85%] text-xs text-white/70 sm:text-sm">
            {dive.sourceLabel}
          </p>
        </>
      ) : (
        <video
          ref={videoRef}
          src={SAMPLE_VIDEO_SRC}
          controls
          playsInline
          onEnded={onEnd}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      )}
    </div>
  );
}

function DeepDiveContentPanel({
  dive,
  onWatch,
}: {
  dive: DeepDive;
  onWatch: () => void;
}) {
  return (
    <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10">
      <p
        className="secondaryFont flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em]"
        style={{ color: dive.categoryColor }}
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full"
          style={{ backgroundColor: dive.categoryColor }}
        />
        {dive.category}
      </p>

      <h3
        className="mt-4 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.12] tracking-[-0.02em] text-[#121212]"
        style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
      >
        {dive.title}
      </h3>

      <p className="secondaryFont mt-4 text-sm leading-relaxed text-[#6e6e73] sm:text-[15px]">
        {dive.description}
      </p>

      <div className="border-line mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {dive.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#eef4fb] px-2.5 py-1 text-xs font-medium text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onWatch}
          className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
        >
          Watch · {dive.duration}
          <ArrowRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function DeepDiveCard({
  dive,
  isPlaying,
  onPlay,
  onEnd,
}: {
  dive: DeepDive;
  isPlaying: boolean;
  onPlay: () => void;
  onEnd: () => void;
}) {
  const videoPanel = (
    <DeepDiveVideoPanel dive={dive} isPlaying={isPlaying} onPlay={onPlay} onEnd={onEnd} />
  );
  const contentPanel = <DeepDiveContentPanel dive={dive} onWatch={onPlay} />;

  return (
    <article className="border-line overflow-hidden rounded-md border bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div className="grid lg:grid-cols-2">
        {dive.videoLeft ? (
          <>
            {videoPanel}
            {contentPanel}
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{contentPanel}</div>
            <div className="order-1 lg:order-2">{videoPanel}</div>
          </>
        )}
      </div>
    </article>
  );
}

export function ResourcesDeepDives() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="deep-dives" className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden className="bg-brand h-10 w-1 shrink-0 rounded-full sm:h-11" />
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2
                className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
                style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
              >
                Deep Dives
              </h2>
              <span className="secondaryFont text-sm text-[#8f8f8f]">Feature-length sessions</span>
            </div>
          </div>

          <a
            href="#deep-dives"
            className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            See all
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10">
          {DEEP_DIVES.map((dive, index) => (
            <Reveal key={dive.id} delay={index * 0.06}>
              <DeepDiveCard
                dive={dive}
                isPlaying={playingId === dive.id}
                onPlay={() => setPlayingId(dive.id)}
                onEnd={() => setPlayingId(null)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
