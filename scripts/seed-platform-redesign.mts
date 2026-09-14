// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Replaces the Platform page's copy with the redesign's.
 *
 *   npx tsx scripts/seed-platform-redesign.mts
 *
 * Unlike the other seed scripts this one **overwrites**. The Platform page was
 * rewritten for the redesign rather than restyled — the headline, the section
 * standfirsts and every capability description are new — so preserving what
 * was stored would leave the page reading as a mixture of two drafts.
 *
 * Everything it writes is editable in /admin afterwards, and the run before it
 * is in .cms-backup.
 *
 * The illustrations are stored as local paths rather than the absolute
 * genetico.in URLs the design uses: the same files are already in public/, so
 * a local path saves a round trip to another origin and keeps next/image from
 * needing that host allow-listed.
 */

const payload = await getPayload({ config });

async function put(slug: Parameters<typeof payload.updateGlobal>[0]["slug"], data: object) {
  await payload.updateGlobal({ slug, data });
  console.log(`${slug}: updated`);
}

await put("platform-hero", {
  eyebrow: "A Genetico Platform",
  title: "The clinical infrastructure for",
  titleEmphasis: "rare and genetic disease",
  subtitle:
    "Clinical workflows, AI-assisted decision support, structured longitudinal data, and " +
    "analytics — brought together in one intelligent ecosystem built for the institutions that " +
    "treat the hardest cases.",
  ctaLabel: "Schedule a walkthrough",
  ctaHref: "#get-in-touch",
});

await put("platform-features", {
  eyebrow: "The Platform",
  heading: "Intelligent Data Capture for Rare Disease Care",
  description:
    "AI-assisted data capture, structured clinical workflows, and intelligent automation reduce " +
    "manual effort while improving the quality, consistency, and usability of rare disease data.",
  features: [
    {
      title: "Pedigree Intelligence",
      category: "Genetic Data Capture",
      subheading: "Visualize family history with structured genetic intelligence",
      description:
        "Create detailed family pedigrees through an intuitive visual interface designed for " +
        "clinical genetics. Capture inheritance patterns, phenotype relationships, and family " +
        "history as structured data that supports diagnosis, clinical decision support, and " +
        "future analysis.",
      bullets: [
        { item: "Interactive pedigree builder with automated relationship mapping" },
        { item: "Visualize inheritance patterns and genetic relationships" },
        { item: "Integrated with longitudinal patient records and clinical workflows" },
      ],
      illustration: "/platform/pedigree-editor.svg",
    },
    {
      title: "AI-powered Phenotyping",
      category: "Phenotyping",
      subheading: "Standardized phenotype documentation at scale",
      description:
        "Automatically extract Human Phenotype Ontology (HPO) terms from clinical notes and " +
        "reports using AI, reducing manual effort while improving the consistency and " +
        "completeness of phenotype documentation.",
      bullets: [
        { item: "AI-assisted HPO extraction" },
        { item: "Standardized phenotype documentation" },
        { item: "Improved clinical decision support" },
      ],
      illustration: "/platform/hpo-extraction.svg",
    },
    {
      title: "OCR & Report Digitization",
      category: "Digitization",
      subheading: "Structured data from clinical documents",
      description:
        "Digitize laboratory reports, genetic test results, and clinical documents using " +
        "AI-powered OCR and intelligent data extraction to create structured, searchable " +
        "clinical records.",
      bullets: [
        { item: "AI-powered OCR" },
        { item: "Intelligent report parsing" },
        { item: "Structured clinical data generation" },
      ],
      illustration: "/platform/ocr-digitization.svg",
    },
    {
      title: "Structured Clinical Workflows",
      category: "Workflows",
      subheading: "Consistent documentation across programs",
      description:
        "Purpose-built workflows standardize data capture across rare disease programs, " +
        "enabling consistent documentation, interoperability, analytics, and research-ready " +
        "datasets.",
      bullets: [
        { item: "Standardized clinical templates" },
        { item: "AI-assisted documentation" },
        { item: "Research-ready structured data" },
      ],
      illustration: "/platform/standardized-workflows.svg",
    },
  ],
});

await put("platform-clinical-intelligence", {
  eyebrow: "Clinical Intelligence",
  heading: "Clinical Decision Support System",
  description:
    "AI-assisted clinical decision support that combines phenotypic, genomic, and clinical " +
    "evidence to help clinicians evaluate complex rare disease cases with greater confidence.",
  capabilities: [
    {
      title: "RAPID Score™",
      badge: "AI-Assisted Differential Diagnosis",
      description:
        "Prioritizes likely differential diagnoses by continuously analyzing structured " +
        "phenotypic, genomic, and clinical data as new information becomes available.",
    },
    {
      title: "Evidence-Based Clinical Reasoning",
      badge: "Transparent & Explainable AI",
      description:
        "Every recommendation is fully traceable to structured phenotypic data, genomic " +
        "findings, clinical guidelines, and published literature, ensuring AI remains " +
        "transparent, explainable, and clinician-controlled.",
    },
    {
      title: "Disease Comparison & Clinical Disambiguation",
      badge: "AI-Assisted Disease Comparison",
      description:
        "Compare clinically similar rare diseases side by side using phenotypic overlap, " +
        "genomic findings, inheritance patterns, and supporting evidence to improve diagnostic " +
        "confidence.",
    },
  ],
});

