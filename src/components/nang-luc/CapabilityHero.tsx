import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CapabilityHero() {
  const t = useTranslations("NangLuc.CapabilityHero");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1652204775379-2b4ace437a2d?w=1920&q=80&fm=jpg&fit=crop')",
        }}
      />

      <div className="relative px-margin w-full">
        <div className="[text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
          <PageBreadcrumb
            className="pb-6"
            variant="dark"
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <div className="max-w-3xl pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-banner-orange tracking-tight uppercase mb-4">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-banner-orange max-w-2xl leading-relaxed">{t("description")}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-8">
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            href="#he-thong-nha-may"
          >
            {t("ctaExplore")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
            href="#day-chuyen"
          >
            {t("ctaLines")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
            href="#kiem-nghiem"
          >
            {t("ctaQa")}
          </a>
        </div>
      </div>
    </section>
  );
}
