import { NEWSLETTER_URL } from "@/lib/contact";
import { LEAD_FORM_HASH } from "@/lib/routes";
import type { PlatformPageData } from "../types";

export const DEFAULT_PLATFORM_PAGE: PlatformPageData = {
  hero: {
    title: "IndiGeneUs.AI",
    subtitle:
      "An AI-enabled digital infrastructure purpose-built for rare and genetic diseases, bringing together clinical workflows, decision support, structured data, analytics, and research into one intelligent ecosystem.",
    ctaLabel: "Schedule a Walkthrough",
    ctaHref: "#get-in-touch",
    image: "/platformhero.png",
  },
  featuresSection: {
    eyebrow: "The Platform",
    heading: "Intelligent Data Capture for Rare Disease Care",
    description:
      "AI-assisted data capture, structured clinical workflows, and intelligent automation reduce manual effort while improving the quality, consistency, and usability of rare disease data.",
    features: [
      {
        id: "pedigree",
        number: "01",
        tabTitle: "Pedigree Intelligence",
        category: "GENETIC DATA CAPTURE",
        subheading: "VISUALIZE FAMILY HISTORY WITH STRUCTURED GENETIC INTELLIGENCE",
        title: "Pedigree Intelligence",
        description:
          "Create detailed family pedigrees through an intuitive visual interface designed for clinical genetics. Capture inheritance patterns, phenotype relationships, and family history as structured data that supports diagnosis, clinical decision support, and future analysis.",
        bullets: [
          "Interactive pedigree builder with automated relationship mapping",
          "Visualize inheritance patterns and genetic relationships",
          "Integrated with longitudinal patient records and clinical workflows",
        ],
        illustration: "/thing.png",
      },
      {
        id: "hpo",
        number: "02",
        tabTitle: "AI-powered Phenotyping",
        category: "PHENOTYPING",
        subheading: "STANDARDIZED PHENOTYPE DOCUMENTATION AT SCALE",
        title: "AI-powered Phenotyping",
        description:
          "Automatically extract Human Phenotype Ontology (HPO) terms from clinical notes and reports using AI, reducing manual effort while improving the consistency and completeness of phenotype documentation.",
        bullets: [
          "AI-assisted HPO extraction",
          "Standardized phenotype documentation",
          "Improved clinical decision support",
        ],
        illustration: "/platform/hpo-extraction.svg",
      },
      {
        id: "ocr",
        number: "03",
        tabTitle: "OCR & Report Digitization",
        category: "DIGITIZATION",
        subheading: "STRUCTURED DATA FROM CLINICAL DOCUMENTS",
        title: "OCR & Report Digitization",
        description:
          "Digitize laboratory reports, genetic test results, and clinical documents using AI-powered OCR and intelligent data extraction to create structured, searchable clinical records.",
        bullets: [
          "AI-powered OCR",
          "Intelligent report parsing",
          "Structured clinical data generation",
        ],
        illustration: "/platform/ocr-digitization.svg",
      },
      {
        id: "workflows",
        number: "04",
        tabTitle: "Structured Clinical Workflows",
        category: "WORKFLOWS",
        subheading: "CONSISTENT DOCUMENTATION ACROSS PROGRAMS",
        title: "Structured Clinical Workflows",
        description:
          "Purpose-built workflows standardize data capture across rare disease programs, enabling consistent documentation, interoperability, analytics, and research-ready datasets.",
        bullets: [
          "Standardized clinical templates",
          "AI-assisted documentation",
          "Research-ready structured data",
        ],
        illustration: "/platform/standardized-workflows.svg",
      },
    ],
  },
  clinicalIntelligence: {
    eyebrow: "Clinical Intelligence",
    heading: "Clinical Decision Support System",
    description:
      "AI-assisted clinical decision support that combines phenotypic, genomic, and clinical evidence to help clinicians evaluate complex rare disease cases with greater confidence.",
    capabilities: [
      {
        number: "01",
        title: "RAPID Score™",
        description:
          "Prioritizes likely differential diagnoses by continuously analyzing structured phenotypic, genomic, and clinical data as new information becomes available.",
        badge: "AI-Assisted Differential Diagnosis",
      },
      {
        number: "02",
        title: "Evidence-Based Clinical Reasoning",
        description:
          "Every recommendation is fully traceable to structured phenotypic data, genomic findings, clinical guidelines, and published literature, ensuring AI remains transparent, explainable, and clinician-controlled.",
        badge: "Transparent & Explainable AI",
      },
      {
        number: "03",
        title: "Disease Comparison & Clinical Disambiguation",
        description:
          "Compare clinically similar rare diseases side by side using phenotypic overlap, genomic findings, inheritance patterns, and supporting evidence to improve diagnostic confidence.",
        badge: "AI-Assisted Disease Comparison",
      },
    ],
  },
  longitudinalCare: {
    eyebrow: "Longitudinal Care",
    heading: "From Patient Journeys to Longitudinal Intelligence",
    description:
      "Build lifelong patient records that evolve with every consultation, enabling continuous care, AI-assisted insights, outcome tracking, and research-ready longitudinal data.",
    columns: [
      {
        id: "journey",
        title: "Longitudinal Patient Journey",
        description:
          "Capture every milestone in a patient's rare disease journey, from referral and diagnosis to treatment and follow-up, through structured longitudinal records that support continuity of care and informed clinical decisions.",
        bullets: [
          "Unified patient timeline across every clinical encounter",
          "AI-assisted visit summaries and clinical documentation",
          "Track disease progression, treatment response, and outcomes over time",
        ],
      },
      {
        id: "analytics",
        title: "Advanced Clinical Analytics",
        description:
          "Transform structured clinical data into real-time dashboards that reveal patient trends, cohort insights, disease progression, and operational performance across institutions.",
        bullets: [
          "Interactive cohort analysis and disease trend visualization",
          "AI-assisted analytics for clinical and research insights",
          "Export research-ready reports and population-level evidence",
        ],
      },
    ],
  },
  infrastructure: {
    eyebrow: "Infrastructure",
    heading: "Built for Enterprise Healthcare Environments",
    description:
      "Designed to integrate with existing healthcare ecosystems while providing the flexibility to deploy across hospitals, research institutions, and public health programs without disrupting existing workflows.",
    integrationTags: [
      "HL7 / FHIR",
      "EHR Systems",
      "Lab APIs",
      "OMIM",
      "ORPHANET",
      "HAPI-FHIR",
      "Custom Webhooks",
      "DICOM",
    ],
    integrationsTitle: "Integrations",
    integrationsDescription:
      "IndiGeneUs.AI is designed to work alongside your existing digital ecosystem. Connect with hospital information systems, laboratory platforms, genetic testing workflows, and external knowledge resources to create a unified clinical experience.",
    deploymentTitle: "Deployment Flexibility",
    deploymentDescription:
      "Whether deployed on-premise or in the cloud, IndiGeneUs.AI adapts to institutional security, compliance, and operational requirements while ensuring scalability and performance.",
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
  },
  security: {
    eyebrow: "Security & Compliance",
    heading: "Built for Trust. Designed for Healthcare.",
    description:
      "Every layer of IndiGeneUs.AI is designed to protect sensitive clinical and genetic information through enterprise-grade security, transparent governance, and institution-controlled data ownership.",
    cards: [
      {
        title: "Enterprise-grade Data Protection",
        description:
          "Clinical and genomic data is encrypted during transmission and storage using industry-standard security protocols.",
      },
      {
        title: "Role-based Access Control",
        description:
          "Granular permissions ensure every user accesses only the information relevant to their clinical or operational responsibilities.",
      },
      {
        title: "Complete Audit Trails",
        description:
          "Every action is securely logged, providing full traceability, accountability, and compliance across clinical workflows.",
      },
    ],
  },
  cta: {
    heading: "Build the Future of Rare Disease Care with IndiGeneUs.AI",
    description:
      "Discover how AI-assisted clinical workflows, structured data intelligence, clinical decision support, and advanced analytics can help transform rare disease care across your institution.",
    buttons: [
      { label: "Book a Demo", href: LEAD_FORM_HASH, variant: "primary" },
      { label: "Subscribe for Updates", href: NEWSLETTER_URL, variant: "secondary" },
    ],
  },
};
