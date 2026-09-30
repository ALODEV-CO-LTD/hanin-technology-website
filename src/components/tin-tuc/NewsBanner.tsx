import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBanner() {
  const tb = useTranslations("TinTuc.NewsBreadcrumb");
  const t = useTranslations("TinTuc.NewsIntro");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-100 border-b border-slate-200 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        role="img"
        aria-label={t("titlePrefix")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVbGJwGBLCtR1FfUH6k02r2P-NiR8BAPFHnKHa0jtHPUl35bfil2EmH5HU_MuFoZ3ANHR2WUVUfFOyDEfy6xH2h8L_JXgXpud4nJiFxbIFhpWxMYp7ji-bzcQ73VEptZXwO2AGP8ot9l9tXlwQPWiGSKjxyVdf-Y5rIg1a0zRe2CQmQXe3CVHX22FXJIAwpE3XO8moxoHF9x6JPFGsgntioSxKEkNyDcZSpbFwu5Jbizom9bSXp7a-1w')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

      <div className="relative z-10 w-full px-margin">
        <PageBreadcrumb
          className="mb-space-md"
          items={[
            { label: tb("home"), href: "/" },
            { label: tb("news") },
          ]}
        />
        <h1 className="text-display-hero-mobile lg:text-display-hero text-slate-900 uppercase tracking-tight font-bold max-w-3xl">
          {t("titlePrefix")} <span className="text-steel-600">{t("titleHighlight")}</span>{" "}
          {t("titleSuffix")}
        </h1>
        <p className="text-body-lg text-slate-600 max-w-2xl mt-space-xs">{t("description")}</p>
      </div>
    </section>
  );
}
