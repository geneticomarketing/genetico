import { ADMIN_GROUPS } from "../../admin-groups";
import { list, sectionLabels, text, textarea } from "../../fields/copy";
import { ctaButtonsField } from "../../fields/link";
import { pageSection } from "./section";

/**
 * The About page (/about-us), one entry per section, top to bottom.
 *
 * Field names match the page's built-in copy in src/content/about.ts, which
 * seeded these entries and fills any field left empty.
 *
 * Four slugs are older than the page and kept so their stored rows survive:
 * `home-partners` and `home-security` were once shared with the home page,
 * `about-leadership`, `about-grants` and `about-cta` predate the redesign.
 */

export const AboutIntro = pageSection(
  "about-intro",
  "1. Hero",
  "The top of the About page: the question, the headline, two buttons and the three short facts beside them.",
  [
    text("eyebrow", "Small label above the headline"),
    {
      name: "headline",
      type: "group",
      label: "Headline",
      admin: { description: "Read as one sentence: start, highlighted words, end." },
      fields: [
        {
          type: "row",
          fields: [
            text("before", "Start"),
            text("highlight", "Highlighted words"),
            text("after", "End (optional)"),
          ],
        },
      ],
    },
    textarea("blurb", "Introduction"),
    {
      type: "row",
      fields: [
        {
          name: "primaryCta",
          type: "group",
          label: "First button",
          admin: { description: "Scrolls to the first section." },
          fields: [text("label", "Button text")],
        },
        {
          name: "secondaryCta",
          type: "group",
          label: "Second button",
          admin: { description: "Scrolls to Leadership." },
          fields: [text("label", "Button text")],
        },
      ],
    },
    list("glance", "Facts at a glance", "Fact", [
      text("label", "Small label"),
      text("title", "Fact"),
      textarea("body", "Detail"),
    ]),
  ],
  ADMIN_GROUPS.about,
);

export const AboutProblem = pageSection(
  "about-problem",
  "2. The problem",
  "Section 01: the problem Genetico set out to solve, three cards and a closing line.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("lead", "Introduction"),
    list("items", "Cards", "Card", [text("title", "Heading"), textarea("body", "Text")]),
    textarea("closing", "Closing line"),
  ],
  ADMIN_GROUPS.about,
);

export const AboutBuilding = pageSection(
  "about-building",
  "3. What Genetico does",
  "Section 02: the five connected areas, drawn as a chain.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("aside", "Text beside the heading"),
    list("chain", "Areas", "Area", [text("title", "Area"), textarea("body", "Description")]),
    textarea("footnote", "Line under the chain"),
  ],
  ADMIN_GROUPS.about,
);

export const AboutPlatform = pageSection(
  "about-platform",
  "4. What we are building",
  "Section 03: which of the two names is which — the company and the platform side by side — then the platform in four steps.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("lead", "Introduction"),
    {
      name: "company",
      type: "group",
      label: "Company card",
      fields: [
        text("label", "Small label"),
        textarea("statement", "Statement"),
        textarea("body", "Detail"),
      ],
    },
    {
      name: "platform",
      type: "group",
      label: "Platform card",
      fields: [
        text("name", "Platform name"),
        text("label", "Small label"),
        textarea("statement", "Statement"),
        text("ctaLabel", "Link text", "The link opens the Platform page."),
      ],
    },
    list("steps", "Steps", "Step", [text("title", "Step"), textarea("body", "Description")]),
  ],
  ADMIN_GROUPS.about,
);

export const AboutNow = pageSection(
  "about-now",
  "5. Why now",
  "Section 04: the changes that make connected rare disease infrastructure practical now.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("aside", "Text beside the heading"),
    list("drivers", "Changes", "Change", [
      text("label", "Small label", "e.g. “Policy”."),
      text("title", "Heading"),
      textarea("body", "Text"),
    ]),
  ],
  ADMIN_GROUPS.about,
);

export const AboutMission = pageSection(
  "about-mission",
  "6. Mission and vision",
  "Section 05: the mission and vision statements, then where Genetico is going.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("mission", "Mission"),
    textarea("vision", "Vision"),
    text("horizonsLabel", "Small label above the horizons"),
    text("horizonsHeading", "Horizons heading"),
    list("horizons", "Horizons", "Horizon", [
      text("when", "When", "e.g. “Now”, “Next”."),
      text("title", "Heading"),
      textarea("body", "Text"),
    ]),
    text("footnote", "Small print"),
  ],
  ADMIN_GROUPS.about,
);

export const AboutLeadership = pageSection(
  "about-leadership",
  "7. Leadership — heading",
  "Section 06: the heading above the team, and the three principles under it. The people themselves are edited in “Team members” just below.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("subtitle", "Intro paragraph"),
    list("beliefs", "Principles", "Principle", [
      text("title", "Heading"),
      textarea("body", "Text"),
    ]),
  ],
  ADMIN_GROUPS.about,
);

export const AboutGrants = pageSection(
  "about-grants",
  "8. Recognition — heading",
  "Section 07: the heading above the recognition timeline. The entries themselves are edited in “Grants & awards” just below; their count also feeds the home page's “Backed by” figure.",
  [...sectionLabels, text("heading", "Heading"), textarea("description", "Intro paragraph")],
  ADMIN_GROUPS.about,
);

export const AboutPartners = pageSection(
  "home-partners",
  "9. Partners — heading",
  "Section 08: the heading above the two rows of partner logos. The logos are edited in “Partner logos” just below.",
  [...sectionLabels, text("heading", "Heading"), textarea("description", "Description")],
  ADMIN_GROUPS.about,
);

export const AboutSecurity = pageSection(
  "home-security",
  "10. Security & Compliance",
  "Section 09: the trust and compliance points.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text beside the heading"),
    list("features", "Trust points", "Trust point", [
      { name: "text", type: "text", required: true, label: "Text" },
    ]),
  ],
  ADMIN_GROUPS.about,
);

export const AboutCta = pageSection(
  "about-cta",
  "11. Engage",
  "Section 10: the heading and two buttons above the enquiry form at the foot of the page.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Description"),
    ctaButtonsField,
  ],
  ADMIN_GROUPS.about,
);
