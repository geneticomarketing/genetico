import { BLOG_PATH } from "@/lib/routes";

export { BLOG_PATH };

export type BlogPost = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "structured-genomic-data-rare-disease",
    category: "Clinical",
    categoryColor: "#024385",
    title: "How structured genomic data is reshaping rare disease diagnosis in India",
    excerpt:
      "Fragmented records and inconsistent capture slow rare disease diagnosis. Structured genomic workflows are helping referral centers move from suspicion to actionable reports faster.",
    author: "Arihant Mehra",
    date: "June 12, 2026",
    readTime: "6 min read",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(2,67,133,0.42) 0%, rgba(8,24,48,0.92) 55%, rgba(4,12,24,1) 100%)",
    content: [
      "Rare disease diagnosis in India often depends on information scattered across departments, paper records, and incompatible lab systems. Clinicians spend valuable time reconstructing patient histories instead of interpreting findings.",
      "Structured genomic data capture changes that equation. When phenotypes, family history, prior investigations, and sequencing outputs live in a single longitudinal record, multidisciplinary teams can review cases with far less friction.",
      "At referral hospitals adopting integrated workflows, case preparation time has dropped materially. Geneticists arrive at variant review with complete context, and clinicians can trace how each data point informed the final interpretation.",
      "The shift is not only operational. Better structure improves auditability, supports teaching cases, and creates datasets that institutions can use for quality improvement without compromising patient privacy.",
      "For India's rare disease ecosystem, the lesson is clear: faster diagnosis depends as much on information architecture as on sequencing depth. Platforms that standardize capture and connect clinical and genomic views will define the next phase of scale.",
    ],
  },
  {
    slug: "national-registries-rare-disease-policy",
    category: "Policy",
    categoryColor: "#d97706",
    title: "Building national registries: lessons from India's rare disease policy",
    excerpt:
      "India's national rare disease framework created momentum. The next challenge is turning policy intent into registries that clinicians, researchers, and public health teams can actually use.",
    author: "Arjun Gupta",
    date: "May 28, 2026",
    readTime: "5 min read",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(217,119,6,0.4) 0%, rgba(48,32,16,0.92) 55%, rgba(18,10,8,1) 100%)",
    content: [
      "National policy creates the mandate. Implementation creates the infrastructure. Across states, rare disease programs are discovering that registries only work when they align with how clinicians already document and follow patients.",
      "Successful registry design starts with minimum viable fields that map to real workflows: diagnosis status, phenotype capture, genomic test availability, treatment access, and longitudinal outcomes. Complexity can be layered in later.",
      "Interoperability matters. Registries that cannot exchange data with hospital systems become parallel burdens. The most durable models treat the registry as a structured view on clinical activity rather than a separate reporting exercise.",
      "Public health teams gain the most when registries support burden estimation, center-of-excellence planning, and therapy access tracking. Researchers benefit when de-identified cohorts can be derived without manual curation.",
      "India's opportunity is to leapfrog fragmented pilots with shared standards and institution-ready tooling. Policy opened the door; registry infrastructure will determine how quickly patients see the benefit.",
    ],
  },
  {
    slug: "ai-variant-interpretation-clinicians",
    category: "Research",
    categoryColor: "#45B191",
    title: "AI-assisted variant interpretation: what clinicians need to know",
    excerpt:
      "AI tools can accelerate variant triage, but clinical teams still need transparency, override paths, and workflow fit. Here is a practical framing for adoption in diagnostic labs.",
    author: "Dr. Shubha Phadke",
    date: "May 14, 2026",
    readTime: "4 min read",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(69,177,145,0.42) 0%, rgba(16,36,28,0.92) 55%, rgba(8,16,12,1) 100%)",
    content: [
      "Variant interpretation remains one of the highest-leverage steps in genomic diagnostics. AI-assisted systems can rank candidates, surface relevant literature, and highlight discordance between prediction engines and curated knowledge bases.",
      "Clinicians should evaluate these tools on three dimensions: explainability, control, and integration. A ranked list without provenance is difficult to trust in sign-out. A black-box recommendation that cannot be edited breaks accountability.",
      "The best deployments treat AI as a first-pass collaborator. Human reviewers retain final classification authority, with the system preserving an audit trail of what was suggested, accepted, or rejected.",
      "Workflow fit determines adoption. Tools that require exports, duplicate data entry, or live outside the case record tend to stall. Embedding assistance inside the diagnostic case is what sustains daily use.",
      "As labs scale WES and WGS, assisted interpretation will become baseline infrastructure. The clinical question is not whether to use AI, but how to ensure it strengthens—not replaces—expert judgment.",
    ],
  },
  {
    slug: "phenotype-to-genotype-diagnostic-odyssey",
    category: "Insights",
    categoryColor: "#7c3aed",
    title: "From phenotype to genotype: closing the diagnostic odyssey",
    excerpt:
      "Patients with rare diseases often wait years for answers. Connecting structured phenotyping with genomic testing is one of the most direct ways to shorten that journey.",
    author: "Dr. Rohit Sadanand",
    date: "April 30, 2026",
    readTime: "7 min read",
    thumbnail:
      "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(124,58,237,0.4) 0%, rgba(32,20,56,0.92) 55%, rgba(12,8,24,1) 100%)",
    content: [
      "The diagnostic odyssey is familiar to every rare disease team: repeated visits, inconclusive tests, and families carrying uncertainty for years. Much of the delay is not sequencing capacity—it is the gap between what clinicians observe and what labs receive.",
      "Structured phenotyping tools, including HPO-based capture, help teams express clinical findings in forms that travel cleanly into genomic workflows. That alignment improves test selection and focuses interpretation on biologically plausible variants.",
      "When phenotype and genotype data stay linked in one case, reanalysis becomes practical. New gene-disease associations and updated classification criteria can be applied without rebuilding the chart from scratch.",
      "Families benefit when progress is visible. A shared case timeline—symptoms captured, tests ordered, variants reviewed, reports issued—reduces the sense that care is stalled in invisible back offices.",
      "Closing the odyssey will require institutional commitment, but the technical path is increasingly clear: unify phenotype capture, genomic analysis, and multidisciplinary review in one longitudinal record built for rare disease complexity.",
    ],
  },
];

export function blogHref(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
