import { notFound } from "next/navigation";

import { getRareInsightsEditions } from "@/lib/cms/rare-insights-data";
import { renderOgCard } from "@/lib/og-card";
import { shortDate } from "@/lib/rare-insights";

/**
 * /og/rare-insights/edition-NN — the share card for one edition: its number
 * and date above the lead story's headline. Rendered on its first request and
 * cached for an hour, rather than at build time, to keep the build's database
 * queries down.
 */

export const revalidate = 3600;

/** None at build time; each card is generated on its first request, then cached. */
export function generateStaticParams() {
  return [];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edition = (await getRareInsightsEditions()).find((e) => e.slug === slug);
  if (!edition) notFound();

  return renderOgCard({
    eyebrow: `Rare Insights · ${edition.label} · ${shortDate(edition.date)}`,
    headline: edition.items[0].title,
  });
}
