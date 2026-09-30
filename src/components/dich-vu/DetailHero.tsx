import { useTranslations } from "next-intl";
import type { PlatingService } from "@/lib/services-data";

/** Tiêu đề, mã, badge, mô tả và ảnh lấy từ CMS (service); các chỉ số kỹ thuật bên dưới là nội dung mẫu dùng chung. */
export default function DetailHero({ service }: { service: PlatingService }) {
  const t = useTranslations("DichVu.DetailHero");

  return (
    <section className="w-full mb-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Cột trái: Nội dung kỹ thuật */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-200 p-space-lg rounded shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-steel-600" />
          <div className="flex flex-col gap-space-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label-sm text-steel-600 uppercase font-semibold bg-slate-100 px-2 py-1 rounded">{service.code}</span>
              {service.badge && (
                <span className="text-label-sm text-slate-600 uppercase font-semibold border border-slate-200 px-2 py-1 rounded">{service.badge}</span>
              )}
            </div>
            <h1 className="text-headline-lg text-slate-900 tracking-tight uppercase mt-space-xs font-bold">
              {service.title}
              <span className="block text-steel-600 text-headline-md mt-1 font-bold">{service.titleEn}</span>
            </h1>
            <p className="text-body-lg text-slate-600 mt-space-xs">{service.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm my-space-md pt-space-sm bg-slate-50 border border-slate-200 p-space-sm rounded">
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("phos.label")}</span>
                <span className="text-title-md text-slate-900 font-bold">6-9% // &gt;10.5%</span>
                <span className="text-label-sm text-steel-600">{t("phos.note")}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("hardness.label")}</span>
                <span className="text-title-md text-slate-900 font-bold">65-68 HRC</span>
                <span className="text-label-sm text-slate-500">{t("hardness.note")}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("saltSpray.label")}</span>
                <span className="text-title-md text-slate-900 font-bold">&gt; 1,000 {t("saltSpray.unit")}</span>
                <span className="text-label-sm text-slate-500">{t("saltSpray.note")}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("tolerance.label")}</span>
                <span className="text-title-md text-steel-600 font-bold">±1.0 µm</span>
                <span className="text-label-sm text-slate-500">{t("tolerance.note")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm pt-space-sm mt-space-sm">
            <a
              href="#rfq-form"
              className="inline-flex items-center gap-space-xs bg-steel-600 hover:bg-steel-700 text-white px-space-md py-3 rounded text-label-technical uppercase tracking-wider shadow-sm transition-all"
            >
              <span>{t("ctaPrimary")}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-space-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-space-md py-3 rounded text-label-technical uppercase tracking-wider transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>{t("ctaSecondary")}</span>
            </button>
            <div className="flex items-center gap-1.5 ml-auto text-slate-500 text-label-sm">
              <span className="material-symbols-outlined text-steel-600 text-[18px]">verified</span>
              <span>{t("verifyLabel")}</span>
            </div>
          </div>
        </div>

        {/* Cột phải: Ảnh minh họa sản phẩm */}
        <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={service.imageAlt}
              className="w-full h-full object-cover"
              src={service.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
