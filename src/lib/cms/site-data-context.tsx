"use client";

import { createContext, useContext, type ReactNode } from "react";

type NavItem = {
  label: string;
  href?: string | null;
  type?: "link" | "dropdown" | null;
  isDark?: boolean | null;
};

type SolutionNavItem = {
  label: string;
  href: string;
  icon?: string | null;
};

type SocialLink = {
  name: string;
  href: string;
  platform: "x" | "linkedin" | "youtube";
};

type FooterLink = {
  label: string;
  href: string;
};

export type SiteData = {
  navigation: {
    ctaLabel?: string | null;
    ctaHref?: string | null;
    mainNav?: NavItem[] | null;
    solutionsNav?: SolutionNavItem[] | null;
  };
  footer: {
    tagline?: string | null;
    copyrightText?: string | null;
    contactLabel?: string | null;
    contactHref?: string | null;
    sectionLabels?: {
      menuHeading?: string | null;
      solutionsHeading?: string | null;
    } | null;
    menuLinks?: FooterLink[] | null;
    solutionsLinks?: FooterLink[] | null;
    socialLinks?: SocialLink[] | null;
    legalLinks?: FooterLink[] | null;
  };
  settings: {
    contactEmail?: string | null;
    contactEmailCc?: string | null;
    calendlyUrl?: string | null;
    newsletterUrl?: string | null;
    contactRoles?: { id?: string | null; label: string; description?: string | null }[] | null;
    contactForm?: {
      intro?: string | null;
      submitLabel?: string | null;
      successMessage?: string | null;
      errorMessage?: string | null;
      privacyNote?: string | null;
    } | null;
  };
};

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
