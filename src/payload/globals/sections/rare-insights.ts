import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

/*
 * The Rare Insights page (/rare-insights) and its edition pages
 * (/rare-insights/edition-NN). The editions themselves are the
 * “Newsletter editions” collection; these sections hold the wording around
 * them. The Mailchimp sign-up link is the site-wide one, in
 * Site-wide → Contact details & form → Newsletter sign-up link.
 */

export const RareInsightsHero = pageSection(
  "rare-insights-hero",
  "1. Introduction",
  "The top of /rare-insights: the page title on the left and a card showing the latest edition on the right. The card fills itself from the newest edition.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the title" },
    { name: "heading", type: "text", label: "Page title" },
    { name: "description", type: "textarea", label: "Paragraph below the title" },
    { name: "primaryLabel", type: "text", label: "Button to the latest edition — text" },
    {
      name: "subscribeLabel",
      type: "text",
      label: "Subscribe button — text",
      admin: { description: "Opens the Mailchimp sign-up page in a new tab." },
    },
  ],
  ADMIN_GROUPS.rareInsights,
);

export const RareInsightsArchive = pageSection(
  "rare-insights-archive",
  "2. Archive — heading",
  "The heading above the list of every edition and every paper, with its search box and filters. The list itself comes from “Newsletter editions”, directly below.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Paragraph below the heading" },
  ],
  ADMIN_GROUPS.rareInsights,
);

export const RareInsightsSubscribe = pageSection(
  "rare-insights-subscribe",
  "3. Subscribe band",
  "The dark band near the bottom of /rare-insights and of every edition page.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Paragraph below the heading" },
    {
      name: "buttonLabel",
      type: "text",
      label: "Button text",
      admin: { description: "Opens the Mailchimp sign-up page in a new tab." },
    },
    { name: "note", type: "text", label: "Small print under the button" },
  ],
  ADMIN_GROUPS.rareInsights,
);

export const RareInsightsEdition = pageSection(
  "rare-insights-edition",
  "Edition pages  ·  /rare-insights/edition-NN",
  "Wording shared by every edition page. Each edition’s own content is in “Newsletter editions”.",
  [
    {
      name: "standfirst",
      type: "text",
      label: "Line under the date",
      admin: {
        description:
          "Shown under the date at the top of every edition, e.g. “Evidence, insights and developments shaping the rare disease ecosystem”.",
      },
    },
    {
      name: "smallPrint",
      type: "textarea",
      label: "Small print in the side column",
      admin: { description: "Shown under the Subscribe button beside every edition." },
    },
  ],
  ADMIN_GROUPS.rareInsights,
);
