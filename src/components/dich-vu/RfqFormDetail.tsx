"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { submitInquiry } from "@/lib/submit-inquiry";

export default function RfqFormDetail() {
  const t = useTranslations("DichVu.RfqFormDetail");
  const locale = useLocale();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Các thông số kỹ thuật riêng của form này được gộp vào phần nội dung yêu cầu.
    const technical = [
      `${t("substrateLabel")}: ${data.get("substrate") ?? ""}`,
      `${t("phosLabel")}: ${data.get("phosphorus") ?? ""}`,
      `${t("thicknessLabel")}: ${data.get("thickness") ?? ""}`,
    ].join("\n");
    data.set("message", `${technical}\n\n${String(data.get("message") ?? "")}`.trim());
    setBusy(true);
    const result = await submitInquiry(data, { kind: "rfq", locale, source: pathname });
    setBusy(false);
    if (result.ok) {
      form.reset();
      alert(t("submitAlert"));
    } else {
      alert(t("submitError"));
    }
  }

  return (
    <section className="w-full mb-space-xl scroll-mt-20" id="rfq-form">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-steel-100/60 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between pb-space-md mb-space-md bg-slate-50 border border-slate-200 p-space-md rounded">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mt-1 font-bold">
              {t("heading")}
            </h2>
            <p className="text-body-md text-slate-600 mt-1">{t("subtitle")}</p>
          </div>
          <div className="mt-space-sm md:mt-0 text-label-sm text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded">
            {t("hotlineLabel")} <strong className="text-steel-600 font-bold">+84 (0) 211 388 9021</strong>
          </div>
        </div>

        <form
          className="space-y-space-md"
          onSubmit={handleSubmit}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                {t("companyLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="company"
                placeholder={t("companyPlaceholder")}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                {t("contactLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="fullName"
                placeholder={t("contactPlaceholder")}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                {t("emailLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="email"
                placeholder="eng-procurement@company.com"
                required
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                {t("substrateLabel")} <span className="text-steel-600">*</span>
              </label>
              <select
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="substrate"
                defaultValue="S45C"
              >
                <option value="S45C">{t("substrateOptions.carbonSteel")}</option>
                <option value="SCM440">{t("substrateOptions.alloySteel")}</option>
                <option value="SUS">{t("substrateOptions.stainless")}</option>
                <option value="ALUMINUM">{t("substrateOptions.aluminum")}</option>
                <option value="COPPER">{t("substrateOptions.copper")}</option>
                <option value="CAST_IRON">{t("substrateOptions.castIron")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">{t("phosLabel")}</label>
              <select
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="phosphorus"
                defaultValue="HIGH_PHOS"
              >
                <option value="HIGH_PHOS">{t("phosOptions.high")}</option>
                <option value="MED_PHOS">{t("phosOptions.medium")}</option>
                <option value="LOW_PHOS">{t("phosOptions.low")}</option>
                <option value="CONSULT">{t("phosOptions.consult")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">{t("thicknessLabel")}</label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="thickness"
                placeholder={t("thicknessPlaceholder")}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">{t("volumeLabel")}</label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="volume"
                placeholder={t("volumePlaceholder")}
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">{t("notesLabel")}</label>
              <textarea
                className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                name="message"
                placeholder={t("notesPlaceholder")}
                rows={3}
              />
            </div>
            <div className="md:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200 p-space-sm rounded">
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-slate-900 font-semibold uppercase">{t("attachTitle")}</span>
                <p className="text-label-sm text-slate-500">{t("attachDesc")}</p>
              </div>
              <label className="cursor-pointer mt-2 w-full py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-center text-label-technical uppercase rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-steel-600 text-[18px]">cloud_upload</span>
                <span>{t("chooseFile")}</span>
                <input className="hidden" type="file" name="files" multiple />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex items-center gap-2 text-slate-500 text-label-sm">
              <span className="material-symbols-outlined text-steel-600 text-[16px]">lock</span>
              <span>{t("ndaNote")}</span>
            </div>
            <button
              className="inline-flex items-center gap-space-xs bg-steel-600 hover:bg-steel-700 text-white px-space-lg py-3 rounded text-label-technical uppercase tracking-wider shadow-sm transition-all disabled:opacity-60"
              type="submit"
              disabled={busy}
            >
              <span>{t("submitButton")}</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
