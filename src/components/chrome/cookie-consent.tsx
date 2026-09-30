"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CONSENT_STORAGE_KEY, CONSENT_TYPES, type ConsentChoice } from "@/lib/analytics";
import { COOKIE_POLICY_PATH } from "@/lib/routes";

/** Dispatched by the footer's "Cookie settings" link to bring the banner back. */
export const OPEN_COOKIE_SETTINGS_EVENT = "genetico:open-cookie-settings";

type Gtag = (...args: unknown[]) => void;

function readChoice(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

function applyChoice(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private mode or storage blocked: the choice holds for this page view only.
  }
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", Object.fromEntries(CONSENT_TYPES.map((t) => [t, choice])));
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
    event: "cookie_consent_update",
    consent: choice,
  });
}

/**
 * The cookie banner. Shown until the visitor accepts or declines analytics
 * cookies; the choice is stored in localStorage and passed to Google Consent
 * Mode, which the layout set to "denied" before GTM loaded.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading storage has to wait for the browser; the banner never renders on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    applyChoice(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="border-rule text-ink font-body fixed right-4 bottom-4 left-4 z-[70] mx-auto max-w-[560px] rounded-2xl border bg-white p-5 shadow-[0_24px_60px_rgba(7,59,104,0.18)] sm:left-auto sm:mx-0"
    >
      <p className="text-ink-body m-0 text-[14px] leading-[1.6]">
        We use cookies to understand how the site is used, so we can improve it. Analytics cookies
        are only set if you accept.{" "}
        <Link href={COOKIE_POLICY_PATH} className="text-primary underline underline-offset-2">
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2.5">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="border-rule text-ink hover:border-primary hover:text-primary cursor-pointer rounded-[10px] border bg-white px-4 py-2.5 text-[14px] font-medium transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="bg-primary-deep hover:bg-primary cursor-pointer rounded-[10px] px-4 py-2.5 text-[14px] font-bold text-white transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

/** A footer link that reopens the banner so a visitor can change their mind. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={`cursor-pointer border-0 bg-transparent p-0 ${className ?? ""}`}
    >
      Cookie settings
    </button>
  );
}
