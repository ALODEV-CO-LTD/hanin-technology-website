/**
 * Ảnh cục bộ (/images/…, /uploads/…) được phục vụ qua trình tối ưu của Next (/_next/image):
 * tự đổi sang WebP và cắt đúng kích thước theo màn hình, nhẹ hơn nhiều so với ảnh gốc.
 * Ảnh ngoài (http…) giữ nguyên.
 */
const WIDTHS = [640, 828, 1080, 1200, 1920, 3840] as const;
/**
 * Số phiên bản ảnh: thêm vào đường dẫn ảnh cục bộ để trình duyệt, Cloudflare và bộ nhớ đệm của /_next/image
 * (lưu 30 ngày theo URL) không trả bản cũ khi ta thay file ảnh mà giữ nguyên tên. TĂNG số này mỗi lần xuất lại ảnh.
 */
export const IMAGE_VERSION = "20261009d";
/** Kích thước cho logo (ảnh nhỏ hiển thị ~200px, 2x cho màn hình nét). */
export const LOGO_WIDTHS = [256, 384] as const;

function isLocal(src: string): boolean {
  // Trình tối ưu của Next không xử lý SVG/GIF: các định dạng này giữ nguyên.
  if (!/\.(jpe?g|png|webp|avif)(\?|$)/i.test(src)) return false;
  return src.startsWith("/images/") || src.startsWith("/uploads/") || src === "/hanin-logo.png";
}

/** Ảnh cục bộ thêm ?v=<phiên bản> (chưa có thì thêm; ảnh tải lên CMS có tên mới mỗi lần nên không cần). */
function withVersion(src: string): string {
  if (src.startsWith("/uploads/") || /[?&]v=/.test(src)) return src;
  return `${src}${src.includes("?") ? "&" : "?"}v=${IMAGE_VERSION}`;
}

export function photoUrl(src: string, width: (typeof WIDTHS)[number] | (typeof LOGO_WIDTHS)[number] = 1920): string {
  return isLocal(src) ? `/_next/image?url=${encodeURIComponent(withVersion(src))}&w=${width}&q=${src.startsWith("/images/factory") || src.startsWith("/images/process") ? 90 : 75}` : src;
}

/** Giá trị cho thuộc tính srcSet của <img>; undefined nếu là ảnh ngoài. */
export function photoSrcSet(src: string | undefined | null): string | undefined {
  if (!src || !isLocal(src)) return undefined;
  return WIDTHS.map((w) => `${photoUrl(src, w)} ${w}w`).join(", ");
}

/** srcSet cho logo (WebP nhỏ gọn thay vì PNG gốc). */
export function logoSrcSet(src: string): string | undefined {
  return isLocal(src) ? LOGO_WIDTHS.map((w) => `${photoUrl(src, w)} ${w}w`).join(", ") : undefined;
}
