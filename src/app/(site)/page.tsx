import type { Metadata } from "next";

import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { AudienceDoors } from "@/components/home/audience-doors";
import { Hero } from "@/components/home/hero";
import { PlatformGlance } from "@/components/home/platform-glance";
import {
  DEFAULT_HOME_AUDIENCE,
  DEFAULT_HOME_HERO,
  DEFAULT_HOME_PLATFORM,
  HOME_SECTIONS,
} from "@/lib/cms/home-content";
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
  const [navigation, footer] = await Promise.all([getNavigation(), getFooterContent()]);

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

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
