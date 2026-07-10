import { resolveMediaUrl } from "./resolve-media-url";
import { BLOG_POSTS, type BlogPost } from "@/lib/blogs";
import {
  SOLUTIONS_CONTENT,
  type SolutionsContent,
  type SolutionsVariant,
} from "@/lib/solutions-content";
import type { SolutionPage } from "@/payload-types";
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

function mapBurdenCards(
  cards: NonNullable<SolutionPage["clinicalBurden"]>["cards"] | null | undefined,
): SolutionsContent["clinicalBurden"]["cards"] {
  return (cards ?? [])
    .map((card) => {
      const collapsedTitle = (card.collapsedTitle ?? []).map((line) => line.line).filter(Boolean);

      if (!card.label || !card.title || collapsedTitle.length < 2) return null;

      return {
        id: card.cardId ?? "",
        number: card.number,
        label: card.label,
        badge: card.badge,
        badgeDot: card.badgeDot,
        badgeBg: card.badgeBg,
        badgeText: card.badgeText,
        title: card.title,
        collapsedTitle: [collapsedTitle[0], collapsedTitle[1]] as [string, string],
        description: card.description,
      };
    })
    .filter((card): card is NonNullable<typeof card> => card !== null);
}

function mapOutcomeMetrics(
  metrics: NonNullable<SolutionPage["measurableOutcomes"]>["metrics"] | null | undefined,
): SolutionsContent["measurableOutcomes"]["metrics"] {
  return (metrics ?? [])
    .map((metric) => {
      if (!metric.label) return null;

      return {
        id: metric.metricId ?? "",
        maxPercent: metric.maxPercent,
        label: metric.label,
        ringTrack: metric.ringTrack,
        ringFill: metric.ringFill,
        accent: metric.accent,
        fromText: metric.fromText,
        toText: metric.toText,
        negative: metric.negative ?? undefined,
        positive: metric.positive,
        positiveIconBg: metric.positiveIconBg,
        centerValue: metric.centerValue ?? undefined,
        hideCenterSubLabel: metric.hideCenterSubLabel ?? undefined,
      };
    })
    .filter((metric): metric is NonNullable<typeof metric> => metric !== null);
}

function mergeSolutionsContent(doc: SolutionPage, fallback: SolutionsContent): SolutionsContent {
  const cmsCards = mapBurdenCards(doc.clinicalBurden?.cards ?? []);
  const cmsRows = (doc.howItWorks?.rows ?? [])
    .filter((row) => row?.category && row?.title && row?.number)
    .map((row) => ({
      number: row.number,
      category: row.category,
      title: row.title,
      description: row.description,
      callout: row.callout,
      reverse: row.reverse ?? undefined,
      tinted: row.tinted ?? undefined,
    }));
  const cmsMetrics = mapOutcomeMetrics(doc.measurableOutcomes?.metrics ?? []);
  const cmsButtons = (doc.cta?.buttons ?? []).filter((button) => button?.label && button?.href);

  return {
    hero: {
      eyebrow: doc.hero?.eyebrow ?? fallback.hero.eyebrow,
      titleLine1: doc.hero?.titleLine1 ?? fallback.hero.titleLine1,
      titleHighlight: doc.hero?.titleHighlight ?? fallback.hero.titleHighlight,
      subtitle: doc.hero?.subtitle ?? fallback.hero.subtitle,
    },
    clinicalBurden: {
      label: doc.clinicalBurden?.label ?? fallback.clinicalBurden.label,
      heading: doc.clinicalBurden?.heading ?? fallback.clinicalBurden.heading,
      description: doc.clinicalBurden?.description ?? fallback.clinicalBurden.description,
      cards: cmsCards.length ? cmsCards : fallback.clinicalBurden.cards,
    },
    howItWorks: {
      label: doc.howItWorks?.label ?? fallback.howItWorks.label,
      heading: doc.howItWorks?.heading ?? fallback.howItWorks.heading,
      description: doc.howItWorks?.description ?? fallback.howItWorks.description,
      rows: cmsRows.length ? cmsRows : fallback.howItWorks.rows,
    },
    measurableOutcomes: {
      label: doc.measurableOutcomes?.label ?? fallback.measurableOutcomes.label,
      heading: doc.measurableOutcomes?.heading ?? fallback.measurableOutcomes.heading,
      description: doc.measurableOutcomes?.description ?? fallback.measurableOutcomes.description,
      metrics: cmsMetrics.length ? cmsMetrics : fallback.measurableOutcomes.metrics,
    },
    cta: {
      heading: doc.cta?.heading ?? fallback.cta.heading,
      description: doc.cta?.description ?? fallback.cta.description,
      buttons: cmsButtons.length ? cmsButtons : fallback.cta.buttons,
    },
  };
}

export async function getSolutionsContent(
  variant: SolutionsVariant = "hospital",
): Promise<SolutionsContent> {
  const fallback = SOLUTIONS_CONTENT[variant];
  if (!isCmsConfigured()) return fallback;

  const payload = await getPayloadClient();
  if (!payload) return fallback;

  try {
    const { docs } = await payload.find({
      collection: "solution-pages",
      where: { slug: { equals: variant } },
      limit: 1,
      depth: 0,
    });

    const doc = docs[0];
    if (!doc) return fallback;

    return mergeSolutionsContent(doc, fallback);
  } catch {
    return fallback;
  }
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
    calendlyUrl: "https://calendly.com/priyanshu-vats-genetico/30min",
    newsletterUrl: "https://mailchi.mp/genetico/genetico-clinical-digest-signup-form",
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
      { label: "FAQs", href: "/coming-soon" },
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
