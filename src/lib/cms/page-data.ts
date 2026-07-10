import {
  getCollection,
  getGlobal,
  getBlogPosts,
} from "./queries";
import { BLOG_POSTS } from "@/lib/blogs";
import { resolveMediaUrl } from "./resolve-media-url";
import { DEFAULT_HOME_PAGE } from "./defaults/home";
import { DEFAULT_ABOUT_PAGE, DEFAULT_TEAM } from "./defaults/about";
import { DEFAULT_PLATFORM_PAGE } from "./defaults/platform";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "./defaults/public-health";
import { DEFAULT_RESOURCES_PAGE, DEFAULT_UTILITY_PAGES } from "./defaults/resources";
import type {
  AboutPageData,
  CtaButton,
  EcosystemGap,
  EcosystemModule,
  GrantAward,
  HeroSlide,
  HomePageData,
  Partner,
  PlatformPageData,
  PublicHealthPageData,
  ResourcesPageData,
  TeamMember,
} from "./types";
import { CALENDLY_URL, NEWSLETTER_URL } from "@/lib/contact";
import type { BlogPost } from "@/lib/blogs";
import type {
  EcosystemGap as CmsEcosystemGap,
  EcosystemModule as CmsEcosystemModule,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  GrantsAward as CmsGrantAward,
  Partner as CmsPartner,
  ShortVideo as CmsShortVideo,
  TeamMember as CmsTeamMember,
  Config,
} from "@/payload-types";

type GlobalSlug = keyof Config["globals"];

async function getSectionGlobal<S extends GlobalSlug>(
  slug: S,
): Promise<Config["globals"][S] | null> {
  return getGlobal<Config["globals"][S] | null>(slug, null);
}

