import {
  getCollection,
  getGlobal,
  getHomePageContent,
  getAboutPageContent,
  getPlatformPageContent,
  getPublicHealthPageContent,
  getResourcesPageContent,
  getBlogPosts,
} from "./queries";
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
  NewsArticle,
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
  NewsArticle as CmsNewsArticle,
  Partner as CmsPartner,
  ShortVideo as CmsShortVideo,
  TeamMember as CmsTeamMember,
} from "@/payload-types";

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
  const [page, modules, gaps, partners, newsArticles] = await Promise.all([
    getHomePageContent(),
    getCollection<CmsEcosystemModule>("ecosystem-modules", [] as CmsEcosystemModule[]),
    getCollection<CmsEcosystemGap>("ecosystem-gaps", [] as CmsEcosystemGap[]),
    getCollection<CmsPartner>("partners", [] as CmsPartner[]),
    getCollection<CmsNewsArticle>("news-articles", [] as CmsNewsArticle[]),
  ]);

  const defaults = DEFAULT_HOME_PAGE;

  const heroSlides: HeroSlide[] =
    page?.heroSlides?.length ?
      page.heroSlides.map((s) => ({
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

  const cmsNews: NewsArticle[] = newsArticles.map((n) => ({
    tag: n.tag || "News",
    title: n.title,
    excerpt: n.excerpt || undefined,
    readTime: n.readTime || undefined,
    image: resolveMediaUrl(n.image, n.imageUrl) || undefined,
    author: n.author || undefined,
    date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : undefined,
    href: n.href || undefined,
    featured: n.featured || false,
  }));

  const featured = cmsNews.find((n) => n.featured) || defaults.newsFeatured;
  const sidebarNews = cmsNews.filter((n) => !n.featured);

  return {
    heroSlides,
    whoWeAre: {
      eyebrow: page?.whoWeAre?.eyebrow || defaults.whoWeAre.eyebrow,
      paragraphs:
        page?.whoWeAre?.paragraphs?.length ?
          page.whoWeAre.paragraphs
            .filter((p) => p.text)
            .map((p) => ({
              text: p.text,
              highlights: (p.highlights ?? []).map((h) => h.phrase).filter(Boolean),
            }))
        : defaults.whoWeAre.paragraphs,
    },
    ecosystemChallenges: {
      heading: page?.ecosystemChallenges?.heading || defaults.ecosystemChallenges.heading,
      description: page?.ecosystemChallenges?.description || defaults.ecosystemChallenges.description,
    },
    ecosystemGapsSection: {
      heading: page?.ecosystemGaps?.heading || defaults.ecosystemGapsSection.heading,
      description: page?.ecosystemGaps?.description || defaults.ecosystemGapsSection.description,
    },
    partnersSection: {
      heading: page?.partners?.heading || defaults.partnersSection.heading,
      description: page?.partners?.description || defaults.partnersSection.description,
    },
    securitySection: {
      heading: page?.security?.heading || defaults.securitySection.heading,
      description: page?.security?.description || defaults.securitySection.description,
      features:
        page?.security?.features?.map((f) => f.text).filter(Boolean) ||
        defaults.securitySection.features,
    },
    newsSection: {
      heading: page?.news?.heading || defaults.newsSection.heading,
      description: page?.news?.description || defaults.newsSection.description,
      ctaLabel: page?.news?.ctaLabel || defaults.newsSection.ctaLabel,
      ctaHref: page?.news?.ctaHref || defaults.newsSection.ctaHref,
    },
    cta: mergeCta(page?.cta, defaults.cta),
    modules: cmsModules.length ? cmsModules : defaults.modules,
    gaps: cmsGaps.length ? cmsGaps : defaults.gaps,
    partners: cmsPartners.filter((p) => p.logo).length ? cmsPartners.filter((p) => p.logo) : defaults.partners,
    newsFeatured: featured,
    newsArticles: sidebarNews.length ? sidebarNews : defaults.newsArticles,
  };
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const [page, teamDocs, grantDocs] = await Promise.all([
    getAboutPageContent(),
    getCollection<CmsTeamMember>("team-members", [] as CmsTeamMember[]),
    getCollection<CmsGrantAward>("grants-awards", [] as CmsGrantAward[]),
  ]);

  const defaults = DEFAULT_ABOUT_PAGE;
  const cmsTitle = page?.hero?.title ?? "";
  const titleParts = cmsTitle.includes("For") ? cmsTitle.split(/\s+For\s+/) : [cmsTitle, ""];

  const team = teamDocs.length ? mapTeamMembers(teamDocs) : defaults.team;
  const grantItems = grantDocs.length ? mapGrants(grantDocs) : defaults.grantItems;

  return {
    hero: {
      titleLine1: titleParts[0] || defaults.hero.titleLine1,
      titleHighlight: titleParts[1] || defaults.hero.titleHighlight,
      subtitle: page?.hero?.subtitle || defaults.hero.subtitle,
      ctaLabel: page?.hero?.ctaLabel || defaults.hero.ctaLabel,
      ctaHref: page?.hero?.ctaHref || defaults.hero.ctaHref,
      labels:
        page?.hero?.labels?.map((l) => l.label).filter(Boolean) || defaults.hero.labels,
    },
    vision: {
      eyebrow: defaults.vision.eyebrow,
      heading: page?.vision?.heading || defaults.vision.heading,
    },
    foundations:
      page?.foundations?.length ?
        page.foundations.map((f, i) => ({
          index: String(i + 1).padStart(2, "0"),
          title: f.title,
          body: f.body,
        }))
      : defaults.foundations,
    leadership: {
      eyebrow: page?.leadership?.eyebrow || defaults.leadership.eyebrow,
      heading: page?.leadership?.heading || defaults.leadership.heading,
      subtitle: page?.leadership?.subtitle || defaults.leadership.subtitle,
    },
    grants: {
      eyebrow: page?.grants?.eyebrow || defaults.grants.eyebrow,
      heading: page?.grants?.heading || defaults.grants.heading,
      description: page?.grants?.description || defaults.grants.description,
    },
    cta: mergeCta(page?.cta, defaults.cta),
    team,
    grantItems,
  };
}

export async function getPlatformPageData(): Promise<PlatformPageData> {
  const page = await getPlatformPageContent();
  const defaults = DEFAULT_PLATFORM_PAGE;

  const cmsFeatures = page?.featuresSection?.features;
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
      title: page?.hero?.title || defaults.hero.title,
      subtitle: page?.hero?.subtitle || defaults.hero.subtitle,
      ctaLabel: page?.hero?.ctaLabel || defaults.hero.ctaLabel,
      ctaHref: page?.hero?.ctaHref || defaults.hero.ctaHref,
      image: resolveMediaUrl(page?.hero?.image, page?.hero?.imageUrl) || defaults.hero.image,
    },
    featuresSection: {
      eyebrow: page?.featuresSection?.eyebrow || defaults.featuresSection.eyebrow,
      heading: page?.featuresSection?.heading || defaults.featuresSection.heading,
      description: page?.featuresSection?.description || defaults.featuresSection.description,
      features,
    },
    clinicalIntelligence: {
      eyebrow: page?.clinicalIntelligence?.eyebrow || defaults.clinicalIntelligence.eyebrow,
      heading: page?.clinicalIntelligence?.heading || defaults.clinicalIntelligence.heading,
      description: page?.clinicalIntelligence?.description || defaults.clinicalIntelligence.description,
      capabilities:
        page?.clinicalIntelligence?.capabilities?.length ?
          page.clinicalIntelligence.capabilities.map((c, i) => ({
            number: String(i + 1).padStart(2, "0"),
            title: c.title,
            description: c.description,
            badge: c.badge || "",
          }))
        : defaults.clinicalIntelligence.capabilities,
    },
    longitudinalCare: {
      eyebrow: page?.longitudinalCare?.eyebrow || defaults.longitudinalCare.eyebrow,
      heading: page?.longitudinalCare?.heading || defaults.longitudinalCare.heading,
      description: page?.longitudinalCare?.description || defaults.longitudinalCare.description,
      columns:
        page?.longitudinalCare?.columns?.length ?
          page.longitudinalCare.columns.map((c, i) => ({
            id: `column-${i}`,
            title: c.title,
            description: c.description,
            bullets: c.bullets?.map((b) => b.item).filter(Boolean) || [],
          }))
        : defaults.longitudinalCare.columns,
    },
    infrastructure: {
      eyebrow: page?.infrastructure?.eyebrow || defaults.infrastructure.eyebrow,
      heading: page?.infrastructure?.heading || defaults.infrastructure.heading,
      description: page?.infrastructure?.description || defaults.infrastructure.description,
      integrationTags:
        page?.infrastructure?.integrationTags?.map((t) => t.tag).filter(Boolean) ||
        defaults.infrastructure.integrationTags,
      integrationsTitle: page?.infrastructure?.integrationsTitle || defaults.infrastructure.integrationsTitle,
      integrationsDescription:
        page?.infrastructure?.integrationsDescription || defaults.infrastructure.integrationsDescription,
      deploymentTitle: page?.infrastructure?.deploymentTitle || defaults.infrastructure.deploymentTitle,
      deploymentDescription:
        page?.infrastructure?.deploymentDescription || defaults.infrastructure.deploymentDescription,
      deploymentOptions:
        page?.infrastructure?.deploymentOptions?.length ?
          page.infrastructure.deploymentOptions.map((o) => ({
            title: o.title,
            description: o.description,
          }))
        : defaults.infrastructure.deploymentOptions,
    },
    security: {
      eyebrow: page?.security?.eyebrow || defaults.security.eyebrow,
      heading: page?.security?.heading || defaults.security.heading,
      description: page?.security?.description || defaults.security.description,
      cards:
        page?.security?.cards?.length ?
          page.security.cards.map((c) => ({ title: c.title, description: c.description }))
        : defaults.security.cards,
    },
    cta: mergeCta(page?.cta, defaults.cta),
  };
}

