import {
  BLOG_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PRIVACY_POLICY_PATH,
  PUBLIC_HEALTH_PATH,
} from "@/lib/routes";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export const STATIC_PAGE_SEO = {
  home: {
    path: "/",
    title: "AI-Powered Rare Disease Care Platform",
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    path: "/about-us",
    title: "About Genetico",
    description:
      "Genetico builds AI-enabled digital infrastructure connecting clinical care, research, and public health to transform rare disease diagnosis, management, and outcomes.",
  },
  platform: {
    path: PLATFORM_PATH,
    title: "IndiGeneUs.AI Platform",
    description:
      "An AI-enabled digital infrastructure for rare and genetic diseases — clinical workflows, decision support, structured data capture, analytics, and research in one ecosystem.",
  },
  hospital: {
    path: HOSPITAL_PATH,
    title: "Solutions for Hospitals & Centers of Excellence",
    description:
      "Empower clinical genetics teams with AI-assisted workflows, clinical decision support, longitudinal patient management, and research-ready data on a single platform.",
  },
  lifeScience: {
    path: PHARMA_PATH,
    title: "Solutions for Life Sciences & Research",
    description:
      "Transform fragmented clinical information into standardized, research-ready datasets that support registries, natural history studies, and real-world evidence generation.",
  },
  publicHealth: {
    path: PUBLIC_HEALTH_PATH,
    title: "Public Health & Government Solutions",
    description:
      "IndiGeneUs.AI connects India's rare disease ecosystem with registries, screening programs, patient tracking, and real-time analytics for national and state-level health programs.",
  },
  resources: {
    path: "/resources",
    title: "Resources",
    description:
      "Clinical insights, videos, articles, and learning resources from Genetico on rare and genetic disease care, genomics, and health infrastructure.",
  },
  blog: {
    path: BLOG_PATH,
    title: "Blog",
    description:
      "Clinical insights, policy perspectives, and research updates on rare disease diagnosis and genomic medicine from the Genetico team.",
  },
  privacyPolicy: {
    path: PRIVACY_POLICY_PATH,
    title: "Privacy Policy",
    description:
      "How Genetico and IndiGeneUs.AI collect, use, and protect personal and clinical information.",
  },
} as const;

export const INDEXABLE_STATIC_PATHS = [
  STATIC_PAGE_SEO.home.path,
  STATIC_PAGE_SEO.about.path,
  STATIC_PAGE_SEO.platform.path,
  STATIC_PAGE_SEO.hospital.path,
  STATIC_PAGE_SEO.lifeScience.path,
  STATIC_PAGE_SEO.publicHealth.path,
  STATIC_PAGE_SEO.resources.path,
  STATIC_PAGE_SEO.blog.path,
  STATIC_PAGE_SEO.privacyPolicy.path,
] as const;