function mergeCta(
  cms?: { heading?: string | null; description?: string | null; buttons?: CtaButton[] | null } | null,
  fallback?: { heading: string; description: string; buttons: CtaButton[] },
) {
  return {
    heading: cms?.heading || fallback?.heading || "",
    description: cms?.description || fallback?.description || "",
    buttons: cms?.buttons?.length ? cms.buttons : fallback?.buttons || [],
  };
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function mapTeamMembers(docs: CmsTeamMember[]): TeamMember[] {
  return docs.map((doc, index) => {
    const fallback = DEFAULT_TEAM[index % DEFAULT_TEAM.length];
    const photo = doc.photo as { url?: string } | undefined;
    return {
      id: index,
      name: doc.name,
      title: doc.title,
      about: doc.about,
      image: String(resolveMediaUrl(doc.photo, doc.photoUrl) || fallback.image),
      linkedinUrl: doc.linkedinUrl ? String(doc.linkedinUrl) : undefined,
      color: fallback.color,
      initials: initialsFromName(String(doc.name ?? "")),
      bg: fallback.bg,
    };
  });
}

function mapGrants(docs: CmsGrantAward[]): GrantAward[] {
  return docs.map((doc, index) => ({
    year: doc.year,
    title: doc.title,
    subtitle: doc.subtitle ?? "",
    icon: resolveMediaUrl(doc.icon, doc.iconUrl),
    category: index % 2 === 0 ? "left" : "right",
  }));
}

export async function getHomePageData(): Promise<HomePageData> {
  const [
    hero,
    whoWeAre,
    ecosystemChallenges,
    ecosystemGapsSection,
    partnersSection,
    securitySection,
    newsSection,
    ctaSection,
    modules,
    gaps,
    partners,
    blogPosts,
    externalArticles,
  ] = await Promise.all([
    getSectionGlobal("home-hero"),
    getSectionGlobal("home-who-we-are"),
    getSectionGlobal("home-ecosystem-challenges"),
    getSectionGlobal("home-ecosystem-gaps"),
    getSectionGlobal("home-partners"),
    getSectionGlobal("home-security"),
    getSectionGlobal("home-news"),
    getSectionGlobal("home-cta"),
    getCollection<CmsEcosystemModule>("ecosystem-modules", [] as CmsEcosystemModule[]),
    getCollection<CmsEcosystemGap>("ecosystem-gaps", [] as CmsEcosystemGap[]),
    getCollection<CmsPartner>("partners", [] as CmsPartner[]),
    getBlogPosts(),
    getCollection<CmsExternalArticle>("external-articles", [] as CmsExternalArticle[]),
  ]);

  const defaults = DEFAULT_HOME_PAGE;

  const heroSlides: HeroSlide[] =
    hero?.heroSlides?.length ?
      hero.heroSlides.map((s) => ({
        id: s.id,
        title: s.title,
        body: s.body,
        cta: s.cta,
        href: s.href,
        image: resolveMediaUrl(s.backgroundImage, s.image),
      }))
    : defaults.heroSlides;

  const cmsModules: EcosystemModule[] = modules.map((m) => ({
    icon: "module-clinicians",
    title: m.title,
    href: m.href,
    desc: m.description,
    problem: m.problem,
    solution: m.solution,
  }));

  const cmsGaps: EcosystemGap[] = gaps.map((g) => ({
    tab: g.tabLabel,
    problemTitle: g.problemTitle,
    problemDesc: g.problemDescription,
    solutionTitle: g.solutionTitle,
    solutionDesc: g.solutionDescription,
  }));

  const cmsPartners: Partner[] = partners.map((p) => ({
    name: p.name,
    logo: resolveMediaUrl(p.logo, p.logoUrl),
  }));

  const cmsArticles =
    externalArticles.length ?
      externalArticles.map((a) => ({ title: a.title, url: a.url }))
    : DEFAULT_RESOURCES_PAGE.externalArticles;

  const posts = blogPosts.length ? blogPosts : BLOG_POSTS;

  return {
    heroSlides,
    whoWeAre: {
      eyebrow: whoWeAre?.eyebrow || defaults.whoWeAre.eyebrow,
      paragraphs:
        whoWeAre?.paragraphs?.length ?
          whoWeAre.paragraphs
            .filter((p) => p.text)
            .map((p) => ({
              text: p.text,
              highlights: (p.highlights ?? []).map((h) => h.phrase).filter(Boolean),
            }))
        : defaults.whoWeAre.paragraphs,
    },
    ecosystemChallenges: {
      heading: ecosystemChallenges?.heading || defaults.ecosystemChallenges.heading,
      description: ecosystemChallenges?.description || defaults.ecosystemChallenges.description,
    },
    ecosystemGapsSection: {
      heading: ecosystemGapsSection?.heading || defaults.ecosystemGapsSection.heading,
      description: ecosystemGapsSection?.description || defaults.ecosystemGapsSection.description,
    },
    partnersSection: {
      heading: partnersSection?.heading || defaults.partnersSection.heading,
      description: partnersSection?.description || defaults.partnersSection.description,
    },
    securitySection: {
      heading: securitySection?.heading || defaults.securitySection.heading,
      description: securitySection?.description || defaults.securitySection.description,
      features:
        securitySection?.features?.map((f) => f.text).filter(Boolean) ||
        defaults.securitySection.features,
    },
    newsSection: {
      heading: newsSection?.heading || defaults.newsSection.heading,
      description: newsSection?.description || defaults.newsSection.description,
      ctaLabel: newsSection?.ctaLabel || defaults.newsSection.ctaLabel,
      ctaHref: newsSection?.ctaHref || defaults.newsSection.ctaHref,
    },
    cta: mergeCta(ctaSection, defaults.cta),
    modules: cmsModules.length ? cmsModules : defaults.modules,
    gaps: cmsGaps.length ? cmsGaps : defaults.gaps,
    partners: cmsPartners.filter((p) => p.logo).length ? cmsPartners.filter((p) => p.logo) : defaults.partners,
    featuredBlog: posts[0] ?? null,
    previewBlog: posts[1] ?? null,
    previewArticles: cmsArticles.slice(0, 2),
  };
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const [hero, vision, foundations, leadership, grants, cta, teamDocs, grantDocs] =
    await Promise.all([
      getSectionGlobal("about-hero"),
      getSectionGlobal("about-vision"),
      getSectionGlobal("about-foundations"),
      getSectionGlobal("about-leadership"),
      getSectionGlobal("about-grants"),
      getSectionGlobal("about-cta"),
      getCollection<CmsTeamMember>("team-members", [] as CmsTeamMember[]),
      getCollection<CmsGrantAward>("grants-awards", [] as CmsGrantAward[]),
    ]);

  const defaults = DEFAULT_ABOUT_PAGE;
  const cmsTitle = hero?.title ?? "";
  const titleParts = cmsTitle.includes("For") ? cmsTitle.split(/\s+For\s+/) : [cmsTitle, ""];

  const team = teamDocs.length ? mapTeamMembers(teamDocs) : defaults.team;
  const grantItems = grantDocs.length ? mapGrants(grantDocs) : defaults.grantItems;

  return {
    hero: {
      titleLine1: titleParts[0] || defaults.hero.titleLine1,
      titleHighlight: titleParts[1] || defaults.hero.titleHighlight,
      subtitle: hero?.subtitle || defaults.hero.subtitle,
      ctaLabel: hero?.ctaLabel || defaults.hero.ctaLabel,
      ctaHref: hero?.ctaHref || defaults.hero.ctaHref,
      labels: hero?.labels?.map((l) => l.label).filter(Boolean) || defaults.hero.labels,
    },
    vision: {
      eyebrow: defaults.vision.eyebrow,
      heading: vision?.heading || defaults.vision.heading,
    },
    foundations:
      foundations?.items?.length ?
        foundations.items.map((f, i) => ({
          index: String(i + 1).padStart(2, "0"),
          title: f.title,
          body: f.body,
        }))
      : defaults.foundations,
    leadership: {
      eyebrow: leadership?.eyebrow || defaults.leadership.eyebrow,
      heading: leadership?.heading || defaults.leadership.heading,
      subtitle: leadership?.subtitle || defaults.leadership.subtitle,
    },
    grants: {
      eyebrow: grants?.eyebrow || defaults.grants.eyebrow,
      heading: grants?.heading || defaults.grants.heading,
      description: grants?.description || defaults.grants.description,
    },
    cta: mergeCta(cta, defaults.cta),
    team,
    grantItems,
  };
}

export async function getPlatformPageData(): Promise<PlatformPageData> {
  const [hero, featuresSection, clinicalIntelligence, longitudinalCare, infrastructure, security, cta] =
    await Promise.all([
      getSectionGlobal("platform-hero"),
      getSectionGlobal("platform-features"),
      getSectionGlobal("platform-clinical-intelligence"),
      getSectionGlobal("platform-longitudinal-care"),
      getSectionGlobal("platform-infrastructure"),
      getSectionGlobal("platform-security"),
      getSectionGlobal("platform-cta"),
    ]);

  const defaults = DEFAULT_PLATFORM_PAGE;

  const cmsFeatures = featuresSection?.features;
  const features =
    cmsFeatures?.length ?
      cmsFeatures.map((f, i) => ({
        id: f.title?.toLowerCase().replace(/\s+/g, "-") ?? `feature-${i}`,
        number: String(i + 1).padStart(2, "0"),
        tabTitle: f.title,
        category: f.category,
        subheading: f.subheading || "",
        title: f.title,
        description: f.description,
        bullets: f.bullets?.map((b) => b.item).filter(Boolean) || [],
        illustration: resolveMediaUrl(f.illustrationImage, f.illustration),
      }))
    : defaults.featuresSection.features;

  return {
    hero: {
      title: hero?.title || defaults.hero.title,
      subtitle: hero?.subtitle || defaults.hero.subtitle,
      ctaLabel: hero?.ctaLabel || defaults.hero.ctaLabel,
      ctaHref: hero?.ctaHref || defaults.hero.ctaHref,
      image: resolveMediaUrl(hero?.image, hero?.imageUrl) || defaults.hero.image,
    },
    featuresSection: {
      eyebrow: featuresSection?.eyebrow || defaults.featuresSection.eyebrow,
      heading: featuresSection?.heading || defaults.featuresSection.heading,
      description: featuresSection?.description || defaults.featuresSection.description,
      features,
    },
    clinicalIntelligence: {
      eyebrow: clinicalIntelligence?.eyebrow || defaults.clinicalIntelligence.eyebrow,
      heading: clinicalIntelligence?.heading || defaults.clinicalIntelligence.heading,
      description: clinicalIntelligence?.description || defaults.clinicalIntelligence.description,
      capabilities:
        clinicalIntelligence?.capabilities?.length ?
          clinicalIntelligence.capabilities.map((c, i) => ({
            number: String(i + 1).padStart(2, "0"),
            title: c.title,
            description: c.description,
            badge: c.badge || "",
          }))
        : defaults.clinicalIntelligence.capabilities,
    },
    longitudinalCare: {
      eyebrow: longitudinalCare?.eyebrow || defaults.longitudinalCare.eyebrow,
      heading: longitudinalCare?.heading || defaults.longitudinalCare.heading,
      description: longitudinalCare?.description || defaults.longitudinalCare.description,
      columns:
        longitudinalCare?.columns?.length ?
          longitudinalCare.columns.map((c, i) => ({
            id: `column-${i}`,
            title: c.title,
            description: c.description,
            bullets: c.bullets?.map((b) => b.item).filter(Boolean) || [],
          }))
        : defaults.longitudinalCare.columns,
    },
    infrastructure: {
      eyebrow: infrastructure?.eyebrow || defaults.infrastructure.eyebrow,
      heading: infrastructure?.heading || defaults.infrastructure.heading,
      description: infrastructure?.description || defaults.infrastructure.description,
      integrationTags:
        infrastructure?.integrationTags?.map((t) => t.tag).filter(Boolean) ||
        defaults.infrastructure.integrationTags,
      integrationsTitle: infrastructure?.integrationsTitle || defaults.infrastructure.integrationsTitle,
      integrationsDescription:
        infrastructure?.integrationsDescription || defaults.infrastructure.integrationsDescription,
      deploymentTitle: infrastructure?.deploymentTitle || defaults.infrastructure.deploymentTitle,
      deploymentDescription:
        infrastructure?.deploymentDescription || defaults.infrastructure.deploymentDescription,
      deploymentOptions:
        infrastructure?.deploymentOptions?.length ?
          infrastructure.deploymentOptions.map((o) => ({
            title: o.title,
            description: o.description,
          }))
        : defaults.infrastructure.deploymentOptions,
    },
    security: {
      eyebrow: security?.eyebrow || defaults.security.eyebrow,
      heading: security?.heading || defaults.security.heading,
      description: security?.description || defaults.security.description,
      cards:
        security?.cards?.length ?
          security.cards.map((c) => ({ title: c.title, description: c.description }))
        : defaults.security.cards,
    },
    cta: mergeCta(cta, defaults.cta),
  };
}

export async function getPublicHealthPageData(): Promise<PublicHealthPageData> {
  const [hero, impact, threeTier, architecture, cta] = await Promise.all([
    getSectionGlobal("public-health-hero"),
    getSectionGlobal("public-health-impact"),
    getSectionGlobal("public-health-three-tier"),
    getSectionGlobal("public-health-architecture"),
    getSectionGlobal("public-health-cta"),
  ]);

  const defaults = DEFAULT_PUBLIC_HEALTH_PAGE;

  const cmsTitle = hero?.title ?? "";
  const titleLines = cmsTitle.includes("\n") ? cmsTitle.split("\n") : cmsTitle.split(" for ");

  return {
    hero: {
      titleLine1: titleLines[0]?.trim() || defaults.hero.titleLine1,
      titleLine2: titleLines[1]?.trim() || defaults.hero.titleLine2,
      subtitle: hero?.subtitle || defaults.hero.subtitle,
      image: resolveMediaUrl(hero?.image, hero?.imageUrl) || defaults.hero.image,
    },
    impact: {
      eyebrow: defaults.impact.eyebrow,
      heading: impact?.heading || defaults.impact.heading,
      description: impact?.description || defaults.impact.description,
      features:
        impact?.features?.length ?
          impact.features
            .map((f, i) => ({
              number: String(i + 1).padStart(2, "0"),
              category: "",
              title: f.title,
              description: f.description,
            }))
            .map((f, i) => ({
              ...defaults.impact.features[i],
              ...f,
              title: f.title || defaults.impact.features[i]?.title || "",
            }))
        : defaults.impact.features,
    },
    threeTier: {
      eyebrow: defaults.threeTier.eyebrow,
      heading: threeTier?.heading || defaults.threeTier.heading,
      description: threeTier?.description || defaults.threeTier.description,
      tiers:
        threeTier?.tiers?.length ?
          threeTier.tiers.map((t, i) => ({
            id: defaults.threeTier.tiers[i]?.id ?? `tier-${i}`,
            tabLabel: t.bannerLabel || defaults.threeTier.tiers[i]?.tabLabel || "",
            bannerLabel: t.bannerLabel,
            title: t.bannerLabel,
            happens: t.happens?.map((h) => h.item).filter(Boolean) || [],
            dataFlows: t.dataFlows?.map((d) => d.item).filter(Boolean) || [],
            users: t.users?.map((u) => ({ role: u.role, description: u.description })) || [],
          }))
        : defaults.threeTier.tiers,
    },
    architecture: {
      eyebrow: defaults.architecture.eyebrow,
      heading: architecture?.heading || defaults.architecture.heading,
      description: architecture?.description || defaults.architecture.description,
      classificationLabel: defaults.architecture.classificationLabel,
      classifications:
        architecture?.classifications?.length ?
          architecture.classifications.map((c, i) => ({
            id: defaults.architecture.classifications[i]?.id ?? `class-${i}`,
            level: c.level,
            timeBadge: c.timeBadge || undefined,
            title: c.title,
            description: c.description,
            tags: c.tags?.map((t) => t.tag).filter(Boolean) || [],
          }))
        : defaults.architecture.classifications,
    },
    cta: mergeCta(cta, defaults.cta),
  };
}

export async function getResourcesPageData(): Promise<ResourcesPageData & { blogPosts: BlogPost[] }> {
  const [
    hero,
    filterTabsSection,
    blogsSection,
    blogListing,
    newsletter,
    featuredVideos,
    shortVideos,
    externalArticles,
    blogPosts,
  ] = await Promise.all([
    getSectionGlobal("resources-hero"),
    getSectionGlobal("resources-filter-tabs"),
    getSectionGlobal("resources-blogs-section"),
    getSectionGlobal("resources-blog-listing"),
    getSectionGlobal("resources-newsletter"),
    getCollection<CmsFeaturedVideo>("featured-videos", [] as CmsFeaturedVideo[]),
    getCollection<CmsShortVideo>("short-videos", [] as CmsShortVideo[]),
    getCollection<CmsExternalArticle>("external-articles", [] as CmsExternalArticle[]),
    getBlogPosts(),
  ]);

  const defaults = DEFAULT_RESOURCES_PAGE;
  const featured = featuredVideos[0];

  return {
    hero: {
      title: hero?.title || defaults.hero.title,
      subtitle: hero?.subtitle || defaults.hero.subtitle,
      description: defaults.hero.description,
      image: resolveMediaUrl(hero?.image, hero?.imageUrl) || defaults.hero.image,
    },
    filterTabs:
      filterTabsSection?.filterTabs?.map((t) => t.label).filter(Boolean) || defaults.filterTabs,
    blogsSection: {
      heading: blogsSection?.heading || defaults.blogsSection.heading,
      seeAllLabel: blogsSection?.seeAllLabel || defaults.blogsSection.seeAllLabel,
      seeAllHref: blogsSection?.seeAllHref || defaults.blogsSection.seeAllHref,
    },
    blogListing: {
      title: blogListing?.title || defaults.blogListing.title,
      metaDescription: blogListing?.metaDescription || defaults.blogListing.metaDescription,
      eyebrow: defaults.blogListing.eyebrow,
      heading: blogListing?.heading || defaults.blogListing.heading,
      description: blogListing?.description || defaults.blogListing.description,
      backLabel: blogListing?.backLabel || defaults.blogListing.backLabel,
      backHref: blogListing?.backHref || defaults.blogListing.backHref,
    },
    newsletterCta: {
      heading: newsletter?.heading || defaults.newsletterCta.heading,
      description: newsletter?.description || defaults.newsletterCta.description,
      buttonLabel: newsletter?.buttonLabel || defaults.newsletterCta.buttonLabel,
      buttonHref: newsletter?.buttonHref || defaults.newsletterCta.buttonHref,
    },
    featuredVideo:
      featured ?
        {
          title: featured.title,
          description: featured.description || defaults.featuredVideo.description,
          youtubeUrl: featured.youtubeUrl,
          duration: featured.duration || defaults.featuredVideo.duration,
          articleLink: featured.articleLink || undefined,
          tags: featured.tags?.map((t) => t.tag).filter(Boolean) || defaults.featuredVideo.tags,
        }
      : defaults.featuredVideo,
    shortVideos:
      shortVideos.length ?
        shortVideos.map((v, i) => ({
          title: v.title,
          description: v.description || "",
          category: v.category || defaults.shortVideos[i]?.category || "",
          categoryColor: defaults.shortVideos[i]?.categoryColor,
          youtubeUrl: v.youtubeUrl,
          duration: v.duration || "",
        }))
      : defaults.shortVideos,
    externalArticles:
      externalArticles.length ?
        externalArticles.map((a) => ({ title: a.title, url: a.url }))
      : defaults.externalArticles,
    sectionHeadings: defaults.sectionHeadings,
    blogPosts,
  };
}

export async function getUtilityPagesData() {
  return getGlobal("utility-pages", DEFAULT_UTILITY_PAGES);
}

export async function getLegalPageBySlug(slug: string) {
  const payload = await import("./get-payload").then((m) => m.getPayloadClient());
  if (!payload) return null;
  try {
    const { docs } = await payload.find({
      collection: "legal-pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return docs[0] || null;
  } catch {
    return null;
  }
}

export { CALENDLY_URL, NEWSLETTER_URL };
