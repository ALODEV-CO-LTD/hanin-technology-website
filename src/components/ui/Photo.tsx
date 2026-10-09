import type { ImgHTMLAttributes } from "react";
import { photoSrcSet, photoUrl } from "@/lib/photo";
import { photoFocus } from "@/lib/photo-focus";

/**
 * Thay cho <img> thường: ảnh cục bộ (/images, /uploads) tự chuyển sang WebP đúng kích thước màn hình,
 * tải lười (lazy) mặc định; ảnh ngoài giữ nguyên. Dùng được ở cả Server lẫn Client Component.
 */
export default function Photo({
  src,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  style,
  ...rest
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      loading="lazy"
      decoding="async"
      {...rest}
      // Điểm lấy nét theo từng ảnh (lib/photo-focus); style truyền vào từ ngoài vẫn được ưu tiên.
      style={{ objectPosition: photoFocus(src), ...style }}
      src={photoUrl(src, 1080)}
      srcSet={photoSrcSet(src)}
      sizes={photoSrcSet(src) ? sizes : undefined}
    />
  );
}
