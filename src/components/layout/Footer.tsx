import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  const companyLinks = [
    { label: t("companyLinks.trangChu"), href: "/" },
    { label: t("companyLinks.gioiThieu"), href: "/gioi-thieu" },
    { label: t("companyLinks.nangLuc"), href: "/nang-luc-san-xuat" },
    { label: t("companyLinks.tinTuc"), href: "/tin-tuc" },
    { label: t("companyLinks.tuyenDung"), href: "/tuyen-dung" },
  ];

  const serviceLinks = [
    { label: t("serviceLinks.enp"), href: "/dich-vu-gia-cong-ma/ma-niken-hoa-hoc-enp" },
    { label: t("serviceLinks.hardChrome"), href: "/dich-vu-gia-cong-ma/ma-crom-cung-cong-nghiep" },
    { label: t("serviceLinks.anodizing"), href: "/dich-vu-gia-cong-ma/xu-ly-nhom-ma-kim-loai-khac" },
    { label: t("serviceLinks.zincNickel"), href: "/dich-vu-gia-cong-ma/ma-kem-hop-kim-kem-niken" },
    { label: t("serviceLinks.specSheet"), href: "/nang-luc-san-xuat" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center w-fit group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hanin-logo.png"
                alt="HANIN Plating"
                className="h-10 w-auto transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95"
              />
            </Link>
            <p className="text-body-sm text-slate-600 leading-relaxed max-w-sm">{t("description")}</p>
            <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                ISO 9001:2015
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                ISO 14001
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                RoHS &amp; REACH
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-bold pb-space-xs border-b border-slate-200">
              {t("companyHeading")}
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm">
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
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-bold pb-space-xs border-b border-slate-200">
              {t("serviceHeading")}
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm">
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
            <h3 className="text-label-technical uppercase tracking-widest text-steel-600 font-bold pb-space-xs border-b border-slate-200">
              {t("contactHeading")}
            </h3>
            <div className="flex flex-col gap-space-xs text-body-sm text-slate-600">
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">{t("addressLabel")}</span>
                {t("address")}
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">{t("hotlineLabel")}</span>
                {t("hotline")}
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">{t("emailLabel")}</span>
                {t("email")}
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">{t("hoursLabel")}</span>
                {t("hours")}
              </p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <Link href="/lien-he" className="text-label-technical text-sky-700 hover:underline">
                  {t("zaloChat")}
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/lien-he" className="text-label-technical text-sky-700 hover:underline">
                  {t("googleMaps")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-space-xl pt-space-md border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-technical text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("statusLine")}</span>
          </div>
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-steel-600 transition-colors">
              {t("privacyPolicy")}
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-steel-600 transition-colors">
              {t("termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
