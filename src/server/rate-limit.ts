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
  run(
    `INSERT INTO rate_limits (bucket, window, hits) VALUES (?, ?, 1)
     ON CONFLICT(bucket, window) DO UPDATE SET hits = hits + 1`,
    bucket,
    window,
  );
  const row = get<{ hits: number }>("SELECT hits FROM rate_limits WHERE bucket = ? AND window = ?", bucket, window);
  return (row?.hits ?? 0) <= limit;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0].trim() || "unknown";
}

/** Băm IP để lưu (không lưu IP thô). */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "hanin";
  return crypto.createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}
