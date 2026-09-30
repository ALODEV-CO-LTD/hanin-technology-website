import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CategoryHero() {
  const t = useTranslations("SanPham.CategoryHero");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("imageAlt")}
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1920&q=80&fm=jpg&fit=crop"
        />
      </div>
      <div className="relative z-10 w-full px-margin flex flex-col gap-space-sm [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
        <PageBreadcrumb
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />
        <h1 className="text-display-hero-mobile lg:text-display-hero uppercase tracking-tight text-orange-400 mt-space-xs font-bold">
          {t("title")}
        </h1>
        <p className="text-body-lg text-orange-200 max-w-3xl leading-relaxed mt-space-xs">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
