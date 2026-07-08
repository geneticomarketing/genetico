"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { FeaturedVideo } from "@/lib/cms/types";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";

function FeaturedTagLine({ tags }: { tags: string[] }) {
  return (
    <p className="secondaryFont flex flex-wrap items-center gap-x-2 text-[10px] font-semibold tracking-[0.16em] text-white/85 uppercase sm:text-[11px]">
      {tags.map((tag, index) => (
        <span key={tag} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden className="text-white/50">•</span> : null}
          {index === 0 ? (
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          ) : null}
          {tag}
        </span>
      ))}
    </p>
  );
}

export function ResourcesLibrary({
  compactTop = false,
  featuredVideo = DEFAULT_RESOURCES_PAGE.featuredVideo,
}: {
  compactTop?: boolean;
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
      className={`bg-white px-6 sm:px-10 ${
        compactTop ? "pb-16 pt-8 sm:pb-20 lg:pb-24" : "py-20 sm:py-24 lg:py-28"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <article className="relative min-h-[420px] overflow-hidden rounded-[10px] bg-black sm:min-h-[480px] lg:min-h-[520px]">
            {!isPlaying ? (
              <>
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

                <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                  <span className="inline-flex items-center gap-2 rounded-md bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm sm:px-3.5 sm:text-xs">
                    <span aria-hidden className="size-2 rounded-md bg-[#34d399]" />
                    Now Showing
                  </span>
                </div>

                <span className="secondaryFont absolute top-5 right-5 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white sm:top-6 sm:right-6">
                  {video.duration}
                </span>

                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label={`Play ${video.title}`}
                  className="text-brand absolute top-1/2 left-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:size-20"
                >
                  <Play className="ml-1 size-7 fill-current sm:size-8" strokeWidth={0} />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
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
              </>
            ) : (
              <YoutubeEmbed
                id={video.id}
                title={video.title}
                autoplay
                className="absolute inset-0 h-full w-full"
              />
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
