import fs from "node:fs";
import { NextResponse } from "next/server";
import { MIME_BY_EXT, PUBLIC_UPLOAD_DIR, extOf, resolveInside } from "@/server/uploads";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const file = resolveInside(PUBLIC_UPLOAD_DIR, segments.join("/"));
  const mime = MIME_BY_EXT[extOf(segments[segments.length - 1] ?? "")];
  if (!file || !mime || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(new Uint8Array(fs.readFileSync(file)), {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
