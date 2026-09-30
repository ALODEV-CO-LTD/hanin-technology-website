import { useTranslations } from "next-intl";

export default function CategoryHero() {
  const t = useTranslations("DichVu.CategoryHero");

  return (
    <section className="relative w-full bg-white border border-slate-200 rounded shadow-sm p-space-md lg:p-space-xl mb-space-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <h1 className="text-headline-xl-mobile md:text-headline-lg lg:text-display-hero text-slate-900 uppercase font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl leading-relaxed">{t("subtitle")}</p>

          <div className="grid grid-cols-3 gap-space-sm bg-slate-50 border border-slate-200 p-space-sm rounded">
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">{t("thickness.label")}</span>
              <span className="text-title-md text-steel-600 font-bold tracking-tight">±0.1 µm</span>
              <span className="text-label-sm text-slate-500">{t("thickness.note")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">{t("saltSpray.label")}</span>
              <span className="text-title-md text-slate-900 font-bold tracking-tight">&gt; 1,200H</span>
              <span className="text-label-sm text-slate-500">{t("saltSpray.note")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">{t("qms.label")}</span>
              <span className="text-title-md text-slate-900 font-bold tracking-tight">IATF 16949</span>
              <span className="text-label-sm text-slate-500">{t("qms.note")}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <a
              href="#rfq-form"
              className="inline-flex items-center gap-2 bg-steel-600 hover:bg-steel-700 text-white px-space-lg py-3 rounded text-title-md shadow-sm transition-all"
            >
              <span>{t("ctaPrimary")}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#capacity-overview"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-space-lg py-3 rounded text-title-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              <span>{t("ctaSecondary")}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded overflow-hidden shadow-lg bg-slate-900 aspect-[4/3] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={t("imageAlt")}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNUWbtu-6mF-47Gk1oHXXyJOVwIjxt1jMnwPHiIsRKd5-Mx9Fkov5w63gs__fEcgwwzgV_Z-vKRbSS73Sz3WCrxS7MMkOc_RB6FPdCt5KgCyaidW2F52ulUmXdEeh_eNp7KwcY8uwyn0-vSmt1UP_859JtN6IOXI0GDsjdrq5wFODc1u1tv_i6RcJXzKItH1zLdI0T8JX0LVT3-sWkTJptYWKMbM9n17lteJGbAqsinL7sfHx1R7peqg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
