import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const SPEC_HIGHLIGHT_KEYS = ["nda", "cad", "consulting"] as const;
const SPEC_HIGHLIGHT_ICONS: Record<(typeof SPEC_HIGHLIGHT_KEYS)[number], string> = {
  nda: "verified_user",
  cad: "file_present",
  consulting: "science",
};

export default function ContactHero() {
  const t = useTranslations("LienHe.ContactHero");
  const banner = getBanner("lien-he", useLocale(), "https://images.unsplash.com/photo-1595798896730-9fdf2e709649?w=1920&q=80&fm=jpg&fit=crop");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={banner.alt || t("imageAlt")}
        style={{
          backgroundImage:
            `url('${banner.image}')`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin">
        <div className="[text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
          <PageBreadcrumb
            className="mb-space-sm"
            variant="dark"
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <h1 className="text-headline-xl-mobile lg:text-display-hero font-bold tracking-tight text-banner-orange uppercase mb-space-sm max-w-3xl">
            {t("titlePrefix")}{" "}
            <span className="text-banner-orange underline decoration-banner-orange/40 decoration-4 underline-offset-8">
              {t("titleHighlight")}
            </span>{" "}
            {t("titleSuffix")}
          </h1>
          <p className="text-body-lg text-banner-orange leading-relaxed max-w-2xl">{t("description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-space-md">
          <a
            href="#rfq-form"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#map-section"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Engineering spec highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm max-w-3xl pt-space-md">
          {SPEC_HIGHLIGHT_KEYS.map((key) => (
            <div
              key={key}
              className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 text-steel-600">
                <span className="material-symbols-outlined text-[20px]">
                  {SPEC_HIGHLIGHT_ICONS[key]}
                </span>
                <span className="text-label-sm uppercase tracking-wider font-bold">
                  {t(`specHighlights.${key}.label`)}
                </span>
              </div>
              <span className="text-body-sm text-slate-600">
                {t(`specHighlights.${key}.desc`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
