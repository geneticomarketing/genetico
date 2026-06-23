"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";

type EditorialItem = {
  id: string;
  category: "RESEARCH" | "BLOG" | "NEWS";
  categoryColor: string;
  title: string;
  readTime: string;
  href: string;
};

const EDITORIAL_ITEMS: EditorialItem[] = [
  {
    id: "variant-interpretation",
    category: "RESEARCH",
    categoryColor: "#059669",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "20 min read",
    href: "#",
  },
  {
    id: "rare-disease-burden",
    category: "BLOG",
    categoryColor: "#7c3aed",
    title: "India's rare disease burden: what the data says in 2025",
    readTime: "6 min read",
    href: "#",
  },
  {
    id: "nprd-implementation",
    category: "NEWS",
    categoryColor: "#dc2626",
    title: "NPRD 2021 implementation: gaps, progress, and what's needed next",
    readTime: "15 min read",
    href: "#",
  },
  {
    id: "registry-standards",
    category: "RESEARCH",
    categoryColor: "#059669",
    title: "Rare disease registries — what India can teach the world",
    readTime: "13 min read",
    href: "#",
  },
  {
    id: "clinical-workflows",
    category: "BLOG",
    categoryColor: "#7c3aed",
    title: "Dive deeper into the genetic infrastructural world",
    readTime: "4 min read",
    href: "#",
  },
];

const INITIAL_VISIBLE = 3;

function EditorialRow({ item, index }: { item: EditorialItem; index: number }) {
  return (
    <li className="border-line border-b last:border-b-0">
      <a
        href={item.href}
        className="group flex items-center gap-4 px-5 py-6 sm:gap-6 sm:px-6 sm:py-7 lg:gap-8 lg:px-8"
      >
        <span
          aria-hidden
          className="secondaryFont w-10 shrink-0 text-[1.75rem] leading-none font-light text-[#d1d5db] sm:w-12 sm:text-[2rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="secondaryFont flex w-24 shrink-0 items-center gap-2 text-[11px] font-semibold tracking-[0.14em] sm:w-28"
          style={{ color: item.categoryColor }}
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full"
            style={{ backgroundColor: item.categoryColor }}
          />
          {item.category}
        </span>

        <span className="secondaryFont group-hover:text-brand min-w-0 flex-1 text-[15px] leading-snug font-medium text-[#121212] transition-colors sm:text-base">
          {item.title}
        </span>

        <span className="secondaryFont shrink-0 text-xs text-[#b8bcc4] sm:text-sm">
          {item.readTime}
        </span>
      </a>
    </li>
  );
}

export function ResourcesEditorial() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleItems = EDITORIAL_ITEMS.slice(0, visibleCount);
  const hasMore = visibleCount < EDITORIAL_ITEMS.length;

  return (
    <section id="editorial" className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden className="bg-brand h-10 w-1 shrink-0 rounded-full sm:h-11" />
            <h2
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              Editorial
            </h2>
          </div>

          <a
            href="#editorial"
            className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            Browse all
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.06}>
          <ul className="overflow-hidden rounded-md border bg-white">
            {visibleItems.map((item, index) => (
              <EditorialRow key={item.id} item={item} index={index} />
            ))}
          </ul>
        </Reveal>

        {hasMore && (
          <Reveal className="mt-8 flex justify-center sm:mt-10" delay={0.1}>
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => Math.min(count + 2, EDITORIAL_ITEMS.length))
              }
              className="text-brand border-brand/20 secondaryFont hover:border-brand/35 inline-flex items-center gap-2 rounded-md border bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#f8fbff]"
            >
              Load more content
              <ChevronDown className="size-4" strokeWidth={2} />
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
