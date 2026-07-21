import { CALENDLY_URL, NEWSLETTER_URL } from "@/lib/contact";
import { BLOG_POSTS, blogHref } from "@/lib/blogs";
import {
  COMING_SOON_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PUBLIC_HEALTH_PATH,
} from "@/lib/routes";
import { DEFAULT_RESOURCES_PAGE } from "./resources";
import type {
  EcosystemGap,
  EcosystemModule,
  HeroSlide,
  HomePageData,
  NewsArticle,
  NewsResourceItem,
  Partner,
} from "../types";

function blogToNewsItem(post: (typeof BLOG_POSTS)[number]): NewsResourceItem {
  return {
    id: `blog-posts:${post.slug}`,
    collection: "blog-posts",
    category: post.category,
    categoryColor: post.categoryColor,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    thumbnail: post.thumbnail,
    href: blogHref(post.slug),
    external: false,
  };
}

function articleToNewsItem(
  article: (typeof DEFAULT_RESOURCES_PAGE.externalArticles)[number],
): NewsResourceItem {
  return {
    id: `external-articles:${article.url}`,
    collection: "external-articles",
    category: "Article",
    title: article.title,
    href: article.url,
    thumbnail: "",
    external: true,
  };
}

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "clinicians",
    title: "Designed for the Complexity of Rare and Genetic Disease Care",
    eyebrow: "Testing eyebrow",
    cta: "Explore Clinical Solutions",
    href: PLATFORM_PATH,
    image: "/hero/hero-bg.webp",
  },
  {
    id: "public-health",
    title: "Powering Rare Disease Programs at Population Scale",
    eyebrow: "Testing eyebrow",

    cta: "Explore Public Health Solutions",
    href: PUBLIC_HEALTH_PATH,
    image: "/hero/hero-dna.jpg",
  },
  {
    id: "research",
    title: "Transforming Clinical Data into Research-Ready Intelligence",
    eyebrow: "Testing eyebrow",

    cta: "Explore Research Solutions",
    href: PHARMA_PATH,
    image: "/hero/hero-molecule.jpg",
  },
  {
    id: "ecosystem",
    title: "Connecting Stakeholders Across the Rare Disease Ecosystem",
    eyebrow: "Testing eyebrow",

    cta: "Discover the Ecosystem",
    href: HOSPITAL_PATH,
    image: "/hero/hero-antibody.jpg",
  },
];

export const DEFAULT_ECOSYSTEM_MODULES: EcosystemModule[] = [
  {
    icon: "module-clinicians",
    title: "Clinicians",
    href: PLATFORM_PATH,
    desc: "Managing complex genetic cases with fragmented records, extensive documentation, and limited clinical support.",
    problem:
      "Managing complex genetic cases with fragmented records, extensive documentation, and limited clinical support.",
    solution:
      "AI-assisted workflows, structured clinical data capture, and integrated decision support designed specifically for rare disease care.",
  },
  {
    icon: "module-clinicians",
    title: "Government & Public Health",
    href: PUBLIC_HEALTH_PATH,
    desc: "Limited visibility into patient journeys, outcomes, disease burden, and program performance.",
    problem:
      "Limited visibility into patient journeys, outcomes, disease burden, and program performance.",
    solution:
      "National-scale registries, screening programs, patient tracking, and real-time analytics for data-driven decision making.",
  },
  {
    icon: "module-clinicians",
    title: "Research & Biotech",
    href: PHARMA_PATH,
    desc: "Difficulty generating high-quality, longitudinal datasets for research and innovation.",
    problem:
      "Difficulty generating high-quality, longitudinal datasets for research and innovation.",
    solution:
      "Research-ready structured data, advanced analytics, cohort identification, and real-world evidence generation.",
  },
  {
    icon: "module-clinicians",
    title: "Centres of Excellence",
    href: HOSPITAL_PATH,
    desc: "Complex workflows, multidisciplinary care coordination, and increasing patient volumes.",
    problem:
      "Complex workflows, multidisciplinary care coordination, and increasing patient volumes.",
    solution:
      "Unified workflows, centralized data management, AI-assisted documentation, and operational insights.",
  },
];

