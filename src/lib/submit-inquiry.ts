/**
 * Gửi form công khai (báo giá / liên hệ / ứng tuyển) tới POST /api/inquiries.
 * Form phải có input name: fullName, email, phone (+ company, projectName, platingService,
 * volume, message, files tuỳ form). Hàm tự thêm kind, locale, source.
 */
export type InquiryKind = "rfq" | "contact" | "application";

export interface InquiryResult {
  ok: boolean;
  /** Lỗi theo trường (nếu server trả 422). */
  errors?: Record<string, string>;
  /** Thông điệp lỗi chung. */
  error?: string;
}

export async function submitInquiry(
  formData: FormData,
  meta: { kind: InquiryKind; locale: string; source?: string },
): Promise<InquiryResult> {
  formData.set("kind", meta.kind);
  formData.set("locale", meta.locale);
  if (meta.source) formData.set("source", meta.source);
  try {
    const res = await fetch("/api/inquiries", { method: "POST", body: formData });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true };
    return { ok: false, error: data.error, errors: data.errors };
  } catch {
    return { ok: false, error: "network" };
  }
}
