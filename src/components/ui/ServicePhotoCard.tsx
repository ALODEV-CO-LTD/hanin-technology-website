import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

/**
 * Thẻ dịch vụ có ảnh. Chuyển từ khối "Sản phẩm dịch vụ" (#khoiBao584) của sdragon.vn sang React + Tailwind:
 * khung ảnh 4:3, góc dưới bên phải bo lớn và viền đáy màu nhấn, tiêu đề, mô tả tối đa 3 dòng, dòng chuyển trang.
 * Màu nhấn lấy từ nút "Yêu cầu báo giá" của HANIN (#E5A93C) để đồng nhất với giao diện hiện có.
 */
export default function ServicePhotoCard({
  href,
  image,
  imageAlt,
  title,
  description,
  index,
  footer,
  chips,
}: {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  index?: number;
  footer: ReactNode;
  chips?: string[];
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-steel-600"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-br-[72px] border-b-[5px] border-[#E5A93C] bg-slate-200">
        <Photo
          src={image}
          alt={imageAlt}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {index !== undefined && (
          <span className="absolute left-space-sm top-space-sm rounded bg-white/95 px-space-xs py-0.5 text-label-technical font-bold text-steel-700 shadow-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-space-sm p-space-md">
        <h3 className="text-headline-sm font-bold text-slate-900 transition-colors group-hover:text-steel-600">{title}</h3>
        {description ? <p className="line-clamp-3 text-body-sm leading-relaxed text-slate-600">{description}</p> : null}
        {chips && chips.length > 0 ? (
          <ul className="flex flex-wrap gap-space-xs">
            {chips.map((c) => (
              <li key={c} className="rounded border border-slate-200 bg-slate-50 px-space-xs py-0.5 text-xs font-medium text-slate-700">
                {c}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-space-sm text-steel-600">
          <span className="text-xs font-semibold uppercase tracking-wider">{footer}</span>
          <Icon name="east" className="text-[20px] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
