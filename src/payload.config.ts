import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";

import { buildPublicMediaUrl } from "./lib/cms/storage-url";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { BlogPosts } from "./payload/collections/BlogPosts";
import { NewsArticles } from "./payload/collections/NewsArticles";
import { TeamMembers } from "./payload/collections/TeamMembers";
import { Partners } from "./payload/collections/Partners";
import { GrantsAwards } from "./payload/collections/GrantsAwards";
import { EcosystemModules, EcosystemGaps } from "./payload/collections/Ecosystem";
import { FeaturedVideos, ShortVideos, ExternalArticles } from "./payload/collections/Resources";
import { SolutionPages } from "./payload/collections/SolutionPages";
import { LegalPages } from "./payload/collections/LegalPages";
import { SiteSettings, Navigation, Footer, HomePage } from "./payload/globals/Site";
import {
  AboutPage,
  PlatformPage,
  PublicHealthPage,
  ResourcesPage,
  UtilityPages,
} from "./payload/globals/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const useS3 =
  Boolean(process.env.S3_BUCKET) &&
  Boolean(process.env.S3_ACCESS_KEY_ID) &&
  Boolean(process.env.S3_SECRET_ACCESS_KEY) &&
  Boolean(process.env.S3_ENDPOINT);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Genetico CMS",
    },
    components: {
      Nav: "@/payload/admin/Nav#GeneticoNav",
    },
  },
  collections: [
    // Home
    NewsArticles,
    Partners,
    EcosystemModules,
    EcosystemGaps,
    // About
    TeamMembers,
    GrantsAwards,
    // Solutions
    SolutionPages,
    // Resources
    BlogPosts,
    FeaturedVideos,
    ShortVideos,
    ExternalArticles,
    // Legal
    LegalPages,
    // Site utilities
    Media,
    Users,
  ],
  globals: [
    // Page content globals (ordered by site navigation)
    HomePage,
    AboutPage,
    PlatformPage,
    PublicHealthPage,
    ResourcesPage,
    UtilityPages,
    // Site-wide
    SiteSettings,
    Navigation,
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || "",
    },
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
  plugins: useS3
    ? [
        s3Storage({
          collections: {
            media: {
              prefix: "media",
              generateFileURL: ({ filename, prefix }) =>
                buildPublicMediaUrl(filename, prefix ?? "media") ??
                `/api/media/file/${filename}`,
            },
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            region: process.env.S3_REGION || "us-east-1",
            endpoint: process.env.S3_ENDPOINT!,
          },
        }),
      ]
    : [],
});
