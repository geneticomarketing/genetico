import { resolveMediaUrl } from "./resolve-media-url";
import { BLOG_POSTS, type BlogPost } from "@/lib/blogs";
import type {
  BlogPost as CmsBlogPost,
  Config,
  EcosystemGap as CmsEcosystemGap,
  EcosystemModule as CmsEcosystemModule,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  GrantsAward as CmsGrantAward,
  // NewsArticle as CmsNewsArticle,
  Partner as CmsPartner,
  ShortVideo as CmsShortVideo,
  TeamMember as CmsTeamMember,
  UtilityPage,
} from "@/payload-types";
import { getPayloadClient, isCmsConfigured } from "./get-payload";
import { DEFAULT_UTILITY_PAGES } from "./defaults/resources";

type CollectionSlug = keyof Config["collections"];
type GlobalSlug = keyof Config["globals"];

function formatBlogDate(date: string | Date | undefined): string {
  if (!date) return "";
  if (typeof date === "string") return date;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isCmsConfigured()) return BLOG_POSTS;

  const payload = await getPayloadClient();
  if (!payload) return BLOG_POSTS;

  try {
    const { docs } = await payload.find({
      collection: "blog-posts",
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
    });

    if (!docs.length) return BLOG_POSTS;

    return docs.map((doc) => ({
      slug: doc.slug,
      category: doc.category,
      categoryColor: doc.categoryColor,
      title: doc.title,
      excerpt: doc.excerpt,
      author: doc.author,
      date: formatBlogDate(doc.publishedAt),
      readTime: doc.readTime,
      thumbnail: resolveMediaUrl(doc.thumbnailImage, doc.thumbnail) || "",
      content: (doc.content ?? []).map((c: { paragraph: string }) => c.paragraph),
    }));
  } catch {
    return BLOG_POSTS;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export async function getGlobal<T>(slug: GlobalSlug, fallback: T): Promise<T> {
  if (!isCmsConfigured()) return fallback;

  const payload = await getPayloadClient();
  if (!payload) return fallback;

  try {
    const data = await payload.findGlobal({ slug, depth: 2 });
    if (!data) return fallback;
    return data as T;
  } catch {
    return fallback;
  }
}

/**
 * A page-section global, typed from the Payload config rather than from a
 * hand-written fallback shape — null when the CMS has no row for it yet.
 */
export async function getSectionGlobal<S extends GlobalSlug>(
  slug: S,
): Promise<Config["globals"][S] | null> {
  return getGlobal<Config["globals"][S] | null>(slug, null);
}

export async function getCollection<T>(
  slug: CollectionSlug,
  fallback: T[],
  sort = "sortOrder",
): Promise<T[]> {
  if (!isCmsConfigured()) return fallback;

  const payload = await getPayloadClient();
  if (!payload) return fallback;

  try {
    const { docs } = await payload.find({
      collection: slug,
      sort,
      limit: 200,
      depth: 2,
    });

    if (!docs.length) return fallback;
    return docs as T[];
  } catch {
    return fallback;
  }
}

export async function getSiteSettings() {
  return getGlobal("site-settings", {
    siteName: "Genetico",
    siteDescription:
      "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format, and enables AI-assisted clinical decision-making for rare and genetic disorders.",
    contactEmail: "hello@genetico.in",
    contactEmailCc: "priyanshu.vats@genetico.in",
    newsletterUrl: "https://mailchi.mp/genetico/rare-insights",
    featuredVideoUrl: "https://youtu.be/AepeMOIsE-M?si=ffEdpbQ4_mNY9YWt",
    contactRoles: [
      {
        id: "clinician",
        label: "Clinician or Hospital",
        description:
          "We'll connect you to our medical team to walk through workflows, integration and a 2-week pilot at your center.",
      },
      {
        id: "public-health",
        label: "Government or Public Health",
        description:
          "We'll route you to our public health team to discuss screening frameworks, registries and population-scale deployment.",
      },
      {
        id: "industry",
        label: "Life Science or Industry",
        description:
          "We'll connect you with partnerships to explore cohort access, real-world evidence and research collaboration.",
      },
      {
        id: "investor",
        label: "Investor",
        description:
          "We'll set up time with the founding team to walk through the platform, traction and roadmap.",
      },
    ],
    contactForm: {
      intro:
        "Genetico connects clinicians, institutions, government bodies, and industry stakeholders through a unified digital infrastructure. Tell us who you are and we'll route you to the right person.",
      submitLabel: "Talk to Our Team",
      successMessage: "Thanks — your message was sent. Our team will be in touch soon.",
      errorMessage: "Unable to send your message right now.",
      privacyNote:
        "By submitting, you agree to be contacted by Genetico. We never share your information.",
    },
  });
}

export async function getNavigation() {
  return getGlobal("navigation", {
    ctaLabel: "Book a demo",
    mainNav: [
      { label: "About", href: "/about-us", type: "link" as const, isDark: true },
      { label: "Platform", href: "/platform", type: "link" as const, isDark: false },
      { label: "Solutions", href: "", type: "dropdown" as const, isDark: false },
      { label: "Resources", href: "/resources", type: "link" as const, isDark: false },
    ],
    solutionsNav: [
      { label: "Hospital / Clinician / CoE", href: "/hospital", icon: "🏥" },
      { label: "Life Science / Biotech organisation", href: "/life-science", icon: "💊" },
      { label: "Public health", href: "/public-health", icon: "💊" },
    ],
  });
}

export async function getFooterContent() {
  return getGlobal("footer", {
    tagline:
      "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format & enables AI-assisted clinical decision-making for rare and genetic disorders.",
    copyrightText: "Genetico. All rights reserved.",
    contactLabel: "Contact Us",
    sectionLabels: {
      menuHeading: "Menu",
      solutionsHeading: "Solutions",
    },
    menuLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us" },
      { label: "How it Works", href: "/platform" },
      { label: "For Business", href: "/hospital" },
      { label: "FAQs", href: "/#faqs" },
    ],
    solutionsLinks: [
      { label: "Hospital / Clinician / CoE", href: "/hospital" },
      { label: "Life Science / Biotech organisation", href: "/life-science" },
      { label: "Public health", href: "/public-health" },
    ],
    socialLinks: [
      { name: "X", href: "https://x.com/genetico_in", platform: "x" as const },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/genetico-in/",
        platform: "linkedin" as const,
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@geneticord?si=v-e6PZkTFHRrJaGr",
        platform: "youtube" as const,
      },
    ],
    legalLinks: [{ label: "Privacy Policy", href: "/privacy-policy" }],
  });
}

