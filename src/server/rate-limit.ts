import crypto from "node:crypto";
import { get, run } from "./db";

/**
 * Giới hạn tần suất theo cửa sổ cố định, lưu trong SQLite để bền qua restart
 * và dùng chung giữa các worker của Next.
 * @returns true nếu request được phép.
 */
export function rateLimit(bucket: string, limit: number, windowSeconds: number): boolean {
  const window = Math.floor(Date.now() / 1000 / windowSeconds);
  run("DELETE FROM rate_limits WHERE window < ?", window - 1);
  const row = get<{ hits: number }>(
    `INSERT INTO rate_limits (bucket, window, hits) VALUES (?, ?, 1)
     ON CONFLICT(bucket, window) DO UPDATE SET hits = hits + 1
     RETURNING hits`,
    bucket,
    window,
  );
  return (row?.hits ?? 0) <= limit;
}

export function clientIp(request: Request): string {
  // cf-connecting-ip do Cloudflare đặt đè (khách không giả được); x-real-ip do nginx đặt đè.
  // Không dùng phần tử đầu của x-forwarded-for vì khách tự gắn thêm được để né giới hạn.
  const h = request.headers;
  const ip = h.get("cf-connecting-ip") ?? h.get("x-real-ip") ?? (h.get("x-forwarded-for") ?? "").split(",").pop() ?? "";
  return ip.trim() || "unknown";
}

/** Băm IP để lưu (không lưu IP thô). */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT;
  if (!salt && process.env.NODE_ENV === "production") console.warn("[security] Chưa đặt IP_HASH_SALT — hash IP dễ bị dò ngược");
  return crypto.createHash("sha256").update((salt ?? "hanin") + ip).digest("hex").slice(0, 32);
}
