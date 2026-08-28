"use client";

import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { DeepDive, ResourcesPageData } from "@/lib/cms/types";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";

type DeepDiveCardData = {
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

function toCardDive(dive: DeepDive, index: number): DeepDiveCardData {
  const id = youtubeIdFromUrl(dive.youtubeUrl);
  const defaults = DEFAULT_RESOURCES_PAGE.deepDives[index];

  return {
    id,
    category: dive.category,
    categoryColor: dive.categoryColor ?? defaults?.categoryColor ?? "#024385",
    title: dive.title,
    description: dive.description,
    tags: dive.tags,
    duration: dive.duration,
    sourceLabel: dive.sourceLabel,
    thumbnail: dive.thumbnailGradient || defaults?.thumbnailGradient || youtubeThumbnailUrl(id),
    videoLeft: dive.videoLeft ?? index % 2 === 0,
  };
}

function DeepDiveVideoPanel({
  dive,
  isPlaying,
  onPlay,
}: {
  dive: DeepDiveCardData;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const isGradient =
    dive.thumbnail.startsWith("radial-gradient") || dive.thumbnail.startsWith("linear-gradient");

  return (
    <div className="relative min-h-[220px] bg-[#0a1018] sm:min-h-[260px] lg:min-h-[320px]">
      {!isPlaying ? (
        <>
          {isGradient ? (
            <span aria-hidden className="absolute inset-0" style={{ background: dive.thumbnail }} />
          ) : (
            <img
              src={dive.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${dive.title}`}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white/25 backdrop-blur-sm sm:size-16">
              <Play
                className="ml-1 size-6 fill-[#121212] text-[#121212] sm:size-7"
                strokeWidth={0}
              />
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
        <YoutubeEmbed
          id={dive.id}
          title={dive.title}
          autoplay
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

function DeepDiveContentPanel({ dive, onWatch }: { dive: DeepDiveCardData; onWatch: () => void }) {
  return (
    <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10">
      <p
        className="t-badge secondaryFont flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em]"
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
              className="text-brand rounded-md bg-[#eef4fb] px-2.5 py-1 text-xs font-medium"
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
}: {
  dive: DeepDiveCardData;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const videoPanel = <DeepDiveVideoPanel dive={dive} isPlaying={isPlaying} onPlay={onPlay} />;
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

export function ResourcesDeepDives({
  deepDivesSection = DEFAULT_RESOURCES_PAGE.deepDivesSection,
  deepDives = DEFAULT_RESOURCES_PAGE.deepDives,
}: {
  deepDivesSection?: ResourcesPageData["deepDivesSection"];
  deepDives?: DeepDive[];
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const items = deepDives.map(toCardDive);

  if (!items.length) return null;

  return (
    <section
      id="deep-dives"
      className="bg-white px-gutter py-section"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden
              className="bg-linear-to-b from-[#024385] to-[#0CF9E8] h-10 w-[4px] shrink-0 rounded-full sm:h-11"
            />
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2
                className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
                style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
              >
                {deepDivesSection.heading}
              </h2>
              {deepDivesSection.subtitle ? (
                <span className="secondaryFont text-sm text-ink-muted">
                  {deepDivesSection.subtitle}
                </span>
              ) : null}
            </div>
          </div>

          {/* <a
            href={deepDivesSection.seeAllHref}
            className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            {deepDivesSection.seeAllLabel}
            <ArrowRight className="size-4" strokeWidth={2} />
          </a> */}
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10">
          {items.map((dive, index) => (
            <Reveal key={dive.id || `${dive.title}-${index}`} delay={index * 0.06}>
              <DeepDiveCard
                dive={dive}
                isPlaying={playingId === dive.id}
                onPlay={() => setPlayingId(dive.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
