import { useTranslations } from "next-intl";

export default function ContactCta() {
  const t = useTranslations("GioiThieu.ContactCta");

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200">
      <div className="mx-auto px-margin text-center flex flex-col items-center">
        <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight max-w-2xl mb-space-sm font-bold">
          {t("heading")}
        </h2>
        <p className="text-body-md md:text-body-lg text-slate-600 max-w-xl leading-relaxed mb-space-lg">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-md">
          {/* Primary Action */}
          <a
            className="inline-flex items-center justify-center px-space-lg py-space-sm bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-150 active:scale-[0.99] shadow-md shadow-steel-500/20"
            href="#"
          >
            {t("ctaPrimary")}
          </a>
          {/* Secondary Action */}
          <a
            className="inline-flex items-center justify-center px-space-lg py-space-sm bg-slate-50 hover:bg-slate-100 text-slate-800 rounded text-label-technical uppercase tracking-wider transition-all duration-150 border border-slate-300 hover:border-slate-400 shadow-sm"
            href="#"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
