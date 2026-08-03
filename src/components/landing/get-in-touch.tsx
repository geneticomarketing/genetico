"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import type { ContactFormPayload } from "@/lib/contact-form";
import { useSiteData } from "@/lib/cms/site-data-context";
import { CALENDLY_URL, CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const DEFAULT_ROLES = [
  {
    label: "Clinician or Hospital",
    description:
      "We'll connect you to our medical team to walk through workflows, integration and a 2-week pilot at your center.",
  },
  {
    label: "Government or Public Health",
    description:
      "We'll route you to our public health team to discuss screening frameworks, registries and population-scale deployment.",
  },
  {
    label: "Life Science or Industry",
    description:
      "We'll connect you with partnerships to explore cohort access, real-world evidence and research collaboration.",
  },
  {
    label: "Investor",
    description:
      "We'll set up time with the founding team to walk through the platform, traction and roadmap.",
  },
] as const;

const INPUT_CLASS =
  "focus:border-brand rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/35 disabled:cursor-not-allowed disabled:bg-black/[0.03]";

const INITIAL_FORM: Omit<ContactFormPayload, "role"> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organisation: "",
  message: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  disabled,
}: {
  label: string;
  name: keyof typeof INITIAL_FORM;
  value: string;
  onChange: (name: keyof typeof INITIAL_FORM, value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-sm font-medium text-black/70">
        {label}
        {required && <span className="text-danger">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={INPUT_CLASS}
        required={required}
        disabled={disabled}
      />
    </label>
  );
}

export function GetInTouch({ embedded = false }: { embedded?: boolean }) {
  const siteData = useSiteData();
  const settings = siteData?.settings;
  const roles = settings?.contactRoles?.length
    ? settings.contactRoles.map((role) => ({
        label: role.label,
        description: role.description ?? "",
      }))
    : DEFAULT_ROLES.map((role) => ({ label: role.label, description: role.description }));

  const contactForm = settings?.contactForm;
  const submitLabel = contactForm?.submitLabel ?? "Talk to Our Team";
  const successMessage =
    contactForm?.successMessage ??
    "Thanks — your message was sent. Our team will be in touch soon.";
  const privacyNote =
    contactForm?.privacyNote ??
    "By submitting, you agree to be contacted by Genetico. We never share your information.";
  const intro =
    contactForm?.intro ??
    "Genetico connects clinicians, institutions, government bodies, and industry stakeholders through a unified digital infrastructure. Tell us who you are and we'll route you to the right person.";

  const calendlyUrl = settings?.calendlyUrl ?? CALENDLY_URL;
  const contactEmail = settings?.contactEmail ?? CONTACT_EMAIL;

  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (name: keyof typeof INITIAL_FORM, value: string) => {
    setFormData((current) => ({ ...current, [name]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload: ContactFormPayload = {
      ...formData,
      role: roles[active]?.label ?? roles[0]?.label ?? "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message right now.");
      }

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    }
  };

  const form = (
    <form
      id={embedded ? "lead-form" : undefined}
      onSubmit={handleSubmit}
      style={
        {
          // scrollPaddingTop: "100px",
          // scrollMarginTop: "-150px",
        }
      }
      className="flex min-w-0 flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_15px_60px_rgba(0,0,0,0.07)] max-md:w-full sm:p-6 md:p-8"
    >
      <div className="-mx-5 flex [scrollbar-width:none] items-center gap-2 overflow-x-auto border-b border-black/10 px-5 pb-4 [-ms-overflow-style:none] sm:-mx-6 sm:px-6 md:mx-0 md:justify-between md:gap-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {roles.map((role, i) => (
          <button
            key={role.label}
            type="button"
            onClick={() => setActive(i)}
            disabled={status === "submitting"}
            className={`shrink-0 cursor-pointer rounded-lg px-3 py-2.5 text-center text-xs leading-tight whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:px-2.5 lg:text-[13px] ${
              active === i
                ? "text-brand bg-[#EEF2F8] font-semibold"
                : "font-medium text-black/40 hover:text-black/60"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      <p className="text-brand min-h-18 pt-4 text-sm leading-snug font-medium sm:pt-5 sm:text-[1rem]">
        {roles[active]?.description}
      </p>

      <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
          <Field
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={updateField}
            placeholder="First Name"
            required
            disabled={status === "submitting"}
          />
          <Field
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={updateField}
            placeholder="Last Name"
            required
            disabled={status === "submitting"}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
          <Field
            label="Work Email"
            name="email"
            value={formData.email}
            onChange={updateField}
            placeholder="janedoe@email.com"
            type="email"
            required
            disabled={status === "submitting"}
          />
          <Field
            label="Phone Number"
            name="phone"
            value={formData.phone ?? ""}
            onChange={updateField}
            placeholder="+91 98765 43210"
            type="tel"
            disabled={status === "submitting"}
          />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-black/70">Organisation</span>
          <input
            name="organisation"
            value={formData.organisation}
            onChange={(e) => updateField("organisation", e.target.value)}
            placeholder="Name of Organisation"
            className={INPUT_CLASS}
            disabled={status === "submitting"}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-black/70">How Can We Help?</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            rows={4}
            placeholder="Tell us a little about what you're looking for."
            className={`${INPUT_CLASS} resize-none`}
            disabled={status === "submitting"}
          />
        </label>
      </div>

      <p className="mt-5 text-center text-xs leading-normal text-black/45 sm:mt-6 sm:text-[13px]">
        {privacyNote}
      </p>

      {status === "success" && (
        <p className="text-brand mt-4 text-center text-sm font-medium" role="status">
          {successMessage}
        </p>
      )}

      {status === "error" && (
        <p className="text-danger mt-4 text-center text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand mt-4 w-full rounded-lg py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#01356b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>
    </form>
  );

  if (embedded) {
    return (
      <Reveal className="relative z-10 mx-auto w-full max-w-3xl pb-16 max-md:w-full sm:px-10 sm:pb-20 lg:pb-24">
        {form}
      </Reveal>
    );
  }

  return (
    <section
      id="get-in-touch"
      className="relative overflow-hidden bg-mist px-5 py-16 sm:px-10 sm:py-20 lg:py-28"
    >
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="t-intro">
              <h2 className="t-heading text-black">
                Different conversation, depending on who you are
              </h2>
              <p className="t-subhead mt-5 text-sm leading-relaxed text-black/55 sm:text-[15px]">
                {intro}
              </p>
            </div>

            <div className="mt-1 flex flex-col gap-5 sm:mt-2 sm:gap-6">
              {[
                { label: "Email", value: contactEmail, href: CONTACT_MAILTO, Icon: Mail },
                {
                  label: "Book a meeting",
                  value: calendlyUrl.replace(/^https?:\/\//, ""),
                  href: calendlyUrl,
                  Icon: CalendarCheck,
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 sm:items-center sm:gap-4">
                  <span className="text-brand shrink-0">
                    <c.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="t-badge text-xs font-semibold tracking-wide text-black/40 uppercase">
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

          {form}
        </div>
      </Reveal>
    </section>
  );
}
