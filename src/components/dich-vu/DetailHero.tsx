import { useTranslations } from "next-intl";

export default function DetailHero() {
  const t = useTranslations("DichVu.DetailHero");

  return (
    <section className="w-full mb-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Cột trái: Nội dung kỹ thuật */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-200 p-space-lg rounded shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-steel-600" />
          <div className="flex flex-col gap-space-sm">
            <h1 className="text-headline-lg text-slate-900 tracking-tight uppercase mt-space-xs font-bold">
              {t("title")}
              <span className="block text-steel-600 text-headline-md mt-1 font-bold">{t("titleEn")}</span>
            </h1>
            <p className="text-body-lg text-slate-600 mt-space-xs">{t("subtitle")}</p>

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
              alt={t("imageAlt")}
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASiiY0YHzAz0bYUdU_Z4bb7bJnm79drmHEj7I2_1ct2zvRhd1mU74UjW1QFGMZjWHWiV7KugGxVGus2vvTdckjsTt7UL_mG7t8eQ9Y4G4oOMmVXQCEWd7y-CH1-seO4c2C6SNONUD0L5gVGyGK2QjDepE0xcrOqhwomjdfLURtHXf6pMpa7qvv6Gvv5DxZIPF-4r1XWe-G1060CMa343UUcUjJtH8saFMhhu9ndzATKpcrL6QAa0XJKQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-space-sm py-1 rounded text-slate-900 text-label-sm shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-steel-600 text-[16px]">biotech</span>
              <span>{t("xrfLabel")}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1 text-label-sm text-slate-300">
                <span>{t("roughnessLabel")}</span>
                <span>{t("coatingLabel")}</span>
              </div>
              <p className="text-body-md text-slate-100 line-clamp-2">{t("imageCaption")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