export const DEFAULT_ECOSYSTEM_GAPS: EcosystemGap[] = [
  {
    tab: "Diagnosis & Access",
    problemTitle: "Years of Diagnostic Delay",
    problemDesc:
      "Patients often experience years of diagnostic delays due to limited awareness, fragmented information, and complex referral pathways.",
    solutionTitle: "Structured, Connected Pathways",
    solutionDesc:
      "Structured patient journeys, AI-assisted clinical workflows, and connected referral pathways that support earlier diagnosis and access to care.",
  },
  {
    tab: "Primary Care Gap",
    problemTitle: "Missed Early Signs",
    problemDesc:
      "Early signs are frequently missed due to limited rare disease awareness and lack of standardized screening approaches.",
    solutionTitle: "Digital Screening Workflows",
    solutionDesc:
      "Digital screening workflows, referral support systems, and analytics that help identify patients sooner.",
  },
  {
    tab: "Secondary Care Gap",
    problemTitle: "Fragmented Clinical Information",
    problemDesc:
      "Clinical information becomes fragmented as patients move across providers, departments, and institutions.",
    solutionTitle: "Longitudinal Patient Records",
    solutionDesc:
      "Longitudinal patient records and connected care workflows that ensure critical information remains accessible throughout the care journey.",
  },
  {
    tab: "Tertiary Care Overload",
    problemTitle: "Specialist Centre Overload",
    problemDesc:
      "Specialist centres face increasing patient volumes, extensive documentation requirements, and complex genetic workflows.",
    solutionTitle: "AI-Assisted Rare Disease Workflows",
    solutionDesc:
      "AI-assisted documentation, clinical decision support, structured data capture, and workflow automation designed for rare disease programs.",
  },
  {
    tab: "Policy & Planning Gap",
    problemTitle: "Limited Real-World Data",
    problemDesc:
      "Limited access to reliable, real-world data makes it difficult to assess disease burden, monitor outcomes, and plan interventions effectively.",
    solutionTitle: "Population-Level Evidence",
    solutionDesc:
      "Population-level registries, program analytics, and evidence generation that support informed policy and resource allocation decisions.",
  },
];

export const DEFAULT_PARTNERS: Partner[] = [
  { name: "10,000 Startups", logo: "/new/10000startups.png" },
  { name: "Amity University", logo: "/new/amity-logo.png" },
  { name: "BIRAC", logo: "/new/BIRAC Logo.jpg" },
  { name: "Catalyst", logo: "/new/Catalyst logo Black final.png" },
  {
    name: "HDFC Startup Buildup Parivartan",
    logo: "/new/HDFC-Startup-Buildup-Parivartan-Logo-Approved.jpg",
  },
  { name: "Indo-Sweden Innovation Centre", logo: "/new/indo-sweden.png" },
  { name: "JKEDI", logo: "/new/JKEDI.png" },
  { name: "MeitY Startup Hub", logo: "/new/meity.jpg" },
  { name: "Runway", logo: "/new/runway.jpg" },
  { name: "UPES", logo: "/new/upes.jpg" },
];

export const DEFAULT_NEWS_FEATURED: NewsArticle = {
  tag: "News",
  title: "How AIIMS Delhi reduced rare disease diagnosis time from 3 weeks to 4 days",
  excerpt:
    "AIIMS Delhi, one of India's leading medical institutions, reduced rare disease diagnosis time from weeks to days using Genetico's integrated diagnostic intelligence platform.",
  author: "Arihant Mehra",
  date: "May 7, 2023",
  readTime: "3 min read",
  image: "/images/news-aiims.jpg",
  href: COMING_SOON_PATH,
  featured: true,
};

export const DEFAULT_NEWS_ARTICLES: NewsArticle[] = [
  {
    tag: "Research",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "3 min read",
  },
  {
    tag: "Research",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "3 min read",
  },
  {
    tag: "Research",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "3 min read",
  },
  {
    tag: "Research",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "3 min read",
  },
];

