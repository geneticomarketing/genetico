"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { youtubeEmbedUrl, youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";

const FEATURED_URL = "https://youtu.be/PXUZa_j8ep8";
const FEATURED_ID = youtubeIdFromUrl(FEATURED_URL);

export function ResourcesLibrary() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="resources-library" className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <article className="relative min-h-[420px] overflow-hidden rounded-[10px] bg-black sm:min-h-[480px] lg:min-h-[520px]">
            {!isPlaying ? (
              <>
                <Image
                  src={youtubeThumbnailUrl(FEATURED_ID)}
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
                    Featured Video
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play featured video"
                  className="text-brand absolute top-1/2 left-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:size-20"
                >
                  <Play className="ml-1 size-7 fill-current sm:size-8" strokeWidth={0} />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="bg-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
                  >
                    <Play className="size-4 fill-current" strokeWidth={0} />
                    Watch Now
                  </button>
                </div>
              </>
            ) : (
              <iframe
                src={youtubeEmbedUrl(FEATURED_ID, true)}
                title="Featured video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
