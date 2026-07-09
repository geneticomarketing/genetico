import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getUtilityPagesData } from "@/lib/cms/page-data";
import { CMS_PAGE_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = CMS_PAGE_REVALIDATE_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const utility = await getUtilityPagesData();
  const comingSoon = utility.comingSoon;

  return createPageMetadata({
    title: comingSoon?.metaTitle?.replace(` | Genetico`, "") ?? "Coming Soon",
    description: comingSoon?.metaDescription ?? "This section of Genetico is coming soon.",
    path: "/coming-soon",
    noIndex: true,
  });
}

export default async function ComingSoonPage() {
  const utility = await getUtilityPagesData();
  const page = utility.comingSoon;

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,215,203,0.14)_0%,transparent_68%)]" />
        <img
          src="/dna.svg"
          alt=""
          className="absolute top-1/2 right-[-12%] h-[120%] w-auto max-w-none -translate-y-1/2 opacity-20"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="t-eyebrow text-accent mb-5">{page.eyebrow}</p>
        <h1 className="t-heading text-balance text-white">{page.heading}</h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
          {page.body}
        </p>
        <Link
          href={page.backHref ?? "/"}
          className="bg-brand mt-10 inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#01356b]"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          {page.backLabel}
        </Link>
      </div>
    </main>
  );
}
