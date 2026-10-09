import { siteImg } from "@/server/site-images";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

export default function AboutHanin() {
  const t = useTranslations("Home.AboutHanin");
  const HIGHLIGHTS = ["0", "1", "2", "3"] as const;

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          <div className="lg:col-span-5 relative group">
            <div className="relative overflow-hidden rounded border border-slate-200 shadow-md bg-white aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-0">
              <Photo
                alt={t("imageAlt")}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src={siteImg("home/AboutHanin#1", "/images/factory/ma-quay-2.jpg")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-space-md">
            <h2 className="text-headline-xl text-slate-900 font-bold">
              {t("title")}
            </h2>
            <p className="text-body-lg text-slate-700 leading-relaxed max-w-2xl">
              {t("paragraph2")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
              {HIGHLIGHTS.map((key) => (
                <div key={key} className="flex items-center gap-3 p-space-md bg-white border border-slate-200 rounded shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-steel-50 text-steel-600">
                    <Icon name="check_circle" className="text-[22px]" />
                  </span>
                  <span className="text-body-md font-semibold text-slate-900 leading-snug">{t(`highlights.${key}`)}</span>
                </div>
              ))}
            </div>
            <div className="pt-space-sm">
              <Link
                href="/gioi-thieu"
                className="inline-flex min-h-11 items-center gap-2 px-space-md py-3 rounded border border-steel-600 text-title-md uppercase tracking-wider text-steel-600 hover:[background:var(--color-steel-600)] hover:text-white transition-colors group"
              >
                <span>{t("ctaLink")}</span>
                <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
