import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { EditionBody, EditionHeader } from "@/components/rare-insights/edition";
import { RareInsightsSubscribe } from "@/components/rare-insights/subscribe-band";
import { JsonLd } from "@/components/seo/json-ld";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getRareInsightsCopy, getRareInsightsEditions } from "@/lib/cms/rare-insights-data";
import {
  editionDescription,
  editionHref,
  editionOgPath,
  editionTitle,
  withRareInsightsFeed,
  type RareInsightsItem,
} from "@/lib/rare-insights";
import { createPageMetadata } from "@/lib/seo";
import { staticPageMetadata } from "@/lib/seo-pages";
import { graph, newsletterEditionNodes } from "@/lib/structured-data";

export const revalidate = 60;

type EditionPageProps = { params: Promise<{ slug: string }> };

async function findEdition(slug: string) {
  const editions = await getRareInsightsEditions();
  const index = editions.findIndex((edition) => edition.slug === slug);
  if (index === -1) return null;
  // Newest first, so the older edition is the next one along.
  return {
    edition: editions[index],
    older: editions[index + 1] ?? null,
    newer: editions[index - 1] ?? null,
  };
}

export async function generateStaticParams() {
  const editions = await getRareInsightsEditions();
  return editions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = await findEdition(slug);
  if (!found) return { ...staticPageMetadata("rareInsights"), robots: { index: false } };

  const { edition } = found;
  return withRareInsightsFeed(
    createPageMetadata({
      title: `Rare Insights · ${editionTitle(edition)}`,
      description: editionDescription(edition),
      path: editionHref(edition.slug),
      type: "article",
      publishedTime: `${edition.date}T12:00:00Z`,
      authors: ["Genetico"],
      ogImage: editionOgPath(edition.slug),
    }),
  );
}

/** A rail pill's label: the item's topic, or the start of its headline when it has none. */
function railLabel(item: RareInsightsItem): string {
  if (item.tag) return item.tag;
  const words = item.title.split(/\s+/);
  return words.length > 3 ? `${words.slice(0, 3).join(" ")}…` : item.title;
}

/**
 * /rare-insights/edition-NN — one edition of the newsletter, re-set in the
 * site's type. Each item has its own address, …/edition-08#09, which scrolls
 * to it and highlights it briefly.
 */
export default async function EditionPage({ params }: EditionPageProps) {
  const { slug } = await params;
  const [found, copy, navigation, footer] = await Promise.all([
    findEdition(slug),
    getRareInsightsCopy(),
    getNavigation(),
    getFooterContent(),
  ]);

  if (!found) notFound();
  const { edition, older, newer } = found;

  // The rail and the mobile menu list the items, numbered as the edition numbers them.
  const sections = numberSections(
    edition.items.map((item) => ({ id: item.num, label: railLabel(item) })),
  );

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaShape="rounded" />
      <SectionRail sections={sections} pageLabel={edition.label} />

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd
          data={graph(
            ...newsletterEditionNodes({
              path: editionHref(edition.slug),
              headline: `Rare Insights · ${editionTitle(edition)}`,
              description: editionDescription(edition),
              datePublished: edition.date,
              image: editionOgPath(edition.slug),
              citations: edition.items.map((item) => item.href),
            }),
          )}
        />

        <EditionHeader edition={edition} standfirst={copy.edition.standfirst} />
        <EditionBody
          edition={edition}
          older={older}
          newer={newer}
          copy={copy.edition}
          subscribeUrl={copy.subscribeUrl}
        />
        <RareInsightsSubscribe copy={copy.subscribe} subscribeUrl={copy.subscribeUrl} />
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
