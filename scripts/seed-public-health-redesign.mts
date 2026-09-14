// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Replaces the Public Health page's copy with the redesign's.
 *
 *   npx tsx scripts/seed-public-health-redesign.mts
 *
 * Overwrites, like the Platform seed and unlike the others. The stored text
 * is the same material but cased for the old design — headings in Title Case
 * and labels in capitals, because they used to be set as small all-caps type.
 * The redesign sets them as sentence-case headings and uppercases the small
 * labels in CSS, so leaving the stored values would have the page shouting.
 *
 * The tier "level line" is new: the old design had nowhere to put it.
 */

const payload = await getPayload({ config });

async function put(slug: Parameters<typeof payload.updateGlobal>[0]["slug"], data: object) {
  await payload.updateGlobal({ slug, data });
  console.log(`${slug}: updated`);
}

await put("public-health-hero", {
  titleLine1: "Digital backbone for",
  titleLine2: "India's",
  titleHighlight: "rare disease ecosystem",
  subtitle:
    "IndiGeneUs.AI connects India's rare disease ecosystem in a Hub & Spoke model — from " +
    "PHC-level referral to CoE-level diagnosis — giving government health institutions the " +
    "clinical and reporting tools they need for NPRD implementation.",
});

await put("public-health-impact", {
  eyebrow: "Impact",
  heading: "Impact at a glance",
  description:
    "A unified digital infrastructure enabling connected care, better governance, and seamless " +
    "compliance across India's rare disease ecosystem.",
  features: [
    {
      title: "Three-tier health system connected",
      description:
        "Primary health centres, district hospitals, and Centres of Excellence work from one " +
        "shared case record instead of parallel registers.",
    },
    {
      title: "Real-time national dashboards",
      description:
        "Programme officers see case volumes, referral turnaround, and district coverage as " +
        "they happen — no monthly collation cycle.",
    },
    {
      title: "No duplicate entry across ICMR and crowdfunding portals",
      description:
        "Case data captured once is reused for registry submissions, funding applications, and " +
        "ministry reporting.",
    },
    {
      title: "Built for India's DPDP Act",
      description:
        "Role-based access, consent capture, and a complete audit trail are part of the " +
        "workflow, not a bolt-on.",
    },
  ],
});

await put("public-health-three-tier", {
  eyebrow: "Three-tier model",
  heading: "How it works",
  description:
    "Genetico operates across all three levels of India's healthcare system — connecting " +
    "frontline workers to national policy data through a single platform.",
  tiers: [
    {
      bannerLabel: "Centres of Excellence",
      levelLabel: "Tertiary level · Class C",
      happens: [
        { item: "Structured phenotyping and genotype capture" },
        { item: "NPRD case management and reporting" },
        { item: "Genetic counselling and pedigree analysis" },
        { item: "Automated reporting to ministries" },
      ],
      dataFlows: [
        { item: "Structured case records → national registry" },
        { item: "Anonymised cohort data → research use" },
        { item: "Ministry reports → automated, scheduled" },
        { item: "Referrals downward → secondary tier" },
      ],
      users: [
        {
          role: "Clinical geneticist",
          description: "Consultation workflows, RAPID scoring, case registry entry",
        },
        {
          role: "Genetic counsellor",
          description: "Pedigree editor, patient history, follow-up scheduling",
        },
        {
          role: "Hospital admin / reporting officer",
          description: "NPRD automated reports, ministry submissions, audit logs",
        },
      ],
    },
    {
      bannerLabel: "District Hospitals",
      levelLabel: "Secondary level · Class D",
      happens: [
        { item: "Suspected case intake and triage" },
        { item: "Referral coordination with Centres of Excellence" },
        { item: "Follow-up visit tracking and treatment adherence" },
        { item: "District-level programme reporting" },
      ],
      dataFlows: [
        { item: "Referrals upward → Centre of Excellence" },
        { item: "Case updates → national registry" },
        { item: "District reports → state dashboards" },
        { item: "Screening outcomes → programme analytics" },
      ],
      users: [
        {
          role: "Paediatrician / physician",
          description: "Suspected-case intake, red-flag checklists, referral notes",
        },
        {
          role: "District programme officer",
          description: "District dashboard, referral turnaround, coverage reporting",
        },
        {
          role: "Nodal nurse / coordinator",
          description: "Follow-up scheduling, patient contact log, transport requests",
        },
      ],
    },
    {
      bannerLabel: "Primary Health Centres",
      levelLabel: "Primary level · Frontline",
      happens: [
        { item: "Frontline screening and red-flag checks" },
        { item: "Family history and consent capture" },
        { item: "Referral dispatch to the district hospital" },
        { item: "Patient counselling and follow-up reminders" },
      ],
      dataFlows: [
        { item: "Screening records → district hospital" },
        { item: "Suspected-case alerts → referral queue" },
        { item: "Field data → state dashboards" },
        { item: "Consent records → audit log" },
      ],
      users: [
        {
          role: "ASHA / ANM worker",
          description: "Mobile screening forms, family history capture, visit log",
        },
        {
          role: "Medical officer (PHC)",
          description: "Referral submission, case notes, counselling scripts",
        },
        {
          role: "Data entry operator",
          description: "Offline-capable capture, validation prompts, sync status",
        },
      ],
    },
  ],
});

await put("public-health-architecture", {
  eyebrow: "Architecture",
  heading: "How the tiers are connected",
  description:
    "Hub-and-spoke model connecting all levels of healthcare delivery through a unified " +
    "platform. Structured reporting flows up; referral guidance flows down.",
  classificationLabel: "Hospital classification",
  classifications: [
    {
      level: "Hub A/B | National level",
      title: "NPRD / Ministry of Health",
      description:
        "PCI-capable national coordination. Aggregates reporting from all Spoke C hospitals, " +
        "publishes policy guidance, and maintains the national rare disease registry.",
      tags: [
        { tag: "National dashboard" },
        { tag: "Policy analytics" },
        { tag: "Automated NPRD reports" },
      ],
    },
    {
      level: "Spoke C | Secondary level",
      timeBadge: "<30 min",
      title: "Centres of Excellence (Class C)",
      description:
        "EGC-capable hospitals within 30 minutes of the hub. Manage confirmed rare disease " +
        "cases, run specialist workflows, and refer complex cases upward.",
      tags: [
        { tag: "Case management" },
        { tag: "Genetic counselling" },
        { tag: "Specialist workflows" },
      ],
    },
    {
      level: "Spoke D | Primary level",
      timeBadge: ">30 min",
      title: "District Health Centres (Class D)",
      description:
        "EGC and thrombolysis capable, more than 30 minutes from the hub. First point of " +
        "contact — screen for suspected cases and dispatch ambulance referrals to Spoke C.",
      tags: [
        { tag: "Screening tools" },
        { tag: "Referral submission" },
        { tag: "Field data capture" },
      ],
    },
  ],
});

await put("public-health-cta", {
  heading: "Are you interested in bringing IndiGeneUs.AI to your institution?",
  description: "Talk to our team about a pilot deployment.",
});

console.log("\nDone. The Public Health page now reads as the redesign specifies.");
process.exit(0);
