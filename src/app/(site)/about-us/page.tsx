import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { Leadership } from "@/components/about/leadership";
import { Partners, Recognition, Trust } from "@/components/about/sections";
import { Mission, WhyNow } from "@/components/about-ar/sections";
import { AboutV2Hero } from "@/components/about-v2/hero";
import { Beliefs, Building, PlatformFit, WhyWeExist } from "@/components/about-v2/sections";
import {
  ABOUT_AR_BUILDING,
  ABOUT_AR_ENGAGE,
  ABOUT_AR_HERO,
  ABOUT_AR_PARTNERS,
  ABOUT_AR_PLATFORM,
  ABOUT_AR_SECTIONS,
  ABOUT_AR_WHY,
} from "@/content/about-ar";
import { ABOUT_V2_TEAM } from "@/content/about-v2";
import { pickLogos } from "@/content/ar-partners";
import { getAboutContent } from "@/lib/cms/about-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { NEWSLETTER_URL } from "@/lib/contact";
import { LEAD_FORM_HASH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.about;
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
  });
}

/**
 * "What is Genetico?" — the About page as revised after the senior advisor's
 * review, built on the /about-v2 components with the review's copy. Source:
 * design_handoff_genetico_site/design_handoff_ar_pages/.
 */
export default async function AboutUsPage() {
  const [content, navigation, footer] = await Promise.all([
    getAboutContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(ABOUT_AR_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  /* The CMS holds only the supporters; the review adds the clinical
     institutions and moves Amity and UPES into that row. */
  const cmsLogos = [...content.partners.institutions, ...content.partners.supporters];
  const partners = {
    ...content.partners,
    institutions: pickLogos(ABOUT_AR_PARTNERS.institutions, cmsLogos),
    supporters: pickLogos(ABOUT_AR_PARTNERS.supporters, cmsLogos),
  };

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} pageLabel="About Genetico" />

      <AboutV2Hero content={ABOUT_AR_HERO} />

      {/* Everything after the hero rides up over it on a white sheet, its top
          corners rounded and its shadow cast upward onto the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <WhyWeExist {...section.why} content={ABOUT_AR_WHY} />
        <Building {...section.building} content={ABOUT_AR_BUILDING} />
        <PlatformFit {...section.platform} content={ABOUT_AR_PLATFORM} />
        <WhyNow {...section.now} />
        <Mission {...section.mission} />
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
        <Partners content={partners} num={section.partners.num} />
        <Trust content={content.trust} num={section.trust.num} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={{
            heading: ABOUT_AR_ENGAGE.heading,
            description: ABOUT_AR_ENGAGE.description,
            primaryCta: { label: ABOUT_AR_ENGAGE.primaryLabel, href: LEAD_FORM_HASH },
            secondaryCta: { label: ABOUT_AR_ENGAGE.secondaryLabel, href: NEWSLETTER_URL },
          }}
        />
      </div>

      <SiteFooter footer={footer} />
    </div>
  );
}
