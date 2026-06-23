"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";

const SAMPLE_VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

type ShortVideo = {
  id: string;
  category: "RESEARCH" | "CASE STUDY" | "PLATFORM";
  title: string;
  duration: string;
  accentColor: string;
  thumbnail: string;
};

const SHORT_VIDEOS: ShortVideo[] = [
  {
    id: "variant-calling",
    category: "RESEARCH",
    title: "AI Variant Calling: A 5-Minute Clinical Walkthrough",
    duration: "4:32",
    accentColor: "#5fd7cb",
    thumbnail:
      "radial-gradient(ellipse 90% 90% at 50% 42%, rgba(47,120,96,0.55) 0%, rgba(12,28,24,0.95) 58%, rgba(6,14,12,1) 100%)",
  },
  {
    id: "patient-journey",
    category: "CASE STUDY",
    title: "Rare Disease Patient Journey: Symptom to Diagnosis",
    duration: "6:18",
    accentColor: "#024385",
    thumbnail:
      "radial-gradient(ellipse 90% 90% at 50% 42%, rgba(36,78,130,0.55) 0%, rgba(10,20,36,0.95) 58%, rgba(4,10,18,1) 100%)",
  },
  {
    id: "platform-demo",
    category: "PLATFORM",
    title: "Genetico Platform Demo: Workflow Integration",
    duration: "8:45",
    accentColor: "#4a9fd4",
    thumbnail:
      "radial-gradient(ellipse 90% 90% at 50% 42%, rgba(52,98,150,0.5) 0%, rgba(12,24,40,0.95) 58%, rgba(5,12,22,1) 100%)",
  },
  {
    id: "icmr-registry",
    category: "RESEARCH",
    title: "ICMR Registry Explained in Under 4 Minutes",
    duration: "3:54",
    accentColor: "#5fd7cb",
    thumbnail:
      "radial-gradient(ellipse 90% 90% at 50% 42%, rgba(40,110,88,0.5) 0%, rgba(11,26,22,0.95) 58%, rgba(5,13,11,1) 100%)",
  },
  {
    id: "hpo-extraction",
    category: "PLATFORM",
    title: "Automated HPO Extraction in Clinical Workflows",
    duration: "5:12",
    accentColor: "#4a9fd4",
    thumbnail:
      "radial-gradient(ellipse 90% 90% at 50% 42%, rgba(48,92,140,0.5) 0%, rgba(11,22,38,0.95) 58%, rgba(4,11,20,1) 100%)",
  },
];

function ShortVideoCard({
  video,
  isPlaying,
  onPlay,
  onEnd,
}: {
  video: ShortVideo;
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
    <article className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-[#0a1018]">
        <span
          aria-hidden
          className="absolute top-0 right-0 left-0 z-20 h-[3px]"
          style={{ backgroundColor: video.accentColor }}
        />

        {!isPlaying ? (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 z-10"
          >
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: video.thumbnail }}
            />
            <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
              {video.duration}
            </span>
          </button>
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

      <p
        className="secondaryFont mt-3 text-[11px] font-semibold tracking-[0.14em]"
        style={{ color: video.accentColor }}
      >
        {video.category}
      </p>
      <h3
        className="mt-2 text-left text-[1.05rem] leading-[1.2] font-medium tracking-[-0.02em] text-[#121212] sm:text-[1.125rem]"
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
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2
                className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
                style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
              >
                Short Videos
              </h2>
              <span className="secondaryFont text-sm text-[#8f8f8f]">Under 10 Mins</span>
            </div>
          </div>

          <a
            href="#short-videos"
            className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            See all
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.06}>
          <div className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {SHORT_VIDEOS.map((video) => (
              <ShortVideoCard
                key={video.id}
                video={video}
                isPlaying={playingId === video.id}
                onPlay={() => setPlayingId(video.id)}
                onEnd={() => setPlayingId(null)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
