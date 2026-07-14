import "dotenv/config";
import { getPayload } from "payload";
import type { Config } from "@/payload-types";
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
import { DEFAULT_ABOUT_PAGE, DEFAULT_GRANTS, DEFAULT_TEAM } from "../../lib/cms/defaults/about";
import {
  DEFAULT_HOME_PAGE,
  DEFAULT_ECOSYSTEM_GAPS,
  DEFAULT_ECOSYSTEM_MODULES,
  DEFAULT_NEWS_ARTICLES,
  DEFAULT_NEWS_FEATURED,
  DEFAULT_PARTNERS,
} from "../../lib/cms/defaults/home";
import { DEFAULT_PLATFORM_PAGE } from "../../lib/cms/defaults/platform";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "../../lib/cms/defaults/public-health";
import { DEFAULT_RESOURCES_PAGE, DEFAULT_UTILITY_PAGES } from "../../lib/cms/defaults/resources";
import { DEFAULT_PRIVACY_POLICY } from "../../lib/cms/defaults/legal";
import { paragraphsToLexical } from "./helpers";
import { cleanupSolutionPagesForSchemaPush } from "./cleanup-solution-pages";
import { cleanupLegacyPageGlobalsForSchemaPush } from "./cleanup-legacy-page-globals";

type CollectionSlug = keyof Config["collections"];

async function upsertByField<T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: CollectionSlug,
  field: string,
  value: string,
  data: T,
) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
  });

  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data });
    return existing.docs[0].id;
  }

  const created = await payload.create({ collection, data });
  return created.id;
}

