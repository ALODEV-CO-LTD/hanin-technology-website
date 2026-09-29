"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ gia công mạ", href: "/dich-vu-gia-cong-ma" },
  { label: "Sản phẩm & Dự án", href: "/san-pham-du-an" },
  { label: "Năng lực sản xuất", href: "/nang-luc-san-xuat" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-xl">
          <Link href="/" className="flex items-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hanin-logo.svg" alt="HANIN Plating" className="h-11 w-auto" />
          </Link>
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "py-1 text-body-sm text-orange-600 font-semibold border-b-2 border-orange-600 whitespace-nowrap"
                    : "py-1 text-body-sm text-slate-600 hover:text-orange-600 transition-colors whitespace-nowrap"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-md">
          <Link
            href="/lien-he"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-150 active:scale-[0.99] shadow-sm font-semibold whitespace-nowrap"
          >
            NHẬN BÁO GIÁ KỸ THUẬT →
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded bg-slate-100 border border-slate-200 text-slate-600"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="xl:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-margin py-space-md flex flex-col gap-space-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={
                isActive(link.href)
                  ? "py-space-xs text-body-md text-orange-600 font-semibold"
                  : "py-space-xs text-body-md text-slate-600 hover:text-orange-600 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/lien-he"
            onClick={() => setMobileOpen(false)}
            className="mt-space-sm inline-flex items-center justify-center px-space-md py-space-sm bg-orange-600 text-white rounded text-label-technical uppercase tracking-wider font-semibold"
          >
            NHẬN BÁO GIÁ KỸ THUẬT →
          </Link>
        </nav>
      )}
    </header>
  );
}
