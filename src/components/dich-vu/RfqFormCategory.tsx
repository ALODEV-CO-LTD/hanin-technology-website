"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { submitInquiry } from "@/lib/submit-inquiry";

export default function RfqFormCategory() {
  const t = useTranslations("DichVu.RfqFormCategory");
  const locale = useLocale();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    const result = await submitInquiry(new FormData(form), { kind: "rfq", locale, source: pathname });
    setBusy(false);
    if (result.ok) {
      form.reset();
      alert(t("submitAlert"));
    } else {
      alert(t("submitError"));
    }
  }

  return (
    <section className="w-full bg-white border border-slate-200 rounded p-space-md lg:p-space-xl shadow-sm mb-space-xl scroll-mt-20" id="rfq-form">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-space-lg">
          <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">{t("heading")}</h2>
          <p className="text-body-md text-slate-600 mt-2 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-space-md"
          onSubmit={handleSubmit}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("companyLabel")}</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="company"
              placeholder={t("companyPlaceholder")}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("contactLabel")}</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="fullName"
              placeholder={t("contactPlaceholder")}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("phoneLabel")}</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="phone"
              placeholder="+84 ..."
              required
              type="tel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("emailLabel")}</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="email"
              placeholder="engineering@company.com"
              required
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("platingTypeLabel")}</label>
            <select
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="platingService"
              required
              defaultValue=""
            >
              <option value="">{t("platingTypeOptions.default")}</option>
              <option value="hard-chrome">{t("platingTypeOptions.hardChrome")}</option>
              <option value="electroless-nickel">{t("platingTypeOptions.enp")}</option>
              <option value="zinc-nickel">{t("platingTypeOptions.zincNickel")}</option>
              <option value="anodizing">{t("platingTypeOptions.anodizing")}</option>
              <option value="custom">{t("platingTypeOptions.custom")}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("volumeLabel")}</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="volume"
              placeholder={t("volumePlaceholder")}
              type="text"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">{t("requirementsLabel")}</label>
            <textarea
              className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              name="message"
              placeholder={t("requirementsPlaceholder")}
              rows={3}
            />
          </div>
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-space-md rounded flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-steel-600 text-[32px]">attach_file</span>
              <div>
                <p className="text-title-md text-slate-900 font-bold">{t("attachTitle")}</p>
                <p className="text-label-sm text-slate-500">{t("attachDesc")}</p>
              </div>
            </div>
            <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-space-md py-2 rounded text-label-technical font-semibold transition-all">
              <span>{t("chooseFile")}</span>
              <input className="hidden" type="file" name="files" multiple />
            </label>
          </div>
          <div className="md:col-span-2 flex items-center justify-between pt-space-sm flex-wrap gap-space-sm">
            <div className="flex items-center gap-2 text-slate-500 text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-steel-600">security</span>
              <span>{t("ndaNote")}</span>
            </div>
            <button
              className="bg-steel-600 hover:bg-steel-700 text-white px-space-xl py-3 rounded text-title-md font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all disabled:opacity-60"
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
