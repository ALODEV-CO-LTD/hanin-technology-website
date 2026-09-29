import { useTranslations } from "next-intl";

export default function SpecTrustNote() {
  const t = useTranslations("SanPham.SpecTrustNote");

  return (
    <section className="w-full max-w-[1280px] mx-auto px-margin py-space-md">
      <div className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex items-start gap-space-md">
        <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-steel-600 shrink-0">
          <span className="material-symbols-outlined text-[24px]">terminal</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label-technical uppercase tracking-wider text-steel-600 font-bold">
            {t("title")}
          </span>
          <p className="text-body-sm text-slate-600 leading-relaxed">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
