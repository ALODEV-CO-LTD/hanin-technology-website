import { NextResponse } from "next/server";
import { HttpError } from "@/server/auth";
import { route } from "@/server/api";
import { run } from "@/server/db";
import { clientIp, hashIp, rateLimit } from "@/server/rate-limit";
import { ATTACHMENT_MAX_FILES, savePrivateAttachment, type StoredFile } from "@/server/uploads";
import { isLocale } from "@/server/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ["rfq", "contact", "application"] as const;

function text(form: FormData, key: string, max: number): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Form công khai: báo giá (RFQ), liên hệ, ứng tuyển.
 * multipart/form-data; file đính kèm lưu riêng tư, chỉ admin xem được.
 */
export const POST = route(
  async (request) => {
    const ip = clientIp(request);
    if (!rateLimit(`inquiry:${ip}`, 6, 10 * 60)) {
      throw new HttpError(429, "Bạn gửi quá nhiều yêu cầu, vui lòng thử lại sau ít phút.");
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      throw new HttpError(400, "Dữ liệu gửi lên không hợp lệ");
    }

    // Honeypot: bot điền ô ẩn này. Trả về thành công giả để bot không dò được.
    if (text(form, "website", 200)) return NextResponse.json({ ok: true });

    const kindRaw = text(form, "kind", 20);
    const kind = (KINDS as readonly string[]).includes(kindRaw) ? kindRaw : "rfq";
    const fullName = text(form, "fullName", 150);
    const email = text(form, "email", 200);
    const phone = text(form, "phone", 40);
    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = "Vui lòng nhập họ tên";
    if (!EMAIL_RE.test(email)) errors.email = "Email không hợp lệ";
    if (Object.keys(errors).length) {
      return NextResponse.json({ error: "Thông tin chưa hợp lệ", errors }, { status: 422 });
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > ATTACHMENT_MAX_FILES) throw new HttpError(413, `Tối đa ${ATTACHMENT_MAX_FILES} tệp đính kèm`);
    const stored: StoredFile[] = [];
    for (const file of files) stored.push(await savePrivateAttachment(file));

    const locale = text(form, "locale", 5);
    const result = run(
      `INSERT INTO inquiries
        (kind, full_name, company, email, phone, project_name, plating_service, volume, message, files, source, locale, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      kind,
      fullName,
      text(form, "company", 200),
      email,
      phone,
      text(form, "projectName", 200),
      text(form, "platingService", 100),
      text(form, "volume", 100),
      text(form, "message", 5000),
      JSON.stringify(stored),
      text(form, "source", 200),
      isLocale(locale) ? locale : "vi",
      hashIp(ip),
    );
    return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid) }, { status: 201 });
  },
  { auth: "none" },
);
