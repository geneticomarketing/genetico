import { getCollection, getSectionGlobal } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
import type {
  GrantsAward as CmsGrantAward,
  Partner as CmsPartner,
  TeamMember as CmsTeamMember,
} from "@/payload-types";

/**
 * The About page, shaped the way its sections consume it.
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

export type AboutContent = {
  hero: {
    credentials: string[];
    headline: string;
    /** The highlighted words that finish the headline, cycled. */
    rotatingWords: string[];
    blurb: string;
    ctaLabel: string;
    ctaHref: string;
    teamCardText: string;
    teamCardLinkLabel: string;
  };
  vision: {
    eyebrow: string;
    heading: string;
    /** The first is set as a full-width statement; the rest sit side by side. */
    items: { title: string; body: string }[];
  };
  leadership: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    team: AboutPerson[];
    advisors: AboutPerson[];
  };
  recognition: { eyebrow: string; heading: string; description: string; awards: AboutAward[] };
  partners: {
    heading: string;
    description: string;
    institutions: AboutLogo[];
    supporters: AboutLogo[];
  };
  trust: { eyebrow: string; heading: string; points: string[] };
  cta: { heading: string; description: string };
};

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

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

export async function getAboutContent(): Promise<AboutContent> {
  const [hero, vision, foundations, leadership, grants, partnersSection, security, cta] =
    await Promise.all([
      getSectionGlobal("about-hero"),
      getSectionGlobal("about-vision"),
      getSectionGlobal("about-foundations"),
      getSectionGlobal("about-leadership"),
      getSectionGlobal("about-grants"),
      getSectionGlobal("home-partners"),
      getSectionGlobal("home-security"),
      getSectionGlobal("about-cta"),
    ]);

  const [people, awards, partners] = await Promise.all([
    getCollection<CmsTeamMember>("team-members", []),
    getCollection<CmsGrantAward>("grants-awards", []),
    getCollection<CmsPartner>("partners", []),
  ]);

  const words = (hero?.rotatingWords ?? [])
    .map((entry) => entry.word?.trim())
    .filter((word): word is string => Boolean(word));

  // The stored headline is split across three fields; the third is the part
  // the rotating words replace.
  const headline = [hero?.titleLine1, hero?.titleLine2]
    .map((line) => line?.trim())
    .filter(Boolean)
    .join(" ");

  const logos = partners
    .map((partner) => ({
      name: partner.name,
      logo: resolveMediaUrl(partner.logo, partner.logoUrl),
      group: partner.group ?? "supporter",
    }))
    .filter((partner) => partner.logo);

  return {
    hero: {
      credentials: (hero?.labels ?? [])
        .map((entry) => entry.label?.trim())
        .filter((label): label is string => Boolean(label)),
      headline: text(headline, "Building Infrastructure For"),
      rotatingWords: words.length ? words : [text(hero?.titleHighlight, "Rare Disease Care")],
      blurb: text(hero?.subtitle, ""),
      ctaLabel: text(hero?.ctaLabel, "Get in touch"),
      ctaHref: text(hero?.ctaHref, "#get-in-touch"),
      teamCardText: text(
        hero?.teamCardText,
        "A team of clinicians, engineers, data scientists, and advisors — united by deep experience across genetics, health systems, and technology.",
      ),
      teamCardLinkLabel: text(hero?.teamCardLinkLabel, "Meet the team"),
    },
    vision: {
      eyebrow: text(vision?.eyebrow, "Our Vision"),
      heading: text(vision?.heading, ""),
      items: (foundations?.items ?? []).map((item) => ({
        title: item.title,
        body: item.body,
      })),
    },
    leadership: {
      eyebrow: text(leadership?.eyebrow, "Our Team"),
      heading: text(leadership?.heading, "Leadership"),
      subtitle: text(leadership?.subtitle, ""),
      team: people.filter((doc) => (doc.group ?? "team") === "team").map(toPerson),
      advisors: people.filter((doc) => doc.group === "advisors").map(toPerson),
    },
    recognition: {
      eyebrow: text(grants?.eyebrow, "Recognition"),
      heading: text(grants?.heading, "Rewards & Recognition"),
      description: text(grants?.description, ""),
      awards: awards.map((doc) => ({
        id: String(doc.id),
        year: doc.year,
        title: doc.title,
        organisation: text(doc.subtitle, ""),
        logo: resolveMediaUrl(doc.icon, doc.iconUrl) || "",
      })),
    },
    partners: {
      heading: text(partnersSection?.heading, "Trusted Across the Rare Disease Ecosystem"),
      description: text(partnersSection?.description, ""),
      institutions: logos.filter((logo) => logo.group === "institution"),
      supporters: logos.filter((logo) => logo.group !== "institution"),
    },
    trust: {
      eyebrow: "Security & Compliance",
      heading: text(security?.heading, "Built for trust. Designed for healthcare."),
      points: (security?.features ?? [])
        .map((feature) => feature.text?.trim())
        .filter((point): point is string => Boolean(point)),
    },
    cta: {
      heading: text(cta?.heading, ""),
      description: text(cta?.description, ""),
    },
  };
}
