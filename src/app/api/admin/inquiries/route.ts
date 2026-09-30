import { route } from "@/server/api";
import { all, get } from "@/server/db";

const COLUMNS = `id, kind, full_name AS fullName, company, email, phone, project_name AS projectName,
  plating_service AS platingService, volume, message, files, source, locale, status, note, created_at AS createdAt`;

export const GET = route(async (request) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const kind = url.searchParams.get("kind");
  const q = url.searchParams.get("q")?.trim();
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const pageSize = 20;

  const where: string[] = [];
  const args: unknown[] = [];
  if (status) {
    where.push("status = ?");
    args.push(status);
  }
  if (kind) {
    where.push("kind = ?");
    args.push(kind);
  }
  if (q) {
    where.push("(full_name LIKE ? OR company LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)");
    for (let i = 0; i < 5; i++) args.push(`%${q}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = Number(get<{ n: number }>(`SELECT COUNT(*) AS n FROM inquiries ${whereSql}`, ...args)?.n ?? 0);
  const rows = all<Record<string, unknown>>(
    `SELECT ${COLUMNS} FROM inquiries ${whereSql} ORDER BY id DESC LIMIT ? OFFSET ?`,
    ...args,
    pageSize,
    (page - 1) * pageSize,
  );
  const newCount = Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM inquiries WHERE status = 'new'")?.n ?? 0);
  return { items: rows.map((r) => ({
      ...r,
      // Không lộ đường dẫn lưu trữ nội bộ; tải file qua /files/[index].
      files: (JSON.parse(String(r.files || "[]")) as { original: string; size: number }[]).map((f) => ({ original: f.original, size: f.size })),
    })), total, page, pageSize, newCount };
});
