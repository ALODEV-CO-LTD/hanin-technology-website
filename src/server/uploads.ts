import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "./db";
import { HttpError } from "./auth";

export const PUBLIC_UPLOAD_DIR = path.join(DATA_DIR, "uploads");
export const PRIVATE_UPLOAD_DIR = path.join(DATA_DIR, "private");

export const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  pdf: "application/pdf",
};

/** Kiểm tra chữ ký (magic bytes) để không tin phần mở rộng tên file. */
function matchesSignature(ext: string, head: Buffer): boolean {
  const startsWith = (...bytes: number[]) => bytes.every((b, i) => head[i] === b);
  switch (ext) {
    case "jpg":
    case "jpeg":
      return startsWith(0xff, 0xd8, 0xff);
    case "png":
      return startsWith(0x89, 0x50, 0x4e, 0x47);
    case "gif":
      return startsWith(0x47, 0x49, 0x46, 0x38);
    case "webp":
      return head.subarray(0, 4).toString() === "RIFF" && head.subarray(8, 12).toString() === "WEBP";
    case "avif":
      return head.subarray(4, 8).toString() === "ftyp";
    case "pdf":
      return head.subarray(0, 5).toString() === "%PDF-";
    default:
      return true;
  }
}

export function extOf(name: string): string {
  return path.extname(name).replace(".", "").toLowerCase();
}

function targetPath(baseDir: string, ext: string) {
  const now = new Date();
  const sub = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const name = `${crypto.randomUUID()}.${ext}`;
  return { dir: path.join(baseDir, sub), rel: `${sub}/${name}`, file: path.join(baseDir, sub, name) };
}

export interface StoredFile {
  path: string;
  original: string;
  mime: string;
  size: number;
}

/** Lưu ảnh/PDF cho thư viện media (public, phục vụ qua /uploads/...). */
export async function saveMedia(file: File): Promise<StoredFile> {
  const ext = extOf(file.name);
  if (!MIME_BY_EXT[ext]) throw new HttpError(415, "Chỉ nhận ảnh JPG, PNG, WEBP, GIF, AVIF hoặc PDF");
  if (file.size > 10 * 1024 * 1024) throw new HttpError(413, "Tệp vượt quá 10MB");
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(ext, buffer.subarray(0, 16))) throw new HttpError(415, "Nội dung tệp không khớp định dạng");
  const target = targetPath(PUBLIC_UPLOAD_DIR, ext);
  fs.mkdirSync(target.dir, { recursive: true });
  fs.writeFileSync(target.file, buffer);
  return { path: `/uploads/${target.rel}`, original: file.name.slice(0, 200), mime: MIME_BY_EXT[ext], size: buffer.length };
}

/** Định dạng file đính kèm cho form báo giá / ứng tuyển. */
export const ATTACHMENT_EXTS = ["pdf", "step", "stp", "dwg", "dxf", "igs", "iges", "zip", "rar", "doc", "docx", "jpg", "jpeg", "png"];
export const ATTACHMENT_MAX_BYTES = 50 * 1024 * 1024;
export const ATTACHMENT_MAX_FILES = 5;

/** Lưu file đính kèm: KHÔNG public, chỉ admin tải được qua API có xác thực. */
export async function savePrivateAttachment(file: File): Promise<StoredFile> {
  const ext = extOf(file.name);
  if (!ATTACHMENT_EXTS.includes(ext)) throw new HttpError(415, `Định dạng .${ext || "?"} không được hỗ trợ`);
  if (file.size > ATTACHMENT_MAX_BYTES) throw new HttpError(413, "Tệp vượt quá 50MB");
  const buffer = Buffer.from(await file.arrayBuffer());
  if (MIME_BY_EXT[ext] && !matchesSignature(ext, buffer.subarray(0, 16))) {
    throw new HttpError(415, "Nội dung tệp không khớp định dạng");
  }
  const target = targetPath(path.join(PRIVATE_UPLOAD_DIR, "inquiries"), ext);
  fs.mkdirSync(target.dir, { recursive: true });
  fs.writeFileSync(target.file, buffer);
  return { path: target.rel, original: file.name.slice(0, 200), mime: file.type || "application/octet-stream", size: buffer.length };
}

/** Giải path tương đối thành đường dẫn tuyệt đối, chặn path traversal. */
export function resolveInside(baseDir: string, relative: string): string | null {
  const resolved = path.resolve(baseDir, relative);
  return resolved.startsWith(path.resolve(baseDir) + path.sep) ? resolved : null;
}
