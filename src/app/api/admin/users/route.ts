import { HttpError, hashPassword } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { all, run } from "@/server/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const GET = route(
  async () => ({
    items: all("SELECT id, email, name, role, active, created_at AS createdAt, last_login_at AS lastLoginAt FROM users ORDER BY id"),
  }),
  { auth: "admin" },
);

export const POST = route(
  async (request) => {
    const body = await readJson(request);
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const role = body.role === "admin" ? "admin" : "editor";
    if (!EMAIL_RE.test(email)) throw new HttpError(422, "Email không hợp lệ");
    if (password.length < 10) throw new HttpError(422, "Mật khẩu tối thiểu 10 ký tự");
    try {
      const r = run("INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)", email, String(body.name ?? "").slice(0, 100), hashPassword(password), role);
      return Response.json({ id: Number(r.lastInsertRowid) }, { status: 201 });
    } catch (err) {
      if (err instanceof Error && /UNIQUE/.test(err.message)) throw new HttpError(409, "Email đã tồn tại");
      throw err;
    }
  },
  { auth: "admin" },
);
