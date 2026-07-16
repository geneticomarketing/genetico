"use client";

import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { CALENDLY_URL } from "@/lib/contact";
import {
  COMING_SOON_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PRIVACY_POLICY_PATH,
  PUBLIC_HEALTH_PATH,
} from "@/lib/routes";
import type { SiteData } from "@/lib/cms/site-data-context";

const DEFAULT_MENU = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "How it Works", href: "/platform" },
  { label: "For Business", href: HOSPITAL_PATH },
  { label: "FAQs", href: COMING_SOON_PATH },
];

const DEFAULT_SOLUTIONS = [
  { label: "Hospital / Clinician / CoE", href: HOSPITAL_PATH },
  { label: "Life Science / Biotech organisation", href: PHARMA_PATH },
  { label: "Public health", href: PUBLIC_HEALTH_PATH },
];

const SOCIAL_ICONS = {
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
} as const;

export function Footer({ footer }: { footer?: SiteData["footer"] }) {
  const tagline =
    footer?.tagline ??
    "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format & enables AI-assisted clinical decision-making for rare and genetic disorders.";
  const menuHeading = footer?.sectionLabels?.menuHeading ?? "Menu";
  const solutionsHeading = footer?.sectionLabels?.solutionsHeading ?? "Solutions";
  const menu = footer?.menuLinks?.length ? footer.menuLinks : DEFAULT_MENU;
  const solutions = footer?.solutionsLinks?.length ? footer.solutionsLinks : DEFAULT_SOLUTIONS;
  const socials = footer?.socialLinks ?? [
    { name: "X", href: "https://x.com/genetico_in", platform: "x" as const },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/genetico-in/",
      platform: "linkedin" as const,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@geneticord?si=v-e6PZkTFHRrJaGr",
      platform: "youtube" as const,
    },
  ];
  const copyrightText = footer?.copyrightText ?? "Genetico. All rights reserved.";
  const contactLabel = footer?.contactLabel ?? "Contact Us";
  const contactHref = footer?.contactHref ?? CALENDLY_URL;
  const legalLinks = footer?.legalLinks ?? [{ label: "Privacy Policy", href: PRIVACY_POLICY_PATH }];

  return (
    <footer className="relative overflow-hidden bg-[#00060c] bg-[url('/footer-bg.svg')] bg-cover bg-top bg-no-repeat px-6 pt-20 sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mt-24 grid gap-12 md:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col gap-8">
            <p className="max-w-xs text-sm leading-7 text-white/55">{tagline}</p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform as keyof typeof SOCIAL_ICONS] ?? FaXTwitter;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <nav className="flex flex-col gap-4">
              <p className="text-lg font-medium text-white">{menuHeading}</p>
              {menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <p className="text-lg font-medium text-white">{solutionsHeading}</p>
              {solutions.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={contactHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {contactLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">{copyrightText}</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white/70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(0deg, #DDEEFF , #024385)`,
          maxWidth: "100%",
        }}
        className="footer-heading translate-y-8 overflow-hidden bg-clip-text text-center text-[18vw] leading-52 text-transparent"
      >
        GENETICO
      </div>
    </footer>
  );
}
