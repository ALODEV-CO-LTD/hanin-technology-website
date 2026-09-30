import { useTranslations } from "next-intl";

export default function FactoryOverview() {
  const t = useTranslations("NangLuc.FactoryOverview");

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-20" id="he-thong-nha-may">
      <div className="mx-auto px-margin w-full">
        <div className="flex items-center gap-space-sm mb-space-xl">
          <span className="w-2.5 h-2.5 bg-steel-600 rounded-sm" />
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* LEFT: Photo & Badges */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 min-h-[420px] shadow-sm flex flex-col justify-end p-space-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={t("image.alt")}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVbGJwGBLCtR1FfUH6k02r2P-NiR8BAPFHnKHa0jtHPUl35bfil2EmH5HU_MuFoZ3ANHR2WUVUfFOyDEfy6xH2h8L_JXgXpud4nJiFxbIFhpWxMYp7ji-bzcQ73VEptZXwO2AGP8ot9l9tXlwQPWiGSKjxyVdf-Y5rIg1a0zRe2CQmQXe3CVHX22FXJIAwpE3XO8moxoHF9x6JPFGsgntioSxKEkNyDcZSpbFwu5Jbizom9bSXp7a-1w"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>

          {/* RIGHT: Description & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-xl rounded-lg shadow-sm">
            <div>
              <h3 className="text-headline-md text-slate-900 uppercase mb-space-md">{t("factoryTitle")}</h3>
              <p className="text-body-md text-slate-600 leading-relaxed mb-space-lg">{t("factoryDescription")}</p>
            </div>
            <div>
              {/* Technical specs table */}
              <div className="grid grid-cols-1 gap-space-xs mb-space-lg text-body-sm">
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.locationLabel")}</span>
                  <span className="text-slate-900 font-semibold text-right">
                    Lô CN-08, KCN Quang Minh, Mê Linh, Hà Nội
                  </span>
                </div>
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.areaLabel")}</span>
                  <span className="text-steel-600 text-headline-sm font-bold">18,000 m²</span>
                </div>
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.capabilityLabel")}</span>
                  <span className="text-slate-900 font-semibold text-right">[{t("specs.capabilityValue")}]</span>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-wider font-semibold"
                href="#factory-gallery"
              >
                {t("ctaGallery")} <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
