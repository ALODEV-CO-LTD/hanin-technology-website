import fs from "node:fs";
import { HttpError } from "@/server/auth";
import { route } from "@/server/api";
import { get, run } from "@/server/db";
import { PUBLIC_UPLOAD_DIR, resolveInside } from "@/server/uploads";

export const DELETE = route<{ id: string }>(async (_request, { params }) => {
  const row = get<{ path: string }>("SELECT path FROM media WHERE id = ?", Number(params.id));
  if (!row) throw new HttpError(404, "Không tìm thấy");
  const abs = resolveInside(PUBLIC_UPLOAD_DIR, row.path.replace(/^\/uploads\//, ""));
  if (abs && fs.existsSync(abs)) fs.rmSync(abs);
  run("DELETE FROM media WHERE id = ?", Number(params.id));
  return { ok: true };
});
