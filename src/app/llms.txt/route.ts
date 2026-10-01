import { getBlogPosts } from "@/lib/cms/queries";
import { getResourcesPageContent } from "@/lib/cms/resources-page-data";
import { blogHref } from "@/lib/blogs";
import { CONTACT_EMAIL } from "@/lib/contact";
import { LEAD_FORM_HASH } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo";
import { STATIC_PAGE_SEO, type StaticPageKey } from "@/lib/seo-pages";

/**
 * /llms.txt — a plain-Markdown summary of the site for AI assistants and LLM
 * crawlers (the llmstxt.org convention): who Genetico is, what IndiGeneUs.AI
 * does, who it is for, and where each topic is covered.
 *
 * Every statement here is one the site itself makes; keep it that way. Page
 * descriptions come from STATIC_PAGE_SEO and the resource and blog lists from
 * the CMS, so the file stays in step with the site without being edited.
 */

export const revalidate = 3600;

const SECTIONS: { heading: string; pages: StaticPageKey[] }[] = [
  { heading: "Company", pages: ["home", "about"] },
  { heading: "Platform", pages: ["platform"] },
  { heading: "Who it is for", pages: ["hospital", "lifeScience", "publicHealth"] },
  { heading: "Resources", pages: ["resources", "blog"] },
];

export async function GET() {
  const site = getSiteUrl();
  const [resources, posts] = await Promise.all([getResourcesPageContent(), getBlogPosts()]);
  const link = (title: string, href: string, note?: string) =>
    `- [${title}](${href.startsWith("http") ? href : `${site}${href}`})${note ? `: ${note}` : ""}`;

  const videos = [
    ...(resources.featured ? [resources.featured] : []),
    ...resources.videos.items,
    ...resources.deepDives.items,
  ];

  const lines = [
    "# Genetico",
    "",
    "> Genetico is a health technology company developing digital solutions for the rare and " +
      "genetic disease ecosystem in India. Its platform, IndiGeneUs.AI, is an AI-enabled clinical " +
      "genetics platform that connects patient records, clinical workflows, phenotype data, " +
      "registries, decision support, analytics and research.",
    "",
    "Key facts:",
    "",
    "- Genetics departments at AIIMS New Delhi and CDFD Hyderabad use IndiGeneUs.AI in consultations.",
    "- 15 rare disease centres are engaged under the PraGed Mission.",
    "- IndiGeneUs.AI covers structured clinical and phenotype data capture, pedigree charting, " +
      "AI-assisted differential diagnosis (clinical decision support), longitudinal patient " +
      "records, analytics, and registry and referral workflows for public-health programmes.",
    "- It serves clinicians, hospitals and Centres of Excellence, diagnostic laboratories, " +
      "life-science and research teams, and government public-health programmes (including " +
      "India's National Policy for Rare Diseases).",
    `- Contact: ${CONTACT_EMAIL}, or the enquiry form at ${site}/${LEAD_FORM_HASH}`,
    "",
    ...SECTIONS.flatMap(({ heading, pages }) => [
      `## ${heading}`,
      "",
      ...pages.map((key) => {
        const seo = STATIC_PAGE_SEO[key];
        return link(seo.label === "Home" ? "Genetico home" : seo.label, seo.path, seo.description);
      }),
      "",
    ]),
    "## Videos",
    "",
    ...videos.map((video) => link(video.title, video.href, video.blurb || undefined)),
    "",
    "## Articles",
    "",
    ...resources.articles.items.map((article) => link(article.title, article.href)),
    "",
    "## Blog posts",
    "",
    ...posts.map((post) => link(post.title, blogHref(post.slug), post.excerpt)),
    "",
    "## Optional",
    "",
    link("Privacy policy", STATIC_PAGE_SEO.privacyPolicy.path),
    link("Cookie policy", STATIC_PAGE_SEO.cookiePolicy.path),
    link("Sitemap", "/sitemap.xml"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
