import { RARE_INSIGHTS_COPY } from "@/content/rare-insights";
import { cache } from "react";

import { getPayloadClient, isCmsConfigured } from "@/lib/cms/get-payload";
import { getSectionGlobal, getSiteSettings } from "@/lib/cms/queries";
import { NEWSLETTER_URL } from "@/lib/contact";
import { pad, type RareInsightsEdition } from "@/lib/rare-insights";
import type { NewsletterEdition } from "@/payload-types";

/**
 * Rare Insights from the CMS: the editions (newest first) and the wording
 * around them. Every wording field falls back to src/content/rare-insights.ts
 * when it is left empty.
 */

export type RareInsightsCopy = {
  hero: { [K in keyof typeof RARE_INSIGHTS_COPY.hero]: string };
  archive: { [K in keyof typeof RARE_INSIGHTS_COPY.archive]: string };
  subscribe: { [K in keyof typeof RARE_INSIGHTS_COPY.subscribe]: string };
  edition: { [K in keyof typeof RARE_INSIGHTS_COPY.edition]: string };
  subscribeUrl: string;
};

/** Each field of `defaults`, overridden by the CMS value when that is non-empty. */
function fill<T extends Record<string, string>>(
  doc: object | null,
  defaults: T,
): { [K in keyof T]: string } {
  const out = {} as { [K in keyof T]: string };
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const value = (doc as Record<string, unknown> | null)?.[key as string];
    out[key] = typeof value === "string" && value.trim() ? value.trim() : defaults[key];
  }
  return out;
}

/** Waits before each retry of a failed query; one attempt per entry, then one last try. */
const RETRY_DELAYS_MS = [400, 1200, 3000];

async function withRetry<T>(run: () => Promise<T>): Promise<T> {
  for (const delay of RETRY_DELAYS_MS) {
    try {
      return await run();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return run();
}

/** A stored timestamp (midday UTC) back to its calendar day. */
const isoDay = (value: string | null | undefined) => (value ? value.slice(0, 10) : "");

function toEdition(doc: NewsletterEdition): RareInsightsEdition {
  return {
    edition: doc.edition,
    slug: doc.slug || `edition-${pad(doc.edition)}`,
    label: `Edition ${pad(doc.edition)}`,
    issueLabel: doc.issueLabel?.trim() ?? "",
    date: isoDay(doc.date),
    note: doc.note?.trim() ?? "",
    updatedAt: doc.updatedAt,
    items: (doc.items ?? []).map((item, i) => ({
      n: i + 1,
      num: pad(i + 1),
      tag: item.tag?.trim() ?? "",
      title: item.title,
      href: item.href,
      source: item.source,
      date: isoDay(item.date),
      body: (item.body ?? []).map((b) => b.paragraph.trim()).filter(Boolean),
      cta: item.cta?.trim() || "Read the full paper",
      section: item.section?.trim() ?? "",
    })),
  };
}

/**
 * Every edition with at least one item, newest send first.
 *
 * Unlike the site's other loaders, a failed query throws instead of returning
 * an empty list. An empty list here would make every edition page a 404, and
 * a regenerated page is cached: one database blip could serve "not found" to
 * everyone for the next minute. Throwing makes Next keep the last good page
 * (and makes a build fail loudly rather than ship an empty archive).
 *
 * A busy connection pool (Supabase allows 15 sessions) fails a query
 * outright, so it is retried a few times before giving up.
 *
 * Cached per request, because the page, its metadata and the share card all ask.
 */
export const getRareInsightsEditions = cache(async (): Promise<RareInsightsEdition[]> => {
  if (!isCmsConfigured()) return [];

  // Payload's own start-up connects to the database too, so it is retried with the query.
  const docs = await withRetry(async () => {
    const payload = await getPayloadClient();
    if (!payload) throw new Error("[CMS] Rare Insights: Payload is unavailable");
    const result = await payload.find({
      collection: "newsletter-editions",
      sort: "-date",
      pagination: false,
      depth: 0,
    });
    return result.docs;
  });

  return docs
    .map(toEdition)
    .filter((edition) => edition.items.length)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.edition - a.edition));
});

export async function getRareInsightsCopy(): Promise<RareInsightsCopy> {
  const [hero, archive, subscribe, edition, settings] = await Promise.all([
    getSectionGlobal("rare-insights-hero"),
    getSectionGlobal("rare-insights-archive"),
    getSectionGlobal("rare-insights-subscribe"),
    getSectionGlobal("rare-insights-edition"),
    getSiteSettings(),
  ]);

  return {
    hero: fill(hero, RARE_INSIGHTS_COPY.hero),
    archive: fill(archive, RARE_INSIGHTS_COPY.archive),
    subscribe: fill(subscribe, RARE_INSIGHTS_COPY.subscribe),
    edition: fill(edition, RARE_INSIGHTS_COPY.edition),
    subscribeUrl: settings.newsletterUrl?.trim() || NEWSLETTER_URL,
  };
}
