"use client";

import { useState, type FormEvent } from "react";

import { Eyebrow } from "@/components/chrome/eyebrow";
import type { HomeContactContent, HomeSectionMeta } from "@/lib/cms/home-content";
import { useSiteData } from "@/lib/cms/site-data-context";
import type { ContactFormPayload } from "@/lib/contact-form";

const INITIAL_FORM: Omit<ContactFormPayload, "role"> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organisation: "",
  message: "",
};

const FALLBACK_ROLES = [
  {
    label: "Clinician or Hospital",
    description:
      "We'll connect you to our medical team to walk through workflows, integration and a " +
      "2-week pilot at your center.",
  },
  {
    label: "Government or Public Health",
    description:
      "We'll walk you through registries, screening programmes, patient tracking and " +
      "real-time programme analytics.",
  },
  {
    label: "Life Science or Industry",
    description:
      "We'll show how structured, research-ready data and cohort identification support your " +
      "evidence pipeline.",
  },
  {
    label: "Investor",
    description:
      "We'll share how Genetico is building the digital backbone for the rare disease " +
      "ecosystem.",
  },
];

const FIELD =
  "border-rule text-ink focus:border-primary h-[46px] rounded-[10px] border bg-white px-3.5 " +
  "text-[14.5px] outline-none";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  span,
  disabled,
  onChange,
}: {
  label: string;
  name: keyof typeof INITIAL_FORM;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  /** Full-width fields sit across both columns. */
  span?: boolean;
  disabled: boolean;
  onChange: (name: keyof typeof INITIAL_FORM, value: string) => void;
}) {
  return (
    <label className={`flex flex-col gap-2 ${span ? "col-span-full" : ""}`}>
      <span className="text-ink text-[13.5px] font-medium">
        {label}
        {required ? "*" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(name, e.target.value)}
        className={FIELD}
      />
    </label>
  );
}

/**
 * The closing call to action and enquiry form, shared by every redesigned
 * page — the handoff carries it identically on all seven.
 *
 * The four audience tabs and every string in the form come from the
 * site-settings global, which already held exactly these four roles with
 * their blurbs; the redesign changes how they look, not where they live.
 *
 * Submission keeps the existing endpoint and payload, so enquiries carry on
 * reaching the same inbox.
 */
