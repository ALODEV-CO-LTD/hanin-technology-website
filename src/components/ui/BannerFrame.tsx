import type { ReactNode } from "react";
import HeroImage from "@/components/ui/HeroImage";

/**
 * Khung banner đầu trang con, cùng kiểu hero Trang chủ: ảnh phủ đúng một màn hình (cao = chiều cao cửa sổ trừ menu, tự co
 * theo từng máy và tỉ lệ màn hình), chữ trắng nằm trên ảnh nhờ bóng chữ, KHÔNG có lớp phủ/gradient nào trên ảnh (giữ màu và độ nét gốc).
 * `bar` là dải số liệu nền trắng ở đáy, nằm trong cùng màn hình.
 */
export default function BannerFrame({ image, alt, children, bar }: { image: string; alt: string; children: ReactNode; bar?: ReactNode }) {
  return (
    <section className="relative w-full hero-screen flex flex-col overflow-hidden bg-slate-50">
      <HeroImage src={image} alt={alt} />
      <div aria-hidden="true" className="absolute inset-0 hero-dots" />
      <div className="relative z-10 flex flex-1 flex-col justify-center banner-text">{children}</div>
      {bar}
    </section>
  );
}
