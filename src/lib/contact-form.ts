export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organisation?: string;
  message?: string;
  role: string;
};

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
