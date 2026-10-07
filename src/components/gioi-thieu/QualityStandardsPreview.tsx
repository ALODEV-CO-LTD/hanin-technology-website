import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { siteImg } from "@/server/site-images";

export default function QualityStandardsPreview() {
  const t = useTranslations("GioiThieu.QualityStandardsPreview");

  const CERTIFICATES = [
    { key: "iso9001", icon: "workspace_premium" },
    { key: "iso14001", icon: "eco" },
    { key: "rohs", icon: "fact_check" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200 scroll-mt-[86px]" id="chung-nhan">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
        </div>

        {/* 3 Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.key}
              className="p-space-lg rounded bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 shadow-sm transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="text-xs text-steel-600 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-steel-100/70 border border-steel-200">
                    {t(`${cert.key}.tag`)}
                  </span>
                  <Icon name={cert.icon} className="text-slate-500" />
                </div>
                <h3 className="text-title-md text-slate-900 font-semibold mb-2">{t(`${cert.key}.title`)}</h3>
                <p className="text-body-sm text-slate-600">{t(`${cert.key}.desc`)}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{t(`${cert.key}.standard`)}</span>
                <span className="text-sky-700 font-semibold">{t(`${cert.key}.status`)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Giấy chứng nhận ISO 9001 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-space-lg p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm">
          <div className="md:col-span-4 lg:col-span-3 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteImg("gioi-thieu/QualityStandardsPreview#1", "/images/certificates/iso-9001-2015.jpg")}
              alt={t("certificateImageAlt")}
              className="w-full max-w-[320px] h-auto rounded border border-slate-200 bg-white shadow-md"
            />
          </div>
          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-space-sm">
            <span className="self-start text-xs text-steel-600 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-steel-100/70 border border-steel-200">
              {t("certificateTag")}
            </span>
            <h3 className="text-headline-sm text-slate-900 font-bold">{t("certificateTitle")}</h3>
            <p className="text-body-md text-slate-600">{t("certificateIssuer")}</p>
            <p className="text-body-md text-slate-600">{t("certificateScope")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            className="inline-flex items-center gap-space-sm text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-widest font-bold"
            href="/nang-luc-san-xuat#quality-standards"
          >
            {t("cta")}
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
