import { resolveMediaUrl } from "./resolve-media-url";
import { BLOG_POSTS, type BlogPost } from "@/lib/blogs";
import type { Config } from "@/payload-types";
import { getPayloadClient, isCmsConfigured } from "./get-payload";

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

/** Every blog post's slug with when it last changed, for the sitemap. */
export async function getBlogSitemapEntries(): Promise<{ slug: string; updatedAt?: string }[]> {
  const payload = isCmsConfigured() ? await getPayloadClient() : null;
  if (!payload) return BLOG_POSTS.map((p) => ({ slug: p.slug }));

  try {
    const { docs } = await payload.find({
      collection: "blog-posts",
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    });
    return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
  } catch {
    return [];
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
        id: "industry",
        label: "Life Science or Research",
        description:
          "We'll show how structured, research-ready data and cohort identification support your evidence pipeline.",
      },
      {
        id: "public-health",
        label: "Government or Public Health",
        description:
          "We'll walk you through registries, screening programmes, patient tracking and programme analytics.",
      },
      {
        id: "partner",
        label: "Strategic partner",
        description:
          "We'll discuss how your organisation and Genetico could work together across the rare disease ecosystem.",
      },
      {
        id: "investor",
        label: "Investor",
        description:
          "We'll share what we have built, where it is deployed, and how Genetico is positioned in the rare and genetic disease ecosystem.",
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
      { label: "Our Story", href: "/about-us", type: "link" as const, isDark: true },
      { label: "What We Build", href: "/platform", type: "link" as const, isDark: false },
      { label: "Who We Serve", href: "", type: "dropdown" as const, isDark: false },
      { label: "Insights", href: "/resources", type: "link" as const, isDark: false },
    ],
    solutionsNav: [
      { label: "Hospital / Clinician / CoE", href: "/hospital", icon: "🏥" },
      { label: "Life Science / Biotech", href: "/life-science", icon: "💊" },
      { label: "Public Health", href: "/public-health", icon: "💊" },
    ],
  });
}

export async function getFooterContent() {
  return getGlobal("footer", {
    tagline:
      "Genetico is a health technology company developing digital solutions for the rare and genetic disease ecosystem. IndiGeneUs.AI is its platform.",
    copyrightText: "Genetico. All rights reserved.",
    contactLabel: "Contact Us",
    sectionLabels: {
      menuHeading: "Menu",
      solutionsHeading: "Who We Serve",
    },
    menuLinks: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/about-us" },
      { label: "What We Build", href: "/platform" },
      { label: "Insights", href: "/resources" },
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
