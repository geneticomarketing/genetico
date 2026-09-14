import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { AboutHero } from "@/components/about/hero";
import { Leadership } from "@/components/about/leadership";
import { Partners, Recognition, Trust, Vision } from "@/components/about/sections";
import { getAboutContent } from "@/lib/cms/about-page-data";
import { DEFAULT_HOME_CONTACT } from "@/lib/cms/home-content";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/** In render order; the numbers and the rail come from this. */
const ABOUT_SECTIONS = [
  { id: "vision", label: "Vision & Mission", eyebrow: "Our Vision" },
  { id: "team", label: "Leadership", eyebrow: "Our Team" },
  { id: "recognition", label: "Recognition", eyebrow: "Recognition" },
  { id: "partners", label: "Partners", eyebrow: "Partners" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "get-in-touch", label: "Get in Touch", eyebrow: "Get in Touch" },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent();
  const seo = STATIC_PAGE_SEO.about;

  return createPageMetadata({
    title: seo.title,
    description: content.hero.blurb || seo.description,
    path: seo.path,
  });
}

export default async function AboutUsPage() {
  const [content, navigation, footer] = await Promise.all([
    getAboutContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(ABOUT_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  const faces = [...content.leadership.team, ...content.leadership.advisors];

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} pageLabel="About" />

      <AboutHero content={content.hero} faces={faces} />
      <Vision content={content.vision} num={section.vision.num} />
      <Leadership
        content={content.leadership}
        num={section.team.num}
        eyebrowLabel={content.leadership.eyebrow}
      />
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

      <SiteFooter footer={footer} />
    </div>
  );
}
