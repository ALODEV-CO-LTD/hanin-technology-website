import { siteImg } from "@/server/site-images";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";
import HaninTimeline from "@/components/home/HaninTimeline";

export default function AboutHanin() {
  const t = useTranslations("HomeAbout");
  const STATS = ["0", "1", "2", "3"] as const;

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center gap-space-md">
            <p className="text-label-technical uppercase text-steel-600">{t("eyebrow")}</p>
            <h2 className="text-headline-xl text-slate-900 font-bold">{t("title")}</h2>
            <p className="text-body-lg text-slate-700 leading-relaxed max-w-2xl">{t("intro1")}</p>
            <p className="text-body-md text-slate-700 max-w-2xl">{t("intro2")}</p>
            <dl aria-label={t("statsLabel")} className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
              {STATS.map((key) => (
                <div key={key} className="flex flex-col p-space-md bg-white border border-slate-200 rounded shadow-sm">
                  <dt className="order-2 mt-1 text-body-sm text-slate-600">{t(`stats.${key}.label`)}</dt>
                  <dd className="text-headline-md font-bold text-steel-700 leading-none">{t(`stats.${key}.value`)}</dd>
                </div>
              ))}
            </dl>
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

          <div className="lg:col-span-5 relative group">
            <div className="relative overflow-hidden rounded border border-slate-200 shadow-md bg-white aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-0">
              <Photo
                alt={t("imageAlt")}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src={siteImg("home/AboutHanin#1", "/images/factory/ma-quay-2.jpg")}
              />
            </div>
          </div>
        </div>
        <HaninTimeline />
      </div>
    </section>
  );
}
