import { isSafari } from "./safari";

let applied = false;

/**
 * Motion v12.30+ uses ScrollTimeline / ViewTimeline when available. Safari exposes
 * these APIs but scroll-linked opacity (and often other properties) stay stuck.
 * Hide the broken native APIs before Motion reads them.
 */
export function applySafariScrollFix(): void {
  if (applied || typeof window === "undefined" || !isSafari()) return;
  applied = true;

  try {
    Object.defineProperty(window, "ScrollTimeline", {
      configurable: true,
      get: () => undefined,
    });
    Object.defineProperty(window, "ViewTimeline", {
      configurable: true,
      get: () => undefined,
    });
  } catch {
    const w = window as unknown as Record<string, unknown>;
    delete w.ScrollTimeline;
    delete w.ViewTimeline;
  }
}

applySafariScrollFix();
