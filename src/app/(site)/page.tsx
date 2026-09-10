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
import { HOME_SECTIONS } from "@/lib/cms/home-content";
import { getHomePageContent } from "@/lib/cms/home-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
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
  const [content, navigation, footer] = await Promise.all([
    getHomePageContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  // Hiding the FAQs drops them from the rail too, and the numbering closes up
  // behind them rather than skipping 05.
  const sections = numberSections(HOME_SECTIONS.filter((s) => s.id !== "faqs" || content.showFaqs));
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} />

      <Hero content={content.hero} />

      {/* The sheet overlaps the sticky hero and scrolls up over it. The footer
          sits inside it so the rounded top and its shadow cover the whole of
          the page below the hero. */}
      <div className="rounded-t-sheet bg-sheet relative z-[2] -mt-8 overflow-hidden shadow-[0_-26px_70px_rgba(7,59,104,0.16)]">
        <AudienceDoors section={section.who} num={section.who.num} content={content.audience} />
        <PlatformGlance
          section={section.platform}
          num={section.platform.num}
          content={content.platform}
        />
        <Proof
          section={section.proof}
          num={section.proof.num}
          content={content.proof}
          partners={content.partners}
        />
        <Trust section={section.trust} num={section.trust.num} content={content.trust} />
        {content.showFaqs ? (
          <Faqs section={section.faqs} num={section.faqs.num} content={content.faqs} />
        ) : null}
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={content.contact}
        />

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
