/** True for desktop Safari and iOS Safari (WebKit, not Chrome/Firefox on iOS). */
export function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) {
    return !/CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Chromium/.test(ua);
  }

  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua);
}
