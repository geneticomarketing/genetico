import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { HomeV4Hero, PartnerStrip } from "@/components/home-v4/hero";
import { Latest, Proof } from "@/components/home-v4/proof";
import { Building, Platform, Problem, Trust, Who, Why } from "@/components/home-v4/sections";
import {
  HOME_V4_CONTACT,
  HOME_V4_FOOTER_TAGLINE,
  HOME_V4_NAV_LABELS,
  HOME_V4_NAV_ORDER,
  HOME_V4_ROLE_DESCRIPTIONS,
  HOME_V4_ROLE_ORDER,
  HOME_V4_SECTIONS,
  HOME_V4_SOLUTIONS_LABEL,
  HOME_V4_SOLUTIONS_NAV,
} from "@/content/home-v4";
import { getProofFeed } from "@/lib/cms/home-proof-resources";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { HOME_V4_PATH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/**
 * The fourth pass at the home page, for review alongside /home-v2 and
 * /home-v3 before any of them replaces the live one. Kept out of search: not
 * in the sitemap, and asking not to be indexed, since it would otherwise
 * compete with `/` and the other previews for the same content.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.home;
  return createPageMetadata({
    title: `${seo.title} (preview v4)`,
    description: seo.description,
    path: HOME_V4_PATH,
    noIndex: true,
  });
}

export default async function HomeV4() {
  const [proofFeed, cmsNavigation, cmsFooter] = await Promise.all([
    getProofFeed(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(HOME_V4_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  /* This round proposes a new navigation — About Genetico · Who we serve ▾ ·
     IndiGeneUs.AI · Resources — and a "Who we serve" dropdown that adds
     investors. Applied here only, over whatever the CMS holds, so the other
     six pages keep their labels until it is approved. Relabelling by href
     rather than by position means an item the CMS reorders still lands on
     the right name. */
  const relabel = <T extends { label: string; href?: string | null }>(item: T): T => ({
    ...item,
    label: (item.href && HOME_V4_NAV_LABELS[item.href]) || item.label,
  });

  /* Position in the proposed order, or the end for anything unlisted, so an
     item the CMS adds appears rather than disappearing. */
  const navRank = (item: { href?: string | null; type?: string | null }) => {
    const key = item.type === "dropdown" ? "dropdown" : (item.href ?? "");
    const at = HOME_V4_NAV_ORDER.indexOf(key);
    return at === -1 ? HOME_V4_NAV_ORDER.length : at;
  };

  const navigation = {
    ...cmsNavigation,
    mainNav: (cmsNavigation.mainNav ?? [])
      .map((item) =>
        item.type === "dropdown" ? { ...item, label: HOME_V4_SOLUTIONS_LABEL } : relabel(item),
      )
      .sort((a, b) => navRank(a) - navRank(b)),
    solutionsNav: HOME_V4_SOLUTIONS_NAV,
  };

  /* The footer mirrors the same two columns the header now offers: the
     company's own pages, then the four audiences. Its FAQ link would
     otherwise leave for the live home page, which has the FAQ section this
     round drops — so it keeps its destination rather than becoming a dead
     in-page anchor. */
  const footer = {
    ...cmsFooter,
    tagline: HOME_V4_FOOTER_TAGLINE,
    sectionLabels: {
      ...cmsFooter.sectionLabels,
      menuHeading: "Genetico",
      solutionsHeading: HOME_V4_SOLUTIONS_LABEL,
    },
    solutionsLinks: HOME_V4_SOLUTIONS_NAV,
    menuLinks: (cmsFooter.menuLinks ?? []).map(relabel),
  };

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} tone="dark" ctaHref="#get-in-touch" />
      <SectionRail sections={sections} />

      <HomeV4Hero />
      <PartnerStrip />

      <Problem section={section.problem} num={section.problem.num} />
      <Why section={section.why} num={section.why.num} />
      <Building section={section.building} num={section.building.num} />
      <Platform section={section.platform} num={section.platform.num} />
      <Who section={section.who} num={section.who.num} />
      <Proof section={section.proof} num={section.proof.num} featured={proofFeed.featured} />
      <Latest section={section.latest} num={section.latest.num} clips={proofFeed.clips} />
      <Trust section={section.trust} num={section.trust.num} />
      <GetInTouch
        section={section["get-in-touch"]}
        num={section["get-in-touch"].num}
        content={HOME_V4_CONTACT}
        roleOrder={HOME_V4_ROLE_ORDER}
        roleDescriptions={HOME_V4_ROLE_DESCRIPTIONS}
      />

      <SiteFooter footer={footer} />
    </div>
  );
}
