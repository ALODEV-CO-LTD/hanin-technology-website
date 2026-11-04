import type { ReactNode } from "react";
import HeroImage from "@/components/ui/HeroImage";

/**
 * Khung banner đầu trang con, cùng kiểu hero Trang chủ: ảnh phủ đúng một màn hình (cao = chiều cao cửa sổ trừ menu, tự co
 * theo từng máy và tỉ lệ màn hình), chữ trắng nằm trên ảnh nhờ bóng chữ và một quầng rất nhẹ ở góc chữ (không phủ cả ảnh).
 * `bar` là dải số liệu nền trắng ở đáy, nằm trong cùng màn hình.
 */
export default function BannerFrame({ image, alt, children, bar }: { image: string; alt: string; children: ReactNode; bar?: ReactNode }) {
  return (
    <section className="relative w-full hero-screen flex flex-col overflow-hidden bg-slate-50">
      <HeroImage src={image} alt={alt} />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full lg:w-3/4 banner-scrim" />
      <div className="relative z-10 flex flex-1 flex-col justify-center banner-text">{children}</div>
      {bar}
    </section>
  );
}
