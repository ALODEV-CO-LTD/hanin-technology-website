import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import BannerFrame from "@/components/ui/BannerFrame";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import Icon from "@/components/ui/Icon";

const SPEC_HIGHLIGHT_KEYS = ["sample", "cad", "consulting"] as const;
const SPEC_HIGHLIGHT_ICONS: Record<(typeof SPEC_HIGHLIGHT_KEYS)[number], string> = {
  sample: "photo_camera",
  cad: "file_present",
  consulting: "science",
};

export default function ContactHero() {
  const t = useTranslations("LienHe.ContactHero");
  const banner = getBanner("lien-he", useLocale(), "/images/factory/qc-6.jpg");

  return (
    <BannerFrame image={banner.image} alt={banner.alt || t("imageAlt")}>
      <div className="w-full px-margin py-space-lg">
        <div className="">
          <PageBreadcrumb variant="dark"
            className="mb-space-sm"
           
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <BannerH1 className="font-bold tracking-tight text-white uppercase mb-space-sm">
            {t("titlePrefix")}{" "}
            <span>
              {t("titleHighlight")}
            </span>{" "}
            {t("titleSuffix")}
          </BannerH1>
          <p className="banner-lead text-white leading-relaxed">{t("description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-space-md">
          <a
            href="#rfq-form"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 "
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#map-section"
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Engineering spec highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md max-w-3xl pt-space-md">
          {SPEC_HIGHLIGHT_KEYS.map((key) => (
            <div
              key={key}
              className="pl-space-sm border-l-2 border-white/50 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 text-white">
                <Icon name={SPEC_HIGHLIGHT_ICONS[key]} className="text-[20px]" />
                <span className="text-label-sm uppercase tracking-wider font-bold">
                  {t(`specHighlights.${key}.label`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BannerFrame>
  );
}
