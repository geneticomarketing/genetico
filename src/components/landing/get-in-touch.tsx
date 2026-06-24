"use client";

import { useState } from "react";
import { CalendarCheck, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CALENDLY_URL, CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const ROLES = [
  {
    label: "Clinician or Hospital",
    blurb:
      "We'll connect you to our medical team to walk through workflows, integration and a 2-week pilot at your center.",
  },
  {
    label: "Government or Public Health",
    blurb:
      "We'll route you to our public health team to discuss screening frameworks, registries and population-scale deployment.",
  },
  {
    label: "Pharma or Industry",
    blurb:
      "We'll connect you with partnerships to explore cohort access, real-world evidence and research collaboration.",
  },
  {
    label: "Investor",
    blurb:
      "We'll set up time with the founding team to walk through the platform, traction and roadmap.",
  },
];

const CONTACTS = [
  { label: "Email", value: CONTACT_EMAIL, href: CONTACT_MAILTO, Icon: Mail },
  {
    label: "Book a meeting",
    value: "calendly.com/priyanshu-vats-genetico",
    href: CALENDLY_URL,
    Icon: CalendarCheck,
  },
] as const;

const INPUT_CLASS =
  "focus:border-brand rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/35";

function Field({
  label,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-sm font-medium text-black/70">
        {label}
        {required && <span className="text-danger">*</span>}
      </span>
      <input type={type} placeholder={placeholder} className={INPUT_CLASS} />
    </label>
  );
}

export function GetInTouch() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="get-in-touch"
      className="relative overflow-hidden bg-[#F4F6F9] px-5 py-16 sm:px-10 sm:py-20 lg:py-28"
    >
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Left — heading, intro + contact details */}
          <div className="flex flex-col gap-5 sm:gap-7">
            <h2 className="t-heading text-black">
              Different conversation, depending on who you are
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-black/55 sm:text-[15px]">
              Genetico connects clinicians, institutions, government bodies, and industry
              stakeholders through a unified digital infrastructure. Tell us who you are and
              we&apos;ll route you to the right person.
            </p>

            <div className="mt-1 flex flex-col gap-5 sm:mt-2 sm:gap-6">
              {CONTACTS.map((c) => (
                <div key={c.label} className="flex items-start gap-3 sm:items-center sm:gap-4">
                  <span className="text-brand shrink-0">
                    <c.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold tracking-wide text-black/40 uppercase">
                      {c.label}
                    </span>
                    <a
                      href={c.href}
                      className="hover:text-brand text-sm font-medium break-words text-black/80 transition-colors sm:text-base"
                    >
                      {c.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex min-w-0 flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_15px_60px_rgba(0,0,0,0.07)] sm:p-6 md:p-8"
          >
            {/* Audience tabs — horizontal scroll on narrow screens, equal-width row on md+ */}
            <div className="-mx-5 flex [scrollbar-width:none] items-center gap-2 overflow-x-auto border-b border-black/10 px-5 pb-4 [-ms-overflow-style:none] sm:-mx-6 sm:px-6 md:mx-0 md:justify-between md:gap-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {ROLES.map((role, i) => (
                <button
                  key={role.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`shrink-0 cursor-pointer rounded-lg px-3 py-2.5 text-center text-xs leading-tight whitespace-nowrap transition-colors md:px-2.5 lg:text-[13px] ${
                    active === i
                      ? "text-brand bg-[#EEF2F8] font-semibold"
                      : "font-medium text-black/40 hover:text-black/60"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            {/* Contextual blurb */}
            <p className="text-brand pt-4 text-sm leading-snug font-medium sm:pt-5 sm:text-[15px]">
              {ROLES[active]?.blurb}
            </p>

            {/* Fields */}
            <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
                <Field label="First Name" placeholder="First Name" required />
                <Field label="Last Name" placeholder="Last Name" required />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
                <Field label="Work Email" placeholder="janedoe@email.com" type="email" required />
                <Field label="Phone Number" placeholder="+0 123 456 7890" type="tel" />
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-black/70">Organisation</span>
                <input placeholder="Name of Organisation" className={INPUT_CLASS} />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-black/70">How Can We Help?</span>
                <textarea
                  rows={4}
                  placeholder="Tell us a little about what you're looking for."
                  className={`${INPUT_CLASS} resize-none`}
                />
              </label>
            </div>

            {/* Disclaimer + submit */}
            <p className="mt-5 text-center text-xs leading-normal text-black/45 sm:mt-6 sm:text-[13px]">
              By submitting, you agree to be contacted by Genetico. We never share your information.
            </p>
            <button
              type="submit"
              className="bg-brand mt-4 w-full rounded-lg py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#01356b]"
            >
              Talk to Our Team
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
