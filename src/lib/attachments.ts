/**
 * File đính kèm cho form báo giá / ứng tuyển: một nguồn duy nhất cho trình duyệt (chọn tệp, báo lỗi sớm)
 * và máy chủ (src/server/uploads.ts kiểm tra lại, không tin trình duyệt).
 */
export const ATTACHMENT_EXTS = ["pdf", "dwg", "dxf", "step", "stp", "igs", "iges", "zip", "rar", "doc", "docx", "jpg", "jpeg", "png"];
export const ATTACHMENT_MAX_BYTES = 50 * 1024 * 1024;
export const ATTACHMENT_MAX_FILES = 5;
/** Giá trị cho thuộc tính accept của <input type="file">. */
export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTS.map((e) => `.${e}`).join(",");

export type AttachmentProblem = "tooMany" | "tooBig" | "badType";

export function checkAttachments(files: File[]): AttachmentProblem | null {
  if (files.length > ATTACHMENT_MAX_FILES) return "tooMany";
  for (const f of files) {
    const ext = f.name.includes(".") ? f.name.split(".").pop()!.toLowerCase() : "";
    if (!ATTACHMENT_EXTS.includes(ext)) return "badType";
    if (f.size > ATTACHMENT_MAX_BYTES) return "tooBig";
  }
  return null;
}
