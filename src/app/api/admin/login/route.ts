import { NextResponse } from "next/server";
import { createSession, hashPassword, verifyPassword } from "@/server/auth";
import { get } from "@/server/db";
import { readJson, route } from "@/server/api";
import { clientIp, rateLimit } from "@/server/rate-limit";

// Hash giả để thời gian phản hồi không lộ email có tồn tại hay không.
const DUMMY_HASH = hashPassword("dummy-password-for-timing");

export const POST = route(
  async (request) => {
    const ip = clientIp(request);
    if (!rateLimit(`login:${ip}`, 10, 15 * 60)) {
      return NextResponse.json({ error: "Thử đăng nhập quá nhiều lần, vui lòng đợi 15 phút." }, { status: 429 });
    }
    const body = await readJson(request);
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const user = get<{ id: number; password_hash: string; active: number }>(
      "SELECT id, password_hash, active FROM users WHERE email = ?",
      email,
    );
    const ok = verifyPassword(password, user?.password_hash ?? DUMMY_HASH) && user && user.active;
    if (!ok || !user) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }
    await createSession(user.id);
    return { ok: true };
  },
  { auth: "none" },
);
