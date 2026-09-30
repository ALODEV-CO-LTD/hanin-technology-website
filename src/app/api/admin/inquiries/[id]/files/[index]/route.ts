import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { HttpError } from "@/server/auth";
import { route } from "@/server/api";
import { get } from "@/server/db";
import { PRIVATE_UPLOAD_DIR, resolveInside } from "@/server/uploads";

type Params = { id: string; index: string };

/** Tải file đính kèm của khách (có thể là bản vẽ mật theo NDA) — chỉ dành cho người đã đăng nhập CMS. */
export const GET = route<Params>(async (_request, { params }) => {
  const row = get<{ files: string }>("SELECT files FROM inquiries WHERE id = ?", Number(params.id));
  const file = (JSON.parse(row?.files || "[]") as { path: string; original: string; mime: string }[])[Number(params.index)];
  if (!file) throw new HttpError(404, "Không tìm thấy tệp");
  const abs = resolveInside(path.join(PRIVATE_UPLOAD_DIR, "inquiries"), file.path);
  if (!abs || !fs.existsSync(abs)) throw new HttpError(404, "Tệp đã bị xoá");
  return new NextResponse(new Uint8Array(fs.readFileSync(abs)), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.original)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
});
