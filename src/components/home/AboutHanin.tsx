import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutHanin() {
  const t = useTranslations("Home.AboutHanin");
  const HIGHLIGHTS = ["0", "1", "2", "3"] as const;

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-5 relative group">
            <div className="relative overflow-hidden rounded border border-slate-200 shadow-md bg-white aspect-[4/3] lg:aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("imageAlt")}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-slate-200">
                <span className="text-[10px] text-steel-600 uppercase tracking-widest font-mono font-bold">
                  {t("badgeTag")}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-space-sm rounded border border-slate-200/80 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-title-md text-slate-900 font-semibold">
                    {t("badgeTitle")}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {t("badgeSubtitle")}
                  </p>
                </div>
                <span className="material-symbols-outlined text-steel-600 text-[20px]">verified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h2 className="text-headline-xl text-slate-900 font-bold">
              {t("title")}
            </h2>
            <div className="flex flex-col gap-space-sm text-body-md text-slate-600 leading-relaxed">
              <p>
                {t("paragraph1")}
              </p>
              <p className="text-slate-600 bg-white border border-slate-200 p-space-md rounded">
                {t("paragraph2")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-space-md pt-space-xs text-body-sm text-slate-700">
              {HIGHLIGHTS.map((key) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-steel-600 text-[18px]">
                    check_circle
                  </span>
                  <span>{t(`highlights.${key}`)}</span>
                </div>
              ))}
            </div>
            <div className="pt-space-sm">
              <Link
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 text-title-md uppercase tracking-wider text-steel-600 hover:text-steel-700 transition-colors group"
              >
                <span>{t("ctaLink")}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
