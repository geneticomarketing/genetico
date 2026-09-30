import { ADMIN_GROUPS } from "../../admin-groups";
import { list, photo, sectionLabels, text, textarea } from "../../fields/copy";
import { pageSection } from "./section";

/**
 * The home page (/), one entry per section, top to bottom.
 *
 * Field names match the page's built-in copy in src/content/home.ts, which
 * seeded these entries and fills any field left empty. The product mock-ups
 * (the sample case GX-2041) are part of the design and are not edited here.
 *
 * The page's own section numbers (01–08) start after the hero and skip the
 * photo band, so they run behind the numbers in this sidebar.
 */

export const HomeIntro = pageSection(
  "home-intro",
  "1. Hero",
  "The dark band at the very top of the home page: the headline, the introduction, the two buttons and the “Built with” strip below the product picture.",
  [
    text("headline", "Headline", "The white part of the headline."),
    text("headlineAccent", "Headline — highlighted words", "Follows the headline, in light blue."),
    textarea("blurb", "Introduction"),
    {
      name: "primaryCta",
      type: "group",
      label: "First button",
      admin: { description: "Scrolls to “Why Genetico exists”." },
      fields: [text("label", "Button text")],
    },
    {
      name: "secondaryCta",
      type: "group",
      label: "Second button",
      admin: { description: "Scrolls to the IndiGeneUs.AI section." },
      fields: [text("label", "Button text")],
    },
    text("shotLabel", "Label above the product picture"),
    text("marqueeLabel", "Label before the scrolling strip"),
    list("marquee", "Scrolling strip", "Name", [
      { name: "name", type: "text", required: true, label: "Institution or programme" },
    ]),
  ],
  ADMIN_GROUPS.home,
);

export const HomeWhy = pageSection(
  "home-why",
  "2. Why Genetico exists",
  "Section 01 on the page: the five parties that each hold part of a patient's information, then the network diagram and the closing line.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text under the heading"),
    list(
      "parties",
      "Parties",
      "Party",
      [
        text("name", "Name"),
        textarea("body", "What they hold"),
        text("tag", "Tag", "The small dashed label, e.g. “PDF reports”."),
      ],
      {
        min: 5,
        max: 5,
        description:
          "Exactly five, in order. Each one lights up its own document in the drawing beside it: clinic note, hospital system, lab report, study spreadsheet, programme form.",
      },
    ),
    list(
      "network",
      "Labels round the diagram",
      "Label",
      [{ name: "label", type: "text", required: true, label: "Label" }],
      { description: "Clockwise from the top. One node is drawn for each." },
    ),
    textarea("closing", "Closing line"),
    text(
      "closingAccent",
      "Closing line — highlighted sentence",
      "Follows the closing line, in blue.",
    ),
  ],
  ADMIN_GROUPS.home,
);

export const HomeScale = pageSection(
  "home-scale",
  "3. The scale of the problem",
  "The photo band between section 01 and the dark “What Genetico does” section.",
  [
    text("label", "Label above the figures"),
    photo("photo", "Background photo", "Wide photo, at least 1920 px across."),
    list("facts", "Figures", "Figure", [
      text("figure", "Figure", "Short, e.g. “~80%”."),
      text("label", "What it measures"),
    ]),
    textarea("note", "Source note", "Where the figures come from."),
  ],
  ADMIN_GROUPS.home,
);

export const HomeDoes = pageSection(
  "home-does",
  "4. What Genetico does",
  "Section 02, the dark band: the five areas Genetico works across. As a visitor scrolls, each area opens in turn and its result lights up on the record beside it.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text under the heading"),
    list("areas", "Areas", "Area", [
      text("title", "Area"),
      textarea("body", "Description", "Shown when the area is open."),
      text("output", "Result on the record", "The line that lights up on the record beside it."),
      text("status", "Status label", "The small pill at the end of that line."),
    ]),
  ],
  ADMIN_GROUPS.home,
);

