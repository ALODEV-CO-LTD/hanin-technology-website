import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CapabilityHero() {
  const t = useTranslations("NangLuc.CapabilityHero");

  return (
    <section className="relative w-full overflow-hidden bg-slate-100 -mt-20 pt-28 pb-16 border-b border-slate-200">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVbGJwGBLCtR1FfUH6k02r2P-NiR8BAPFHnKHa0jtHPUl35bfil2EmH5HU_MuFoZ3ANHR2WUVUfFOyDEfy6xH2h8L_JXgXpud4nJiFxbIFhpWxMYp7ji-bzcQ73VEptZXwO2AGP8ot9l9tXlwQPWiGSKjxyVdf-Y5rIg1a0zRe2CQmQXe3CVHX22FXJIAwpE3XO8moxoHF9x6JPFGsgntioSxKEkNyDcZSpbFwu5Jbizom9bSXp7a-1w')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

      <div className="relative max-w-[1280px] mx-auto px-margin w-full">
        <PageBreadcrumb
          className="pb-6"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        <div className="max-w-3xl pt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight uppercase mb-4">
            {t("title")}
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">{t("description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-8">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-steel-600 hover:bg-steel-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-all active:scale-[0.99] shadow-sm"
            href="#he-thong-nha-may"
          >
            {t("ctaExplore")}
          </a>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
            href="#day-chuyen"
          >
            {t("ctaLines")}
          </a>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
            href="#kiem-nghiem"
          >
            {t("ctaQa")}
          </a>
        </div>
      </div>
    </section>
  );
}
