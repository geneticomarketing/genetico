import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";
import { BLOG_POSTS } from "../../lib/blogs";
import { SOLUTIONS_CONTENT } from "../../lib/solutions-content";
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_CC,
  FEATURED_VIDEO_URL,
  NEWSLETTER_URL,
} from "../../lib/contact";
import { HOSPITAL_PATH, PHARMA_PATH, PUBLIC_HEALTH_PATH, leadFormHref } from "../../lib/routes";

async function seed() {
  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    console.error("Set DATABASE_URI in .env before seeding.");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log("Seeding site settings...");
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "Genetico",
      siteDescription:
        "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format, and enables AI-assisted clinical decision-making for rare and genetic disorders.",
      contactEmail: CONTACT_EMAIL,
      contactEmailCc: CONTACT_EMAIL_CC,
      calendlyUrl: CALENDLY_URL,
      newsletterUrl: NEWSLETTER_URL,
      featuredVideoUrl: FEATURED_VIDEO_URL,
    },
  });

  console.log("Seeding navigation...");
  await payload.updateGlobal({
    slug: "navigation",
    data: {
      ctaLabel: "Book a demo",
      ctaHref: leadFormHref("/"),
      mainNav: [
        { label: "About", href: "/about-us", type: "link", isDark: true },
        { label: "Platform", href: "/platform", type: "link", isDark: false },
        { label: "Solutions", href: "", type: "dropdown", isDark: false },
        { label: "Resources", href: "/resources", type: "link", isDark: false },
      ],
      solutionsNav: [
        { label: "Hospital / Clinician / CoE", href: HOSPITAL_PATH, icon: "🏥" },
        { label: "Life Science / Biotech organisation", href: PHARMA_PATH, icon: "💊" },
        { label: "Public health", href: PUBLIC_HEALTH_PATH, icon: "💊" },
      ],
    },
  });

  console.log("Seeding footer...");
  await payload.updateGlobal({
    slug: "footer",
    data: {
      tagline:
        "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format & enables AI-assisted clinical decision-making for rare and genetic disorders.",
      copyrightText: "Genetico. All rights reserved.",
      contactLabel: "Contact Us",
      contactHref: CALENDLY_URL,
      menuLinks: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about-us" },
        { label: "How it Works", href: "/platform" },
        { label: "For Business", href: HOSPITAL_PATH },
        { label: "FAQs", href: "/coming-soon" },
      ],
      solutionsLinks: [
        { label: "Hospital / Clinician / CoE", href: HOSPITAL_PATH },
        { label: "Life Science / Biotech organisation", href: PHARMA_PATH },
        { label: "Public health", href: PUBLIC_HEALTH_PATH },
      ],
      socialLinks: [
        { name: "X", href: "https://x.com/genetico_in", platform: "x" },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/genetico-in/",
          platform: "linkedin",
        },
        {
          name: "YouTube",
          href: "https://youtube.com/@geneticord?si=v-e6PZkTFHRrJaGr",
          platform: "youtube",
        },
      ],
      legalLinks: [{ label: "Privacy Policy", href: "/privacy-policy" }],
    },
  });

  console.log("Seeding home page...");
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      heroSlides: [
        {
          id: "clinicians",
          title: "Designed for the Complexity of Rare and Genetic Disease Care",
          body: "Streamline clinical workflows, capture structured patient data, leverage AI-assisted documentation, and access decision-support tools built specifically for genetics and rare diseases.",
          cta: "Explore Clinical Solutions",
          href: "/platform",
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
      ],
      ecosystemChallenges: {
        heading: "Where the System Breaks",
        description:
          "Rare disease care spans clinicians, public health, research, and centers of excellence — yet each operates with fragmented tools and disconnected data.",
      },
      ecosystemGaps: {
        heading: "Closing Critical Gaps in the Ecosystem",
        description:
          "From diagnosis to policy, structural gaps prevent rare disease programs from scaling with the speed and precision patients deserve.",
      },
      partners: {
        heading: "Trusted by Leading Institutions & Programs",
        description:
          "Genetico collaborates with healthcare institutions, research organizations, and public health programs building the future of rare disease care.",
      },
      security: {
        heading: "Enterprise-Grade Security & Compliance",
        description:
          "Built for healthcare environments with rigorous data protection, access control, and auditability.",
        features: [
          { text: "Your institution retains full ownership and control of its data." },
          { text: "Access is restricted based on user roles and responsibilities." },
          { text: "Every action is securely logged for complete traceability." },
          { text: "Data is protected through encryption in transit and at rest." },
          { text: "Hosted on enterprise-grade infrastructure with continuous monitoring." },
        ],
      },
      news: {
        heading: "Explore Our News & Articles",
        description: "Stay updated with the latest from Genetico and the rare disease ecosystem.",
        ctaLabel: "See all >>",
        ctaHref: "/resources",
      },
      cta: {
        heading: "Building the Future of Rare Disease Intelligence Together",
        description:
          "Partner with Genetico to transform clinical workflows, accelerate diagnosis, and generate research-ready data at scale.",
        buttons: [
          { label: "Schedule a Demo", href: CALENDLY_URL, variant: "primary" },
          { label: "Subscribe to Newsletter", href: NEWSLETTER_URL, variant: "secondary" },
        ],
      },
    },
  });

  console.log("Seeding blog posts...");
  for (const post of BLOG_POSTS) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });

    const data = {
      slug: post.slug,
      category: post.category,
      categoryColor: post.categoryColor,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: new Date(post.date).toISOString(),
      readTime: post.readTime,
      thumbnail: post.thumbnail,
      content: post.content.map((paragraph) => ({ paragraph })),
    };

    if (existing.docs[0]) {
      await payload.update({ collection: "blog-posts", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "blog-posts", data });
    }
  }

  console.log("Seeding solution pages...");
  for (const variant of ["hospital", "pharma"] as const) {
    const content = SOLUTIONS_CONTENT[variant];
    const existing = await payload.find({
      collection: "solution-pages",
      where: { slug: { equals: variant } },
      limit: 1,
    });

    const data = {
      slug: variant,
      hero: content.hero,
      clinicalBurden: {
        ...content.clinicalBurden,
        cards: content.clinicalBurden.cards.map((card) => ({
          ...card,
          collapsedTitle: card.collapsedTitle.map((line) => ({ line })),
        })),
      },
      howItWorks: content.howItWorks,
      measurableOutcomes: content.measurableOutcomes,
      cta: content.cta,
    };

    if (existing.docs[0]) {
      await payload.update({ collection: "solution-pages", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "solution-pages", data });
    }
  }

  console.log("Seeding partners...");
  const partners = [
    { name: "10,000 Startups", logoUrl: "/new/10000startups.png", sortOrder: 0 },
    { name: "Amity University", logoUrl: "/new/amity-logo.png", sortOrder: 1 },
    { name: "BIRAC", logoUrl: "/new/BIRAC Logo.jpg", sortOrder: 2 },
    { name: "Catalyst", logoUrl: "/new/Catalyst logo Black final.png", sortOrder: 3 },
    {
      name: "HDFC Startup Buildup Parivartan",
      logoUrl: "/new/HDFC-Startup-Buildup-Parivartan-Logo-Approved.jpg",
      sortOrder: 4,
    },
    { name: "Indo-Sweden Innovation Centre", logoUrl: "/new/indo-sweden.png", sortOrder: 5 },
    { name: "JKEDI", logoUrl: "/new/JKEDI.png", sortOrder: 6 },
    { name: "MeitY Startup Hub", logoUrl: "/new/meity.jpg", sortOrder: 7 },
    { name: "Runway", logoUrl: "/new/runway.jpg", sortOrder: 8 },
    { name: "UPES", logoUrl: "/new/upes.jpg", sortOrder: 9 },
  ];

  for (const partner of partners) {
    const existing = await payload.find({
      collection: "partners",
      where: { name: { equals: partner.name } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "partners", id: existing.docs[0].id, data: partner });
    } else {
      await payload.create({ collection: "partners", data: partner });
    }
  }

  console.log("Seed complete! Visit http://localhost:3000/admin to manage content.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