export const HomePlatform = pageSection(
  "home-platform",
  "5. IndiGeneUs.AI",
  "Section 03: which name is which, then the platform's four layers. Each layer opens in turn as the visitor scrolls, beside a screen drawn for it.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("body", "Text beside the heading"),
    text("ctaLabel", "Button text", "The button opens the Platform page."),
    text("layersLabel", "Label above the layers"),
    list(
      "layers",
      "Layers",
      "Layer",
      [
        text("title", "Name"),
        textarea("body", "Description"),
        text("tag", "Tag", "Shown on the right."),
      ],
      {
        min: 4,
        max: 4,
        description:
          "Exactly four, in order — capture, decide, connect, analyse. Each is paired with its own screen.",
      },
    ),
  ],
  ADMIN_GROUPS.home,
);

export const HomeServe = pageSection(
  "home-serve",
  "6. Who we serve",
  "Section 04: three photo cards, one per audience, each opening its page.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text under the heading"),
    list(
      "doors",
      "Cards",
      "Card",
      [
        text("kicker", "Label on the photo"),
        text("title", "Card heading"),
        textarea("body", "Card text"),
        text("ctaLabel", "Link text"),
        photo("photo", "Photo", "Landscape photo, about 1200 × 800 px."),
      ],
      {
        min: 3,
        max: 3,
        description:
          "Exactly three, in this order: hospitals & clinicians, life sciences & research, public health. Each links to its own page.",
      },
    ),
    text("caption", "Small print under the cards"),
  ],
  ADMIN_GROUPS.home,
);

export const HomeImpact = pageSection(
  "home-impact",
  "7. Impact",
  "Section 05: the figures, then the strip of partner logos. The logos are the “Partner logos” ticked “Show on the home page”.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text beside the heading"),
    list("figures", "Figures", "Figure", [
      text("label", "Small label"),
      text("figure", "Figure"),
      textarea("body", "Description"),
    ]),
    {
      type: "row",
      fields: [
        text(
          "awardsLabel",
          "Awards figure — label",
          "A last figure, counted from “Grants & awards” (About page).",
        ),
        text("awardsBody", "Awards figure — description", "Follows “Since <first year>, ”."),
      ],
    },
    text("logosLabel", "Label above the logo strip"),
  ],
  ADMIN_GROUPS.home,
);

export const HomeInsights = pageSection(
  "home-insights",
  "8. Insights",
  "Section 06: a featured film and the latest items. What appears is chosen on the Resources page — tick “Show on the home page” on a video, article or blog post.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text beside the heading"),
    text("ctaLabel", "Button text", "The button opens the Resources page."),
    text(
      "featuredTitle",
      "Featured card heading",
      "Replaces the featured film's own title on this card.",
    ),
    photo("featuredPhoto", "Featured card photo", "Landscape photo, at least 1400 px across."),
    text("latestLabel", "Label above the list"),
  ],
  ADMIN_GROUPS.home,
);

export const HomeAhead = pageSection(
  "home-ahead",
  "9. Where we're going",
  "Section 07, the dark band: three stages from separate solutions to connected infrastructure, drawn as a network that grows.",
  [
    ...sectionLabels,
    text("heading", "Heading"),
    textarea("description", "Text under the heading"),
    list(
      "stages",
      "Stages",
      "Stage",
      [
        text("tag", "Small label", "e.g. “01 · In use”."),
        text("title", "Stage"),
        textarea("body", "Description"),
        text("caption", "Caption under the diagram"),
      ],
      {
        min: 3,
        max: 3,
        description: "Exactly three, in order — the diagram draws one stage for each.",
      },
    ),
    text("footnote", "Small print"),
  ],
  ADMIN_GROUPS.home,
);

export const HomeContact = pageSection(
  "home-contact",
  "10. Talk to our team",
  "Section 08: the text beside the enquiry form. The form's audience tabs and wording are under Site-wide → Contact details & form.",
  [...sectionLabels, text("heading", "Heading"), textarea("description", "Text under the heading")],
  ADMIN_GROUPS.home,
);
