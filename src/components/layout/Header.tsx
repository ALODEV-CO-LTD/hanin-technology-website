"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    setLogoPulsing(true);
    window.setTimeout(() => setLogoPulsing(false), 450);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b transition-shadow duration-300 ${
        scrolled ? "border-slate-200 shadow-md" : "border-slate-200/70 shadow-sm"
      }`}
    >
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-xl">
          <Link href="/" className="flex items-center group" onClick={handleLogoClick}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hanin-logo.png"
              alt="HANIN Plating"
              className={`h-11 w-auto transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 ${
                logoPulsing ? "logo-click-pulse" : ""
              }`}
            />
          </Link>
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "relative py-1 text-body-sm text-steel-600 font-semibold whitespace-nowrap after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-steel-600"
                    : "relative py-1 text-body-sm text-slate-600 whitespace-nowrap transition-colors duration-200 hover:text-steel-600 after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-0 after:bg-steel-600 after:transition-all after:duration-300 hover:after:w-full"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/lien-he"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-[0.97] shadow-sm font-semibold whitespace-nowrap"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            aria-label={t("menuOpen")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded bg-slate-100 border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-steel-50 hover:border-steel-200 hover:text-steel-600 active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${
                mobileOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <nav
        className={`xl:hidden overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-margin transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[640px] opacity-100 py-space-md" : "max-h-0 opacity-0 py-0"
        } flex flex-col gap-space-sm`}
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
                ? "py-space-xs text-body-md text-steel-600 font-semibold"
                : "py-space-xs text-body-md text-slate-600 hover:text-steel-600 transition-colors"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/lien-he"
          onClick={() => setMobileOpen(false)}
          className="mt-space-sm inline-flex items-center justify-center px-space-md py-space-sm bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider font-semibold transition-colors duration-200 active:scale-95"
        >
          {t("cta")}
        </Link>
        <LanguageSwitcher variant="mobile" />
      </nav>
    </header>
  );
}
