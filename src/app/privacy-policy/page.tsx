import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | Genetico",
  description:
    "How Genetico and IndiGeneUs.AI collect, use, and protect personal and clinical information.",
};

const LAST_UPDATED = "July 3, 2026";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "Genetico (\"we,\" \"us,\" or \"our\") operates IndiGeneUs.AI, a platform that structures clinical workflows, captures standardized patient data, and supports AI-assisted clinical decision-making for rare and genetic disorders.",
      "This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our platform, or otherwise interact with us. By using our services, you agree to the practices described here.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We may collect the following categories of information:",
    ],
    list: [
      "Contact and account information — such as your name, email address, phone number, job title, and organization when you request a demo, subscribe to updates, or create an account.",
      "Clinical and health-related data — including patient demographics, symptoms, phenotypes, medical history, diagnostic reports, and genomic information processed through IndiGeneUs.AI on behalf of healthcare institutions.",
      "Usage and technical data — such as IP address, browser type, device identifiers, pages visited, and interaction logs to improve platform performance and security.",
      "Communications — records of correspondence when you contact us for support, partnerships, or other inquiries.",
    ],
  },
  {
    title: "3. How We Use Information",
    body: [
      "We use collected information to:",
    ],
    list: [
      "Provide, operate, and improve the IndiGeneUs.AI platform and related services.",
      "Support clinical workflows, decision support, and structured data capture as authorized by participating institutions.",
      "Respond to inquiries, schedule demos, and communicate product updates.",
      "Maintain security, detect fraud, and generate audit trails for compliance purposes.",
      "Analyze aggregated, de-identified usage patterns to improve our products.",
      "Comply with applicable laws, regulations, and contractual obligations.",
    ],
  },
  {
    title: "4. Legal Basis and Institutional Control",
    body: [
      "Where IndiGeneUs.AI is deployed within a hospital, clinic, or public health program, the participating institution typically acts as the data controller for patient information. Genetico processes such data as a processor or service provider under agreements with those institutions and only as instructed by them.",
      "For website visitors and business contacts, Genetico acts as the data controller for the personal information you provide directly to us.",
    ],
  },
  {
    title: "5. How We Share Information",
    body: [
      "We do not sell personal or clinical information. We may share information only in the following circumstances:",
    ],
    list: [
      "With healthcare institutions and authorized users as part of delivering platform services.",
      "With trusted service providers who assist with hosting, analytics, email delivery, or support — bound by confidentiality and data protection obligations.",
      "When required by law, regulation, legal process, or to protect the rights, safety, and security of users and the public.",
      "In connection with a merger, acquisition, or sale of assets, subject to continued protection of your information.",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      "We implement administrative, technical, and organizational measures designed to protect information, including encryption in transit and at rest, role-based access controls, and comprehensive audit logging. No method of transmission or storage is completely secure, but we continuously work to safeguard the data entrusted to us.",
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      "We retain information for as long as necessary to provide our services, fulfill contractual obligations with participating institutions, comply with legal requirements, and resolve disputes. Retention periods for clinical data are determined by institutional policies and applicable healthcare regulations.",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "Depending on your location and relationship with us, you may have rights to access, correct, delete, or restrict processing of your personal information, or to withdraw consent where processing is consent-based. Requests regarding patient data processed on behalf of an institution should be directed to that institution. For other requests, contact us using the details below.",
    ],
  },
  {
    title: "9. Cookies and Analytics",
    body: [
      "Our website may use cookies and similar technologies to remember preferences, measure traffic, and improve user experience. You can control cookies through your browser settings. Disabling cookies may affect certain site functionality.",
    ],
  },
  {
    title: "10. Third-Party Links",
    body: [
      "Our website may contain links to third-party sites (such as scheduling tools or social media). We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.",
    ],
  },
  {
    title: "11. International Transfers",
    body: [
      "If information is transferred across borders, we take steps to ensure appropriate safeguards are in place consistent with applicable data protection requirements.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the \"Last updated\" date at the top of this page. Material changes may also be communicated through our website or direct notice where appropriate.",
    ],
  },
  {
    title: "13. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or our data practices, please contact us using the email address below.",
    ],
    contact: true,
  },
] as const;

export default function PrivacyPolicyPage() {
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
        <h1 className="t-heading text-balance text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/45">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-medium text-white">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  {paragraph}
                </p>
              ))}
              {"contact" in section && section.contact && (
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  <a
                    href={CONTACT_MAILTO}
                    className="text-accent underline-offset-2 transition-colors hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
              {"list" in section &&
                section.list?.map((item) => (
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
