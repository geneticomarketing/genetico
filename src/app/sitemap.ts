import type { MetadataRoute } from "next";

import { getAllBlogSlugs } from "@/lib/cms/queries";
import { INDEXABLE_STATIC_PATHS } from "@/lib/seo-pages";
import { getSiteUrl } from "@/lib/seo";
import { BLOG_PATH } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const blogSlugs = await getAllBlogSlugs();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_STATIC_PATHS.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === BLOG_PATH || path === "/resources" ? 0.8 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}${BLOG_PATH}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
