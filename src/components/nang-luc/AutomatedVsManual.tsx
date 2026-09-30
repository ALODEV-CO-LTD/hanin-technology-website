import { useTranslations } from "next-intl";

export default function AutomatedVsManual() {
  const t = useTranslations("NangLuc.AutomatedVsManual");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl text-center">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
          <p className="text-body-md text-slate-600 mt-2 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* AUTOMATED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt={t("automated.imageAlt")}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Rp9iUGeqni3A6u4Y3C-JoRdlsiZ3JPcevdQQ-JcImbiNSnXcvpd1_n9lbSPFdOtkXGmXJ8Yx311AAoAwa_C_Q1axzJc1TJSpiEZxnREJYdzd4qo0KJVN59JJcefB_TNtV2r_9v-9QQ7BzHkT0ZT6D4CUyOVaOPhuwRt7CgEeHBj7GH-QtFAgQ0kmBD1iFwD_6QkgwWS5IebEzVgCvo8z_6zf-OsY0N_7HWZ10e9pJsP0oIlTC1SNmg"
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("automated.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">{t("automated.desc")}</p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>{t("automated.feature1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>{t("automated.feature2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>{t("automated.feature3")}</span>
              </div>
            </div>
          </div>

          {/* MANUAL / SPECIALIZED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt={t("manual.imageAlt")}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDB_GDtgTuGWQ11eXyw3ln1I983UzyAD1puXLPdxQQrrMF4LTkJrj7Q2nJax-nYxbOuNg17ACAdUFpiZgLWUlmIwl8TZDBGcm8tHAXVuJeV8vLgEAFawY6al08_7_WX6mBbvn4eZudzKH11P-bOglwuQVEOzBlsrH1-t8iEV8hNQNTXSNhZpIQcjEZx0g-hFSoqnuMinXx6LiZk3U64BaRdq0uDdejVod0LFd8KtAiBNUYelDkaJUw"
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("manual.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">{t("manual.desc")}</p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">tune</span>
                <span>{t("manual.feature1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">science</span>
                <span>{t("manual.feature2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">engineering</span>
                <span>{t("manual.feature3")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
