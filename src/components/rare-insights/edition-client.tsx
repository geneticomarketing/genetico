"use client";

import { useEffect, useRef, useState } from "react";

/** How long "Link copied" shows before the label returns. */
const COPIED_MS = 1800;
/** How long a deep-linked item stays highlighted. */
const FLASH_MS = 2400;

/**
 * Copies a link to this page (or one item on it) to the clipboard. `hash` is
 * the item's anchor, e.g. "09"; without it the edition's own address is copied.
 *
 * Rendered as a real link, so it still works — as a plain jump — where the
 * clipboard is unavailable.
 */
export function CopyLink({
  hash,
  label,
  copiedLabel = "Link copied",
  className,
  as = "link",
}: {
  hash?: string;
  label: string;
  copiedLabel?: string;
  className?: string;
  as?: "link" | "button";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}${hash ? `#${hash}` : ""}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  const text = copied ? copiedLabel : label;

  if (as === "button") {
    return (
      <button type="button" onClick={copy} className={className} aria-live="polite">
        {text}
      </button>
    );
  }

  return (
    <a href={hash ? `#${hash}` : "#e-top"} onClick={copy} className={className} aria-live="polite">
      {text}
    </a>
  );
}

/**
 * When the address names an item (/rare-insights/edition-08#09), briefly
 * highlight that item. The browser has already scrolled it under the header
 * via its scroll-margin; this adds `data-flash` for a moment and takes it away.
 */
export function DeepLinkFlash() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let flashed: HTMLElement | null = null;

    const flash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el || !el.hasAttribute("data-item")) return;

      flashed?.removeAttribute("data-flash");
      clearTimeout(timer);
      flashed = el;
      el.setAttribute("data-flash", "");
      timer = setTimeout(() => el.removeAttribute("data-flash"), FLASH_MS);
    };

    flash();
    window.addEventListener("hashchange", flash);
    return () => {
      window.removeEventListener("hashchange", flash);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
