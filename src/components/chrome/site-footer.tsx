import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";

import { CookieSettingsLink } from "@/components/chrome/cookie-consent";
import type { SiteData } from "@/lib/cms/site-data-context";

const SOCIAL_ICONS = {
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
} as const;

const LINK = "text-sky-link text-[15.5px] transition-colors hover:text-white";

/**
 * The footer's contact link.
 *
 * `contact_href` was deliberately cleared in the CMS so the site could pick
 * the destination itself, so an empty value is the normal state, not a
 * mistake — it falls through to the enquiry form on the home page.
 */
function ContactLink({ label, href }: { label: string; href?: string | null }) {
  const destination = href?.trim() || "/#get-in-touch";

  if (destination.startsWith("http")) {
    return (
      <a href={destination} target="_blank" rel="noreferrer" className={LINK}>
        {label}
      </a>
    );
  }

  return (
    <Link href={destination} className={LINK}>
      {label}
    </Link>
  );
}

/**
 * The dark band that closes every redesigned page.
 *
 * It used to end in an oversized GENETICO wordmark; the product review
 * (2026-11-03) found it looked out of place, so the band now ends at the
 * legal row.
 */
export function SiteFooter({ footer }: { footer: SiteData["footer"] }) {
  const menuLinks = footer.menuLinks ?? [];
  const solutionsLinks = footer.solutionsLinks ?? [];
  const socialLinks = footer.socialLinks ?? [];
  const legalLinks = footer.legalLinks ?? [];

  return (
    <footer className="bg-dark-band px-edge relative overflow-hidden pt-[clamp(56px,6vw,72px)] pb-[clamp(32px,4vw,44px)] text-white">
      <div className="max-w-site mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-12">
          <div className="flex flex-col gap-9">
            <p className="text-sky m-0 max-w-[420px] text-[15.5px] leading-[2]">{footer.tagline}</p>
            <div className="flex gap-3.5">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] ?? FaXTwitter;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/32 text-white transition-colors hover:bg-white/12"
                  >
                    <Icon size={17} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <nav
            aria-label={footer.sectionLabels?.menuHeading || "Menu"}
            className="flex flex-col gap-[22px]"
          >
            <h2 className="m-0 mb-1 text-[25px] font-medium tracking-[-0.01em] text-white">
              {footer.sectionLabels?.menuHeading || "Menu"}
            </h2>
            {menuLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sky-link text-[15.5px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label={footer.sectionLabels?.solutionsHeading || "Solutions"}
            className="flex flex-col gap-[22px]"
          >
            <h2 className="m-0 mb-1 text-[25px] font-medium tracking-[-0.01em] text-white">
              {footer.sectionLabels?.solutionsHeading || "Solutions"}
            </h2>
            {solutionsLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sky-link text-[15.5px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {footer.contactLabel ? (
              <ContactLink label={footer.contactLabel} href={footer.contactHref} />
            ) : null}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-[26px]">
          <span className="text-sky-soft text-[15px]">{footer.copyrightText}</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sky-soft text-[15px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <CookieSettingsLink className="text-sky-soft text-[15px] transition-colors hover:text-white" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
