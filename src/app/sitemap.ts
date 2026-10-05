import type { MetadataRoute } from "next";

import { getBlogSitemapEntries } from "@/lib/cms/queries";
import { getRareInsightsEditions } from "@/lib/cms/rare-insights-data";
import { editionHref, RARE_INSIGHTS_PATH } from "@/lib/rare-insights";
import { BLOG_PATH } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo";
import { INDEXABLE_STATIC_PATHS } from "@/lib/seo-pages";

/**
 * /sitemap.xml — every public page plus each blog post, on the canonical
 * domain (getSiteUrl(): https://genetico.in unless NEXT_PUBLIC_SITE_URL says
 * otherwise), and each Rare Insights edition. Archived previews, /coming-soon, /admin and /api are not listed.
 */
export const revalidate = 3600;

const PRIORITY: Record<string, number> = {
  "/": 1,
  [BLOG_PATH]: 0.8,
  "/resources": 0.8,
  [RARE_INSIGHTS_PATH]: 0.8,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const [posts, editions] = await Promise.all([getBlogSitemapEntries(), getRareInsightsEditions()]);

  /* An edition is dated by its last save; the archive page changes whenever any edition does. */
  const editionModified = (edition: (typeof editions)[number]) =>
    new Date(edition.updatedAt || `${edition.date}T12:00:00Z`);
  const archiveModified = editions.length
    ? new Date(Math.max(...editions.map((edition) => editionModified(edition).getTime())))
    : null;

  const pages: MetadataRoute.Sitemap = INDEXABLE_STATIC_PATHS.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    ...(path === RARE_INSIGHTS_PATH && archiveModified ? { lastModified: archiveModified } : {}),
    changeFrequency:
      path === "/" || path === BLOG_PATH || path === RARE_INSIGHTS_PATH ? "weekly" : "monthly",
    priority: PRIORITY[path] ?? (path.endsWith("-policy") ? 0.3 : 0.7),
  }));

  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}${BLOG_PATH}/${post.slug}`,
    ...(post.updatedAt ? { lastModified: new Date(post.updatedAt) } : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsletter: MetadataRoute.Sitemap = editions.map((edition) => ({
    url: `${baseUrl}${editionHref(edition.slug)}`,
    lastModified: editionModified(edition),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...blog, ...newsletter];
}
