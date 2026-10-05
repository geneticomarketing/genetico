import { getRareInsightsCopy, getRareInsightsEditions } from "@/lib/cms/rare-insights-data";
import {
  editionHref,
  editionTitle,
  RARE_INSIGHTS_FEED_PATH,
  RARE_INSIGHTS_PATH,
  type RareInsightsEdition,
} from "@/lib/rare-insights";
import { getSiteUrl } from "@/lib/seo";

/**
 * /rare-insights/feed.xml — RSS 2.0, one entry per edition, newest first. Feed
 * readers and aggregators pick it up from the <link rel="alternate"> on the
 * Rare Insights pages. Each entry carries the edition's items as a list.
 */

export const revalidate = 3600;

const xml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** CDATA cannot contain its own terminator, so split any that appears. */
const cdata = (html: string) => `<![CDATA[${html.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

function entryHtml(edition: RareInsightsEdition, url: string): string {
  const [lead, ...rest] = edition.items;
  const items = rest
    .map(
      (item) =>
        `<li><a href="${xml(`${url}#${item.num}`)}">${xml(item.title)}</a> — ${xml(item.source)}</li>`,
    )
    .join("");
  return [
    edition.note ? `<p><em>${xml(edition.note)}</em></p>` : "",
    `<h2><a href="${xml(`${url}#${lead.num}`)}">${xml(lead.title)}</a></h2>`,
    `<p>${xml(lead.source)}</p>`,
    ...lead.body.map((paragraph) => `<p>${xml(paragraph)}</p>`),
    items ? `<h3>Also in this edition</h3><ol start="2">${items}</ol>` : "",
  ].join("");
}

export async function GET() {
  const site = getSiteUrl();
  const [editions, copy] = await Promise.all([getRareInsightsEditions(), getRareInsightsCopy()]);
  const latest = editions[0];

  const entries = editions.map((edition) => {
    const url = `${site}${editionHref(edition.slug)}`;
    return [
      "<item>",
      `<title>${xml(`${editionTitle(edition)}: ${edition.items[0].title}`)}</title>`,
      `<link>${xml(url)}</link>`,
      `<guid isPermaLink="true">${xml(url)}</guid>`,
      `<pubDate>${rfc822(edition.date)}</pubDate>`,
      ...Array.from(new Set(edition.items.map((item) => item.tag).filter(Boolean))).map(
        (tag) => `<category>${xml(tag)}</category>`,
      ),
      `<description>${cdata(entryHtml(edition, url))}</description>`,
      "</item>",
    ].join("");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>Rare Insights · Genetico</title>",
    `<link>${xml(`${site}${RARE_INSIGHTS_PATH}`)}</link>`,
    `<atom:link href="${xml(`${site}${RARE_INSIGHTS_FEED_PATH}`)}" rel="self" type="application/rss+xml" />`,
    `<description>${xml(copy.edition.standfirst)}</description>`,
    "<language>en</language>",
    latest ? `<lastBuildDate>${rfc822(latest.date)}</lastBuildDate>` : "",
    ...entries,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
