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
import { DeepDives, FeaturedVideos, ShortVideos, ExternalArticles } from "./payload/collections/Resources";
import { SolutionPages } from "./payload/collections/SolutionPages";
import { LegalPages } from "./payload/collections/LegalPages";
import { SiteSettings, Navigation, Footer } from "./payload/globals/Site";
import { UtilityPages } from "./payload/globals/Pages";
import {
  HomeHero,
  HomeWhoWeAre,
  HomeEcosystemChallenges,
  HomeEcosystemGaps,
  HomePartners,
  HomeSecurity,
  HomeNews,
  HomeFaqs,
  HomeCta,
} from "./payload/globals/sections/home";
import {
  AboutHero,
  AboutVision,
  AboutFoundations,
  AboutLeadership,
  AboutGrants,
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
  ResourcesFilterTabs,
  ResourcesBlogsSection,
  ResourcesBlogListing,
  ResourcesDeepDivesSection,
  ResourcesNewsletter,
} from "./payload/globals/sections/resources";

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
    // Home
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
    DeepDives,
    ExternalArticles,
    // Legal
    LegalPages,
    // Site utilities
    Media,
    Users,
  ],
  globals: [
    // Home Page sections
    HomeHero,
    HomeWhoWeAre,
    HomeEcosystemChallenges,
    HomeEcosystemGaps,
    HomePartners,
    HomeSecurity,
    HomeNews,
    HomeFaqs,
    HomeCta,
    // About Page sections
    AboutHero,
    AboutVision,
    AboutFoundations,
    AboutLeadership,
    AboutGrants,
    AboutCta,
    // Platform Page sections
    PlatformHero,
    PlatformFeatures,
    PlatformClinicalIntelligence,
    PlatformLongitudinalCare,
    PlatformInfrastructure,
    PlatformSecurity,
    PlatformCta,
    // Solutions Page sections (includes Public Health)
    PublicHealthHero,
    PublicHealthImpact,
    PublicHealthThreeTier,
    PublicHealthArchitecture,
    PublicHealthCta,
    // Resources Page sections
    ResourcesHero,
    ResourcesFilterTabs,
    ResourcesBlogsSection,
    ResourcesBlogListing,
    ResourcesDeepDivesSection,
    ResourcesNewsletter,
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
