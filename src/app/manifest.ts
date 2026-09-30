import type { MetadataRoute } from "next";

import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";

/** /manifest.webmanifest — the name, colours and icon browsers use for the site. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — IndiGeneUs.AI`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0B4C86",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
