import { useTranslations } from "next-intl";

export default function AutomatedVsManual() {
  const t = useTranslations("NangLuc.AutomatedVsManual");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl text-center max-w-2xl mx-auto">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
          <p className="text-body-md text-slate-600 mt-2">{t("description")}</p>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVT-9zhcvu2BzRYn6t-Ha5sPn3PYQhlp4Kp1gsR7rcI0QQZJ4BT7zXXiCl6oNStYgNE9VZcacy23mGZoyLIb5j6MrPBvgLvcU2PqW18U0VAJ9MVOnhnxD880RoaWYp1CKf61l4ho0f9GeQuTAeDjnHSf-GpovsTk-cIxB8gY4qNwL2_qFfP6M8aNPO1daRz4JpjvUgA2hbi-WYzB6t-WRHPEFGP5CmKlbQWSCLcJWkFJu_8_gutmHO9w"
                />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 bg-white/90 backdrop-blur border border-slate-200 rounded text-label-technical text-steel-600 font-semibold shadow-sm">
                  SYSTEM: SCADA AUTOMATED
                </div>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC12paqn4gFgRmeNAjSxCJsd5QXtRNxE8kxDGBT9X_NW8-Xfl8CetECOLR4-LU2We8qKWs9pFxvTdHxzCf0RrKBmfCD7mCETHMtLdTPFMjRJxTgMgTpWHgKQKifVsFUPolYeyzOOZYb1IPguA9ya1drqRpy9GPlAI1T1Tw5dtOdVWMLxsu1wLlh6czPFovf6fMfyxqn2RLcGk3YVEPLOxGxj8q4P_feOaqcx_6TnEZDZr5rSmfEm9upuA"
                />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 bg-white/90 backdrop-blur border border-slate-200 rounded text-label-technical text-slate-700 font-semibold shadow-sm">
                  SYSTEM: SPECIALIZED R&amp;D
                </div>
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
