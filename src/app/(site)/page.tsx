import type { Metadata } from "next";

import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { HomeArHero } from "@/components/home-ar/hero";
import { NextStep } from "@/components/home-ar/next-step";
import { Ahead, Does, Impact, Platform, Serve, Why } from "@/components/home-ar/sections";
import { pickLogos } from "@/content/ar-partners";
import { HOME_AR_IMPACT, HOME_AR_SECTIONS } from "@/content/home-ar";
import { getAboutContent } from "@/lib/cms/about-page-data";
import { getHomePageContent } from "@/lib/cms/home-page-data";
import { getProofFeed } from "@/lib/cms/home-proof-resources";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { RESOURCES_PATH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.home;
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
  });
}

/**
 * The home page, as revised after the senior advisor's review: it leads with
 * Genetico the company and introduces IndiGeneUs.AI, the platform, as one
 * section. Source: design_handoff_genetico_site/design_handoff_ar_pages/.
 */
export default async function Home() {
  const [home, about, proofFeed, navigation, footer] = await Promise.all([
    getHomePageContent(),
    getAboutContent(),
    getProofFeed(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(HOME_AR_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  const awardYears = about.recognition.awards
    .map((award) => Number.parseInt(award.year, 10))
    .filter(Number.isFinite);
  const firstAwardYear = awardYears.length ? String(Math.min(...awardYears)) : "";

  const logos = pickLogos(HOME_AR_IMPACT.logos, [
    ...about.partners.institutions,
    ...about.partners.supporters,
  ]);

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} pageLabel="Genetico" />

      <HomeArHero />

      {/* The fold rides up over the sticky hero as a card, and lifts into
          place as it enters. The footer sits inside it so the rounded top and
          its shadow cover everything below the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <Why section={section.why} num={section.why.num} />
        <Does section={section.does} num={section.does.num} />
        <Platform
          section={section.platform}
          num={section.platform.num}
          layers={home.platform.layers}
        />
        <Serve section={section.serve} num={section.serve.num} />
        <Impact
          section={section.impact}
          num={section.impact.num}
          awardCount={about.recognition.awards.length}
          firstAwardYear={firstAwardYear}
          caseStudyHref={proofFeed.featured?.href || RESOURCES_PATH}
          logos={logos}
        />
        <Ahead section={section.ahead} num={section.ahead.num} />
        <NextStep section={section["get-in-touch"]} num={section["get-in-touch"].num} />

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
