"use client";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { ExternalArticle } from "@/lib/cms/types";

type ArticleItem = ExternalArticle & { id?: string };

function ArticleRow({ item, index }: { item: ArticleItem; index: number }) {
  return (
    <li className="border-line border-b last:border-b-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-5 sm:flex-nowrap sm:gap-6 sm:px-6 sm:py-7 lg:gap-8 lg:px-8"
      >
        <span
          aria-hidden
          className="secondaryFont w-8 shrink-0 text-[1.5rem] leading-none font-light text-[#d1d5db] sm:w-12 sm:text-[2rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="t-badge secondaryFont flex shrink-0 items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#0a66c2] sm:w-28">
          <span aria-hidden className="size-1.5 rounded-full bg-[#0a66c2]" />
          ARTICLE
        </span>

        <span className="secondaryFont group-hover:text-brand order-3 min-w-0 basis-full text-[15px] leading-snug font-medium text-[#121212] transition-colors sm:order-3 sm:basis-auto sm:flex-1 sm:text-base">
          {item.title}
        </span>

        <span className="text-brand order-2 ml-auto shrink-0 sm:order-4 sm:ml-0">
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </a>
    </li>
  );
}

export function ResourcesEditorial({
  compactTop = false,
  articles = DEFAULT_RESOURCES_PAGE.externalArticles,
  heading = DEFAULT_RESOURCES_PAGE.sectionHeadings.articles,
}: {
  compactTop?: boolean;
  articles?: ExternalArticle[];
  heading?: string;
}) {
  const items: ArticleItem[] = articles.map((item, index) => ({
    ...item,
    id: item.url || `article-${index}`,
  }));

  return (
    <section
      id="editorial"
      className={`bg-white px-5 sm:px-10 ${
        compactTop ? "pb-16 pt-0 sm:pb-20 lg:pb-24" : "py-16 sm:py-20 lg:py-24"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden className="bg-brand h-10 w-1 shrink-0 rounded-full sm:h-11" />
            <h2
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              {heading}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.06}>
          <ul className="overflow-hidden rounded-md border bg-white">
            {items.map((item, index) => (
              <ArticleRow key={item.id} item={item} index={index} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
