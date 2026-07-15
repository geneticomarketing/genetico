import type { Metadata } from "next";
import { Albert_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  /* Distinct from the Tailwind theme token so `--font-jetbrains-mono` can
     safely compose: var(--font-jetbrains) + fallbacks (no circular ref). */
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const revalidate = 60;

export const metadata: Metadata = {
  applicationName: "Genetico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
