"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { MotionSafariFix } from "@/components/MotionSafariFix";
import type { SiteData } from "@/lib/cms/site-data-context";

/**
 * Routes that have moved to the redesign.
 *
 * These pages own their own header, section rail and footer: the rail needs
 * the page's section list, and the footer sits *inside* the white sheet that
 * overlaps the hero, so neither can be hoisted into the layout.
 */
const REDESIGNED_ROUTES = new Set<string>([
  "/",
  "/resources",
  "/about-us",
  "/platform",
  "/public-health",
  "/life-science",
  "/hospital",
]);

/**
 * Everything else — the blog, the coming-soon page and the privacy policy —
 * keeps its own body but wears the same header and footer as the rest of the
 * site, so the navigation reads the same on every page. The blog's pages are
 * light; the other two are navy, so there the header takes its dark tone until
 * it turns solid on scroll. Either way it lies over the page, whose own top
 * padding was set to clear the old fixed navbar. None has numbered sections,
 * so there is no rail.
 */
export function AppChrome({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation: SiteData["navigation"];
  footer: SiteData["footer"];
}) {
  const pathname = usePathname();

  if (REDESIGNED_ROUTES.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="bg-navy flex min-h-full flex-col">
      <MotionSafariFix />
      <SiteHeader
        navigation={navigation}
        sections={[]}
        tone={pathname.startsWith("/blog") ? "light" : "dark"}
        overlay
      />
      {children}
      <SiteFooter footer={footer} />
    </div>
  );
}
