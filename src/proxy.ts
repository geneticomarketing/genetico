import { NextResponse, type NextRequest } from "next/server";

import { buildPublicMediaUrl, extractPayloadMediaFilename } from "@/lib/cms/storage-url";

/**
 * Sends CMS media requests straight to Supabase storage, so images are served
 * from the bucket rather than streamed through the app.
 */
export function proxy(request: NextRequest) {
  const filename = extractPayloadMediaFilename(request.nextUrl.pathname);
  if (!filename) return NextResponse.next();

  const publicUrl = buildPublicMediaUrl(filename);
  if (!publicUrl) return NextResponse.next();

  return NextResponse.redirect(publicUrl, 307);
}

export const config = {
  matcher: "/api/media/file/:path*",
};
