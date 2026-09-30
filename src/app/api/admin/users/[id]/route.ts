import { HttpError, hashPassword } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { get, run } from "@/server/db";

type Params = { id: string };

function otherActiveAdmins(exceptId: number): number {
  return Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND active = 1 AND id != ?", exceptId)?.n ?? 0);
}

export const PUT = route<Params>(
  async (request, { params, user }) => {
    const id = Number(params.id);
    const body = await readJson(request);
    const sets: string[] = [];
    const args: unknown[] = [];
    if ("name" in body) {
      sets.push("name = ?");
      args.push(String(body.name ?? "").slice(0, 100));
    }
    if ("role" in body) {
      const role = body.role === "admin" ? "admin" : "editor";
      if (role !== "admin" && id === user!.id && otherActiveAdmins(id) === 0) throw new HttpError(409, "Cần giữ ít nhất 1 quản trị viên");
      sets.push("role = ?");
      args.push(role);
    }
    if ("active" in body) {
      const active = body.active ? 1 : 0;
      if (!active && (id === user!.id)) throw new HttpError(409, "Không thể tự vô hiệu hoá tài khoản của mình");
      sets.push("active = ?");
      args.push(active);
    }
    if (typeof body.password === "string" && body.password) {
      if (body.password.length < 10) throw new HttpError(422, "Mật khẩu tối thiểu 10 ký tự");
      sets.push("password_hash = ?");
      args.push(hashPassword(body.password));
    }
    if (!sets.length) throw new HttpError(400, "Không có gì để cập nhật");
    if (!run(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`, ...args, id).changes) throw new HttpError(404, "Không tìm thấy");
    if ("active" in body && !body.active) run("DELETE FROM sessions WHERE user_id = ?", id);
    return { ok: true };
  },
  { auth: "admin" },
);

export const DELETE = route<Params>(
  async (_request, { params, user }) => {
    const id = Number(params.id);
    if (id === user!.id) throw new HttpError(409, "Không thể xoá chính mình");
    if (!run("DELETE FROM users WHERE id = ?", id).changes) throw new HttpError(404, "Không tìm thấy");
    return { ok: true };
  },
  { auth: "admin" },
);