async function seed() {
  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    console.error("Set DATABASE_URI in .env before seeding.");
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL!;
  await cleanupSolutionPagesForSchemaPush(connectionString);
  await cleanupLegacyPageGlobalsForSchemaPush(connectionString);

  const payload = await getPayload({ config });
  const home = DEFAULT_HOME_PAGE;
  const about = DEFAULT_ABOUT_PAGE;
  const platform = DEFAULT_PLATFORM_PAGE;
  const publicHealth = DEFAULT_PUBLIC_HEALTH_PAGE;
  const resources = DEFAULT_RESOURCES_PAGE;

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
          "Different conversation, depending on who you are. Tell us who you are and we'll route you to the right person.",
        submitLabel: "Talk to Our Team",
        successMessage: "Thanks — your message was sent. Our team will be in touch soon.",
        errorMessage:
          "Unable to send your message right now. Please try again or email us directly.",
        privacyNote:
          "By submitting, you agree to be contacted by Genetico. We never share your information with third parties.",
      },
    },
  });

  console.log("Seeding navigation...");
  await payload.updateGlobal({
    slug: "navigation",
    data: {
      ctaLabel: "Book a demo",
      // ctaHref: leadFormHref("/"),
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
      sectionLabels: {
        menuHeading: "Menu",
        solutionsHeading: "Solutions",
      },
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

  console.log("Seeding home page sections...");
  await payload.updateGlobal({
    slug: "home-hero",
    data: { heroSlides: home.heroSlides },
  });
  await payload.updateGlobal({
    slug: "home-who-we-are",
    data: {
      eyebrow: home.whoWeAre.eyebrow,
      paragraphs: home.whoWeAre.paragraphs.map((paragraph) => ({
        text: paragraph.text,
        highlights: paragraph.highlights.map((phrase) => ({ phrase })),
      })),
    },
  });
  await payload.updateGlobal({
    slug: "home-ecosystem-challenges",
    data: home.ecosystemChallenges,
  });
  await payload.updateGlobal({
    slug: "home-ecosystem-gaps",
    data: home.ecosystemGapsSection,
  });
  await payload.updateGlobal({
    slug: "home-partners",
    data: home.partnersSection,
  });
  await payload.updateGlobal({
    slug: "home-security",
    data: {
      heading: home.securitySection.heading,
      description: home.securitySection.description,
      features: home.securitySection.features.map((text) => ({ text })),
    },
  });
  await payload.updateGlobal({
    slug: "home-news",
    data: home.newsSection,
  });
  await payload.updateGlobal({
    slug: "home-cta",
    data: home.cta,
  });

  console.log("Seeding about page sections...");
  await payload.updateGlobal({
    slug: "about-hero",
    data: {
      title: `${about.hero.titleLine1} ${about.hero.titleHighlight}`,
      subtitle: about.hero.subtitle,
      ctaLabel: about.hero.ctaLabel,
      ctaHref: about.hero.ctaHref,
      labels: about.hero.labels.map((label) => ({ label })),
    },
  });
  await payload.updateGlobal({
    slug: "about-vision",
    data: { heading: about.vision.heading },
  });
  await payload.updateGlobal({
    slug: "about-foundations",
    data: {
      items: about.foundations.map(({ title, body }) => ({ title, body })),
    },
  });
  await payload.updateGlobal({
    slug: "about-leadership",
    data: about.leadership,
  });
  await payload.updateGlobal({
    slug: "about-grants",
    data: about.grants,
  });
  await payload.updateGlobal({
    slug: "about-cta",
    data: about.cta,
  });

  console.log("Seeding platform page sections...");
  await payload.updateGlobal({
    slug: "platform-hero",
    data: {
      title: platform.hero.title,
      subtitle: platform.hero.subtitle,
      ctaLabel: platform.hero.ctaLabel,
      ctaHref: platform.hero.ctaHref,
      imageUrl: platform.hero.image,
    },
  });
  await payload.updateGlobal({
    slug: "platform-features",
    data: {
      eyebrow: platform.featuresSection.eyebrow,
      heading: platform.featuresSection.heading,
      description: platform.featuresSection.description,
      features: platform.featuresSection.features.map((f) => ({
        category: f.category,
        subheading: f.subheading,
        title: f.title,
        description: f.description,
        bullets: f.bullets.map((item) => ({ item })),
        illustration: f.illustration,
      })),
    },
  });
  await payload.updateGlobal({
    slug: "platform-clinical-intelligence",
    data: {
      eyebrow: platform.clinicalIntelligence.eyebrow,
      heading: platform.clinicalIntelligence.heading,
      description: platform.clinicalIntelligence.description,
      capabilities: platform.clinicalIntelligence.capabilities.map((c) => ({
        title: c.title,
        description: c.description,
        badge: c.badge,
      })),
    },
  });
  await payload.updateGlobal({
    slug: "platform-longitudinal-care",
    data: {
      eyebrow: platform.longitudinalCare.eyebrow,
      heading: platform.longitudinalCare.heading,
      description: platform.longitudinalCare.description,
      columns: platform.longitudinalCare.columns.map((c) => ({
        title: c.title,
        description: c.description,
        bullets: c.bullets.map((item) => ({ item })),
      })),
    },
  });
  await payload.updateGlobal({
    slug: "platform-infrastructure",
    data: {
      eyebrow: platform.infrastructure.eyebrow,
      heading: platform.infrastructure.heading,
      description: platform.infrastructure.description,
      integrationTags: platform.infrastructure.integrationTags.map((tag) => ({ tag })),
      integrationsTitle: platform.infrastructure.integrationsTitle,
      integrationsDescription: platform.infrastructure.integrationsDescription,
      deploymentTitle: platform.infrastructure.deploymentTitle,
      deploymentDescription: platform.infrastructure.deploymentDescription,
      deploymentOptions: platform.infrastructure.deploymentOptions,
    },
  });
  await payload.updateGlobal({
    slug: "platform-security",
    data: platform.security,
  });
  await payload.updateGlobal({
    slug: "platform-cta",
    data: platform.cta,
  });

  console.log("Seeding public health page sections...");
  await payload.updateGlobal({
    slug: "public-health-hero",
    data: {
      title: `${publicHealth.hero.titleLine1} for ${publicHealth.hero.titleLine2}`,
      subtitle: publicHealth.hero.subtitle,
      imageUrl: publicHealth.hero.image,
    },
  });
  await payload.updateGlobal({
    slug: "public-health-impact",
    data: {
      heading: publicHealth.impact.heading,
      description: publicHealth.impact.description,
      features: publicHealth.impact.features.map((f) => ({
        title: f.title,
        description: f.category,
      })),
    },
  });
  await payload.updateGlobal({
    slug: "public-health-three-tier",
    data: {
      heading: publicHealth.threeTier.heading,
      description: publicHealth.threeTier.description,
      tiers: publicHealth.threeTier.tiers.map((tier) => ({
        bannerLabel: tier.bannerLabel,
        happens: tier.happens.map((item) => ({ item })),
        dataFlows: tier.dataFlows.map((item) => ({ item })),
        users: tier.users.map((user) => ({
          role: user.role,
          description: user.description,
        })),
      })),
    },
  });
  await payload.updateGlobal({
    slug: "public-health-architecture",
    data: {
      heading: publicHealth.architecture.heading,
      description: publicHealth.architecture.description,
      classifications: publicHealth.architecture.classifications.map((c) => ({
        level: c.level,
        timeBadge: c.timeBadge,
        title: c.title,
        description: c.description,
        tags: c.tags.map((tag) => ({ tag })),
      })),
    },
  });
  await payload.updateGlobal({
    slug: "public-health-cta",
    data: publicHealth.cta,
  });

  console.log("Seeding resources page sections...");
  await payload.updateGlobal({
    slug: "resources-hero",
    data: {
      title: resources.hero.title,
      subtitle: resources.hero.subtitle,
      imageUrl: resources.hero.image,
    },
  });
  await payload.updateGlobal({
    slug: "resources-filter-tabs",
    data: {
      filterTabs: resources.filterTabs.map((label) => ({ label })),
    },
  });
  await payload.updateGlobal({
    slug: "resources-blogs-section",
    data: resources.blogsSection,
  });
  await payload.updateGlobal({
    slug: "resources-blog-listing",
    data: resources.blogListing,
  });
  await payload.updateGlobal({
    slug: "resources-newsletter",
    data: resources.newsletterCta,
  });
  await payload.updateGlobal({
    slug: "resources-deep-dives-section",
    data: resources.deepDivesSection,
  });

  console.log("Seeding utility pages...");
  await payload.updateGlobal({
    slug: "utility-pages",
    data: DEFAULT_UTILITY_PAGES,
  });

  console.log("Seeding ecosystem modules...");
  for (const [index, module] of DEFAULT_ECOSYSTEM_MODULES.entries()) {
    await upsertByField(payload, "ecosystem-modules", "title", module.title, {
      title: module.title,
      description: module.desc,
      problem: module.problem,
      solution: module.solution,
      href: module.href,
      iconUrl: module.icon ? `/icons/${module.icon}-glyph.svg` : undefined,
      sortOrder: index,
    });
  }

  console.log("Seeding ecosystem gaps...");
  for (const [index, gap] of DEFAULT_ECOSYSTEM_GAPS.entries()) {
    await upsertByField(payload, "ecosystem-gaps", "tabLabel", gap.tab, {
      tabLabel: gap.tab,
      problemTitle: gap.problemTitle,
      problemDescription: gap.problemDesc,
      solutionTitle: gap.solutionTitle,
      solutionDescription: gap.solutionDesc,
      sortOrder: index,
    });
  }

  console.log("Seeding partners...");
  for (const [index, partner] of DEFAULT_PARTNERS.entries()) {
    await upsertByField(payload, "partners", "name", partner.name, {
      name: partner.name,
      logoUrl: partner.logo,
      sortOrder: index,
    });
  }

  // console.log("Seeding news articles...");
  // const featured = DEFAULT_NEWS_FEATURED;
  // await upsertByField(payload, "news-articles", "title", featured.title, {
  //   title: featured.title,
  //   excerpt: featured.excerpt,
  //   tag: featured.tag,
  //   author: featured.author,
  //   publishedAt: featured.date ? new Date(featured.date).toISOString() : new Date().toISOString(),
  //   readTime: featured.readTime,
  //   href: featured.href,
  //   imageUrl: featured.image,
  //   featured: true,
  // });

  // for (const [index, article] of DEFAULT_NEWS_ARTICLES.entries()) {
  //   await upsertByField(payload, "news-articles", "title", `${article.title} (${index + 1})`, {
  //     title: article.title,
  //     tag: article.tag,
  //     readTime: article.readTime,
  //     featured: false,
  //     sortOrder: index + 1,
  //   });
  // }

  console.log("Seeding team members...");
  for (const [index, member] of DEFAULT_TEAM.entries()) {
    await upsertByField(payload, "team-members", "name", member.name, {
      name: member.name,
      title: member.title,
      about: member.about,
      linkedinUrl: member.linkedinUrl,
      photoUrl: member.image,
      sortOrder: index,
    });
  }

  console.log("Seeding grants & awards...");
  for (const [index, grant] of DEFAULT_GRANTS.entries()) {
    await upsertByField(payload, "grants-awards", "title", grant.title, {
      year: grant.year,
      title: grant.title,
      subtitle: grant.subtitle,
      iconUrl: grant.icon,
      sortOrder: index,
    });
  }

  console.log("Seeding blog posts...");
  for (const post of BLOG_POSTS) {
    await upsertByField(payload, "blog-posts", "slug", post.slug, {
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
    });
  }

  console.log("Seeding solution pages...");
  for (const variant of ["hospital", "pharma"] as const) {
    const content = SOLUTIONS_CONTENT[variant];
    await upsertByField(payload, "solution-pages", "slug", variant, {
      slug: variant,
      hero: content.hero,
      clinicalBurden: {
        ...content.clinicalBurden,
        cards: content.clinicalBurden.cards.map((card) => ({
          cardId: card.id,
          number: card.number,
          label: card.label,
          badge: card.badge,
          badgeDot: card.badgeDot,
          badgeBg: card.badgeBg,
          badgeText: card.badgeText,
          title: card.title,
          collapsedTitle: card.collapsedTitle.map((line) => ({ line })),
          description: card.description,
        })),
      },
      howItWorks: content.howItWorks,
      measurableOutcomes: {
        ...content.measurableOutcomes,
        metrics: content.measurableOutcomes.metrics.map((metric) => ({
          metricId: metric.id,
          maxPercent: metric.maxPercent,
          label: metric.label,
          ringTrack: metric.ringTrack,
          ringFill: metric.ringFill,
          accent: metric.accent,
          fromText: metric.fromText,
          toText: metric.toText,
          negative: metric.negative,
          positive: metric.positive,
          positiveIconBg: metric.positiveIconBg,
          centerValue: metric.centerValue,
          hideCenterSubLabel: metric.hideCenterSubLabel,
        })),
      },
      cta: content.cta,
    });
  }

  console.log("Seeding featured videos...");
  const featuredVideo = resources.featuredVideo;
  await upsertByField(payload, "featured-videos", "title", featuredVideo.title, {
    title: featuredVideo.title,
    description: featuredVideo.description,
    youtubeUrl: featuredVideo.youtubeUrl,
    duration: featuredVideo.duration,
    articleLink: featuredVideo.articleLink,
    tags: featuredVideo.tags.map((tag) => ({ tag })),
    featured: true,
    sortOrder: 0,
  });

  console.log("Seeding short videos...");
  for (const [index, video] of resources.shortVideos.entries()) {
    await upsertByField(payload, "short-videos", "title", video.title, {
      title: video.title,
      description: video.description,
      category: video.category,
      youtubeUrl: video.youtubeUrl,
      duration: video.duration,
      sortOrder: index,
    });
  }

  console.log("Seeding deep dives...");
  for (const [index, dive] of resources.deepDives.entries()) {
    await upsertByField(payload, "deep-dives", "title", dive.title, {
      title: dive.title,
      description: dive.description,
      category: dive.category,
      categoryColor: dive.categoryColor,
      youtubeUrl: dive.youtubeUrl,
      duration: dive.duration,
      sourceLabel: dive.sourceLabel,
      thumbnailGradient: dive.thumbnailGradient,
      tags: dive.tags.map((tag) => ({ tag })),
      videoLeft: dive.videoLeft,
      sortOrder: index,
    });
  }

  console.log("Seeding external articles...");
  for (const [index, article] of resources.externalArticles.entries()) {
    await upsertByField(payload, "external-articles", "title", article.title, {
      title: article.title,
      url: article.url,
      sortOrder: index,
    });
  }

  console.log("Seeding home news resource picks...");
  const [blogDocs, articleDocs] = await Promise.all([
    payload.find({ collection: "blog-posts", sort: "-publishedAt", limit: 5 }),
    payload.find({ collection: "external-articles", sort: "sortOrder", limit: 5 }),
  ]);

  const featuredBlog = blogDocs.docs[0];
  const previewBlog = blogDocs.docs[1];
  const sidebarPicks = [
    ...(previewBlog
      ? [{ relationTo: "blog-posts" as const, value: previewBlog.id }]
      : []),
    ...articleDocs.docs.slice(0, 2).map((doc) => ({
      relationTo: "external-articles" as const,
      value: doc.id,
    })),
  ].slice(0, 4);

  await payload.updateGlobal({
    slug: "home-news",
    data: {
      resourcePicks: {
        featured: featuredBlog
          ? { relationTo: "blog-posts" as const, value: featuredBlog.id }
          : null,
        sidebar: sidebarPicks,
      },
    },
  });

  console.log("Seeding legal pages...");
  await upsertByField(payload, "legal-pages", "slug", DEFAULT_PRIVACY_POLICY.slug, {
    slug: DEFAULT_PRIVACY_POLICY.slug,
    title: DEFAULT_PRIVACY_POLICY.title,
    metaDescription: DEFAULT_PRIVACY_POLICY.metaDescription,
    lastUpdated: new Date(DEFAULT_PRIVACY_POLICY.lastUpdated).toISOString(),
    sections: DEFAULT_PRIVACY_POLICY.sections.map((section) => ({
      title: section.title,
      body: paragraphsToLexical(section.body),
      bullets: section.bullets?.map((item) => ({ item })),
    })),
  });

  console.log("Seed complete! Visit http://localhost:3000/admin to manage content.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
