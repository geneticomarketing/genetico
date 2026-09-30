import type { MetadataRoute } from "next";

import { getBlogSitemapEntries } from "@/lib/cms/queries";
import { BLOG_PATH } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo";
import { INDEXABLE_STATIC_PATHS } from "@/lib/seo-pages";

/**
 * /sitemap.xml — every public page plus each blog post, on the canonical
 * domain (getSiteUrl(): https://genetico.in unless NEXT_PUBLIC_SITE_URL says
 * otherwise). Archived previews, /coming-soon, /admin and /api are not listed.
 */
export const revalidate = 3600;

const PRIORITY: Record<string, number> = { "/": 1, [BLOG_PATH]: 0.8, "/resources": 0.8 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const posts = await getBlogSitemapEntries();

  const pages: MetadataRoute.Sitemap = INDEXABLE_STATIC_PATHS.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path === BLOG_PATH ? "weekly" : "monthly",
    priority: PRIORITY[path] ?? (path.endsWith("-policy") ? 0.3 : 0.7),
  }));

  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}${BLOG_PATH}/${post.slug}`,
    ...(post.updatedAt ? { lastModified: new Date(post.updatedAt) } : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...blog];
}
