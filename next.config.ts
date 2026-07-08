import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { getSupabasePublicStorageBase, getSupabaseStorageHostname } from "./src/lib/cms/storage-url";

const supabaseHostname = getSupabaseStorageHostname();
const supabasePublicBase = getSupabasePublicStorageBase();

const nextConfig: NextConfig = {
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
            value:
              'unload=(self "https://www.youtube.com" "https://www.youtube-nocookie.com")',
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects: { source: string; destination: string; permanent: boolean }[] = [
      { source: "/solutions", destination: "/hospital", permanent: true },
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
