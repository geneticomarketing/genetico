import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getSiteSettings } from "@/lib/cms/queries";
import { CONTACT_EMAIL, CONTACT_EMAIL_CC } from "@/lib/contact";
import {
  CONTACT_FIELD_LIMITS,
  CONTACT_HONEYPOT_FIELD,
  formatContactEmail,
  type ContactFormPayload,
} from "@/lib/contact-form";

/**
 * POST /api/contact — the enquiry form on every page.
 *
 * Sends one plain-text email through Resend to the address set in the CMS
 * (Site-wide → Contact details & form), falling back to RESEND_TO, with
 * the enquirer as reply-to so the team can answer straight from their inbox.
 * Nothing is stored.
 *
 * Environment (see .env.example):
 *   RESEND_API_KEY  a key allowed to send
 *   RESEND_FROM     a sender on a domain verified in Resend, e.g.
 *                   "Genetico Website <website@indigeneus.ai>"
 *   RESEND_TO / RESEND_CC  where enquiries go if Site-wide → Contact details
 *                          & form in the CMS leaves its addresses empty
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: keyof typeof CONTACT_FIELD_LIMITS) {
  const value = typeof data[key] === "string" ? (data[key] as string).trim() : "";
  return value.slice(0, CONTACT_FIELD_LIMITS[key]);
}

function parsePayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  const payload: ContactFormPayload = {
    firstName: field(data, "firstName"),
    lastName: field(data, "lastName"),
    email: field(data, "email"),
    role: field(data, "role"),
    phone: field(data, "phone") || undefined,
    organisation: field(data, "organisation") || undefined,
    message: field(data, "message") || undefined,
  };

  const complete = payload.firstName && payload.lastName && payload.email && payload.role;
  return complete && EMAIL_PATTERN.test(payload.email) ? payload : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // A hidden field people never see. Bots that fill every input fill it too;
  // answer them as if the enquiry went through, and send nothing.
  const trap = (body as Record<string, unknown> | null)?.[CONTACT_HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim()) {
    return NextResponse.json({ ok: true });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; enquiry not sent.");
    return NextResponse.json(
      { error: "Unable to send your message right now. Please email us at " + CONTACT_EMAIL },
      { status: 503 },
    );
  }

  const from = process.env.RESEND_FROM?.trim() || "Genetico Website <website@indigeneus.ai>";
  // The CMS says where enquiries go; the environment is the fallback.
  const settings = await getSiteSettings();
  const to = settings.contactEmail?.trim() || process.env.RESEND_TO?.trim() || CONTACT_EMAIL;
  const cc = settings.contactEmailCc?.trim() || process.env.RESEND_CC?.trim() || CONTACT_EMAIL_CC;

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: [to],
    ...(cc ? { cc: [cc] } : {}),
    replyTo: payload.email,
    subject: `Genetico lead: ${payload.role} — ${payload.firstName} ${payload.lastName}`,
    text: formatContactEmail(payload),
  });

  if (error) {
    console.error("[contact] Resend send failed:", error.name, error.message);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please email us at " + CONTACT_EMAIL },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