export function GetInTouch({
  section,
  num,
  content,
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomeContactContent;
}) {
  const settings = useSiteData()?.settings;
  const roles = settings?.contactRoles?.length
    ? settings.contactRoles.map((role) => ({
        label: role.label,
        description: role.description ?? "",
      }))
    : FALLBACK_ROLES;

  const wording = settings?.contactForm;
  const submitLabel = wording?.submitLabel ?? "Talk to our team";
  const privacyNote =
    wording?.privacyNote ??
    "By submitting, you agree to be contacted by Genetico. We never share your information " +
      "with third parties.";
  const successMessage =
    wording?.successMessage ?? "Thank you. Our team will get back to you within two working days.";
  const errorFallback = wording?.errorMessage ?? "Unable to send your message right now.";

  const [active, setActive] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const updateField = (name: keyof typeof INITIAL_FORM, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const payload: ContactFormPayload = {
      ...form,
      role: roles[active]?.label ?? roles[0]?.label ?? "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(data?.error || errorFallback);

      setStatus("sent");
      setForm(INITIAL_FORM);
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : errorFallback);
    }
  };

  const submitting = status === "submitting";

  return (
    <section
      id={section.id}
      data-reveal
      className="bg-contact-ground px-edge pt-sect-top pb-sect-bot scroll-mt-32"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-[22px] text-center">
        <Eyebrow>
          {num} · {section.eyebrow}
        </Eyebrow>
        <h2 className="font-headline m-0 text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.02em]">
          {content.heading}
        </h2>
        <p className="text-ink-body m-0 max-w-[620px] text-[14.5px] leading-[1.7]">
          {content.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a
            href={content.primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-deep hover:bg-primary rounded-full px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors"
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="border-rule text-ink hover:border-primary hover:text-primary rounded-full border bg-white px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-medium transition-colors"
          >
            {content.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* `lead-form` is the anchor the rest of the site has always used for
          this form — the six pages still on the old chrome all link to
          /#lead-form, and CTAs stored in the CMS point at it too. Keeping it
          alongside the section's own id means none of those links break while
          the redesign is only part way through. */}
      <div
        id="lead-form"
        className="border-rule shadow-panel mx-auto mt-11 max-w-[700px] scroll-mt-32 rounded-2xl border bg-white px-[30px] pt-[26px] pb-[30px]"
      >
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3.5 px-2 pt-[38px] pb-[34px] text-center">
            <span
              aria-hidden
              className="bg-teal-tint text-teal-deep flex h-11 w-11 items-center justify-center rounded-full text-[19px]"
            >
              ✓
            </span>
            <h3 className="font-headline m-0 text-[27px] leading-[1.2] tracking-[-0.015em]">
              Request received
            </h3>
            <p className="text-ink-body m-0 max-w-[400px] text-[14.5px] leading-[1.7]">
              {successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate={false}>
            {/* The design draws these as tabs, but the choice is submitted
                with the enquiry, so they are radios: arrow-key navigation and
                the focus ring come for free, and the value is part of the
                form rather than state beside it. */}
            <fieldset className="m-0 border-0 p-0">
              <legend className="sr-only">Who is getting in touch</legend>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((role, i) => (
                  <label
                    key={role.label}
                    className={`hover:bg-primary-tint has-focus-visible:outline-primary cursor-pointer rounded-full px-4 py-[9px] text-[13.5px] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-disabled:cursor-not-allowed has-disabled:opacity-60 ${
                      active === i
                        ? "bg-primary-tint text-primary font-bold"
                        : "text-ink-body font-normal"
                    }`}
                  >
                    <input
                      type="radio"
                      name="enquiryRole"
                      value={role.label}
                      checked={active === i}
                      disabled={submitting}
                      onChange={() => setActive(i)}
                      className="sr-only"
                    />
                    {role.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="bg-rule my-[18px] h-px" />
            <p className="text-primary m-0 mb-6 text-[14.5px] leading-[1.6]">
              {roles[active]?.description}
            </p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-5 gap-y-4">
              <Field
                label="First name"
                name="firstName"
                placeholder="First name"
                required
                value={form.firstName}
                disabled={submitting}
                onChange={updateField}
              />
              <Field
                label="Last name"
                name="lastName"
                placeholder="Last name"
                required
                value={form.lastName}
                disabled={submitting}
                onChange={updateField}
              />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="janedoe@email.com"
                required
                value={form.email}
                disabled={submitting}
                onChange={updateField}
              />
              <Field
                label="Phone number"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone ?? ""}
                disabled={submitting}
                onChange={updateField}
              />
              <Field
                label="Organisation"
                name="organisation"
                placeholder="Name of organisation"
                value={form.organisation ?? ""}
                span
                disabled={submitting}
                onChange={updateField}
              />
              <label className="col-span-full flex flex-col gap-2">
                <span className="text-ink text-[13.5px] font-medium">How can we help?</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us a little about what you're looking for."
                  value={form.message ?? ""}
                  disabled={submitting}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="border-rule text-ink focus:border-primary resize-y rounded-[10px] border bg-white px-3.5 py-3 text-[14.5px] outline-none"
                />
              </label>
            </div>

            {status === "error" ? (
              <p role="alert" className="mt-4 mb-0 text-center text-[13px] text-[#B01616]">
                {error}
              </p>
            ) : null}

            <p className="text-ink-soft mt-5 mb-0 text-center text-xs leading-[1.55]">
              {privacyNote}
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-deep hover:bg-primary mt-[18px] w-full cursor-pointer rounded-full py-3.5 text-[14.5px] font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending…" : submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