await put("platform-longitudinal-care", {
  eyebrow: "Longitudinal Care",
  heading: "From Patient Journeys to Longitudinal Intelligence",
  description:
    "Build lifelong patient records that evolve with every consultation, enabling continuous " +
    "care, AI-assisted insights, outcome tracking, and research-ready longitudinal data.",
  columns: [
    {
      title: "Longitudinal Patient Journey",
      description:
        "Capture every milestone in a patient's rare disease journey, from referral and " +
        "diagnosis to treatment and follow-up, through structured longitudinal records that " +
        "support continuity of care and informed clinical decisions.",
      bullets: [
        { item: "Unified patient timeline across every clinical encounter" },
        { item: "AI-assisted visit summaries and clinical documentation" },
        { item: "Track disease progression, treatment response, and outcomes over time" },
      ],
    },
    {
      title: "Advanced Clinical Analytics",
      description:
        "Transform structured clinical data into real-time dashboards that reveal patient " +
        "trends, cohort insights, disease progression, and operational performance across " +
        "institutions.",
      bullets: [
        { item: "Interactive cohort analysis and disease trend visualization" },
        { item: "AI-assisted analytics for clinical and research insights" },
        { item: "Export research-ready reports and population-level evidence" },
      ],
    },
  ],
});

await put("platform-infrastructure", {
  eyebrow: "Infrastructure",
  heading: "Built for Enterprise Healthcare Environments",
  description:
    "Designed to integrate with existing healthcare ecosystems while providing the flexibility " +
    "to deploy across hospitals, research institutions, and public health programs without " +
    "disrupting existing workflows.",
  integrationsTitle: "Integrations",
  integrationsDescription:
    "IndiGeneUs.AI is designed to work alongside your existing digital ecosystem. Connect with " +
    "hospital information systems, laboratory platforms, genetic testing workflows, and " +
    "external knowledge resources to create a unified clinical experience.",
  integrationBullets: [
    { item: "HL7 / FHIR-native exchange with hospital systems" },
    { item: "Direct connections to LIMS, lab and genetic testing platforms" },
    { item: "Live lookups against OMIM, ORPHANET and HPO" },
  ],
  integrationTags: [
    "HL7 / FHIR",
    "EHR Systems",
    "Lab APIs",
    "OMIM",
    "ORPHANET",
    "HAPI-FHIR",
    "Custom Webhooks",
    "DICOM",
  ].map((tag) => ({ tag })),
  deploymentTitle: "Deployment Flexibility",
  deploymentDescription:
    "Whether deployed on-premise or in the cloud, IndiGeneUs.AI adapts to institutional " +
    "security, compliance, and operational requirements while ensuring scalability and " +
    "performance.",
  deploymentBullets: [
    { item: "Cloud, on-premise or fully air-gapped deployment" },
    { item: "Institution-controlled data residency and retention" },
    { item: "Scales from a single centre to a national programme" },
  ],
  deploymentOptions: [
    {
      title: "Cloud-Based",
      description: "Managed infrastructure, auto-scaling, zero operational overhead.",
    },
    {
      title: "On-Premise",
      description: "Full data sovereignty, custom infrastructure, air-gapped options.",
    },
    {
      title: "Hybrid",
      description: "Mix of cloud and on-premise based on data sensitivity policies.",
    },
  ],
});

await put("platform-security", {
  eyebrow: "Security & Compliance",
  heading: "Built for Trust. Designed for Healthcare.",
  description:
    "Every layer of IndiGeneUs.AI is designed to protect sensitive clinical and genetic " +
    "information through enterprise-grade security, transparent governance, and " +
    "institution-controlled data ownership.",
  cards: [
    {
      title: "Enterprise-grade Data Protection",
      description:
        "Clinical and genomic data is encrypted during transmission and storage using " +
        "industry-standard security protocols.",
    },
    {
      title: "Role-based Access Control",
      description:
        "Granular permissions ensure every user accesses only the information relevant to " +
        "their clinical or operational responsibilities.",
    },
    {
      title: "Complete Audit Trails",
      description:
        "Every action is securely logged, providing full traceability, accountability, and " +
        "compliance across clinical workflows.",
    },
  ],
});

console.log("\nDone. The Platform page now reads as the redesign specifies.");
process.exit(0);
