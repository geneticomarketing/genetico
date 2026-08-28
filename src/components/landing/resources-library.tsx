"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { FeaturedVideo } from "@/lib/cms/types";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";

function FeaturedTagLine({
  tags,
  tone = "onDark",
}: {
  tags: string[];
  tone?: "onDark" | "onLight";
}) {
  const isLight = tone === "onLight";

  return (
    <p
      className={`t-badge secondaryFont flex flex-wrap items-center gap-x-2 text-[10px] font-semibold tracking-[0.16em] uppercase sm:text-[11px] ${
        isLight ? "text-black/55" : "text-white/85"
      }`}
    >
      {tags.map((tag, index) => (
        <span key={tag} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden className={isLight ? "text-black/25" : "text-white/50"}>
              •
            </span>
          ) : null}
          {index === 0 ? <span aria-hidden className="bg-brand size-1.5 rounded-full" /> : null}
          {tag}
        </span>
      ))}
    </p>
  );
}

export function ResourcesLibrary({
  featuredVideo = DEFAULT_RESOURCES_PAGE.featuredVideo,
}: {
  featuredVideo?: FeaturedVideo;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = youtubeIdFromUrl(featuredVideo.youtubeUrl);
  const video = {
    id: videoId,
    url: featuredVideo.youtubeUrl,
    tags: featuredVideo.tags,
    title: featuredVideo.title,
    description: featuredVideo.description,
    duration: featuredVideo.duration,
    articleHref: featuredVideo.articleLink,
  };

  return (
    <section
      id="resources-library"
      className="bg-white px-gutter py-section"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <article className="overflow-hidden rounded-[10px] border border-black/[0.08] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:relative md:min-h-[480px] md:border-0 md:bg-black md:shadow-none lg:min-h-[520px]">
            {!isPlaying ? (
              <>
                {/* Mobile: stacked thumbnail → content → type */}
                <div className="flex flex-col md:hidden">
                  <div className="relative aspect-video w-full bg-[#0a1018]">
                    <Image
                      src={youtubeThumbnailUrl(video.id)}
                      alt=""
                      fill
                      sizes="100vw"
                      unoptimized
                      className="object-cover object-center"
                    />
                    <span className="secondaryFont absolute top-3 right-3 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                      {video.duration}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label={`Play ${video.title}`}
                      className="text-brand absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
                    >
                      <Play className="ml-0.5 size-6 fill-current" strokeWidth={0} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 px-5 pt-5">
                    <span className="t-badge inline-flex w-fit items-center gap-2 rounded-md bg-[#ECEEF1] px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#5A5F66] uppercase">
                      <span aria-hidden className="size-2 rounded-md bg-[#34d399]" />
                      Now Showing
                    </span>
                    <h3
                      className="text-[1.35rem] leading-[1.15] tracking-[-0.02em] text-[#121212]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontVariationSettings: '"SERF" 100',
                      }}
                    >
                      {video.title}
                    </h3>
                    <p className="secondaryFont text-sm leading-relaxed text-black/55">
                      {video.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="bg-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
                      >
                        <Play className="size-4 fill-current" strokeWidth={0} />
                        Watch Now
                      </button>
                      {video.articleHref ? (
                        <a
                          href={video.articleHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="secondaryFont text-brand inline-flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
                        >
                          Read article
                          <ArrowRight className="size-3.5" strokeWidth={2} />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-black/[0.06] px-5 py-4">
                    <FeaturedTagLine tags={video.tags} tone="onLight" />
                  </div>
                </div>

                {/* Desktop / tablet: cinematic overlay */}
                <div className="absolute inset-0 hidden md:block">
                  <Image
                    src={youtubeThumbnailUrl(video.id)}
                    alt=""
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    unoptimized
                    className="object-cover object-center"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.82)_100%)]"
                  />

                  <div className="absolute top-6 left-6">
                    <span className="t-badge inline-flex items-center gap-2 rounded-md bg-black/45 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm">
                      <span aria-hidden className="size-2 rounded-md bg-[#34d399]" />
                      Now Showing
                    </span>
                  </div>

                  <span className="secondaryFont absolute top-6 right-6 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                    {video.duration}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Play ${video.title}`}
                    className="text-brand absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
                  >
                    <Play className="ml-1 size-8 fill-current" strokeWidth={0} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                      <div className="max-w-2xl">
                        <FeaturedTagLine tags={video.tags} />
                        <h3
                          className="mt-3 text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.12] tracking-[-0.02em] text-white"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontVariationSettings: '"SERF" 100',
                          }}
                        >
                          {video.title}
                        </h3>
                        <p className="secondaryFont mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                          {video.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(true)}
                          className="bg-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
                        >
                          <Play className="size-4 fill-current" strokeWidth={0} />
                          Watch Now
                        </button>
                        {video.articleHref ? (
                          <a
                            href={video.articleHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondaryFont inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
                          >
                            Read article
                            <ArrowRight className="size-3.5" strokeWidth={2} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <YoutubeEmbed
                id={video.id}
                title={video.title}
                autoplay
                className="aspect-video h-auto w-full md:absolute md:inset-0 md:aspect-auto md:h-full"
              />
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
