import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";

export default function CompanyIntroduction() {
  const t = useTranslations("GioiThieu.CompanyIntroduction");

  const METADATA_GRID = [
    { key: "field", noteClass: "text-steel-600" },
    { key: "target", noteClass: "text-steel-700" },
    { key: "location", noteClass: "text-slate-600" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left: Precision Factory Campus Visual */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
              <Photo src={siteImg("gioi-thieu/CompanyIntroduction#1", "/images/factory/kho-6.jpg")} alt={t("imageAlt")} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right: Editorial & Mission */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
            <div className="space-y-space-sm text-body-md text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">{t("paragraph1Strong")}</strong> {t("paragraph1Rest")}
              </p>
              <p>{t("paragraph2")}</p>
            </div>
            {/* Metadata Technical Grid Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-xs">
              {METADATA_GRID.map((item) => (
                <div
                  key={item.key}
                  className="p-space-sm bg-white rounded flex flex-col shadow-sm"
                >
                  <span className="text-xs text-steel-600 uppercase tracking-wider mb-1 font-semibold">
                    {t(`${item.key}.label`)}
                  </span>
                  <span className="text-title-md text-slate-900 font-semibold">{t(`${item.key}.value`)}</span>
                  {item.key === "location" && (
                    <span className={`text-xs mt-1 font-semibold ${item.noteClass}`}>
                      {t(`${item.key}.note`)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
