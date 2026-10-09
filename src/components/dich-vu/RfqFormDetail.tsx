"use client";

import Select from "@/components/ui/Select";
import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { submitInquiry } from "@/lib/submit-inquiry";
import Icon from "@/components/ui/Icon";

export default function RfqFormDetail({ hotline, ns = "DichVu.RfqFormDetail" }: { hotline: string; ns?: string }) {
  const t = useTranslations(ns);
  const locale = useLocale();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const [fileNames, setFileNames] = useState("");

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
    setStatus("idle");
    const result = await submitInquiry(data, { kind: "rfq", locale, source: pathname });
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
    <section className="w-full mb-space-xl scroll-mt-[var(--header-h)]" id="rfq-form">
      <div className="bg-white border border-slate-200 p-space-md sm:p-space-lg rounded shadow-sm relative overflow-hidden">

        <div className="flex flex-col md:flex-row md:items-start justify-between pb-space-md mb-space-md bg-slate-50 border border-slate-200 p-space-md rounded">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mt-1 font-bold">
              {t("heading")}
            </h2>
            <p className="text-body-md text-slate-600 mt-1">{t("subtitle")}</p>
          </div>
          <div className="mt-space-sm md:mt-0 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded">
            {t("hotlineLabel")} <strong className="text-steel-600 font-bold">{hotline}</strong>
          </div>
        </div>

        <form
          className="space-y-space-md"
          onSubmit={handleSubmit}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-company">
                {t("companyLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-company"
                name="company"
                placeholder={t("companyPlaceholder")}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-fullName">
                {t("contactLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-fullName"
                name="fullName"
                placeholder={t("contactPlaceholder")}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-email">
                {t("emailLabel")} <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-email"
                name="email"
                placeholder="eng-procurement@company.com"
                required
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-substrate">
                {t("substrateLabel")} <span className="text-steel-600">*</span>
              </label>
              <Select
                className="h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-substrate"
                name="substrate"
                defaultValue="S45C"
                options={[
                  { value: "S45C", label: t("substrateOptions.carbonSteel") },
                  { value: "SCM440", label: t("substrateOptions.alloySteel") },
                  { value: "SUS", label: t("substrateOptions.stainless") },
                  { value: "ALUMINUM", label: t("substrateOptions.aluminum") },
                  { value: "COPPER", label: t("substrateOptions.copper") },
                  { value: "CAST_IRON", label: t("substrateOptions.castIron") },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-phosphorus">{t("phosLabel")}</label>
              <Select
                className="h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-phosphorus"
                name="phosphorus"
                defaultValue="HIGH_PHOS"
                options={[
                  { value: "HIGH_PHOS", label: t("phosOptions.high") },
                  { value: "MED_PHOS", label: t("phosOptions.medium") },
                  { value: "LOW_PHOS", label: t("phosOptions.low") },
                  { value: "CONSULT", label: t("phosOptions.consult") },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-thickness">{t("thicknessLabel")}</label>
              <input
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-thickness"
                name="thickness"
                placeholder={t("thicknessPlaceholder")}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-volume">{t("volumeLabel")}</label>
              <input
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-volume"
                name="volume"
                placeholder={t("volumePlaceholder")}
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase" htmlFor="rfq-d-message">{t("notesLabel")}</label>
              <textarea
                className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-600 focus:ring-2 focus:ring-steel-600/30 transition-colors"
                id="rfq-d-message"
                name="message"
                placeholder={t("notesPlaceholder")}
                rows={3}
              />
            </div>
            <div className="md:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200 p-space-sm rounded">
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-slate-900 font-semibold uppercase">{t("attachTitle")}</span>
                <p className="text-label-sm text-slate-500">{fileNames || t("attachDesc")}</p>
              </div>
              <label className="cursor-pointer focus-within:ring-2 focus-within:ring-steel-600/40 min-h-11 mt-2 w-full py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-center text-label-technical uppercase rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <Icon name="cloud_upload" className="text-steel-600 text-[18px]" />
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
          </div>

                    <div role="status" aria-live="polite" className={status === "idle" ? "hidden" : `rounded p-space-sm text-body-sm font-semibold ${status === "ok" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-800"}`}>
            {status === "ok" ? t("submitAlert") : status === "fail" ? t("submitError") : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex items-center gap-2 text-slate-500 text-label-sm">
              <Icon name="lock" className="text-steel-600 text-[16px]" />
              <span>{t("ndaNote")}</span>
            </div>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-space-xs bg-steel-600 hover:bg-steel-700 text-white px-space-lg py-3 rounded text-label-technical uppercase tracking-wider shadow-sm transition-all disabled:opacity-60"
              type="submit"
              disabled={busy}
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
