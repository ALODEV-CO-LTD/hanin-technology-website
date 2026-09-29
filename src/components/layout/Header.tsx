"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Giới thiệu", href: "#" },
  { label: "Dịch vụ gia công mạ", href: "#" },
  { label: "Sản phẩm & Dự án", href: "#" },
  { label: "Năng lực sản xuất", href: "#nang-luc" },
  { label: "Tin tức", href: "#" },
  { label: "Tuyển dụng", href: "#" },
  { label: "Liên hệ", href: "#bao-gia" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/85 backdrop-blur-xl border-b border-surface-container-highest shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-xl">
          <a href="#" className="flex items-center gap-space-sm group">
            <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center font-bold text-xl tracking-tighter text-on-primary shadow-[0_0_0_1px_rgba(255,181,153,0.3)]">
              <span className="text-2xl leading-none">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm uppercase tracking-wider text-on-surface font-bold leading-none">
                HANIN
              </span>
              <span className="text-label-technical tracking-[0.14em] text-primary uppercase leading-tight mt-0.5">
                TECHNOLOGY VN
              </span>
            </div>
          </a>
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-1 text-body-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-md">
          <a
            href="#bao-gia"
            className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm bg-primary-container hover:bg-inverse-primary text-on-primary rounded text-label-technical uppercase tracking-wider transition-all duration-150 active:scale-[0.99] shadow-[0_0_0_1px_rgba(246,96,24,0.4)] whitespace-nowrap"
          >
            NHẬN BÁO GIÁ →
          </a>
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded bg-surface-container-high text-on-surface"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="xl:hidden border-t border-surface-container-highest bg-surface-dim/95 backdrop-blur-xl px-margin py-space-md flex flex-col gap-space-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-space-xs text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#bao-gia"
            onClick={() => setMobileOpen(false)}
            className="mt-space-sm inline-flex items-center justify-center px-space-md py-space-sm bg-primary-container text-on-primary rounded text-label-technical uppercase tracking-wider"
          >
            NHẬN BÁO GIÁ →
          </a>
        </nav>
      )}
    </header>
  );
}
