import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";
import { getLegalPageBySlug } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

type PolicySection = {
  title: string;
  body: string[];
  list?: string[];
  contact?: boolean;
};

const FALLBACK_SECTIONS: PolicySection[] = [
  {
    title: "1. Introduction",
    body: [
      "Genetico (\"we,\" \"us,\" or \"our\") operates IndiGeneUs.AI, a platform that structures clinical workflows, captures standardized patient data, and supports AI-assisted clinical decision-making for rare and genetic disorders.",
      "This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our platform, or otherwise interact with us. By using our services, you agree to the practices described here.",
    ],
  },
  {
    title: "13. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or our data practices, please contact us using the email address below.",
    ],
    contact: true,
  },
];

function richTextToParagraphs(body: unknown): string[] {
  if (!body || typeof body !== "object") return [];
  const root = (body as { root?: { children?: unknown[] } }).root;
  if (!root?.children?.length) return [];

  const paragraphs: string[] = [];

  for (const node of root.children) {
    if (!node || typeof node !== "object") continue;
    const record = node as { type?: string; children?: { text?: string }[] };
    if (record.type === "paragraph" && record.children?.length) {
      const text = record.children.map((child) => child.text ?? "").join("").trim();
      if (text) paragraphs.push(text);
    }
  }

  return paragraphs;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug("privacy-policy");
  const seo = STATIC_PAGE_SEO.privacyPolicy;

  return createPageMetadata({
    title: page?.title ?? seo.title,
    description: page?.metaDescription ?? seo.description,
    path: seo.path,
  });
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPageBySlug("privacy-policy");
  const sections: PolicySection[] =
    page?.sections?.length ?
      page.sections.map((section) => ({
        title: section.title,
        body: richTextToParagraphs(section.body),
        list: section.bullets?.map((item) => item.item).filter(Boolean),
        contact: section.title.toLowerCase().includes("contact"),
      }))
    : FALLBACK_SECTIONS;

  const lastUpdated = page?.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "July 3, 2026";

  return (
    <main className="relative flex flex-1 flex-col px-6 py-20 sm:px-10 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,215,203,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to home
        </Link>

        <p className="t-eyebrow text-accent mb-4">Legal</p>
        <h1 className="t-heading text-balance text-white">{page?.title ?? "Privacy Policy"}</h1>
        <p className="mt-4 text-sm text-white/45">Last updated: {lastUpdated}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-medium text-white">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  {paragraph}
                </p>
              ))}
              {section.contact && (
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  <a
                    href={CONTACT_MAILTO}
                    className="text-accent underline-offset-2 transition-colors hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
              {section.list?.map((item) => (
                <p key={item} className="mt-3 pl-4 text-sm leading-relaxed text-white/60 sm:text-base">
                  <span aria-hidden className="mr-2 text-white/30">
                    •
                  </span>
                  {item}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
