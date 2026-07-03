import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/landing/navbar";
import LS from "@/components/LS";
import { Footer } from "@/components/landing/footer";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genetico",
  description:
    "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format, and enables AI-assisted clinical decision-making for rare and genetic disorders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${albertSans.variable} h-full`}>
      <body className="bg-navy flex min-h-full flex-col">
        <LS />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
