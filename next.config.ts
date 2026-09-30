import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import {
  getSupabasePublicStorageBase,
  getSupabaseStorageHostname,
} from "./src/lib/cms/storage-url";

const supabaseHostname = getSupabaseStorageHostname();
const supabasePublicBase = getSupabasePublicStorageBase();

const nextConfig: NextConfig = {
  // The site and the admin panel have separate root layouts, so the 404 for
  // unmatched URLs is app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
  images: supabaseHostname
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ],
      }
    : undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: 'unload=(self "https://www.youtube.com" "https://www.youtube-nocookie.com")',
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects: { source: string; destination: string; permanent: boolean }[] = [
      { source: "/solutions", destination: "/hospital", permanent: true },
      // Design previews, now archived in src/archive/ and no longer routed. Any
      // link still pointing at one lands on the live page it was a draft of.
      { source: "/home-v2", destination: "/", permanent: true },
      { source: "/home-v3", destination: "/", permanent: true },
      { source: "/home-v4", destination: "/", permanent: true },
      { source: "/about-v2", destination: "/about-us", permanent: true },
    ];

    if (supabasePublicBase) {
      redirects.push({
        source: "/api/media/file/:filename",
        destination: `${supabasePublicBase}/media/:filename`,
        permanent: false,
      });
    }

    return redirects;
  },
};

export default withPayload(nextConfig);
