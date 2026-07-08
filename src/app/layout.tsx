import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { getFooterContent, getNavigation, getSiteSettings } from "@/lib/cms/queries";
import { SiteDataProvider } from "@/lib/cms/site-data-context";
import { AppChrome } from "@/components/app-chrome";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genetico",
  description:
    "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format, and enables AI-assisted clinical decision-making for rare and genetic disorders.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, footer, settings] = await Promise.all([
    getNavigation(),
    getFooterContent(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en" className={`${albertSans.variable} h-full`}>
      <body className="h-full">
        <SiteDataProvider value={{ navigation, footer, settings }}>
          <AppChrome>{children}</AppChrome>
        </SiteDataProvider>
      </body>
    </html>
  );
}
