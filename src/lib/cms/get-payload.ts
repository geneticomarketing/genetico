import configPromise from "@payload-config";
import { getPayload } from "payload";

let cached: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (cached) return cached;

  try {
    cached = await getPayload({ config: configPromise });
    return cached;
  } catch (error) {
    console.error("[CMS] Failed to initialize Payload:", error);
    return null;
  }
}

export function isCmsConfigured() {
  return Boolean(process.env.DATABASE_URI || process.env.DATABASE_URL);
}
