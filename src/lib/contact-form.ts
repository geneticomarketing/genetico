/** What the enquiry form posts to /api/contact. */
export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organisation?: string;
  message?: string;
  /** The audience tab chosen on the form, e.g. "Clinician or Hospital". */
  role: string;
};

/** Longest value kept per field; anything past it is cut before the email is built. */
export const CONTACT_FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 40,
  organisation: 200,
  role: 100,
  message: 5000,
} as const;

/**
 * Name of the hidden spam-trap input. Real visitors never see or fill it; a
 * submission that has it filled is dropped without sending.
 */
export const CONTACT_HONEYPOT_FIELD = "website";

export function formatContactEmail(payload: ContactFormPayload) {
  const lines = [
    `Role: ${payload.role}`,
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone?.trim() || "—"}`,
    `Organisation: ${payload.organisation?.trim() || "—"}`,
    "",
    "Message:",
    payload.message?.trim() || "—",
  ];

  return lines.join("\n");
}
