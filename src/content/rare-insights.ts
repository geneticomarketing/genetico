/**
 * Default wording for /rare-insights and its edition pages. The CMS
 * (Rare Insights newsletter · /rare-insights) overrides each field; these
 * apply wherever a field is left empty. Copy is from the design handoff,
 * design_handoff_genetico_site/design_handoff_rare_insights/.
 */
export const RARE_INSIGHTS_COPY = {
  hero: {
    eyebrow: "Genetico · Weekly newsletter",
    heading: "Rare Insights",
    description:
      "Each week we read the new approvals, papers and guidance in rare and genetic disease, and write a short note on why each one matters. Every edition is archived here.",
    primaryLabel: "Read the latest edition",
    subscribeLabel: "Subscribe",
  },
  archive: {
    eyebrow: "Archive",
    heading: "Every edition, every paper",
    description:
      "Browse by edition, or search the full index of papers we have covered by topic, journal or month.",
  },
  subscribe: {
    eyebrow: "Subscribe",
    heading: "One reading list, every week",
    description:
      "Approvals, papers and guidance in rare and genetic disease, each with a short note on why it matters. Sent weekly, read in a few minutes.",
    buttonLabel: "Subscribe to Rare Insights",
    note: "Signup is handled by Mailchimp. Unsubscribe from any edition.",
  },
  edition: {
    standfirst: "Evidence, insights and developments shaping the rare disease ecosystem",
    smallPrint:
      "Links go to the original publisher. Notes are Genetico's reading, not clinical advice.",
  },
} as const;

/** The Resources page's newsletter band, rewritten to introduce Rare Insights. */
export const RESOURCES_NEWSLETTER_COPY = {
  eyebrow: "Rare Insights · Weekly newsletter",
  heading: "One reading list, every week",
  description:
    "Approvals, papers and guidance in rare and genetic disease, each with a short note on why it matters. Every past edition is archived and searchable.",
  archiveButtonLabel: "Browse all editions",
  buttonLabel: "Subscribe",
} as const;

/** The Insights entry in the header menu opens these two pages. */
export const INSIGHTS_DROPDOWN = [
  { label: "Resources", description: "Films, deep dives, media and articles", href: "/resources" },
  { label: "Rare Insights", description: "The weekly newsletter archive", href: "/rare-insights" },
] as const;
