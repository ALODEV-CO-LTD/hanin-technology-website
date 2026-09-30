import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function ServiceBanner() {
  const t = useTranslations("DichVu.CategoryHero");
  const tNav = useTranslations("Nav");

  return (
    <section className="relative w-full min-h-screen bg-slate-100 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image & Tonal Scrim */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply scale-105 transition-transform duration-1000 ease-out"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNUWbtu-6mF-47Gk1oHXXyJOVwIjxt1jMnwPHiIsRKd5-Mx9Fkov5w63gs__fEcgwwzgV_Z-vKRbSS73Sz3WCrxS7MMkOc_RB6FPdCt5KgCyaidW2F52ulUmXdEeh_eNp7KwcY8uwyn0-vSmt1UP_859JtN6IOXI0GDsjdrq5wFODc1u1tv_i6RcJXzKItH1zLdI0T8JX0LVT3-sWkTJptYWKMbM9n17lteJGbAqsinL7sfHx1R7peqg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin">
        <PageBreadcrumb
          className="mb-space-sm"
          items={[
            { label: tNav("trangChu"), href: "/" },
            { label: t("title") },
          ]}
        />

        <h1 className="text-headline-xl-mobile md:text-display-hero text-slate-900 uppercase tracking-tight max-w-3xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        <p className="text-body-md md:text-body-lg text-slate-600 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>
    </section>
  );
}
