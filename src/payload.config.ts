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
import { TeamMembers } from "./payload/collections/TeamMembers";
import { Partners } from "./payload/collections/Partners";
import { GrantsAwards } from "./payload/collections/GrantsAwards";
import {
  DeepDives,
  FeaturedVideos,
  ShortVideos,
  ExternalArticles,
} from "./payload/collections/Resources";
import { SolutionPages } from "./payload/collections/SolutionPages";
import { LegalPages } from "./payload/collections/LegalPages";
import { NewsletterEditions } from "./payload/collections/NewsletterEditions";
import { SiteSettings, Navigation, Footer } from "./payload/globals/Site";
import { UtilityPages } from "./payload/globals/Pages";
import {
  HomeIntro,
  HomeWhy,
  HomeScale,
  HomeDoes,
  HomePlatform,
  HomeServe,
  HomeImpact,
  HomeInsights,
  HomeAhead,
  HomeContact,
} from "./payload/globals/sections/home";
import {
  AboutIntro,
  AboutProblem,
  AboutBuilding,
  AboutPlatform,
  AboutNow,
  AboutMission,
  AboutLeadership,
  AboutGrants,
  AboutPartners,
  AboutSecurity,
  AboutCta,
} from "./payload/globals/sections/about";
import {
  PlatformHero,
  PlatformFeatures,
  PlatformClinicalIntelligence,
  PlatformLongitudinalCare,
  PlatformInfrastructure,
  PlatformSecurity,
  PlatformCta,
} from "./payload/globals/sections/platform";
import {
  PublicHealthHero,
  PublicHealthImpact,
  PublicHealthThreeTier,
  PublicHealthArchitecture,
  PublicHealthCta,
} from "./payload/globals/sections/public-health";
import {
  ResourcesHero,
  ResourcesVideosSection,
  ResourcesArticlesSection,
  ResourcesBlogsSection,
  ResourcesBlogListing,
  ResourcesDeepDivesSection,
  ResourcesNewsletter,
} from "./payload/globals/sections/resources";
import {
  RareInsightsArchive,
  RareInsightsEdition,
  RareInsightsHero,
  RareInsightsSubscribe,
} from "./payload/globals/sections/rare-insights";

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
    dashboard: {
      widgets: [
        {
          slug: "collections",
          Component: "@/payload/admin/widgets/CollectionCards#GeneticoCollectionCards",
          minWidth: "full",
        },
      ],
      defaultLayout: [{ widgetSlug: "collections", width: "full" }],
    },
  },
  collections: [
    // About page
    TeamMembers,
    GrantsAwards,
    Partners,
    // Solution pages
    SolutionPages,
    // Resources page
    BlogPosts,
    FeaturedVideos,
    ShortVideos,
    DeepDives,
    ExternalArticles,
    // Rare Insights newsletter
    NewsletterEditions,
    // Other pages
    LegalPages,
    // Site utilities
    Media,
    Users,
  ],
  // Grouped and ordered in the admin sidebar by src/payload/admin/nav-order.ts.
  globals: [
    // Home page, in the order the sections render
    HomeIntro,
    HomeWhy,
    HomeScale,
    HomeDoes,
    HomePlatform,
    HomeServe,
    HomeImpact,
    HomeInsights,
    HomeAhead,
    HomeContact,
    // About page
    AboutIntro,
    AboutProblem,
    AboutBuilding,
    AboutPlatform,
    AboutNow,
    AboutMission,
    AboutLeadership,
    AboutGrants,
    AboutPartners,
    AboutSecurity,
    AboutCta,
    // Platform Page sections
    PlatformHero,
    PlatformFeatures,
    PlatformClinicalIntelligence,
    PlatformLongitudinalCare,
    PlatformInfrastructure,
    PlatformSecurity,
    PlatformCta,
    // Public Health page
    PublicHealthHero,
    PublicHealthImpact,
    PublicHealthThreeTier,
    PublicHealthArchitecture,
    PublicHealthCta,
    // Resources Page sections
    ResourcesHero,
    ResourcesVideosSection,
    ResourcesDeepDivesSection,
    ResourcesArticlesSection,
    ResourcesBlogsSection,
    ResourcesBlogListing,
    ResourcesNewsletter,
    // Rare Insights newsletter
    RareInsightsHero,
    RareInsightsArchive,
    RareInsightsSubscribe,
    RareInsightsEdition,
    // Legal & utility
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
  plugins: [
    s3Storage({
      enabled: useS3,
      collections: {
        media: {
          prefix: "media",
          generateFileURL: ({ filename, prefix }) =>
            buildPublicMediaUrl(filename, prefix ?? "media") ?? `/api/media/file/${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET || "disabled",
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "disabled",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "disabled",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "http://localhost",
      },
    }),
  ],
});
