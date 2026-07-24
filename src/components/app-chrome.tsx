"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import LS from "@/components/LS";
import { MotionSafariFix } from "@/components/MotionSafariFix";
import type { SiteData } from "@/lib/cms/site-data-context";

export function AppChrome({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation: SiteData["navigation"];
  footer: SiteData["footer"];
}) {
  return (
    <div className="bg-navy flex min-h-full flex-col">
      <MotionSafariFix />
      {/* <LS /> */}
      <Navbar navigation={navigation} />
      {children}
      <Footer footer={footer} />
    </div>
  );
}
