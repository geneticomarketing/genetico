import { needsScrollTimelineFallback } from "./platform";

let applied = false;

/**
 * Motion v12.30+ uses ScrollTimeline / ViewTimeline when available. WebKit exposes
 * these APIs but scroll-linked values (especially opacity) stay stuck on iOS.
 */
export function applySafariScrollFix(): void {
  if (applied || typeof window === "undefined" || !needsScrollTimelineFallback()) return;
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
