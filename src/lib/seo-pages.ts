import type { Metadata } from "next";

import {
  ABOUT_PATH,
  BLOG_PATH,
  COOKIE_POLICY_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PRIVACY_POLICY_PATH,
  PUBLIC_HEALTH_PATH,
  RARE_INSIGHTS_PATH,
  RESOURCES_PATH,
} from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

/**
 * Each page's title and meta description, written for search results.
 *
 * These are deliberately not taken from the page's hero copy: a hero headline
 * is written for the page and may be reworded in the CMS for design reasons,
 * while a search title has to name what the page is about in under 60
 * characters. Keep titles under ~50 characters (the layout appends
 * " | Genetico") and descriptions between 120 and 160.
 *
 * `label` is the short name used in breadcrumbs and structured data.
 */
export const STATIC_PAGE_SEO = {
  home: {
    path: "/",
    label: "Home",
    // The root page gets no "| Genetico" suffix from the layout template, so the brand is written in.
    title: "Genetico — AI Platform for Rare and Genetic Disease Care",
    description:
      "Genetico builds IndiGeneUs.AI, the AI-enabled clinical genetics platform used at AIIMS New Delhi and CDFD Hyderabad to diagnose and manage rare diseases.",
  },
  about: {
    path: ABOUT_PATH,
    label: "About us",
    title: "About Us: Health Technology for Rare Disease Care",
    description:
      "Genetico is a health technology company building digital infrastructure for rare and genetic disease care in India, across clinics, research and public health.",
  },
  platform: {
    path: PLATFORM_PATH,
    label: "IndiGeneUs.AI platform",
    title: "IndiGeneUs.AI Clinical Genetics Platform",
    description:
      "IndiGeneUs.AI brings a genomic EMR, pedigree charting, AI-assisted differential diagnosis, longitudinal patient records and analytics into one secure platform.",
  },
  hospital: {
    path: HOSPITAL_PATH,
    label: "Hospitals & Centres of Excellence",
    title: "Software for Rare Disease Centres of Excellence",
    description:
      "IndiGeneUs.AI gives clinical genetics teams at hospitals and Centres of Excellence AI-assisted workflows, differential diagnosis and longitudinal patient care.",
  },
  lifeScience: {
    path: PHARMA_PATH,
    label: "Life sciences & research",
    title: "Rare Disease Research Data for Life Sciences",
    description:
      "Structured, research-ready rare disease data captured at the point of care, for registries, natural history studies, cohort discovery and real-world evidence.",
  },
  publicHealth: {
    path: PUBLIC_HEALTH_PATH,
    label: "Public health & government",
    title: "Rare Disease Programmes for Public Health",
    description:
      "IndiGeneUs.AI connects primary health centres, district hospitals and Centres of Excellence for NPRD programmes, with registries, referrals and live dashboards.",
  },
  resources: {
    path: RESOURCES_PATH,
    label: "Resources",
    title: "Rare Disease Talks, Videos and Articles",
    description:
      "Talks, interviews and articles from Genetico on rare disease diagnosis, genomic EMRs, AI in clinical genetics and India's rare disease policy.",
  },
  rareInsights: {
    path: RARE_INSIGHTS_PATH,
    label: "Rare Insights newsletter",
    title: "Rare Insights: Weekly Rare Disease Research Digest",
    description:
      "Genetico's weekly newsletter: new approvals, papers and guidance in rare and genetic disease, with a short note on why each matters. Every edition archived.",
  },
  blog: {
    path: BLOG_PATH,
    label: "Blog",
    title: "Blog: Rare Disease, Genomics and Health Data",
    description:
      "Clinical insights, policy perspectives and research notes on rare disease diagnosis and genomic medicine in India, from the team behind IndiGeneUs.AI.",
  },
  privacyPolicy: {
    path: PRIVACY_POLICY_PATH,
    label: "Privacy policy",
    title: "Privacy Policy",
    description:
      "How Genetico and IndiGeneUs.AI collect, use and protect personal and clinical information, and the choices and rights you have over it.",
  },
  cookiePolicy: {
    path: COOKIE_POLICY_PATH,
    label: "Cookie policy",
    title: "Cookie Policy",
    description:
      "Which cookies genetico.in sets, why it sets them, which only load after you accept, and how to change your choice at any time.",
  },
} as const;

export type StaticPageKey = keyof typeof STATIC_PAGE_SEO;

/** The page's share image, rendered by app/og/[page]/route.tsx. */
export function ogImagePath(key: StaticPageKey): string {
  return `/og/${key}`;
}

/** Title, description, canonical URL and share image for one of the pages above. */
export function staticPageMetadata(
  key: StaticPageKey,
  overrides: { title?: string | null; description?: string | null } = {},
): Metadata {
  const seo = STATIC_PAGE_SEO[key];
  return createPageMetadata({
    title: overrides.title?.trim() || seo.title,
    description: overrides.description?.trim() || seo.description,
    path: seo.path,
    ogImage: ogImagePath(key),
  });
}

export const INDEXABLE_STATIC_PATHS = [
  STATIC_PAGE_SEO.home.path,
  STATIC_PAGE_SEO.about.path,
  STATIC_PAGE_SEO.platform.path,
  STATIC_PAGE_SEO.hospital.path,
  STATIC_PAGE_SEO.lifeScience.path,
  STATIC_PAGE_SEO.publicHealth.path,
  STATIC_PAGE_SEO.resources.path,
  STATIC_PAGE_SEO.rareInsights.path,
  STATIC_PAGE_SEO.blog.path,
  STATIC_PAGE_SEO.privacyPolicy.path,
  STATIC_PAGE_SEO.cookiePolicy.path,
] as const;
