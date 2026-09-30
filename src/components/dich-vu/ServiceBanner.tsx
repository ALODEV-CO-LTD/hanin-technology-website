import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function ServiceBanner() {
  const t = useTranslations("DichVu.CategoryHero");
  const tNav = useTranslations("Nav");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNUWbtu-6mF-47Gk1oHXXyJOVwIjxt1jMnwPHiIsRKd5-Mx9Fkov5w63gs__fEcgwwzgV_Z-vKRbSS73Sz3WCrxS7MMkOc_RB6FPdCt5KgCyaidW2F52ulUmXdEeh_eNp7KwcY8uwyn0-vSmt1UP_859JtN6IOXI0GDsjdrq5wFODc1u1tv_i6RcJXzKItH1zLdI0T8JX0LVT3-sWkTJptYWKMbM9n17lteJGbAqsinL7sfHx1R7peqg=w1920')",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
        <PageBreadcrumb
          className="mb-space-sm"
          variant="dark"
          items={[
            { label: tNav("trangChu"), href: "/" },
            { label: t("title") },
          ]}
        />

        <h1 className="text-headline-xl-mobile md:text-display-hero text-white uppercase tracking-tight max-w-3xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        <p className="text-body-md md:text-body-lg text-slate-200 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>
    </section>
  );
}