export async function getPublicHealthPageData(): Promise<PublicHealthPageData> {
  const page = await getPublicHealthPageContent();
  const defaults = DEFAULT_PUBLIC_HEALTH_PAGE;

  const cmsTitle = page?.hero?.title ?? "";
  const titleLines = cmsTitle.includes("\n") ? cmsTitle.split("\n") : cmsTitle.split(" for ");

  return {
    hero: {
      titleLine1: titleLines[0]?.trim() || defaults.hero.titleLine1,
      titleLine2: titleLines[1]?.trim() || defaults.hero.titleLine2,
      subtitle: page?.hero?.subtitle || defaults.hero.subtitle,
      image: resolveMediaUrl(page?.hero?.image, page?.hero?.imageUrl) || defaults.hero.image,
    },
    impact: {
      eyebrow: defaults.impact.eyebrow,
      heading: page?.impact?.heading || defaults.impact.heading,
      description: page?.impact?.description || defaults.impact.description,
      features:
        page?.impact?.features?.length ?
          page.impact.features.map((f, i) => ({
            number: String(i + 1).padStart(2, "0"),
            category: "",
            title: f.title,
            description: f.description,
          })).map((f, i) => ({
            ...defaults.impact.features[i],
            ...f,
            title: f.title || defaults.impact.features[i]?.title || "",
          }))
        : defaults.impact.features,
    },
    threeTier: {
      eyebrow: defaults.threeTier.eyebrow,
      heading: page?.threeTier?.heading || defaults.threeTier.heading,
      description: page?.threeTier?.description || defaults.threeTier.description,
      tiers:
        page?.threeTier?.tiers?.length ?
          page.threeTier.tiers.map((t, i) => ({
            id: defaults.threeTier.tiers[i]?.id ?? `tier-${i}`,
            tabLabel: t.bannerLabel || defaults.threeTier.tiers[i]?.tabLabel || "",
            bannerLabel: t.bannerLabel,
            title: t.bannerLabel,
            happens: t.happens?.map((h) => h.item).filter(Boolean) || [],
            dataFlows: t.dataFlows?.map((d) => d.item).filter(Boolean) || [],
            users:
              t.users?.map((u) => ({ role: u.role, description: u.description })) || [],
          }))
        : defaults.threeTier.tiers,
    },
    architecture: {
      eyebrow: defaults.architecture.eyebrow,
      heading: page?.architecture?.heading || defaults.architecture.heading,
      description: page?.architecture?.description || defaults.architecture.description,
      classificationLabel: defaults.architecture.classificationLabel,
      classifications:
        page?.architecture?.classifications?.length ?
          page.architecture.classifications.map((c, i) => ({
            id: defaults.architecture.classifications[i]?.id ?? `class-${i}`,
            level: c.level,
            timeBadge: c.timeBadge || undefined,
            title: c.title,
            description: c.description,
            tags: c.tags?.map((t) => t.tag).filter(Boolean) || [],
          }))
        : defaults.architecture.classifications,
    },
    cta: mergeCta(page?.cta, defaults.cta),
  };
}

