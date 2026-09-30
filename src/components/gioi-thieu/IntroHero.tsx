import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function IntroHero() {
  const t = useTranslations("GioiThieu.IntroHero");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSVe5tNOvFanXmtlIn8IzvtIG6FpVRCVGzVgu0CVOXwkksG4AVSfi9N6iITHXfJMBKhlQ945fTzGdHSeqL3sEfQwdcMpkXr5cNkEEtvqaQwQSLZ4l9OZwnKoesHYpzdQlYWZQwuMGqQVAyTyahd9OGcdWEcHyxteq4mZKNuZcTA4hyedHbaBE-DCUMdPGq6tMREgeSGUFqeb1b0G2YK_PpO3frdmdvCJc7NDBuA-qXs2-dKwwOnBEJ-g')",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
        <PageBreadcrumb
          className="mb-space-sm"
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        {/* Main Heading */}
        <h1 className="text-headline-xl-mobile md:text-display-hero text-white uppercase tracking-tight max-w-3xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        {/* Supporting Deck */}
        <p className="text-body-md md:text-body-lg text-slate-200 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>
    </section>
  );
}
