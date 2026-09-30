import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CategoryHero() {
  const t = useTranslations("SanPham.CategoryHero");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-100 border-b border-slate-200 flex items-center">
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("imageAlt")}
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-100/95 to-slate-100/80 z-0" />
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-margin flex flex-col gap-space-sm">
        <PageBreadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />
        <h1 className="text-display-hero-mobile lg:text-display-hero uppercase tracking-tight text-slate-900 mt-space-xs font-bold">
          {t("title")}
        </h1>
        <p className="text-body-lg text-slate-600 max-w-3xl leading-relaxed mt-space-xs">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
