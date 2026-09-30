import Image from "next/image";

import type { HomeScaleContent } from "@/content/home";

/** The photo band between 01 and 02: four figures over a darkened corridor. */
export function Scale({
  content,
  photo,
}: {
  content: HomeScaleContent;
  photo: { src: string; alt: string };
}) {
  return (
    <section className="px-edge relative flex min-h-[clamp(520px,60vw,640px)] items-end overflow-hidden bg-[#040E1A] pt-[clamp(80px,9vw,120px)] pb-[clamp(56px,6vw,80px)] text-white">
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,26,0.35)_0%,rgba(4,14,26,0.70)_45%,rgba(4,14,26,0.94)_100%)]"
      />
      <div className="max-w-site relative mx-auto flex w-full flex-col gap-10">
        <h2 className="font-mono-label text-sky-bright m-0 text-[11px] font-normal tracking-[0.2em] uppercase">
          {content.label}
        </h2>
        <dl className="mid:grid-cols-4 m-0 grid grid-cols-2 gap-x-8 gap-y-9">
          {content.facts.map((fact) => (
            <div
              key={fact.figure}
              className="flex min-w-0 flex-col gap-3 border-t border-white/25 pt-5"
            >
              <dt className="font-mono-label text-[clamp(44px,5vw,68px)] leading-none tracking-[-0.03em] text-white">
                {fact.figure}
              </dt>
              <dd className="text-sky m-0 max-w-[240px] text-base leading-[1.55]">{fact.label}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sky-soft m-0 text-[12.5px]">{content.note}</p>
      </div>
    </section>
  );
}