export async function getResourcesPageData(): Promise<ResourcesPageData & { blogPosts: BlogPost[] }> {
  const [page, featuredVideos, shortVideos, externalArticles, blogPosts] = await Promise.all([
    getResourcesPageContent(),
    getCollection<CmsFeaturedVideo>("featured-videos", [] as CmsFeaturedVideo[]),
    getCollection<CmsShortVideo>("short-videos", [] as CmsShortVideo[]),
    getCollection<CmsExternalArticle>("external-articles", [] as CmsExternalArticle[]),
    getBlogPosts(),
  ]);

  const defaults = DEFAULT_RESOURCES_PAGE;
  const featured = featuredVideos[0];

  return {
    hero: {
      title: page?.hero?.title || defaults.hero.title,
      subtitle: page?.hero?.subtitle || defaults.hero.subtitle,
      description: defaults.hero.description,
      image: resolveMediaUrl(page?.hero?.image, page?.hero?.imageUrl) || defaults.hero.image,
    },
    filterTabs:
      page?.filterTabs?.map((t) => t.label).filter(Boolean) || defaults.filterTabs,
    blogsSection: {
      heading: page?.blogsSection?.heading || defaults.blogsSection.heading,
      seeAllLabel: page?.blogsSection?.seeAllLabel || defaults.blogsSection.seeAllLabel,
      seeAllHref: page?.blogsSection?.seeAllHref || defaults.blogsSection.seeAllHref,
    },
    blogListing: {
      title: page?.blogListing?.title || defaults.blogListing.title,
      metaDescription: page?.blogListing?.metaDescription || defaults.blogListing.metaDescription,
      eyebrow: defaults.blogListing.eyebrow,
      heading: page?.blogListing?.heading || defaults.blogListing.heading,
      description: page?.blogListing?.description || defaults.blogListing.description,
      backLabel: page?.blogListing?.backLabel || defaults.blogListing.backLabel,
      backHref: page?.blogListing?.backHref || defaults.blogListing.backHref,
    },
    newsletterCta: {
      heading: page?.newsletterCta?.heading || defaults.newsletterCta.heading,
      description: page?.newsletterCta?.description || defaults.newsletterCta.description,
      buttonLabel: page?.newsletterCta?.buttonLabel || defaults.newsletterCta.buttonLabel,
      buttonHref: page?.newsletterCta?.buttonHref || defaults.newsletterCta.buttonHref,
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
