import { CALENDLY_URL, NEWSLETTER_URL } from "@/lib/contact";
import { COMING_SOON_PATH, HOSPITAL_PATH, PHARMA_PATH, PLATFORM_PATH, PUBLIC_HEALTH_PATH } from "@/lib/routes";
import type {
  EcosystemGap,
  EcosystemModule,
  HeroSlide,
  HomePageData,
  NewsArticle,
  Partner,
} from "../types";

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "clinicians",
    title: "Designed for the Complexity of Rare and Genetic Disease Care",
    body: "Streamline clinical workflows, capture structured patient data, leverage AI-assisted documentation, and access decision-support tools built specifically for genetics and rare diseases.",
    cta: "Explore Clinical Solutions",
    href: PLATFORM_PATH,
    image: "/hero/hero-bg.webp",
  },
  {
    id: "public-health",
    title: "Powering Rare Disease Programs at Population Scale",
    body: "Enable registries, screening initiatives, patient tracking, analytics, and outcome monitoring through a unified digital infrastructure designed for national and state-level programs.",
    cta: "Explore Public Health Solutions",
    href: PUBLIC_HEALTH_PATH,
    image: "/hero/hero-dna.jpg",
  },
  {
    id: "research",
    title: "Transforming Clinical Data into Research-Ready Intelligence",
    body: "Generate structured datasets, accelerate cohort identification, support longitudinal studies, and unlock AI-driven insights from real-world rare disease data.",
    cta: "Explore Research Solutions",
    href: PHARMA_PATH,
    image: "/hero/hero-molecule.jpg",
  },
  {
    id: "ecosystem",
    title: "Connecting Stakeholders Across the Rare Disease Ecosystem",
    body: "Bring together clinicians, institutions, researchers, patient groups, and policymakers through a shared platform that enables collaboration, visibility, and evidence-based decision making.",
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
    problem: "Managing complex genetic cases with fragmented records, extensive documentation, and limited clinical support.",
    solution: "AI-assisted workflows, structured clinical data capture, and integrated decision support designed specifically for rare disease care.",
  },
  {
    icon: "module-clinicians",
    title: "Government & Public Health",
    href: PUBLIC_HEALTH_PATH,
    desc: "Limited visibility into patient journeys, outcomes, disease burden, and program performance.",
    problem: "Limited visibility into patient journeys, outcomes, disease burden, and program performance.",
    solution: "National-scale registries, screening programs, patient tracking, and real-time analytics for data-driven decision making.",
  },
  {
    icon: "module-clinicians",
    title: "Research & Biotech",
    href: PHARMA_PATH,
    desc: "Difficulty generating high-quality, longitudinal datasets for research and innovation.",
    problem: "Difficulty generating high-quality, longitudinal datasets for research and innovation.",
    solution: "Research-ready structured data, advanced analytics, cohort identification, and real-world evidence generation.",
  },
  {
    icon: "module-clinicians",
    title: "Centres of Excellence",
    href: HOSPITAL_PATH,
    desc: "Complex workflows, multidisciplinary care coordination, and increasing patient volumes.",
    problem: "Complex workflows, multidisciplinary care coordination, and increasing patient volumes.",
    solution: "Unified workflows, centralized data management, AI-assisted documentation, and operational insights.",
  },
];

export const DEFAULT_ECOSYSTEM_GAPS: EcosystemGap[] = [
  {
    tab: "Diagnosis & Access",
    problemTitle: "Years of Diagnostic Delay",
    problemDesc: "Patients often experience years of diagnostic delays due to limited awareness, fragmented information, and complex referral pathways.",
    solutionTitle: "Structured, Connected Pathways",
    solutionDesc: "Structured patient journeys, AI-assisted clinical workflows, and connected referral pathways that support earlier diagnosis and access to care.",
  },
  {
    tab: "Primary Care Gap",
    problemTitle: "Missed Early Signs",
    problemDesc: "Early signs are frequently missed due to limited rare disease awareness and lack of standardized screening approaches.",
    solutionTitle: "Digital Screening Workflows",
    solutionDesc: "Digital screening workflows, referral support systems, and analytics that help identify patients sooner.",
  },
  {
    tab: "Secondary Care Gap",
    problemTitle: "Fragmented Clinical Information",
    problemDesc: "Clinical information becomes fragmented as patients move across providers, departments, and institutions.",
    solutionTitle: "Longitudinal Patient Records",
    solutionDesc: "Longitudinal patient records and connected care workflows that ensure critical information remains accessible throughout the care journey.",
  },
  {
    tab: "Tertiary Care Overload",
    problemTitle: "Specialist Centre Overload",
    problemDesc: "Specialist centres face increasing patient volumes, extensive documentation requirements, and complex genetic workflows.",
    solutionTitle: "AI-Assisted Rare Disease Workflows",
    solutionDesc: "AI-assisted documentation, clinical decision support, structured data capture, and workflow automation designed for rare disease programs.",
  },
  {
    tab: "Policy & Planning Gap",
    problemTitle: "Limited Real-World Data",
    problemDesc: "Limited access to reliable, real-world data makes it difficult to assess disease burden, monitor outcomes, and plan interventions effectively.",
    solutionTitle: "Population-Level Evidence",
    solutionDesc: "Population-level registries, program analytics, and evidence generation that support informed policy and resource allocation decisions.",
  },
];

export const DEFAULT_PARTNERS: Partner[] = [
  { name: "10,000 Startups", logo: "/new/10000startups.png" },
  { name: "Amity University", logo: "/new/amity-logo.png" },
  { name: "BIRAC", logo: "/new/BIRAC Logo.jpg" },
  { name: "Catalyst", logo: "/new/Catalyst logo Black final.png" },
  { name: "HDFC Startup Buildup Parivartan", logo: "/new/HDFC-Startup-Buildup-Parivartan-Logo-Approved.jpg" },
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
  { tag: "Research", title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed", readTime: "3 min read" },
  { tag: "Research", title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed", readTime: "3 min read" },
  { tag: "Research", title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed", readTime: "3 min read" },
  { tag: "Research", title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed", readTime: "3 min read" },
];

export const DEFAULT_HOME_PAGE: HomePageData = {
  heroSlides: DEFAULT_HERO_SLIDES,
  whoWeAre: {
    eyebrow: "Who We Are",
    paragraphs: [
      "Genetico is building the digital backbone for the rare and genetic disease ecosystem.",
      "For over seven years, we have worked with clinicians, institutions, government programs, and researchers to solve fragmented rare disease data.",
      "Our AI platform unifies workflows, registries, decision support, analytics, and research into one ecosystem, turning fragmented data into actionable intelligence that improves care, accelerates research, strengthens public health, and supports better decisions.",
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
    description:
      "Enterprise-grade security and compliance built into every layer of the platform.",
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
    ctaLabel: "See all >>",
    ctaHref: "/resources",
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
  newsFeatured: DEFAULT_NEWS_FEATURED,
  newsArticles: DEFAULT_NEWS_ARTICLES,
};
