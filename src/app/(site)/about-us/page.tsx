import type { Metadata } from "next";

import { AboutHero } from "@/components/about/hero";
import { Leadership } from "@/components/about/leadership";
import { Mission, WhyNow } from "@/components/about/mission";
import { Partners, Recognition, Trust } from "@/components/about/sections";
import { Beliefs, Building, PlatformFit, WhyWeExist } from "@/components/about/story";
import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { getAboutPage } from "@/lib/cms/about-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
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
 * "What is Genetico?" — the About page. All copy is edited in the CMS
 * (About page · /about-us) — see getAboutPage(). Design source:
 * design_handoff_genetico_site/design_handoff_ar_pages/.
 */
export default async function AboutUsPage() {
  const [page, navigation, footer] = await Promise.all([
    getAboutPage(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(page.sections);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));
  const [primary, secondary] = page.engage.buttons;

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} pageLabel="About Genetico" />

      <AboutHero content={page.intro} />

      {/* Everything after the hero rides up over it on a white sheet, its top
          corners rounded and its shadow cast upward onto the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <WhyWeExist {...section.why} content={page.problem} />
        <Building {...section.building} content={page.building} />
        <PlatformFit {...section.platform} content={page.platform} />
        <WhyNow {...section.now} content={page.now} />
        <Mission {...section.mission} content={page.mission} />
        <Leadership
          content={page.content.leadership}
          num={section.team.num}
          eyebrowLabel={section.team.eyebrow}
          columns="fixed"
        >
          <Beliefs beliefs={page.leadership.beliefs} />
        </Leadership>
        <Recognition content={page.content.recognition} num={section.recognition.num} />
        <Partners content={page.content.partners} num={section.partners.num} />
        <Trust content={page.content.trust} num={section.trust.num} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={{
            heading: page.engage.heading,
            description: page.engage.description,
            ...(primary ? { primaryCta: { label: primary.label, href: primary.href } } : {}),
            ...(secondary
              ? { secondaryCta: { label: secondary.label, href: secondary.href } }
              : {}),
          }}
        />
      </div>

      <SiteFooter footer={footer} />
    </div>
  );
}
