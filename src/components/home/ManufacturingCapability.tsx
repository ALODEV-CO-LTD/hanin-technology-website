import Icon from "@/components/ui/Icon";
import { siteImg } from "@/server/site-images";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";

const SPEC_KEYS = ["0", "1", "2", "3"] as const;

export default function ManufacturingCapability() {
  const t = useTranslations("Home.ManufacturingCapability");

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-[var(--header-h)]" id="nang-luc">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-headline-xl text-slate-900 font-bold uppercase">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          <div className="lg:col-span-6 relative rounded overflow-hidden shadow-md border border-slate-200 bg-white lg:min-h-[480px]">
            <div className="relative aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
              <Photo
                alt={t("imageAlt")}
                className="w-full h-full object-cover"
                src={siteImg("home/ManufacturingCapability#1", "/images/factory/ma-treo-3.jpg")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-sm">
              {SPEC_KEYS.map((key) => (
                <div
                  key={key}
                  className="p-space-md bg-white border border-slate-200 rounded flex flex-col gap-1 transition-colors hover:border-steel-300 hover:shadow-sm"
                >
                  <span className="text-headline-sm text-slate-900 font-semibold">{t(`specs.${key}.title`)}</span>
                  <span className="text-body-sm text-slate-600">{t(`specs.${key}.desc`)}</span>
                </div>
              ))}
            </div>
            <div className="pt-space-xs">
              <Link
                href="/nang-luc-san-xuat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-sm"
              >
                <span>{t("cta")}</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
