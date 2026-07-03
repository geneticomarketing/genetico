import { Resend } from "resend";
import { NextResponse } from "next/server";

import { formatContactEmail, type ContactFormPayload } from "@/lib/contact-form";
import { CONTACT_EMAIL, CONTACT_EMAIL_CC } from "@/lib/contact";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const lastName = typeof data.lastName === "string" ? data.lastName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const role = typeof data.role === "string" ? data.role.trim() : "";
  const organisation =
    typeof data.organisation === "string" ? data.organisation.trim() : undefined;
  const message = typeof data.message === "string" ? data.message.trim() : undefined;

  if (!firstName || !lastName || !email || !role || !isValidEmail(email)) {
    return null;
  }

  return { firstName, lastName, email, role, organisation, message };
}

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email delivery is not configured. Set RESEND_API_KEY." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const from =
    process.env.RESEND_FROM?.trim() || "Genetico Website <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: [CONTACT_EMAIL],
    cc: [CONTACT_EMAIL_CC],
    replyTo: payload.email,
    subject: `Genetico lead: ${payload.role} — ${payload.firstName} ${payload.lastName}`,
    text: formatContactEmail(payload),
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
