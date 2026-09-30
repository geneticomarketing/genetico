import type { PageSection } from "@/components/chrome/page-sections";
import {
  ABOUT_BUILDING,
  ABOUT_ENGAGE,
  ABOUT_INTRO,
  ABOUT_LEADERSHIP,
  ABOUT_MISSION,
  ABOUT_NOW,
  ABOUT_PARTNERS,
  ABOUT_PLATFORM,
  ABOUT_PROBLEM,
  ABOUT_RECOGNITION,
  ABOUT_SECURITY,
} from "@/content/about";
import { getCollection, getSectionGlobal } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
import { withDefaults } from "@/lib/cms/with-defaults";
import type {
  GrantsAward as CmsGrantAward,
  Partner as CmsPartner,
  TeamMember as CmsTeamMember,
} from "@/payload-types";

/**
 * Everything the About page renders, read from the CMS (About page · /about-us)
 * and filled from src/content/about.ts wherever a field is empty.
 *
 * Two things are split by a stored choice rather than by position: which row
 * of the leadership grid a person appears in, and which of the two logo rows
 * a partner belongs to. Splitting a list at a fixed index would silently
 * reclassify everyone the moment somebody is added or reordered.
 */

export type AboutPerson = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Two letters, shown until the photo loads or when there is none. */
  initials: string;
  photo: string;
  linkedin: string;
};

export type AboutAward = {
  id: string;
  year: string;
  title: string;
  organisation: string;
  logo: string;
};

export type AboutLogo = { name: string; logo: string };

/** The collection-backed sections, in the shape their components take. */
export type AboutContent = {
  leadership: { heading: string; subtitle: string; team: AboutPerson[]; advisors: AboutPerson[] };
  recognition: { eyebrow: string; heading: string; description: string; awards: AboutAward[] };
  partners: {
    heading: string;
    description: string;
    institutions: AboutLogo[];
    supporters: AboutLogo[];
  };
  trust: { eyebrow: string; heading: string; points: string[] };
};

/** Initials from a name, ignoring honorifics so "Dr. Annie Hasan" gives AH. */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => !/^(dr|mr|mrs|ms|prof)\.?$/i.test(part))
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function toPerson(doc: CmsTeamMember): AboutPerson {
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.title,
    bio: doc.about,
    initials: initialsOf(doc.name),
    photo: resolveMediaUrl(doc.photo, doc.photoUrl) || "",
    linkedin: doc.linkedinUrl?.trim() || "",
  };
}

/** Partner logos in CMS order, with the two flags that place them. */
export async function getPartnerLogos() {
  const partners = await getCollection<CmsPartner>("partners", []);
  return partners
    .map((partner) => ({
      name: partner.name,
      logo: resolveMediaUrl(partner.logo, partner.logoUrl),
      group: partner.group ?? "supporter",
      showOnHome: Boolean(partner.showOnHome),
    }))
    .filter((partner) => partner.logo);
}

/** Grants & awards, oldest year first as stored. Also feeds the home page's "Backed by" figure. */
export async function getAwards(): Promise<AboutAward[]> {
  const awards = await getCollection<CmsGrantAward>("grants-awards", []);
  return awards.map((doc) => ({
    id: String(doc.id),
    year: doc.year,
    title: doc.title,
    organisation: doc.subtitle?.trim() || "",
    logo: resolveMediaUrl(doc.icon, doc.iconUrl) || "",
  }));
}

/** The earliest award year, as text — "" when there are none. */
export function firstAwardYear(awards: AboutAward[]): string {
  const years = awards.map((award) => Number.parseInt(award.year, 10)).filter(Number.isFinite);
  return years.length ? String(Math.min(...years)) : "";
}

export async function getAboutPage() {
  const [
    intro,
    problem,
    building,
    platform,
    now,
    mission,
    leadership,
    grants,
    partnersHeading,
    security,
    engage,
  ] = await Promise.all([
    getSectionGlobal("about-intro"),
    getSectionGlobal("about-problem"),
    getSectionGlobal("about-building"),
    getSectionGlobal("about-platform"),
    getSectionGlobal("about-now"),
    getSectionGlobal("about-mission"),
    getSectionGlobal("about-leadership"),
    getSectionGlobal("about-grants"),
    getSectionGlobal("home-partners"),
    getSectionGlobal("home-security"),
    getSectionGlobal("about-cta"),
  ]);

  const [people, awards, logos] = await Promise.all([
    getCollection<CmsTeamMember>("team-members", []),
    getAwards(),
    getPartnerLogos(),
  ]);

  const copy = {
    intro: withDefaults(ABOUT_INTRO, intro),
    problem: withDefaults(ABOUT_PROBLEM, problem),
    building: withDefaults(ABOUT_BUILDING, building),
    platform: withDefaults(ABOUT_PLATFORM, platform),
    now: withDefaults(ABOUT_NOW, now),
    mission: withDefaults(ABOUT_MISSION, mission),
    leadership: withDefaults(ABOUT_LEADERSHIP, leadership),
    recognition: withDefaults(ABOUT_RECOGNITION, grants),
    partners: withDefaults(ABOUT_PARTNERS, partnersHeading),
    security: withDefaults(ABOUT_SECURITY, security),
    engage: withDefaults(ABOUT_ENGAGE, engage),
  };

  /* In render order: the rail, the mobile menu and the section numbers follow it. */
  const sections: (PageSection & { eyebrow: string })[] = [
    ["why", copy.problem],
    ["building", copy.building],
    ["platform", copy.platform],
    ["now", copy.now],
    ["mission", copy.mission],
    ["team", copy.leadership],
    ["recognition", copy.recognition],
    ["partners", copy.partners],
    ["trust", copy.security],
    ["get-in-touch", copy.engage],
  ].map(([id, section]) => {
    const s = section as { eyebrow: string; menuLabel: string };
    return { id: id as string, label: s.menuLabel, eyebrow: s.eyebrow };
  });

  const content: AboutContent = {
    leadership: {
      heading: copy.leadership.heading,
      subtitle: copy.leadership.subtitle,
      team: people.filter((doc) => (doc.group ?? "team") === "team").map(toPerson),
      advisors: people.filter((doc) => doc.group === "advisors").map(toPerson),
    },
    recognition: {
      eyebrow: copy.recognition.eyebrow,
      heading: copy.recognition.heading,
      description: copy.recognition.description,
      awards,
    },
    partners: {
      heading: copy.partners.heading,
      description: copy.partners.description,
      institutions: logos.filter((logo) => logo.group === "institution"),
      supporters: logos.filter((logo) => logo.group !== "institution"),
    },
    trust: {
      eyebrow: copy.security.eyebrow,
      heading: copy.security.heading,
      points: copy.security.features.map((feature) => feature.text?.trim()).filter(Boolean),
    },
  };

  return { ...copy, sections, content };
}
