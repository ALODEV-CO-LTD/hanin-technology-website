import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CapabilityHero() {
  const t = useTranslations("NangLuc.CapabilityHero");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVbGJwGBLCtR1FfUH6k02r2P-NiR8BAPFHnKHa0jtHPUl35bfil2EmH5HU_MuFoZ3ANHR2WUVUfFOyDEfy6xH2h8L_JXgXpud4nJiFxbIFhpWxMYp7ji-bzcQ73VEptZXwO2AGP8ot9l9tXlwQPWiGSKjxyVdf-Y5rIg1a0zRe2CQmQXe3CVHX22FXJIAwpE3XO8moxoHF9x6JPFGsgntioSxKEkNyDcZSpbFwu5Jbizom9bSXp7a-1w=w1920')",
        }}
      />

      <div className="relative px-margin w-full [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
        <PageBreadcrumb
          className="pb-6"
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        <div className="max-w-3xl pt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            {t("title")}
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed">{t("description")}</p>
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
