import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CALENDLY_URL } from "@/lib/contact";
import {
  COMING_SOON_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PRIVACY_POLICY_PATH,
  PUBLIC_HEALTH_PATH,
} from "@/lib/routes";

const MENU = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "How it Works", href: "/platform" },
  { label: "For Business", href: HOSPITAL_PATH },
  { label: "FAQs", href: COMING_SOON_PATH },
];

const SOLUTIONS = [
  { label: "Hospital / Clinician / CoE", href: HOSPITAL_PATH },
  { label: "Life Science / Biotech organisation", href: PHARMA_PATH },
  { label: "Public health", href: PUBLIC_HEALTH_PATH },
];

const SOCIALS = [
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#00060c] bg-[url('/footer-bg.svg')] bg-cover bg-top bg-no-repeat px-6 pt-20 sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mt-24 grid gap-12 md:grid-cols-[1fr_1.35fr]">
          {/* Brand + socials */}
          <div className="flex flex-col gap-8">
            <p className="max-w-xs text-sm leading-7 text-white/55">
              IndiGeneUs.AI structures complex clinical workflows, captures patient data in a
              standardized format &amp; enables AI-assisted clinical decision-making for rare and
              genetic disorders.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — right half */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <nav className="flex flex-col gap-4">
              <p className="text-lg font-medium text-white">Menu</p>
              {MENU.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-4">
              <p className="text-lg font-medium text-white">Solutions</p>
              {SOLUTIONS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CALENDLY_URL}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Genetico. All rights reserved.
          </p>
          <a
            href={PRIVACY_POLICY_PATH}
            className="text-xs text-white/55 transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Oversized brand wordmark — SVG scales the text to exactly fill the footer
          width at any screen size (textLength), so it never clips. Full-bleed via the
          negative margins; the bottom is clipped by the footer's overflow-hidden. */}
      <svg
        aria-hidden
        viewBox="0 0 1000 150"
        preserveAspectRatio="xMidYMax meet"
        className="pointer-events-none -mx-6 mt-12 -mb-[1.5%] block w-[calc(100%+3rem)] select-none sm:-mx-10 sm:w-[calc(100%+5rem)]"
      >
        <defs>
          <linearGradient id="genetico-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#024385" />
            <stop offset="100%" stopColor="#DDEEFF" />
          </linearGradient>
        </defs>
        <text
          x="500"
          y="138"
          textAnchor="middle"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fontFamily='"Season VF", Georgia, "Times New Roman", serif'
          fontWeight="600"
          fontSize="168"
          fill="url(#genetico-grad)"
          style={{ fontVariationSettings: '"SERF" 100' }}
        >
          GENETICO
        </text>
      </svg>
    </footer>
  );
}
