import { BANNER_QUALITY, photoSrcSet, photoUrl } from "@/lib/photo";
import { photoFocus } from "@/lib/photo-focus";

/** Ảnh nền toàn khung của banner đầu trang: tải ưu tiên (LCP), đúng kích thước theo màn hình. */
export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(src, 1440, BANNER_QUALITY)}
      srcSet={photoSrcSet(src, BANNER_QUALITY)}
      sizes="100vw"
      alt={alt}
      fetchPriority="high"
      decoding="async"
      style={{ objectPosition: photoFocus(src) }}
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}
