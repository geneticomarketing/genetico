import type { Metadata } from "next";

import "./globals.css";

import { NotFoundView } from "@/components/not-found-view";

/**
 * The 404 for URLs no route matches. The site and the admin panel have
 * separate root layouts, so there is no single layout to build this from;
 * Next.js renders this page on its own (experimental.globalNotFound).
 */
export const metadata: Metadata = {
  title: "Page not found | Genetico",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <NotFoundView />
      </body>
    </html>
  );
}
