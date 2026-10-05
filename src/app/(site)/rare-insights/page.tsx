import type { Metadata } from "next";

import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { RareInsightsArchive } from "@/components/rare-insights/archive";
import { RareInsightsHero } from "@/components/rare-insights/hero";
import { RareInsightsSubscribe } from "@/components/rare-insights/subscribe-band";
import { JsonLd } from "@/components/seo/json-ld";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getRareInsightsCopy, getRareInsightsEditions } from "@/lib/cms/rare-insights-data";
import { editionHref, editionTitle, withRareInsightsFeed } from "@/lib/rare-insights";
import { getSiteUrl } from "@/lib/seo";
import { staticPageMetadata } from "@/lib/seo-pages";
import { graph, staticPageNodes } from "@/lib/structured-data";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return withRareInsightsFeed(staticPageMetadata("rareInsights"));
}

const SECTIONS = numberSections([
  { id: "top", label: "Latest" },
  { id: "archive", label: "Archive" },
  { id: "subscribe", label: "Subscribe" },
]);

/**
 * /rare-insights — the archive of the weekly Rare Insights newsletter: the
 * latest edition up top, then every edition and every paper, searchable.
 * Editions are “Newsletter editions” in the CMS; the wording around them is
 * the rest of the “Rare Insights newsletter” group. Design source:
 * design_handoff_genetico_site/design_handoff_rare_insights/.
 */
export default async function RareInsightsPage() {
  const [editions, copy, navigation, footer] = await Promise.all([
    getRareInsightsEditions(),
    getRareInsightsCopy(),
    getNavigation(),
    getFooterContent(),
  ]);

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={SECTIONS} ctaShape="rounded" />
      <SectionRail sections={SECTIONS} pageLabel="Rare Insights" />

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd
          data={graph(
            ...staticPageNodes("rareInsights", {
              type: "CollectionPage",
              extra: {
                mainEntity: {
                  "@type": "ItemList",
                  itemListOrder: "https://schema.org/ItemListOrderDescending",
                  numberOfItems: editions.length,
                  itemListElement: editions.map((edition, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `${getSiteUrl()}${editionHref(edition.slug)}`,
                    name: `${editionTitle(edition)}: ${edition.items[0].title}`,
                  })),
                },
              },
            }),
          )}
        />

        <RareInsightsHero copy={copy.hero} editions={editions} subscribeUrl={copy.subscribeUrl} />
        <RareInsightsArchive copy={copy.archive} editions={editions} />
        <RareInsightsSubscribe copy={copy.subscribe} subscribeUrl={copy.subscribeUrl} />
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