export async function getUtilityPagesContent() {
  return getGlobal("utility-pages", DEFAULT_UTILITY_PAGES as UtilityPage);
}

export async function getTeamMembers() {
  return getCollection<CmsTeamMember>("team-members", [] as CmsTeamMember[]);
}

export async function getPartners() {
  return getCollection<CmsPartner>("partners", [] as CmsPartner[]);
}

// export async function getNewsArticles() {
//   return getCollection<CmsNewsArticle>("news-articles", [] as CmsNewsArticle[]);
// }

export async function getGrantsAwards() {
  return getCollection<CmsGrantAward>("grants-awards", [] as CmsGrantAward[]);
}

export async function getEcosystemModules() {
  return getCollection<CmsEcosystemModule>("ecosystem-modules", [] as CmsEcosystemModule[]);
}

export async function getEcosystemGaps() {
  return getCollection<CmsEcosystemGap>("ecosystem-gaps", [] as CmsEcosystemGap[]);
}

export async function getFeaturedVideos() {
  return getCollection<CmsFeaturedVideo>("featured-videos", [] as CmsFeaturedVideo[]);
}

export async function getShortVideos() {
  return getCollection<CmsShortVideo>("short-videos", [] as CmsShortVideo[]);
}

export async function getExternalArticles() {
  return getCollection<CmsExternalArticle>("external-articles", [] as CmsExternalArticle[]);
}
