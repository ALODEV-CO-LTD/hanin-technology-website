"use client";

import Select from "@/components/ui/Select";
import { useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { submitInquiry } from "@/lib/submit-inquiry";
import Icon from "@/components/ui/Icon";

export default function RfqFormCategory({ className = "mb-space-xl", aside }: { className?: string; aside?: ReactNode }) {
  const t = useTranslations("DichVu.RfqFormCategory");
  const locale = useLocale();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const [fileNames, setFileNames] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus("idle");
    const result = await submitInquiry(new FormData(form), { kind: "rfq", locale, source: pathname });
    setBusy(false);
    if (result.ok) {
      form.reset();
      setFileNames("");
      setStatus("ok");
    } else {
      setStatus("fail");
    }
  }

  return (
    <section className={`w-full bg-white border border-slate-200 rounded shadow-sm ${aside ? "overflow-hidden lg:grid lg:grid-cols-12" : "p-space-md lg:p-space-lg"} ${className} scroll-mt-[var(--header-h)]`} id="rfq-form">
      {aside && <div className="relative hidden lg:block lg:col-span-5 lg:min-h-full bg-slate-200">{aside}</div>}
      <div className={aside ? "lg:col-span-7 p-space-md lg:p-space-lg" : "max-w-4xl mx-auto"}>
        <div className={aside ? "mb-space-md" : "text-center mb-space-lg"}>
          <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">{t("heading")}</h2>
          <p className={`hidden sm:block text-body-md text-slate-600 mt-2 max-w-xl ${aside ? "" : "mx-auto"}`}>{t("subtitle")}</p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-space-md gap-y-space-sm md:gap-y-space-md"
          onSubmit={handleSubmit}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-company">{t("companyLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-company"
              name="company"
              autoComplete="organization"
              placeholder={t("companyPlaceholder")}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-fullName">{t("contactLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-fullName"
              name="fullName"
              autoComplete="name"
              placeholder={t("contactPlaceholder")}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-phone">{t("phoneLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-phone"
              name="phone"
              autoComplete="tel"
              placeholder="+84 ..."
              required
              type="tel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-email">{t("emailLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-email"
              name="email"
              autoComplete="email"
              placeholder="engineering@company.com"
              required
              type="email"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-project">{t("projectLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-project"
              name="projectName"
              placeholder={t("projectPlaceholder")}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-platingService">{t("platingTypeLabel")}</label>
            <Select
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-platingService"
              name="platingService"
              required
              defaultValue=""
              options={[
                { value: "", label: t("platingTypeOptions.default") },
                { value: "hard-chrome", label: t("platingTypeOptions.hardChrome") },
                { value: "electroless-nickel", label: t("platingTypeOptions.enp") },
                { value: "zinc-nickel", label: t("platingTypeOptions.zincNickel") },
                { value: "anodizing", label: t("platingTypeOptions.anodizing") },
                { value: "custom", label: t("platingTypeOptions.custom") },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-volume">{t("volumeLabel")}</label>
            <input
              className="h-11 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-volume"
              name="volume"
              placeholder={t("volumePlaceholder")}
              type="text"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold" htmlFor="rfq-c-message">{t("requirementsLabel")}</label>
            <textarea
              className="p-3 max-md:h-20 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-500 text-body-md outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-all"
              id="rfq-c-message"
              name="message"
              placeholder={t("requirementsPlaceholder")}
              rows={3}
            />
          </div>
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-space-sm sm:p-space-md rounded flex flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <Icon name="attach_file" className="text-steel-600 text-[26px] sm:text-[32px] shrink-0" />
              <div>
                <p className="text-body-md sm:text-title-md text-slate-900 font-bold">{t("attachTitle")}</p>
                <p className={`text-sm break-all ${fileNames ? "text-steel-700 font-medium" : "hidden sm:block text-slate-600"}`}>{fileNames || t("attachDesc")}</p>
              </div>
            </div>
            <label className="cursor-pointer focus-within:ring-2 focus-within:ring-steel-600/40 min-h-11 shrink-0 inline-flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-space-sm sm:px-space-md py-2 rounded text-label-technical font-semibold transition-all">
              <span>{t("chooseFile")}</span>
              <input
                className="sr-only"
                type="file"
                name="files"
                multiple
                onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name).join(", "))}
              />
            </label>
          </div>
                    <div role="status" aria-live="polite" className={status === "idle" ? "hidden" : `md:col-span-2 rounded p-space-sm text-body-md font-semibold ${status === "ok" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-800"}`}>
            {status === "ok" ? t("submitAlert") : status === "fail" ? t("submitError") : null}
          </div>
          <div className="md:col-span-2 flex items-center justify-between pt-space-sm flex-wrap gap-space-sm">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Icon name="security" className="text-[16px] text-steel-600" />
              <span>{t("ndaNote")}</span>
            </div>
            <button
              className="min-h-11 w-full sm:w-auto justify-center bg-steel-600 hover:bg-steel-700 text-white px-space-xl py-3 rounded text-title-md font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={busy}
              aria-busy={busy}
            >
              <span>{t("submitButton")}</span>
              <Icon name="send" className="text-[18px]" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
