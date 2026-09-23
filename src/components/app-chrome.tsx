"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { MotionSafariFix } from "@/components/MotionSafariFix";
import type { SiteData } from "@/lib/cms/site-data-context";

/**
 * Routes that have moved to the redesign.
 *
 * These pages own their own header, section rail and footer: the rail needs
 * the page's section list, and the footer sits *inside* the white sheet that
 * overlaps the hero, so neither can be hoisted into the layout. Add a route
 * here as it is rebuilt; when every route is listed, this component and the
 * `landing/` chrome it wraps are deleted.
 */
const REDESIGNED_ROUTES = new Set<string>([
  "/",
  "/home-v2",
  "/home-v3",
  "/home-v4",
  "/resources",
  "/about-us",
  "/platform",
  "/public-health",
  "/life-science",
  "/hospital",
]);

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
      <Navbar navigation={navigation} />
      {children}
      <Footer footer={footer} />
    </div>
  );
}
