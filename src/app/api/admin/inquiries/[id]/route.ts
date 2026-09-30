import fs from "node:fs";
import path from "node:path";
import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { get, run } from "@/server/db";
import { INQUIRY_STATUSES } from "@/server/cms/options";
import { PRIVATE_UPLOAD_DIR, resolveInside } from "@/server/uploads";

type Params = { id: string };

export const PATCH = route<Params>(async (request, { params }) => {
  const id = Number(params.id);
  const body = await readJson(request);
  const sets: string[] = [];
  const args: unknown[] = [];
  if ("status" in body) {
    if (!INQUIRY_STATUSES.some((s) => s.value === body.status)) throw new HttpError(422, "Trạng thái không hợp lệ");
    sets.push("status = ?");
    args.push(body.status);
  }
  if ("note" in body) {
    sets.push("note = ?");
    args.push(String(body.note ?? "").slice(0, 5000));
  }
  if (!sets.length) throw new HttpError(400, "Không có gì để cập nhật");
  const result = run(`UPDATE inquiries SET ${sets.join(", ")}, updated_at = datetime('now') WHERE id = ?`, ...args, id);
  if (!result.changes) throw new HttpError(404, "Không tìm thấy");
  return { ok: true };
});

export const DELETE = route<Params>(async (_request, { params }) => {
  const id = Number(params.id);
  const row = get<{ files: string }>("SELECT files FROM inquiries WHERE id = ?", id);
  if (!row) throw new HttpError(404, "Không tìm thấy");
  for (const f of JSON.parse(row.files || "[]") as { path: string }[]) {
    const abs = resolveInside(path.join(PRIVATE_UPLOAD_DIR, "inquiries"), f.path);
    if (abs && fs.existsSync(abs)) fs.rmSync(abs);
  }
  run("DELETE FROM inquiries WHERE id = ?", id);
  return { ok: true };
});
