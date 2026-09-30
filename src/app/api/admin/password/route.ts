import { HttpError, hashPassword, verifyPassword } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { get, run } from "@/server/db";

export const PUT = route(async (request, { user }) => {
  const body = await readJson(request);
  const current = String(body.currentPassword ?? "");
  const next = String(body.newPassword ?? "");
  if (next.length < 10) throw new HttpError(422, "Mật khẩu mới tối thiểu 10 ký tự");
  const row = get<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", user!.id);
  if (!row || !verifyPassword(current, row.password_hash)) throw new HttpError(403, "Mật khẩu hiện tại không đúng");
  run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(next), user!.id);
  return { ok: true };
});
