import type { PageSection } from "@/components/chrome/page-sections";
import { NEWSLETTER_URL } from "@/lib/contact";
import { LEAD_FORM_HASH } from "@/lib/routes";

/** A numbered page section: its anchor id, menu label, and the eyebrow printed above its heading. */
export type SectionMeta = PageSection & {
  /** Longer form, printed after the number in the section's own eyebrow. */
  eyebrow: string;
};

type Cta = { label: string; href: string };

/** The copy above the enquiry form: a heading, a line of text and, optionally, two buttons. */
export type ContactSectionContent = {
  heading: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

/**
 * What the enquiry form says on the Platform, Hospital, Life Science and
 * Public Health pages when their own CMS entry leaves it empty.
 */
export const DEFAULT_CONTACT_SECTION: ContactSectionContent = {
  heading: "Building the future of rare disease intelligence together",
  description:
    "Tell us who you are and we will route you to the right team — clinical, programme, " +
    "research, or partnerships.",
  primaryCta: { label: "Schedule a demo", href: LEAD_FORM_HASH },
  secondaryCta: { label: "Subscribe to updates", href: NEWSLETTER_URL },
};
