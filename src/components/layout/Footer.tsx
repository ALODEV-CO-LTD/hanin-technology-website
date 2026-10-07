import { useLocale, useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPhones, getSettings } from "@/server/settings";
import { siteImg } from "@/server/site-images";
import PhoneLinks from "@/components/ui/PhoneLinks";
import { getServices } from "@/server/public";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const { mapsUrl, salesEmail, engineeringEmail } = getSettings();
  const { general } = getPhones();
  
  const companyLinks = [
    { label: t("companyLinks.trangChu"), href: "/" },
    { label: t("companyLinks.gioiThieu"), href: "/gioi-thieu" },
    { label: t("companyLinks.nangLuc"), href: "/nang-luc-san-xuat" },
    { label: t("companyLinks.tinTuc"), href: "/tin-tuc" },
    { label: t("companyLinks.tuyenDung"), href: "/tuyen-dung" },
  ];

  // Liên kết dịch vụ lấy từ CMS (4 dịch vụ đầu), luôn khớp danh sách dịch vụ đang hiển thị.
  const serviceLinks = [
    ...getServices(locale, 4).map((service) => ({ label: service.title, href: `/dich-vu-gia-cong-ma/${service.slug}` })),
    { label: t("serviceLinks.specSheet"), href: "/nang-luc-san-xuat" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-space-xl">
      <div className="px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center w-fit group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteImg("layout/Logo#1", "/hanin-logo.png")}
                alt={t("logoAlt")}
                className="h-12 w-auto transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95"
              />
            </Link>
            <p className="text-body-sm font-medium text-slate-600 leading-relaxed max-w-sm">{t("description")}</p>
            <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-bold">
                {t("certIso9001")}
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-bold">
                {t("certIso14001")}
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-bold">
                {t("certRohs")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-extrabold pb-space-xs border-b border-slate-200">
              {t("companyHeading")}
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.href} className="py-0.5">
                  <Link href={link.href} className="text-slate-600 hover:text-steel-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-extrabold pb-space-xs border-b border-slate-200">
              {t("serviceHeading")}
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm font-medium">
              {serviceLinks.map((link) => (
                <li key={link.href} className="py-0.5">
                  <Link href={link.href} className="text-slate-600 hover:text-steel-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-extrabold pb-space-xs border-b border-slate-200">
              {t("contactHeading")}
            </h3>
            <div className="flex flex-col gap-space-sm text-body-sm font-medium text-slate-600">
              <div className="flex items-start gap-space-sm">
                <span className="flex h-[1lh] shrink-0 items-center text-body-sm leading-tight">
                  <MapPin aria-hidden="true" className="h-5 w-5 text-steel-600" strokeWidth={2} />
                </span>
                <p className="leading-tight">
                  <span className="text-slate-900 font-bold mr-1">{t("addressLabel")}</span>
                  {t("address")}
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <span className="flex h-[1lh] shrink-0 items-center text-body-sm leading-tight">
                  <Phone aria-hidden="true" className="h-5 w-5 text-steel-600" strokeWidth={2} />
                </span>
                <p className="leading-tight">
                  <span className="text-slate-900 font-bold mr-1">{t("hotlineLabel")}</span>
                  <PhoneLinks phones={general} />
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <span className="flex h-[1lh] shrink-0 items-center text-body-sm leading-tight">
                  <Mail aria-hidden="true" className="h-5 w-5 text-steel-600" strokeWidth={2} />
                </span>
                <p className="leading-tight break-all">
                  <span className="text-slate-900 font-bold mr-1">{t("emailLabel")}</span>
                  {[...new Set([salesEmail, engineeringEmail])].map((email, i) => (
                    <span key={email}>
                      {i > 0 && " / "}
                      <a href={`mailto:${email}`} className="hover:text-steel-600">{email}</a>
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <span className="flex h-[1lh] shrink-0 items-center text-body-sm leading-tight">
                  <Clock aria-hidden="true" className="h-5 w-5 text-steel-600" strokeWidth={2} />
                </span>
                <p className="leading-tight">
                  <span className="text-slate-900 font-bold mr-1">{t("hoursLabel")}</span>
                  {t("hours")}
                </p>
              </div>
              <div className="flex items-start gap-space-sm">
                <span className="flex h-[1lh] shrink-0 items-center text-body-sm leading-tight">
                  <MapPin aria-hidden="true" className="h-5 w-5 text-steel-600" strokeWidth={2} />
                </span>
                <p className="leading-tight">
                  <span className="text-slate-900 font-bold mr-1">Google Maps:</span>
                  {mapsUrl ? (
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline">
                      {t("googleMaps")}
                    </a>
                  ) : (
                    <Link href="/lien-he" className="text-sky-700 hover:underline">
                      {t("googleMaps")}
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
