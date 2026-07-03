/** Any iPhone / iPad / iPod — all browsers use WebKit (Safari, Chrome, Firefox, etc.). */
export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/** Desktop Safari (excludes Chromium on macOS). */
export function isDesktopSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  if (isIOS()) return false;

  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua);
}

/** Motion's native ScrollTimeline path is unreliable on WebKit. */
export function needsScrollTimelineFallback(): boolean {
  return isIOS() || isDesktopSafari();
}
