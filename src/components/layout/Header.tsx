"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { PAGE_FADE_REPLAY_EVENT } from "@/components/ui/PageFade";
import Icon from "@/components/ui/Icon";

const NAV_PILL =
  "relative inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-2 text-body-sm 2xl:text-body-md font-semibold whitespace-nowrap transition-colors duration-200 " +
  "after:content-[''] after:absolute after:left-2.5 after:right-2.5 2xl:after:left-3.5 2xl:after:right-3.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-current " +
  "after:origin-center after:transition-transform after:duration-300 after:ease-out hover:text-steel-600 focus:text-steel-600 " +
  "hover:after:scale-x-100 focus:after:scale-x-100 outline-none";
const NAV_PILL_ACTIVE = `${NAV_PILL} text-steel-600 after:scale-x-0`;
const NAV_PILL_IDLE = `${NAV_PILL} text-slate-800 after:scale-x-0`;

export default function Header() {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoPulsing, setLogoPulsing] = useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: t("trangChu"), href: "/" },
    { label: t("gioiThieu"), href: "/gioi-thieu" },
    { label: t("dichVu"), href: "/dich-vu-gia-cong-ma" },
    { label: t("sanPham"), href: "/san-pham-du-an" },
    { label: t("nangLuc"), href: "/nang-luc-san-xuat" },
    { label: t("tinTuc"), href: "/tin-tuc" },
    { label: t("tuyenDung"), href: "/tuyen-dung" },
    { label: t("lienHe"), href: "/lien-he" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogoClick = () => {
    setLogoPulsing(true);
    window.setTimeout(() => setLogoPulsing(false), 450);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new Event(PAGE_FADE_REPLAY_EVENT));
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200"
    >
      <div className="relative h-[86px] w-full px-margin flex items-center justify-between gap-gutter">
        <Link href="/" className="flex items-center group shrink-0" onClick={handleLogoClick}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hanin-logo.png"
            alt="HANIN Plating"
            className={`h-14 w-auto transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 ${
              logoPulsing ? "logo-click-pulse" : ""
            }`}
          />
        </Link>

        <nav className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-0.5 2xl:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? NAV_PILL_ACTIVE : NAV_PILL_IDLE}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/lien-he"
            className="hidden 2xl:inline-flex items-center justify-center px-5 py-2.5 bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-[0.97] shadow-sm font-semibold whitespace-nowrap"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            aria-label={t("menuOpen")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden flex items-center justify-center w-11 h-11 rounded bg-slate-100 border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-steel-50 hover:border-steel-200 hover:text-steel-600 active:scale-95"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className={`text-[22px] transition-transform duration-300 ${mobileOpen ? "rotate-90" : "rotate-0" }`} />
          </button>
        </div>
      </div>

      <nav
        className={`xl:hidden overflow-y-auto border-t border-slate-200 bg-white px-margin transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[calc(100dvh-86px)] opacity-100 py-space-md" : "max-h-0 opacity-0 py-0"
        } flex flex-col gap-0`}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{ transitionDelay: mobileOpen ? `${i * 30}ms` : "0ms" }}
            className={`transition-all duration-300 ${
              mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            } ${
              isActive(link.href)
                ? "flex items-center min-h-11 text-body-md text-steel-600 font-semibold"
                : "flex items-center min-h-11 text-body-md text-slate-600 font-semibold hover:text-steel-600 transition-colors"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/lien-he"
          onClick={() => setMobileOpen(false)}
          className="mt-space-sm min-h-11 inline-flex items-center justify-center px-space-md py-space-sm bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider font-semibold transition-colors duration-200 active:scale-95"
        >
          {t("cta")}
        </Link>
        <LanguageSwitcher variant="mobile" />
      </nav>
    </header>
  );
}
