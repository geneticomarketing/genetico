/**
 * Google Tag Manager and cookie consent.
 *
 * GTM loads on every public page (never in /admin), with Google Consent Mode v2
 * set to "denied" for analytics and advertising storage until the visitor
 * accepts in the cookie banner. Tags inside the container that respect
 * consent (GA4 does by default) then run cookieless until consent is given.
 *
 * The container ID can be overridden with NEXT_PUBLIC_GTM_ID; set it to an
 * empty string to switch GTM off (e.g. on a staging deploy).
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MHNFM4ZM";

/** Where the visitor's choice is remembered, in localStorage. */
export const CONSENT_STORAGE_KEY = "genetico-cookie-consent";

export type ConsentChoice = "granted" | "denied";

/** The storage types the banner's "Accept" grants. Security/functional storage is always on. */
export const CONSENT_TYPES = [
  "analytics_storage",
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

/**
 * Runs in <head> before GTM: sets every optional storage type to denied, then
 * re-applies a choice the visitor made on an earlier visit.
 */
export const consentDefaultsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ${CONSENT_TYPES.map((t) => `${t}: 'denied'`).join(",\n  ")},
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ${CONSENT_TYPES.map((t) => `${t}: 'granted'`).join(",\n      ")}
    });
  }
} catch (e) {}
`;

/** The standard GTM container snippet. */
export const gtmScript = (id: string) => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`;
