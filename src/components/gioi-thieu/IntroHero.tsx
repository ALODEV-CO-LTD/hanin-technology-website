import { useTranslations } from "next-intl";

export default function IntroHero() {
  const t = useTranslations("GioiThieu.IntroHero");

  return (
    <section className="relative w-full h-[460px] bg-slate-100 overflow-hidden flex items-end border-b border-slate-200">
      {/* Hero Background Image & Tonal Scrim */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply scale-105 transition-transform duration-1000 ease-out"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSVe5tNOvFanXmtlIn8IzvtIG6FpVRCVGzVgu0CVOXwkksG4AVSfi9N6iITHXfJMBKhlQ945fTzGdHSeqL3sEfQwdcMpkXr5cNkEEtvqaQwQSLZ4l9OZwnKoesHYpzdQlYWZQwuMGqQVAyTyahd9OGcdWEcHyxteq4mZKNuZcTA4hyedHbaBE-DCUMdPGq6tMREgeSGUFqeb1b0G2YK_PpO3frdmdvCJc7NDBuA-qXs2-dKwwOnBEJ-g')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-margin pb-space-xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-space-xs text-label-technical tracking-wider text-slate-500 mb-space-sm uppercase">
          <a className="hover:text-steel-600 transition-colors" href="#">
            {t("breadcrumbHome")}
          </a>
          <span className="text-slate-300">/</span>
          <span className="text-steel-600 font-bold">{t("breadcrumbCurrent")}</span>
        </nav>

        {/* Main Heading */}
        <h1 className="text-headline-xl-mobile md:text-display-hero text-slate-900 uppercase tracking-tight max-w-3xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        {/* Supporting Deck */}
        <p className="text-body-md md:text-body-lg text-slate-600 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>

      {/* Technical Coordinate Hairline Rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 flex justify-between items-center px-margin pointer-events-none">
        <span className="text-[9px] text-slate-400 font-mono">SEC-01 // COORD: 21°12&apos;N 105°47&apos;E</span>
        <span className="text-[9px] text-slate-400 font-mono">SYS.VER: 4.8.2</span>
      </div>
    </section>
  );
}
