"use client";

import Link from "next/link";
import { useState } from "react";

import { FilterBar } from "@/components/resources/filter-bar";
import type { ResourceSectionHeading, ResourcesPageContent } from "@/lib/cms/resources-page-data";
import { youtubeThumbnailStack } from "@/lib/youtube";

/**
 * Placeholder grounds for the stills the client has yet to supply, picked by
 * position so a row of cards does not repeat one colour. Kept in code: the
 * CMS conventions rule out putting a colour in front of the editor.
 */
const GROUNDS = [
  "radial-gradient(120% 130% at 30% 24%,#2A4560 0%,#13202C 62%,#0A121A 100%)",
  "radial-gradient(120% 130% at 30% 26%,#1E4A40 0%,#0F2A25 60%,#081815 100%)",
  "radial-gradient(120% 130% at 30% 24%,#6B4A22 0%,#39240F 60%,#1C1108 100%)",
  "radial-gradient(120% 130% at 28% 22%,#1B4A72 0%,#0C2436 62%,#07121C 100%)",
];

const ground = (i: number) => GROUNDS[i % GROUNDS.length];

const CARD =
  "border-rule flex flex-col overflow-hidden rounded-card border bg-white " +
  "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-lift";

const WATCH_LINK =
  "font-mono-label text-primary text-[11px] tracking-[0.16em] uppercase hover:underline";

/** The rule-and-label that opens every section. */
function SectionHead({
  heading,
  children,
}: {
  heading: ResourceSectionHeading;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-3.5">
        <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
          {heading.label}
        </span>
        <span aria-hidden className="bg-rule block h-px flex-1" />
      </div>
      <div className="mt-5 mb-3 flex flex-wrap items-baseline justify-between gap-3.5">
        <h2 className="font-headline m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.08] tracking-[-0.02em]">
          {heading.title}
        </h2>
        {children}
      </div>
      <p className="text-ink-body m-0 max-w-[600px] text-base leading-[1.7]">
        {heading.description}
      </p>
    </>
  );
}

/** Play button over a still. Decorative — every card's link names itself. */
function Play({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      className="text-primary-deep pointer-events-none absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94"
      style={{ width: size, height: size, fontSize: size * 0.29 }}
    >
      ▶
    </span>
  );
}

