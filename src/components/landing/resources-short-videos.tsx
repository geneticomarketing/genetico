"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { youtubeEmbedUrl, youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";

const VIDEO_URLS = [
  "https://youtu.be/nimBOGNS2j8",
  "https://youtu.be/LSIHDd6Zm3Y",
  "https://youtu.be/Sjh1KoRFI1Q",
];

const SHORT_VIDEOS = VIDEO_URLS.map((url, index) => {
  const id = youtubeIdFromUrl(url);
  return {
    id,
    url,
    title: `Genetico Video ${index + 1}`,
    thumbnail: youtubeThumbnailUrl(id),
  };
});

function ShortVideoCard({
  video,
  isPlaying,
  onPlay,
}: {
  video: (typeof SHORT_VIDEOS)[number];
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
          </button>
        ) : (
          <iframe
            src={youtubeEmbedUrl(video.id, true)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      <h3
        className="mt-3 text-left text-[1.05rem] leading-[1.2] font-medium tracking-[-0.02em] text-[#121212] sm:text-[1.125rem]"
        style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
      >
        {video.title}
      </h3>
    </article>
  );
}

export function ResourcesShortVideos() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="short-videos" className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:py-24 lg:pt-0">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden className="bg-brand h-10 w-1 shrink-0 rounded-full sm:h-11" />
            <h2
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              Videos
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
