import type { BlogPost } from "@/lib/blogs";

export type CtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | null;
};

export type HeroSlide = {
  id: string;
  title: string;
  eyebrow: string;
  cta: string;
  href: string;
  image: string;
};

export type EcosystemModule = {
  icon?: string;
  title: string;
  href: string;
  desc: string;
  problem: string;
  solution: string;
};

export type EcosystemGap = {
  tab: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
};

export type Partner = {
  name: string;
  logo: string;
};

export type NewsArticle = {
  tag: string;
  title: string;
  excerpt?: string;
  readTime?: string;
  image?: string;
  author?: string;
  date?: string;
  href?: string;
  featured?: boolean;
};

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  about: string;
  image: string;
  linkedinUrl?: string;
  color: string;
  initials: string;
  bg: string;
};

export type GrantAward = {
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  category?: "left" | "right";
};

export type PlatformFeature = {
  id: string;
  number: string;
  tabTitle: string;
  category: string;
  subheading: string;
  title: string;
  description: string;
  bullets: string[];
  illustration: string;
};

export type PlatformCapability = {
  number: string;
  title: string;
  description: string;
  badge: string;
};

export type LongitudinalColumn = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

export type DeploymentOption = {
  title: string;
  description: string;
};

export type SecurityCard = {
  title: string;
  description: string;
};

export type PublicHealthImpactFeature = {
  number: string;
  category: string;
  title: string;
};

export type PublicHealthTierUser = {
  role: string;
  description: string;
};

export type PublicHealthTier = {
  id: string;
  tabLabel: string;
  bannerLabel: string;
  title: string;
  happens: string[];
  dataFlows: string[];
  users: PublicHealthTierUser[];
};

export type PublicHealthClassification = {
  id: string;
  level: string;
  timeBadge?: string;
  title: string;
  description: string;
  tags: string[];
};

export type ContactRole = {
  id?: string;
  label: string;
  description: string;
};

export type ContactFormConfig = {
  intro?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  privacyNote?: string;
};

export type AboutPageData = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    labels: string[];
  };
  vision: { eyebrow: string; heading: string };
  foundations: { index: string; title: string; body: string }[];
  leadership: { eyebrow: string; heading: string; subtitle: string };
  grants: { eyebrow: string; heading: string; description: string };
  cta: PageCta;
  team: TeamMember[];
  grantItems: GrantAward[];
};

export type PlatformPageData = {
  hero: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
  };
  featuresSection: {
    eyebrow: string;
    heading: string;
    description: string;
    features: PlatformFeature[];
  };
  clinicalIntelligence: {
    eyebrow: string;
    heading: string;
    description: string;
    capabilities: PlatformCapability[];
  };
  longitudinalCare: {
    eyebrow: string;
    heading: string;
    description: string;
    columns: LongitudinalColumn[];
  };
  infrastructure: {
    eyebrow: string;
    heading: string;
    description: string;
    integrationTags: string[];
    integrationsTitle: string;
    integrationsDescription: string;
    deploymentTitle: string;
    deploymentDescription: string;
    deploymentOptions: DeploymentOption[];
  };
  security: {
    eyebrow: string;
    heading: string;
    description: string;
    cards: SecurityCard[];
  };
  cta: PageCta;
};

export type PublicHealthPageData = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    image: string;
  };
  impact: {
    eyebrow: string;
    heading: string;
    description: string;
    features: PublicHealthImpactFeature[];
  };
  threeTier: {
    eyebrow: string;
    heading: string;
    description: string;
    tiers: PublicHealthTier[];
  };
  architecture: {
    eyebrow: string;
    heading: string;
    description: string;
    classificationLabel: string;
    classifications: PublicHealthClassification[];
  };
  cta: PageCta;
};

export type ResourcesPageData = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  filterTabs: string[];
  blogsSection: { heading: string; seeAllLabel: string; seeAllHref: string };
  blogListing: {
    title: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    description: string;
    backLabel: string;
    backHref: string;
  };
  newsletterCta: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
  featuredVideo: FeaturedVideo;
  shortVideos: (ShortVideo & { categoryColor?: string })[];
  externalArticles: ExternalArticle[];
  sectionHeadings: { videos: string; articles: string };
  deepDivesSection: { heading: string; subtitle: string; seeAllLabel: string; seeAllHref: string };
  deepDives: DeepDive[];
};

export type DeepDive = {
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  youtubeUrl: string;
  duration: string;
  sourceLabel: string;
  thumbnailGradient?: string;
  tags: string[];
  videoLeft?: boolean;
};

export type FeaturedVideo = {
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  articleLink?: string;
  tags: string[];
};

export type ShortVideo = {
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  duration: string;
};

export type ExternalArticle = {
  title: string;
  url: string;
};

export type NewsResourceItem = {
  id: string;
  collection:
    | "blog-posts"
    | "featured-videos"
    | "short-videos"
    | "deep-dives"
    | "external-articles";
  category: string;
  categoryColor?: string;
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  thumbnail: string;
  href: string;
  external?: boolean;
};

export type PageCta = {
  heading: string;
  description: string;
  buttons: CtaButton[];
};

export type WhoWeAreParagraph = {
  text: string;
  highlights: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HomePageData = {
  heroSlides: HeroSlide[];
  whoWeAre: {
    eyebrow: string;
    paragraphs: WhoWeAreParagraph[];
  };
  ecosystemChallenges: { heading: string; description: string };
  ecosystemGapsSection: { heading: string; description: string };
  partnersSection: { heading: string; description: string };
  securitySection: { heading: string; description: string; features: string[] };
  newsSection: { heading: string; description: string; ctaLabel: string };
  faqSection: {
    eyebrow: string;
    heading: string;
    description: string;
    items: FaqItem[];
  };
  cta: PageCta;
  modules: EcosystemModule[];
  gaps: EcosystemGap[];
  partners: Partner[];
  featuredNewsItem: NewsResourceItem | null;
  sidebarNewsItems: NewsResourceItem[];
};
