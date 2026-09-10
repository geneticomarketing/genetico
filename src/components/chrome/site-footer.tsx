import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";

import type { SiteData } from "@/lib/cms/site-data-context";

const SOCIAL_ICONS = {
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
} as const;

/**
 * The dark band that closes every redesigned page.
 *
 * The wordmark is sized in `cqw` against its own container rather than `vw`,
 * so it fills the footer's width at any viewport without a media query and
 * without ever overflowing the page.
 */
export function SiteFooter({ footer }: { footer: SiteData["footer"] }) {
  const menuLinks = footer.menuLinks ?? [];
  const solutionsLinks = footer.solutionsLinks ?? [];
  const socialLinks = footer.socialLinks ?? [];
  const legalLinks = footer.legalLinks ?? [];

  return (
    <footer className="bg-dark-band px-edge relative overflow-hidden pt-[clamp(56px,6vw,72px)] text-white">
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

          <div className="flex flex-col gap-[22px]">
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
          </div>

          <div className="flex flex-col gap-[22px]">
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
            {footer.contactLabel && footer.contactHref ? (
              <a
                href={footer.contactHref}
                target="_blank"
                rel="noreferrer"
                className="text-sky-link text-[15.5px] transition-colors hover:text-white"
              >
                {footer.contactLabel}
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-[26px]">
          <span className="text-sky-soft text-[15px]">{footer.copyrightText}</span>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sky-soft text-[15px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="mt-[34px] flex h-[clamp(90px,13vw,190px)] max-h-[190px] items-start justify-center overflow-hidden [container-type:inline-size]"
        >
          <span className="font-headline bg-[linear-gradient(180deg,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.30)_55%,rgba(255,255,255,0.10)_100%)] bg-clip-text text-[18cqw] leading-[0.78] tracking-[-0.01em] whitespace-nowrap text-transparent">
            GENETICO
          </span>
        </div>
      </div>
    </footer>
  );
}
