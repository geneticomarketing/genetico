import { NEWSLETTER_URL } from "@/lib/contact";
import type { PublicHealthPageData } from "../types";

export const DEFAULT_PUBLIC_HEALTH_PAGE: PublicHealthPageData = {
  hero: {
    titleLine1: "Digital Backbone for",
    titleLine2: "India's rare disease ecosystem",
    subtitle:
      "IndiGeneUs.AI connects India's rare disease ecosystem in a Hub & Spoke model from PHC-level referral to CoE-level diagnosis, giving government health institutions the clinical and reporting tools they need for NPRD implementation.",
    image: "/phero.png",
  },
  impact: {
    eyebrow: "IMPACT",
    heading: "Impact at a Glance",
    description:
      "A unified digital infrastructure enabling connected care, better governance, and seamless compliance across India's rare disease ecosystem.",
    features: [
      {
        number: "01",
        category: "HEALTH NETWORK",
        title: "Three-Tier Health System Connected",
      },
      {
        number: "02",
        category: "MINISTRY OVERSIGHT",
        title: "Real-Time National Dashboards",
      },
      {
        number: "03",
        category: "DATA INTEGRATION",
        title: "No Duplicate Entry Across ICMR & Crowdfunding Portals",
      },
      {
        number: "04",
        category: "COMPLIANCE",
        title: "Built for India's DPDP Act",
      },
    ],
  },
  threeTier: {
    eyebrow: "THREE-TIER MODEL",
    heading: "How It Works",
    description:
      "Genetico operates across all three levels of India's healthcare system — connecting frontline workers to national policy data through a single platform.",
    tiers: [
      {
        id: "tertiary",
        tabLabel: "Tertiary Level",
        bannerLabel: "CENTRES OF EXCELLENCE",
        title: "Tertiary Level",
        happens: [
          "Structured phenotyping and genotype capture",
          "NPRD case management and reporting",
          "Genetic counseling and pedigree analysis",
          "Automated reporting to ministries",
        ],
        dataFlows: [
          "Structured case records → national registry",
          "Anonymised cohort data → research use",
          "Ministry reports → automated, scheduled",
          "Referrals downward → secondary tier",
        ],
        users: [
          {
            role: "Clinical Geneticist",
            description: "Consultation workflows, RAPID scoring, case registry entry",
          },
          {
            role: "Genetic Counselor",
            description: "Pedigree editor, patient history, follow-up scheduling",
          },
          {
            role: "Hospital Admin / Reporting Officer",
            description: "NPRD automated reports, ministry submissions, audit logs",
          },
        ],
      },
      {
        id: "secondary",
        tabLabel: "Secondary Level",
        bannerLabel: "DISTRICT HOSPITALS",
        title: "Secondary Level",
        happens: [
          "Referral intake and clinical workup documentation",
          "Specialist consultation coordination",
          "Lab order tracking and results capture",
          "Upward referrals to tertiary centres",
        ],
        dataFlows: [
          "Referral packets → tertiary centres",
          "Diagnostic summaries → district registry",
          "Follow-up alerts → primary tier",
          "Aggregated metrics → state dashboards",
        ],
        users: [
          {
            role: "District Physician",
            description: "Referral workflows, case summaries, specialist coordination",
          },
          {
            role: "Lab Coordinator",
            description: "Test orders, result digitisation, sample tracking",
          },
          {
            role: "District Program Officer",
            description: "District reporting, referral analytics, program oversight",
          },
        ],
      },
      {
        id: "primary",
        tabLabel: "Primary Level",
        bannerLabel: "PRIMARY HEALTH CENTRES",
        title: "Primary Level",
        happens: [
          "Community screening and early symptom capture",
          "ASHA and ANM field data collection",
          "Patient identification and referral initiation",
          "Health education and follow-up reminders",
        ],
        dataFlows: [
          "Screening records → secondary tier",
          "Referral triggers → district hospitals",
          "Vaccination and visit logs → state systems",
          "Population signals → policy dashboards",
        ],
        users: [
          {
            role: "Primary Care Physician",
            description: "Screening tools, referral initiation, patient triage",
          },
          {
            role: "ASHA / Community Health Worker",
            description: "Mobile capture, household visits, symptom reporting",
          },
          {
            role: "PHC Medical Officer",
            description: "Program monitoring, local registry, outreach planning",
          },
        ],
      },
    ],
  },
  architecture: {
    eyebrow: "Architecture",
    heading: "How the Tiers Are Connected",
    description:
      "Hub-and-spoke model connecting all levels of healthcare delivery through a unified platform. Structured reporting flows up; referral guidance flows down.",
    classificationLabel: "HOSPITAL CLASSIFICATION",
    classifications: [
      {
        id: "hub",
        level: "HUB A/B | NATIONAL LEVEL",
        title: "NPRD / Ministry of Health",
        description:
          "PCI-capable national coordination. Aggregates reporting from all Spoke C hospitals, publishes policy guidance, and maintains the national rare disease registry.",
        tags: ["National dashboard", "Policy analytics", "Automated NPRD reports"],
      },
      {
        id: "spoke-c",
        level: "SPOKE C | SECONDARY LEVEL",
        timeBadge: "<30 min",
        title: "Centres of Excellence (Class C)",
        description:
          "EGC-capable hospitals within 30 min of the hub. Manage confirmed rare disease cases, run specialist workflows, and refer complex cases upward.",
        tags: ["Case management", "Genetic counselling", "Specialist workflows"],
      },
      {
        id: "spoke-d",
        level: "SPOKE D | PRIMARY LEVEL",
        timeBadge: ">30 min",
        title: "District Health Centres (Class D)",
        description:
          "EGC & Thrombolysis capable, >30 min from hub. First point of contact — screen for suspected cases and dispatch ambulance referrals to Spoke C.",
        tags: ["Screening tools", "Referral submission", "Field data capture"],
      },
    ],
  },
  cta: {
    heading: "Are you interested in bringing IndiGeneUs.AI to your institution?",
    description: "Talk to our team for a pilot deployment",
    buttons: [
      { label: "Request pilot", href: "#lead-form", variant: "primary" },
      { label: "Subscribe for Updates", href: NEWSLETTER_URL, variant: "secondary" },
    ],
  },
};
