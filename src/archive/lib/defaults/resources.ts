import { NEWSLETTER_URL } from "@/lib/contact";
import { BLOG_PATH } from "@/lib/routes";
import type { ResourcesPageData } from "../types";

export const DEFAULT_RESOURCES_PAGE: ResourcesPageData = {
  hero: {
    title: "Resources",
    subtitle: "Clinical insights, updates, and learning from Genetico",
    description:
      "A curated collection of videos, articles, and clinical updates from Genetico's work in rare and genetic diseases. Built for clinicians, researchers, and healthcare teams.",
    image: "/rhero.png",
  },
  filterTabs: ["All", "Featured", "Videos", "Articles", "Blogs"],
  blogsSection: {
    heading: "Blogs",
    seeAllLabel: "See all",
    seeAllHref: BLOG_PATH,
  },
  blogListing: {
    title: "Blogs | Genetico",
    metaDescription:
      "Clinical insights, policy perspectives, and research updates on rare disease diagnosis and genomic medicine from the Genetico team.",
    eyebrow: "Genetico Blogs",
    heading: "Insights on rare disease care, genomics, and health infrastructure",
    description:
      "Perspectives from clinicians, researchers, and the Genetico team on building diagnostic workflows that scale.",
    backLabel: "Back to resources",
    backHref: "/resources",
  },
  newsletterCta: {
    heading: "Stay Updated with Genetico",
    description:
      "Get the latest clinical insights, research updates, and product developments in genetic and rare disease diagnosis.",
    buttonLabel: "Subscribe to Updates",
    buttonHref: NEWSLETTER_URL,
  },
  featuredVideo: {
    title: "How AIIMS Delhi reduced rare disease diagnosis time from 3 weeks to 4 days",
    description:
      "A documentary-style look at how structured genomic workflows and cross-department collaboration transformed rare disease diagnosis at one of India's largest referral hospitals.",
    youtubeUrl: "https://youtu.be/PXUZa_j8ep8",
    duration: "28:34",
    articleLink:
      "https://www.linkedin.com/pulse/rare-disease-indianew-approach-old-problems-arjun-gupta",
    tags: ["Case Study", "AIIMS Delhi", "Documentary"],
  },
  shortVideos: [
    {
      title: "AI Variant Calling: A 5-Minute Clinical Walkthrough",
      description:
        "A concise walkthrough of how AI-assisted variant calling supports faster, more consistent interpretation in clinical genomic workflows.",
      category: "RESEARCH",
      categoryColor: "#45B191",
      youtubeUrl: "https://youtu.be/nimBOGNS2j8",
      duration: "4:32",
    },
    {
      title: "From Sample to Report: Streamlining Rare Disease Workflows",
      description:
        "See how integrated sample tracking, analysis, and reporting reduce handoffs across multidisciplinary rare disease teams.",
      category: "CLINICAL",
      categoryColor: "#024385",
      youtubeUrl: "https://youtu.be/LSIHDd6Zm3Y",
      duration: "6:18",
    },
    {
      title: "Genetico Platform Overview for Diagnostic Labs",
      description:
        "An introduction to the core modules labs use to manage cases, collaborate on interpretation, and deliver actionable genomic reports.",
      category: "PLATFORM",
      categoryColor: "#7c3aed",
      youtubeUrl: "https://youtu.be/Sjh1KoRFI1Q",
      duration: "8:05",
    },
  ],
  externalArticles: [
    {
      title: "Don't Bring a Knife to a Gun Fight",
      url: "https://www.linkedin.com/pulse/dont-bring-knife-gun-fight-arjun-gupta-2hokc",
    },
    {
      title: "India Had a Policy — The World Just Passed a Resolution. What Now, WHO?",
      url: "https://www.linkedin.com/pulse/india-had-policy-world-just-passed-resolution-what-who-arjun-gupta-hsqsf",
    },
    {
      title: "Rare Disease Day India: 7 Reasons to Rejoice",
      url: "https://www.linkedin.com/pulse/rare-disease-day-india-7-reasons-rejoice-arjun-gupta",
    },
    {
      title: "Rare Disease in India: A New Approach to Old Problems",
      url: "https://www.linkedin.com/pulse/rare-disease-indianew-approach-old-problems-arjun-gupta",
    },
  ],
  sectionHeadings: {
    videos: "Videos",
    articles: "Articles",
  },
  deepDivesSection: {
    heading: "Deep Dives",
    subtitle: "Feature-length sessions",
    seeAllLabel: "See all",
    seeAllHref: "#deep-dives",
  },
  deepDives: [
    {
      title: "Building National Genomics Infrastructure: Summit Panel Discussion",
      description:
        "Keynote and Q&A on policy frameworks, technology stack, and cross-institutional data sharing for LMICs.",
      category: "EVENT",
      categoryColor: "#d97706",
      youtubeUrl: "https://youtu.be/PXUZa_j8ep8",
      duration: "1:12:08",
      sourceLabel: "Global Rare Disease Summit · Geneva",
      thumbnailGradient:
        "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(180,95,45,0.45) 0%, rgba(48,28,18,0.92) 55%, rgba(18,10,8,1) 100%)",
      tags: ["Policy", "Infrastructure", "LMIC"],
      videoLeft: true,
    },
    {
      title: "Rare Disease Care in India: Conversation with Leading Geneticists",
      description:
        "Panel discussion on rare disease burden, registry development, and AI-assisted clinical tools across five Indian states.",
      category: "RESEARCH",
      categoryColor: "#059669",
      youtubeUrl: "https://youtu.be/nimBOGNS2j8",
      duration: "45:22",
      sourceLabel: "ISHG Annual Conference",
      thumbnailGradient:
        "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(45,130,95,0.45) 0%, rgba(16,36,28,0.92) 55%, rgba(8,16,12,1) 100%)",
      tags: ["Genetics", "Registry", "AI"],
      videoLeft: false,
    },
  ],
};

export const DEFAULT_COMING_SOON = {
  metaTitle: "Coming Soon | Genetico",
  metaDescription: "This section of Genetico is coming soon.",
  eyebrow: "Coming soon",
  heading: "We're building something new",
  body: "This part of Genetico is still in development. Check back soon for updates on our platform, resources, and more.",
  backLabel: "Back to home",
  backHref: "/",
};

export const DEFAULT_UTILITY_PAGES = {
  comingSoon: DEFAULT_COMING_SOON,
};
