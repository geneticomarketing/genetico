import type { Metadata } from "next";

import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { AudienceDoors } from "@/components/home/audience-doors";
import { Faqs } from "@/components/home/faqs";
import { GetInTouch } from "@/components/home/get-in-touch";
import { Hero } from "@/components/home/hero";
import { PlatformGlance } from "@/components/home/platform-glance";
import { Proof } from "@/components/home/proof";
import { Trust } from "@/components/home/trust";
import {
  DEFAULT_HOME_AUDIENCE,
  DEFAULT_HOME_CONTACT,
  DEFAULT_HOME_FAQS,
  DEFAULT_HOME_HERO,
  DEFAULT_HOME_PLATFORM,
  DEFAULT_HOME_PROOF,
  DEFAULT_HOME_TRUST,
  HOME_SECTIONS,
} from "@/lib/cms/home-content";
import { getFooterContent, getNavigation, getPartners } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
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

export default async function Home() {
  const [navigation, footer, cmsPartners] = await Promise.all([
    getNavigation(),
    getFooterContent(),
    getPartners(),
  ]);

  // The marquee is the partners collection as the editor ordered it; a row
  // with no logo yet would render as an empty gap, so it is dropped.
  const partners = cmsPartners
    .map((partner) => ({
      name: partner.name,
      logo: resolveMediaUrl(partner.logo, partner.logoUrl),
    }))
    .filter((partner) => partner.logo);

  const sections = numberSections(HOME_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} />

      <Hero content={DEFAULT_HOME_HERO} />

      {/* The sheet overlaps the sticky hero and scrolls up over it. The footer
          sits inside it so the rounded top and its shadow cover the whole of
          the page below the hero. */}
      <div className="rounded-t-sheet bg-sheet relative z-[2] -mt-8 overflow-hidden shadow-[0_-26px_70px_rgba(7,59,104,0.16)]">
        <AudienceDoors
          section={section.who}
          num={section.who.num}
          content={DEFAULT_HOME_AUDIENCE}
        />
        <PlatformGlance
          section={section.platform}
          num={section.platform.num}
          content={DEFAULT_HOME_PLATFORM}
        />
        <Proof
          section={section.proof}
          num={section.proof.num}
          content={DEFAULT_HOME_PROOF}
          partners={partners}
        />
        <Trust section={section.trust} num={section.trust.num} content={DEFAULT_HOME_TRUST} />
        <Faqs section={section.faqs} num={section.faqs.num} content={DEFAULT_HOME_FAQS} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={DEFAULT_HOME_CONTACT}
        />

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