export const DEFAULT_HOME_PAGE: HomePageData = {
  heroSlides: DEFAULT_HERO_SLIDES,
  whoWeAre: {
    eyebrow: "Who We Are",
    paragraphs: [
      {
        text: "Genetico is building the digital backbone for the rare and genetic disease ecosystem.",
        highlights: ["digital backbone", "rare and genetic disease ecosystem"],
      },
      {
        text: "For over seven years, we have worked with clinicians, institutions, government programs, and researchers to solve fragmented rare disease data.",
        highlights: ["fragmented rare disease data"],
      },
      {
        text: "Our AI platform unifies workflows, registries, decision support, analytics, and research into one ecosystem, turning fragmented data into actionable intelligence that improves care, accelerates research, strengthens public health, and supports better decisions.",
        highlights: ["AI platform", "one ecosystem", "actionable intelligence"],
      },
    ],
  },
  ecosystemChallenges: {
    heading: "One Ecosystem. Multiple Challenges. Shared Impact.",
    description:
      "Rare disease care spans clinicians, public health, research, and centers of excellence — yet each operates with fragmented tools and disconnected data.",
  },
  ecosystemGapsSection: {
    heading: "The Rare Disease Journey Remains Fragmented",
    description:
      "From first symptoms to long-term care, patients navigate a complex system where information, expertise, and support are often disconnected.",
  },
  partnersSection: {
    heading: "Trusted Across the Rare Disease Ecosystem",
    description:
      "We collaborate with leading institutions, research organizations, and public health programs building the future of rare disease care in India and beyond.",
  },
  securitySection: {
    heading: "Built for Trust. Designed for Healthcare.",
    description: "Enterprise-grade security and compliance built into every layer of the platform.",
    features: [
      "Your institution retains full ownership and control of its data.",
      "Access is restricted based on user roles and responsibilities.",
      "Every action is securely logged for complete traceability.",
      "Data is protected through encryption in transit and at rest.",
      "Hosted on enterprise-grade infrastructure with continuous monitoring.",
    ],
  },
  newsSection: {
    heading: "Explore Our News & Articles",
    description: "Stay updated with the latest from Genetico and the rare disease ecosystem.",
    ctaLabel: "See all",
    // ctaHref: "/resources",
  },
  faqSection: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    description:
      "Answers to common questions about Genetico, IndiGeneUs.AI, and how we support rare and genetic disease care.",
    items: [
      {
        question: "What is Genetico?",
        answer:
          "Genetico is building the digital backbone for the rare and genetic disease ecosystem. By connecting clinical care, research, public health, and AI, we transform fragmented healthcare data into structured, interoperable, and actionable intelligence.",
      },
      {
        question: "What is IndiGeneUs.AI?",
        answer:
          "IndiGeneUs.AI is Genetico's AI-enabled clinical genetics platform. It supports structured phenotype capture, pedigree analysis, clinical decision support, longitudinal patient management, and research workflows through a unified digital ecosystem.",
      },
      {
        question: "Who is Genetico built for?",
        answer:
          "Genetico is designed for clinicians, hospitals, diagnostic laboratories, research institutions, biotechnology organizations, and public health programs working in rare and genetic diseases.",
      },
      {
        question: "Can Genetico integrate with our existing systems?",
        answer:
          "Yes. IndiGeneUs.AI is designed to integrate with existing healthcare infrastructure, including hospital and laboratory information systems, enabling organizations to strengthen their clinical genetics workflows without disrupting existing operations.",
      },
      {
        question: "Why does structured clinical data matter?",
        answer:
          "Rare disease data often exists in fragmented reports, PDFs, and free-text clinical notes. Structured data enables better clinical decision-making, AI-assisted analysis, longitudinal patient management, research, and public health initiatives. It forms the foundation for a connected rare disease ecosystem.",
      },
    ],
  },
  cta: {
    heading: "Building the Future of Rare Disease Intelligence Together",
    description:
      "Discover how AI-enabled workflows, clinical decision support, and structured data infrastructure can help advance rare disease care, research, and public health initiatives.",
    buttons: [
      { label: "Schedule a Demo", href: CALENDLY_URL, variant: "primary" },
      { label: "Subscribe to Newsletter", href: NEWSLETTER_URL, variant: "secondary" },
    ],
  },
  modules: DEFAULT_ECOSYSTEM_MODULES,
  gaps: DEFAULT_ECOSYSTEM_GAPS,
  partners: DEFAULT_PARTNERS,
  featuredNewsItem: BLOG_POSTS[0] ? blogToNewsItem(BLOG_POSTS[0]) : null,
  sidebarNewsItems: [
    ...(BLOG_POSTS[1] ? [blogToNewsItem(BLOG_POSTS[1])] : []),
    ...DEFAULT_RESOURCES_PAGE.externalArticles.slice(0, 2).map(articleToNewsItem),
  ],
};
