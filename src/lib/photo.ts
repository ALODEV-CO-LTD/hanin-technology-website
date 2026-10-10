/**
 * Ảnh cục bộ (/images/…, /uploads/…) được phục vụ qua trình tối ưu của Next (/_next/image):
 * tự đổi sang WebP và cắt đúng kích thước theo màn hình, nhẹ hơn nhiều so với ảnh gốc.
 * Ảnh ngoài (http…) giữ nguyên.
 */
const WIDTHS = [640, 828, 1080, 1200, 1440, 1920, 3840] as const;
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

/**
 * Chất lượng WebP: ảnh nhà máy/quy trình cần nét ở màn hình lớn (q85) nhưng trên điện thoại (≤1080px) q70 là đủ và
 * nhẹ hơn khoảng 45%; ảnh khác (logo, tải lên CMS) q75. Giá trị phải nằm trong `images.qualities` của next.config.ts.
 */
function photoQuality(src: string, width: number): PhotoQuality {
  const photo = src.startsWith("/images/factory") || src.startsWith("/images/process");
  if (!photo) return 75;
  return width > 1080 ? 85 : 70;
}

/** Banner đầu trang phủ lớp gradient tối nên q70 vẫn đẹp và nhẹ hơn nhiều (ảnh 1920px từ 250–650 KB xuống còn ~40%). */
export const BANNER_QUALITY = 70;
type PhotoQuality = 70 | 75 | 85;

export function photoUrl(
  src: string,
  width: (typeof WIDTHS)[number] | (typeof LOGO_WIDTHS)[number] = 1920,
  quality?: PhotoQuality,
): string {
  return isLocal(src) ? `/_next/image?url=${encodeURIComponent(withVersion(src))}&w=${width}&q=${quality ?? photoQuality(src, width)}` : src;
}

/** Giá trị cho thuộc tính srcSet của <img>; undefined nếu là ảnh ngoài. */
export function photoSrcSet(src: string | undefined | null, quality?: PhotoQuality): string | undefined {
  if (!src || !isLocal(src)) return undefined;
  return WIDTHS.map((w) => `${photoUrl(src, w, quality)} ${w}w`).join(", ");
}

/** srcSet cho logo (WebP nhỏ gọn thay vì PNG gốc). */
export function logoSrcSet(src: string): string | undefined {
  return isLocal(src) ? LOGO_WIDTHS.map((w) => `${photoUrl(src, w)} ${w}w`).join(", ") : undefined;
}