function Duration({ children, className = "" }: { children: string; className?: string }) {
  if (!children) return null;
  return (
    <span
      className={`font-mono-label pointer-events-none absolute z-[2] rounded-full bg-[rgba(7,18,28,0.72)] px-2.5 py-[5px] text-[11px] text-white ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The Resources library.
 *
 * Filtering shows and hides whole sections rather than reflowing one grid,
 * which is what the design does and what keeps each kind of resource in the
 * layout built for it. Hidden sections are removed from the document, not
 * just visually — a screen reader should not read past a filter either.
 */
export function ResourceLibrary({ content }: { content: ResourcesPageContent }) {
  const [active, setActive] = useState(content.tabs[0]?.id ?? "all");

  const current = content.tabs.find((tab) => tab.id === active) ?? content.tabs[0];
  const shows = (section: string) =>
    !current || current.sections.length === 0 || current.sections.includes(section);

  return (
    <>
      <section
        id="top"
        className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#ffffff_100%)] pt-[clamp(31px,3.2vw,44px)] pb-8"
      >
        <div className="max-w-site mx-auto flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
              {content.hero.eyebrow}
            </span>
            <h1 className="font-headline text-ink m-0 text-[clamp(30px,4vw,44px)] leading-[1.1] tracking-[-0.015em] text-pretty">
              {content.hero.title}
            </h1>
            {content.hero.description ? (
              <p className="text-ink-body m-0 max-w-[620px] text-base leading-[1.7] text-pretty">
                {content.hero.description}
              </p>
            ) : null}
          </div>
          <div className="font-mono-label text-ink-soft flex flex-col gap-1.5 text-[11px] tracking-[0.16em] uppercase">
            {content.hero.meta.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </section>

      <FilterBar tabs={content.tabs} active={active} onSelect={setActive} />

      {content.featured && shows("featured") ? (
        <section
          id="featured"
          data-reveal
          className="px-edge scroll-mt-32 pt-[clamp(37px,3.8vw,52px)]"
        >
          <div className="max-w-site mx-auto">
            <div className="mb-[22px] flex items-center gap-3.5">
              <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
                Featured film
              </span>
              <span aria-hidden className="bg-rule block h-px flex-1" />
            </div>

            <div className="border-rule rounded-card overflow-hidden border bg-[#0B1C2A]">
              <div
                className="relative aspect-video w-full bg-cover bg-center"
                style={{
                  backgroundImage: youtubeThumbnailStack(content.featured.href, ground(3)),
                }}
              >
                <span className="font-mono-label pointer-events-none absolute top-[18px] left-[18px] z-[2] flex items-center gap-2 rounded-full border border-white/24 bg-[rgba(7,18,28,0.72)] px-3 py-[7px] text-[10.5px] tracking-[0.16em] text-white uppercase">
                  <span aria-hidden className="bg-teal block h-1.5 w-1.5 rounded-full" />
                  Now showing
                </span>
                <Duration className="top-[18px] right-[18px]">{content.featured.duration}</Duration>
                <Play size={82} />
              </div>

              <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 bg-[linear-gradient(180deg,#0B1C2A_0%,#07121C_100%)] p-[clamp(24px,3vw,38px)]">
                <div className="flex max-w-[660px] flex-col gap-3.5">
                  <span className="font-mono-label text-sky-bright text-[11px] tracking-[0.2em] uppercase">
                    {content.featured.kicker}
                  </span>
                  <h2 className="font-headline m-0 text-[clamp(26px,3.2vw,38px)] leading-[1.14] tracking-[-0.015em] text-white text-pretty">
                    {content.featured.title}
                  </h2>
                  {content.featured.blurb ? (
                    <p className="m-0 text-[14.5px] leading-[1.7] text-[#C3D6E6] text-pretty">
                      {content.featured.blurb}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col items-start gap-3">
                  <a
                    href={content.featured.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary inline-flex items-center gap-[9px] rounded-full px-6 py-[13px] text-[13.5px] font-bold text-white transition-colors hover:bg-[#1160A6]"
                  >
                    <span aria-hidden>▶</span> Watch now
                  </a>
                  {content.featured.source ? (
                    <span className="font-mono-label text-sky-bright text-[11px] tracking-[0.16em] uppercase">
                      {content.featured.source}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {content.videos.items.length && shows("videos") ? (
        <section
          id="videos"
          data-revealoff
          className="px-edge scroll-mt-32 py-[clamp(67px,7vw,96px)]"
        >
          <div className="max-w-site mx-auto">
            <SectionHead heading={content.videos.heading} />
            <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
              {content.videos.items.map((video, i) => (
                <div key={video.id} className={CARD}>
                  <div
                    className="relative aspect-video w-full bg-cover bg-center"
                    style={{ backgroundImage: youtubeThumbnailStack(video.href, ground(i)) }}
                  >
                    <Duration className="right-3 bottom-3">{video.duration}</Duration>
                    <Play size={58} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-[22px]">
                    <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                      {video.category}
                    </span>
                    <h3 className="font-headline m-0 text-[21px] leading-[1.28] tracking-[-0.01em] text-pretty">
                      {video.title}
                    </h3>
                    <p className="text-ink-body m-0 text-[13px] leading-[1.6] text-pretty">
                      {video.blurb}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-[18px]">
                      <span className="text-ink-soft text-[13px]">{video.source}</span>
                      <a href={video.href} target="_blank" rel="noreferrer" className={WATCH_LINK}>
                        Watch →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.deepDives.items.length && shows("deep-dives") ? (
        <section
          id="deep-dives"
          data-reveal
          className="bg-sheet-soft border-rule px-edge scroll-mt-32 border-t border-b py-[clamp(67px,7vw,96px)]"
        >
          <div className="max-w-site mx-auto">
            <SectionHead heading={content.deepDives.heading} />
            <div className="mt-11 flex flex-col gap-7">
              {content.deepDives.items.map((dive, i) => (
                <div
                  key={dive.id}
                  className={`${CARD} mid:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] grid grid-cols-[minmax(0,1fr)]`}
                >
                  <div
                    className="relative h-full min-h-[clamp(220px,26vw,300px)] w-full min-w-0 bg-cover bg-center"
                    style={{ backgroundImage: youtubeThumbnailStack(dive.href, ground(i + 2)) }}
                  >
                    <Duration className="top-3.5 right-3.5">{dive.duration}</Duration>
                    <Play size={66} />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3.5 p-[clamp(24px,3vw,40px)]">
                    <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
                      {dive.category}
                    </span>
                    <h3 className="font-headline m-0 text-[clamp(23px,2.6vw,30px)] leading-[1.2] tracking-[-0.015em] text-pretty">
                      {dive.title}
                    </h3>
                    <p className="text-ink-body m-0 text-[14.5px] leading-[1.7] text-pretty">
                      {dive.blurb}
                    </p>
                    {dive.source ? (
                      <span className="text-ink-soft text-[13px]">{dive.source}</span>
                    ) : null}
                    <div className="border-rule mt-auto flex flex-wrap items-center justify-between gap-3.5 border-t pt-[22px]">
                      <div className="flex flex-wrap gap-2">
                        {dive.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary-tint text-primary rounded-full px-3 py-1.5 text-[12.5px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={dive.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${WATCH_LINK} whitespace-nowrap`}
                      >
                        Watch{dive.duration ? ` · ${dive.duration}` : ""} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.articles.items.length && shows("articles") ? (
        <section
          id="articles"
          data-reveal
          className="px-edge scroll-mt-32 py-[clamp(67px,7vw,96px)]"
        >
          <div className="max-w-site mx-auto">
            <SectionHead heading={content.articles.heading} />
            <div className="border-rule mt-10 border-t">
              {content.articles.items.map((article, i) => (
                <div
                  key={article.id}
                  className="border-rule mid:grid-cols-[40px_112px_minmax(0,1fr)_auto_84px] grid grid-cols-[auto_minmax(64px,84px)_minmax(0,1fr)] items-center gap-x-5 gap-y-2.5 border-b py-5"
                >
                  <span className="font-mono-label text-ink-dim text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h-[70px] w-full max-w-[112px] overflow-hidden rounded-lg"
                    style={{ backgroundImage: ground(i) }}
                  />
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-primary min-w-0 text-base leading-[1.5] transition-colors text-pretty"
                  >
                    {article.title}
                  </a>
                  <span className="text-ink-soft mid:block hidden text-[13px] whitespace-nowrap">
                    {article.meta}
                  </span>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Read ${article.title}`}
                    className={`${WATCH_LINK} mid:block hidden`}
                  >
                    Read →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.blogs.items.length && shows("blogs") ? (
        <section
          id="blogs"
          data-reveal
          className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
        >
          <div className="max-w-site mx-auto">
            <SectionHead heading={content.blogs.heading}>
              <Link href={content.blogs.seeAllHref} className={WATCH_LINK}>
                {content.blogs.seeAllLabel} →
              </Link>
            </SectionHead>
            <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
              {content.blogs.items.map((post, i) => (
                <Link key={post.id} href={post.href} className={CARD}>
                  <div
                    className="relative aspect-video w-full"
                    style={{ backgroundImage: ground(i + 1) }}
                  >
                    <span className="font-mono-label text-ink absolute top-3.5 left-3.5 z-[2] rounded-full bg-white/92 px-3 py-1.5 text-[10.5px] tracking-[0.16em] uppercase">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-[22px] pt-[22px] pb-6">
                    <h3 className="font-headline text-ink m-0 text-[22px] leading-[1.26] tracking-[-0.01em] text-pretty">
                      {post.title}
                    </h3>
                    <p className="text-ink-body m-0 text-[13px] leading-[1.65] text-pretty">
                      {post.blurb}
                    </p>
                    <div className="border-rule mt-auto flex items-center justify-between gap-3 border-t pt-5">
                      <span className="text-ink-soft text-[13px]">{post.meta}</span>
                      <span className={WATCH_LINK}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="subscribe"
        className="bg-sheet-cool border-rule px-edge scroll-mt-32 border-t py-[clamp(73px,7.6vw,104px)]"
      >
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
            {content.subscribe.eyebrow}
          </span>
          <h2 className="font-headline m-0 text-[clamp(30px,4vw,46px)] leading-[1.08] tracking-[-0.02em]">
            {content.subscribe.title}
          </h2>
          <p className="text-ink-body m-0 max-w-[520px] text-base leading-[1.7]">
            {content.subscribe.description}
          </p>
          <a
            href={content.subscribe.href}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-deep hover:bg-primary mt-2.5 rounded-full px-[30px] py-3.5 text-sm font-bold text-white transition-colors"
          >
            {content.subscribe.label}
          </a>
        </div>
      </section>
    </>
  );
}
