import crypto from "node:crypto";
import { cookies, headers } from "next/headers";
import { get, run } from "./db";

export const SESSION_COOKIE = "hanin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 ngày

export type Role = "admin" | "editor";
export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}

/* ---------- Mật khẩu (scrypt, salt ngẫu nhiên từng user) ---------- */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, keyHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

/* ---------- Phiên đăng nhập ---------- */

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Host là địa chỉ mạng nội bộ (localhost, IP LAN) — truy cập qua HTTP thường, trình duyệt sẽ bỏ cookie Secure. */
function isPrivateHost(host: string): boolean {
  const name = host.replace(/:\d+$/, "").toLowerCase();
  return (
    name === "localhost" ||
    /^127\./.test(name) ||
    /^10\./.test(name) ||
    /^192\.168\./.test(name) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(name) ||
    name.endsWith(".local")
  );
}

export async function createSession(userId: number): Promise<void> {
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  run("DELETE FROM sessions WHERE expires_at < ?", Math.floor(Date.now() / 1000));
  run("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)", sha256(token), userId, expiresAt);
  run("UPDATE users SET last_login_at = datetime('now') WHERE id = ?", userId);

  const jar = await cookies();
  const host = (await headers()).get("x-forwarded-host") ?? (await headers()).get("host") ?? "";
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    // Tên miền thật luôn Secure; chỉ nới khi test qua mạng nội bộ (HTTP).
    secure: process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE !== "false" && !isPrivateHost(host),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) run("DELETE FROM sessions WHERE token_hash = ?", sha256(token));
  jar.delete(SESSION_COOKIE);
}

/** Trả về user đang đăng nhập hoặc null. Không throw. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const row = get<SessionUser & { active: number }>(
    `SELECT u.id, u.email, u.name, u.role, u.active
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > ?`,
    sha256(token),
    Math.floor(Date.now() / 1000),
  );
  if (!row || !row.active) return null;
  return { id: Number(row.id), email: row.email, name: row.name, role: row.role };
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function requireUser(role?: Role): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new HttpError(401, "Chưa đăng nhập");
  if (role === "admin" && user.role !== "admin") throw new HttpError(403, "Không đủ quyền");
  return user;
}

/** Chặn CSRF cho request đổi dữ liệu: Origin (nếu có) phải trùng Host. */
export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) return; // request không do trình duyệt cross-site gửi (curl, server-to-server)
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new HttpError(403, "Origin không hợp lệ");
  }
  if (originHost !== host) throw new HttpError(403, "Origin không được phép");
}
