import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { Leadership } from "@/components/about/leadership";
import { Partners, Recognition, Trust } from "@/components/about/sections";
import { AboutV2Hero } from "@/components/about-v2/hero";
import {
  Ahead,
  Beliefs,
  Building,
  PlatformFit,
  Today,
  WhyWeExist,
} from "@/components/about-v2/sections";
import { ABOUT_V2_SECTIONS, ABOUT_V2_TEAM, ABOUT_V2_TODAY } from "@/content/about-v2";
import { getAboutContent } from "@/lib/cms/about-page-data";
import { DEFAULT_HOME_CONTACT } from "@/lib/cms/home-content";
import { getProofFeed } from "@/lib/cms/home-proof-resources";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { ABOUT_V2_PATH, RESOURCES_PATH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/**
 * The second pass at the About page, for review alongside /about-us before it
 * replaces it. Kept out of search — not in the sitemap, and asking not to be
 * indexed — since it would otherwise compete with /about-us for the same
 * content.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.about;
  return createPageMetadata({
    title: `${seo.title} (preview v2)`,
    description: seo.description,
    path: ABOUT_V2_PATH,
    noIndex: true,
  });
}

export default async function AboutV2Page() {
  const [content, proofFeed, navigation, footer] = await Promise.all([
    getAboutContent(),
    getProofFeed(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(ABOUT_V2_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  const awardYears = content.recognition.awards
    .map((award) => Number.parseInt(award.year, 10))
    .filter(Number.isFinite);
  const firstAwardYear = awardYears.length ? String(Math.min(...awardYears)) : "";

  /* The case study is whichever resource is featured on the Resources page,
     so its wording is edited there, not here. */
  const featured = proofFeed.featured;
  const fallback = ABOUT_V2_TODAY.caseStudyFallback;
  const caseStudy = {
    kicker: featured?.kicker || fallback.kicker,
    title: featured?.fullTitle || featured?.title || fallback.title,
    href: featured?.href || RESOURCES_PATH,
    ctaLabel: featured && !featured.duration ? "Read the case study" : fallback.ctaLabel,
  };

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} pageLabel="About Genetico" />

      <AboutV2Hero />

      {/* Everything after the hero rides up over it on a white sheet, its top
          corners rounded and its shadow cast upward onto the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <WhyWeExist {...section.why} />
        <Building {...section.building} />
        <PlatformFit {...section.platform} />
        <Today
          {...section.today}
          awardCount={content.recognition.awards.length}
          firstAwardYear={firstAwardYear}
          caseStudy={caseStudy}
        />
        <Ahead {...section.ahead} />
        <Leadership
          content={{
            ...content.leadership,
            heading: ABOUT_V2_TEAM.heading,
            subtitle: ABOUT_V2_TEAM.subtitle,
          }}
          num={section.team.num}
          eyebrowLabel={section.team.eyebrow}
          columns="fixed"
        >
          <Beliefs />
        </Leadership>
        <Recognition content={content.recognition} num={section.recognition.num} />
        <Partners content={content.partners} num={section.partners.num} />
        <Trust content={content.trust} num={section.trust.num} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={{
            heading: content.cta.heading || DEFAULT_HOME_CONTACT.heading,
            description: content.cta.description || DEFAULT_HOME_CONTACT.description,
            primaryCta: DEFAULT_HOME_CONTACT.primaryCta,
            secondaryCta: DEFAULT_HOME_CONTACT.secondaryCta,
          }}
        />
      </div>

      <SiteFooter footer={footer} />
    </div>
  );
}
