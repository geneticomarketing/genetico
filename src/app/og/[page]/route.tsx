import { renderOgCard } from "@/lib/og-card";
import { STATIC_PAGE_SEO, type StaticPageKey } from "@/lib/seo-pages";

/**
 * /og/<page> — the share image for each static page, e.g. /og/platform.
 * Generated once at build time for every key in STATIC_PAGE_SEO; the pages
 * point their og:image and twitter:image here (see createPageMetadata).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(STATIC_PAGE_SEO).map((page) => ({ page }));
}

/** The home page's title leads with the brand, which the card already shows as the logo. */
function headlineFor(key: StaticPageKey): string {
  return STATIC_PAGE_SEO[key].title.replace(/^Genetico — /, "");
}

export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const key = page as StaticPageKey;
  const seo = STATIC_PAGE_SEO[key];

  return renderOgCard({
    eyebrow: key === "home" ? "Genetico" : seo.label,
    headline: headlineFor(key),
  });
}
