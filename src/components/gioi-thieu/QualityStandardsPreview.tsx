import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";

export default function QualityStandardsPreview() {
  const t = useTranslations("GioiThieu.QualityStandardsPreview");
  // Chuỗi dạng "Nhãn: giá trị" tách thành hai cột để bảng thông tin dễ quét.
  const split = (text: string) => {
    const i = text.search(/[:：]/);
    return i < 0 ? { label: "", value: text } : { label: text.slice(0, i).trim(), value: text.slice(i + 1).trim() };
  };
  const issuer = split(t("certificateIssuer"));
  const scope = split(t("certificateScope"));
  const holder = { label: t("certificateHolderLabel"), value: t("certificateHolderValue") };
  const accreditation = { label: t("certificateAccreditationLabel"), value: t("certificateAccreditationValue") };

  const CERTIFICATES = [
    { key: "iso9001", icon: "workspace_premium" },
    { key: "iso14001", icon: "eco" },
    { key: "rohs", icon: "fact_check" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200 scroll-mt-[var(--header-h)]" id="chung-nhan">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
        </div>

        {/* Giấy chứng nhận ISO 9001 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center p-space-md sm:p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm">
          <div className="md:col-span-4 lg:col-span-3 flex justify-center md:self-start">
            <Photo
              src={siteImg("gioi-thieu/QualityStandardsPreview#1", "/images/certificates/iso-9001-2015.jpg")}
              alt={t("certificateImageAlt")}
              className="w-full max-w-[360px] h-auto rounded border border-slate-200 bg-white shadow-md"
            />
          </div>
          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-space-lg md:pl-space-md">
            <div className="flex flex-col gap-space-xs">
              <span className="self-start rounded border border-steel-200 bg-steel-50 px-2 py-1 text-label-technical font-semibold uppercase tracking-wider text-steel-700">
                {t("certificateTag")}
              </span>
              <h3 className="text-headline-md text-slate-900 font-bold">{t("certificateTitle")}</h3>
              <Link
                className="mt-space-xs inline-flex min-h-11 w-fit items-center gap-2 rounded border border-steel-600 px-space-md text-label-technical font-semibold uppercase tracking-wider text-steel-600 transition-colors hover:[background:var(--color-steel-600)] hover:text-white"
                href="/nang-luc-san-xuat#quality-standards"
              >
                {t("cta")}
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>

            <ul className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-slate-200 max-sm:divide-y max-sm:divide-slate-200">
              {CERTIFICATES.map((cert) => (
                <li key={cert.key} className="flex items-start gap-3 py-space-md sm:px-space-md sm:first:pl-0 sm:last:pr-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-steel-50 text-steel-600">
                    <Icon name={cert.icon} className="text-[22px]" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-title-md font-bold text-slate-900">{t(`${cert.key}.title`)}</span>
                    <span className="text-body-sm text-slate-600">{t(`${cert.key}.desc`)}</span>
                  </span>
                </li>
              ))}
            </ul>

            <dl className="grid grid-cols-1 gap-space-md border-t border-slate-200 pt-space-md sm:grid-cols-2 lg:grid-cols-4">
              {[holder, issuer, accreditation, scope].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-label-technical font-semibold uppercase tracking-wider text-slate-600">{row.label}</dt>
                  <dd className="text-body-md font-semibold text-slate-900">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
