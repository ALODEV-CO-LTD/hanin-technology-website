"use client";

import { useEffect, useRef, useState } from "react";
import { useLinkStatus } from "next/link";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { PAGE_FADE_REPLAY_EVENT } from "@/components/ui/PageFade";
import Icon from "@/components/ui/Icon";
import { logoSrcSet, photoUrl } from "@/lib/photo";

const NAV_PILL =
  "relative inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-2 text-body-sm 2xl:text-body-md whitespace-nowrap transition-colors duration-200 " +
  "after:content-[''] after:absolute after:left-2.5 after:right-2.5 2xl:after:left-3.5 2xl:after:right-3.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-current " +
  "after:origin-center after:transition-transform after:duration-300 after:ease-out outline-none active:after:scale-x-100";
// Mục của trang đang xem: chữ đậm, màu nhấn và luôn có gạch chân như khi rê chuột.
/** Gạch chân giữ nguyên trong lúc trang đang chuyển (sau khi bấm), tự thu lại khi trang mới đã tải xong. */
function PendingUnderline({ pressed }: { pressed: boolean }) {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-2.5 right-2.5 2xl:left-3.5 2xl:right-3.5 h-0.5 origin-center rounded-full bg-current transition-transform duration-200 ease-out ${pending || pressed ? "scale-x-100" : "scale-x-0"}`}
    />
  );
}

const NAV_PILL_ACTIVE = `${NAV_PILL} font-bold text-steel-600 after:scale-x-100`;
// Các mục còn lại: gạch chân chạy từ giữa khi rê chuột hoặc điều hướng bằng bàn phím.
const NAV_PILL_IDLE = `${NAV_PILL} font-medium text-slate-600 after:scale-x-0 hover:text-steel-600 focus-visible:text-steel-600 hover:after:scale-x-100 focus-visible:after:scale-x-100`;

export default function Header({ logoSrc }: { logoSrc: string }) {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoPulsing, setLogoPulsing] = useState(false);
  // Mục vừa được bấm: giữ gạch chân thêm một lúc để người dùng thấy phản hồi dù trang chuyển rất nhanh.
  const [pressedHref, setPressedHref] = useState<string | null>(null);
  const pressTimer = useRef<number | null>(null);
  const pressLink = (href: string) => {
    setPressedHref(href);
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => setPressedHref(null), 650);
  };
  useEffect(() => () => { if (pressTimer.current) window.clearTimeout(pressTimer.current); }, []);
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
      <div className="relative h-[var(--header-h)] w-full px-margin flex items-center justify-between gap-gutter">
        <Link href="/" className="flex items-center group shrink-0 py-2 -my-2" onClick={handleLogoClick}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl(logoSrc, 384)}
            srcSet={logoSrcSet(logoSrc)}
            sizes="200px"
            alt={t("logoAlt")}
            className={`h-9 xl:h-14 w-auto transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 ${
              logoPulsing ? "logo-click-pulse" : ""
            }`}
          />
        </Link>

        <nav className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-0.5 2xl:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => pressLink(link.href)}
              className={isActive(link.href) ? NAV_PILL_ACTIVE : NAV_PILL_IDLE}
            >
              {link.label}
              <PendingUnderline pressed={pressedHref === link.href} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/lien-he"
            aria-label={t("cta")}
            title={t("cta")}
            className="inline-flex items-center justify-center min-h-11 min-w-11 px-3 min-[1440px]:px-5 bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-[0.97] shadow-sm font-semibold whitespace-nowrap"
          >
            <span className="hidden sm:inline xl:max-[1439px]:hidden">{t("cta")}</span>
            <Icon name="request_quote" className="text-[22px] sm:hidden xl:max-[1439px]:inline" />
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden flex items-center justify-center w-11 h-11 rounded bg-slate-100 border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-steel-50 hover:border-steel-200 hover:text-steel-600 active:scale-95"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className={`text-[22px] transition-transform duration-300 ${mobileOpen ? "rotate-90" : "rotate-0" }`} />
          </button>
        </div>
      </div>

      <nav
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        className={`xl:hidden overflow-y-auto border-t border-slate-200 bg-white px-margin transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[calc(100dvh-var(--header-h))] opacity-100 py-space-md" : "max-h-0 opacity-0 py-0"
        } flex flex-col gap-0`}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            aria-current={isActive(link.href) ? "page" : undefined}
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
