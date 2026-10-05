/**
 * Rare Insights — the weekly newsletter archive. Shapes and formatting shared
 * by the server loader (lib/cms/rare-insights-data.ts) and the client-side
 * archive filters, so neither pulls in the other's dependencies.
 */

import { RARE_INSIGHTS_PATH } from "@/lib/routes";

export { RARE_INSIGHTS_PATH };

export type RareInsightsItem = {
  /** Position in the edition, from 1. The first item is the lead. */
  n: number;
  /** Zero-padded: "01". Also the item's anchor on its edition page. */
  num: string;
  tag: string;
  title: string;
  href: string;
  source: string;
  /** Publication date of the original, YYYY-MM-DD. */
  date: string;
  body: string[];
  cta: string;
  /** Heading of a section that starts at this item, or "". */
  section: string;
};

export type RareInsightsEdition = {
  edition: number;
  slug: string;
  /** "Edition 08" */
  label: string;
  issueLabel: string;
  /** Send date, YYYY-MM-DD. */
  date: string;
  note: string;
  items: RareInsightsItem[];
  /** Last saved in the CMS (ISO timestamp), for the sitemap. */
  updatedAt: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const pad = (n: number) => String(n).padStart(2, "0");

/** "03 October 2026" */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d} ${MONTHS[+m - 1]} ${y}` : "";
}

/** "3 Oct 2026" */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${+d} ${MONTHS[+m - 1].slice(0, 3)} ${y}` : "";
}

/** "2026-10" */
export const monthKey = (iso: string) => iso.slice(0, 7);

/** "October 2026" */
export const monthLabel = (key: string) => `${MONTHS[+key.slice(5, 7) - 1]} ${key.slice(0, 4)}`;

export const plural = (n: number, word: string, many = `${word}s`) =>
  `${n} ${n === 1 ? word : many}`;

export const editionHref = (slug: string) => `${RARE_INSIGHTS_PATH}/${slug}`;
export const itemHref = (slug: string, num: string) => `${editionHref(slug)}#${num}`;

/** "01 · Approvals", or just "01" for an untagged item. */
export const itemLabel = (item: RareInsightsItem) =>
  item.tag ? `${item.num} · ${item.tag}` : item.num;

/** "FDA · 28 September 2026" */
export const itemMeta = (item: RareInsightsItem, format: (iso: string) => string = longDate) =>
  [item.source, format(item.date)].filter(Boolean).join(" · ");

/** Papers resolve through doi.org; anything else — a press release, an EPAR — is a source. */
export const externalLabel = (item: RareInsightsItem) =>
  /^https?:\/\/(dx\.)?doi\.org\//.test(item.href) ? "Paper ↗" : "Source ↗";

/** Topics in the order they first appear, without repeats or blanks. */
export const topicsOf = (items: RareInsightsItem[]) =>
  Array.from(new Set(items.map((item) => item.tag).filter(Boolean)));

/** About N minutes, at 230 words a minute. */
export function readMinutes(edition: RareInsightsEdition): number {
  const words = edition.items.reduce(
    (sum, item) =>
      sum +
      item.title.split(/\s+/).length +
      item.body.join(" ").split(/\s+/).filter(Boolean).length,
    0,
  );
  return Math.max(1, Math.round(words / 230));
}

/** The edition's share card, rendered by app/og/rare-insights/[slug]/route.tsx. */
export const editionOgPath = (slug: string) => `/og${editionHref(slug)}`;

/** The RSS feed of every edition, app/(site)/rare-insights/feed.xml/route.ts. */
export const RARE_INSIGHTS_FEED_PATH = `${RARE_INSIGHTS_PATH}/feed.xml`;

/** "Edition 08 · 03 October 2026" — the edition's name in titles and share cards. */
export const editionTitle = (edition: RareInsightsEdition) =>
  `${edition.label} · ${longDate(edition.date)}`;

/**
 * The search and share description: the lead's headline, then how much else
 * is in the edition — the longest version that fits Google's ~160 characters.
 * (createPageMetadata clips anything longer, should a headline alone exceed it.)
 */
export function editionDescription(edition: RareInsightsEdition): string {
  const [lead, ...rest] = edition.items;
  const sentence = /[.?!]$/.test(lead.title) ? lead.title : `${lead.title}.`;
  const more = rest.length === 1 ? "1 more item" : `${rest.length} more papers and approvals`;
  const tails = rest.length
    ? [` Plus ${more} in rare disease, each with a note on why it matters.`, ` Plus ${more}.`]
    : [];
  return tails.map((tail) => sentence + tail).find((text) => text.length <= 160) ?? sentence;
}

/** Adds the feed to a page's metadata as <link rel="alternate" type="application/rss+xml">. */
export function withRareInsightsFeed<T extends { alternates?: object | null }>(metadata: T): T {
  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates ?? {}),
      types: {
        "application/rss+xml": [
          { url: RARE_INSIGHTS_FEED_PATH, title: "Rare Insights · Genetico" },
        ],
      },
    },
  };
}
