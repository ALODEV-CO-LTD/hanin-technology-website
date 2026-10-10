import { BANNER_QUALITY, photoSrcSet, photoUrl } from "@/lib/photo";
import { photoFocus } from "@/lib/photo-focus";
import { lqip } from "@/server/lqip";

/**
 * Ảnh nền toàn khung của banner đầu trang: tải ưu tiên (LCP), đúng kích thước theo màn hình.
 * Phía sau là ảnh mờ thu nhỏ nhúng sẵn trong trang (lqip) để khi chuyển trang banner không bị đen trong lúc chờ ảnh thật.
 */
export default async function HeroImage({ src, alt }: { src: string; alt: string }) {
  const placeholder = await lqip(src);
  return (
    <>
      {placeholder && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${placeholder})`, backgroundPosition: photoFocus(src) ?? "center" }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </>
  );
}
