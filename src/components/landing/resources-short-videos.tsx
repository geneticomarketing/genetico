"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { ShortVideo } from "@/lib/cms/types";
import type { ExternalArticle } from "@/lib/cms/types";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";
type ShortVideoCardData = {
  id: string;
  url: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
};

function toCardVideo(
  video: ShortVideo & { categoryColor?: string },
  index: number,
): ShortVideoCardData {
  const id = youtubeIdFromUrl(video.youtubeUrl);
  const defaults = DEFAULT_RESOURCES_PAGE.shortVideos[index];
  return {
    id,
    url: video.youtubeUrl,
    category: video.category,
    categoryColor: video.categoryColor ?? defaults?.categoryColor ?? "#024385",
    title: video.title,
    description: video.description,
    duration: video.duration,
    thumbnail: youtubeThumbnailUrl(id),
  };
}
function ShortVideoCard({
  video,
  isPlaying,
  onPlay,
}: {
  video: ShortVideoCardData;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <article className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-[#0a1018]">
        {!isPlaying ? (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 z-10"
          >
            <img
              src={video.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#121212] shadow-lg">
              <Play className="ml-0.5 size-5 fill-current" strokeWidth={0} />
            </span>
            <span className="secondaryFont absolute right-3 bottom-3 rounded-md bg-black/65 px-2 py-1 text-[11px] font-medium text-white">
              {video.duration}
            </span>
          </button>
        ) : (
          <YoutubeEmbed
            id={video.id}
            title={video.title}
            autoplay
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      <p
        className="t-badge secondaryFont mt-3 text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: video.categoryColor }}
      >
        {video.category}
      </p>

      <h3
        className="mt-1.5 text-left text-[1.05rem] leading-[1.2] font-medium tracking-[-0.02em] text-[#121212] sm:text-[1.125rem]"
        style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
      >
        {video.title}
      </h3>

      <p className="secondaryFont mt-2 text-sm leading-relaxed text-[#6e6e73]">
        {video.description}
      </p>
    </article>
  );
}

export function ResourcesShortVideos({
  videos = DEFAULT_RESOURCES_PAGE.shortVideos,
  heading = DEFAULT_RESOURCES_PAGE.sectionHeadings.videos,
}: {
  videos?: (ShortVideo & { categoryColor?: string })[];
  heading?: string;
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const SHORT_VIDEOS = videos.map(toCardVideo);

  return (
    <section id="short-videos" className="bg-white px-gutter py-section">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden
              className="bg-linear-to-b from-[#024385] to-[#0CF9E8] h-10 w-[4px] shrink-0 rounded-full sm:h-11"
            />
            <h2
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              {heading}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.06}>
          <div className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {SHORT_VIDEOS.map((video) => (
              <ShortVideoCard
                key={video.id}
                video={video}
                isPlaying={playingId === video.id}
                onPlay={() => setPlayingId(video.id)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
