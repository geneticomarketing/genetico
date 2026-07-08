import { NextResponse, type NextRequest } from "next/server";

import { buildPublicMediaUrl, extractPayloadMediaFilename } from "@/lib/cms/storage-url";

export function middleware(request: NextRequest) {
  const filename = extractPayloadMediaFilename(request.nextUrl.pathname);
  if (!filename) return NextResponse.next();

  const publicUrl = buildPublicMediaUrl(filename);
  if (!publicUrl) return NextResponse.next();

  return NextResponse.redirect(publicUrl, 307);
}

export const config = {
  matcher: "/api/media/file/:path*",
};
