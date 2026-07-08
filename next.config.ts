import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { getSupabaseStorageHostname } from "./src/lib/cms/storage-url";

const supabaseHostname = getSupabaseStorageHostname();

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
  async redirects() {
    return [{ source: "/solutions", destination: "/hospital", permanent: true }];
  },
};

export default withPayload(nextConfig);
