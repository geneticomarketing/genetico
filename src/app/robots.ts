import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

/**
 * /robots.txt. Production allows everything public and points at the
 * sitemap; any other deploy (a Vercel preview, say) asks not to be crawled at
 * all, so drafts never compete with the live site in search.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const isProduction = (process.env.VERCEL_ENV ?? "production") === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/coming-soon"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
