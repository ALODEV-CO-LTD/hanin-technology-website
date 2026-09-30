"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { submitInquiry } from "@/lib/submit-inquiry";

const PLATING_OPTION_VALUES = ["niken", "crom", "kem", "anodize", "bac", "other"] as const;
const VOLUME_OPTION_VALUES = ["sample", "pilot", "mass", "oem"] as const;

const inputClass =
  "w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-steel-600 shadow-sm placeholder:text-slate-400";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectName: string;
  platingService: string;
  volume: string;
  description: string;
  ndaAccepted: boolean;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  projectName: "",
  platingService: PLATING_OPTION_VALUES[0],
  volume: VOLUME_OPTION_VALUES[0],
  description: "",
  ndaAccepted: false,
};

export default function RfqForm() {
  const t = useTranslations("LienHe.RfqForm");
  const locale = useLocale();
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [sendFailed, setSendFailed] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    setFiles(list ? Array.from(list) : []);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.fullName ||
      !form.company ||
      !form.email ||
      !form.phone ||
      !form.platingService ||
      !form.ndaAccepted
    ) {
      setSendFailed(false);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const data = new FormData();
    data.set("fullName", form.fullName);
    data.set("company", form.company);
    data.set("email", form.email);
    data.set("phone", form.phone);
    data.set("projectName", form.projectName);
    data.set("platingService", form.platingService);
    data.set("volume", form.volume);
    data.set("message", form.description);
    // Ô ẩn chống spam (bot điền vào thì server bỏ qua yêu cầu).
    data.set("website", (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
    files.forEach((file) => data.append("files", file));

    const result = await submitInquiry(data, { kind: "rfq", locale, source: pathname });
    if (result.ok) {
      setStatus("success");
    } else {
      setSendFailed(true);
      setStatus("error");
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setFiles([]);
    setStatus("idle");
  }

  return (
    <section className="w-full bg-slate-50 py-space-xl scroll-mt-20" id="rfq-form">
      <div className="mx-auto px-margin">
        <div className="bg-white border border-slate-200 rounded shadow-lg overflow-hidden">
          {/* Form header ribbon */}
          <div className="bg-slate-900 text-white px-space-xl py-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <h2 className="text-headline-md font-bold uppercase tracking-tight text-white">
                {t("heading")}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-label-sm bg-slate-800 px-3 py-1.5 rounded">
              <span className="material-symbols-outlined text-steel-500 text-[18px]">lock</span>
              <span>{t("securityBadge")}</span>
            </div>
          </div>

          {/* Status alert */}
          {status !== "idle" && (
            <div className="px-space-xl pt-space-lg">
              {status === "submitting" && (
                <div className="p-space-md bg-slate-100 text-slate-700 rounded flex items-center gap-3">
                  <span className="material-symbols-outlined animate-spin text-[22px]">
                    progress_activity
                  </span>
                  <span className="text-body-md font-semibold">{t("status.submitting")}</span>
                </div>
              )}
              {status === "success" && (
                <div className="p-space-md bg-emerald-50 text-emerald-900 rounded border-l-4 border-emerald-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-600 text-[28px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <p className="text-title-md font-bold text-emerald-950">
                        {t("status.successTitle")}
                      </p>
                      <p className="text-body-md text-emerald-800 mt-1">
                        {t("status.successDesc")}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-label-sm font-semibold shrink-0"
                  >
                    {t("status.successResetCta")}
                  </button>
                </div>
              )}
              {status === "error" && (
                <div className="p-space-md bg-red-50 text-red-800 rounded border-l-4 border-red-600 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600 text-[24px]">error</span>
                    <span className="text-body-md font-semibold">{sendFailed ? t("status.sendError") : t("status.errorMessage")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-red-700 font-bold text-label-sm hover:underline shrink-0"
                  >
                    {t("status.errorRetryCta")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Main form body */}
          <form className="p-space-xl flex flex-col gap-space-xl" onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {/* Step 1: Corporate & contact info */}
            <div>
              <div className="flex items-center gap-3 mb-space-lg bg-slate-50 px-space-md py-space-sm rounded">
                <span className="w-6 h-6 rounded bg-steel-600 text-white font-bold flex items-center justify-center text-label-sm">
                  01
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  {t("step1.heading")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="fullName">
                    {t("step1.fullNameLabel")} <span className="text-steel-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    className={inputClass}
                    placeholder={t("step1.fullNamePlaceholder")}
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="company">
                    {t("step1.companyLabel")} <span className="text-steel-600">*</span>
                  </label>
                  <input
                    id="company"
                    className={inputClass}
                    placeholder={t("step1.companyPlaceholder")}
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="email">
                    {t("step1.emailLabel")} <span className="text-steel-600">*</span>
                  </label>
                  <input
                    id="email"
                    className={inputClass}
                    placeholder={t("step1.emailPlaceholder")}
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="phone">
                    {t("step1.phoneLabel")} <span className="text-steel-600">*</span>
                  </label>
                  <input
                    id="phone"
                    className={inputClass}
                    placeholder={t("step1.phonePlaceholder")}
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Technical specifications */}
            <div>
              <div className="flex items-center gap-3 mb-space-lg bg-slate-50 px-space-md py-space-sm rounded">
                <span className="w-6 h-6 rounded bg-steel-600 text-white font-bold flex items-center justify-center text-label-sm">
                  02
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  {t("step2.heading")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="projectName">
                    {t("step2.projectNameLabel")}
                  </label>
                  <input
                    id="projectName"
                    className={inputClass}
                    placeholder={t("step2.projectNamePlaceholder")}
                    type="text"
                    value={form.projectName}
                    onChange={(e) => updateField("projectName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="platingService">
                    {t("step2.platingServiceLabel")} <span className="text-steel-600">*</span>
                  </label>
                  <select
                    id="platingService"
                    className={inputClass.replace("h-11 px-3.5", "h-11 px-3")}
                    required
                    value={form.platingService}
                    onChange={(e) => updateField("platingService", e.target.value)}
                  >
                    {PLATING_OPTION_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {t(`step2.platingOptions.${value}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="volume">
                    {t("step2.volumeLabel")}
                  </label>
                  <select
                    id="volume"
                    className={inputClass.replace("h-11 px-3.5", "h-11 px-3")}
                    value={form.volume}
                    onChange={(e) => updateField("volume", e.target.value)}
                  >
                    {VOLUME_OPTION_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {t(`step2.volumeOptions.${value}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-label-md text-slate-900 font-semibold flex items-center justify-between"
                  htmlFor="description"
                >
                  <span>{t("step2.descriptionLabel")}</span>
                  <span className="text-label-sm text-slate-500 font-normal">
                    {t("step2.descriptionStandards")}
                  </span>
                </label>
                <textarea
                  id="description"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-steel-600 shadow-sm placeholder:text-slate-400"
                  placeholder={t("step2.descriptionPlaceholder")}
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: CAD file upload */}
            <div>
              <div className="flex items-center gap-3 mb-space-lg bg-slate-50 px-space-md py-space-sm rounded">
                <span className="w-6 h-6 rounded bg-steel-600 text-white font-bold flex items-center justify-center text-label-sm">
                  03
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  {t("step3.heading")}
                </span>
              </div>
              <div className="relative bg-slate-50 border border-slate-200 rounded p-space-xl text-center hover:bg-slate-100 transition-colors cursor-pointer group">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="cad-file-input"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center gap-space-sm pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white text-steel-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                  </div>
                  <div>
                    <p className="text-title-md font-bold text-slate-900">
                      {t("step3.dropzoneTitle")}
                    </p>
                    <p className="text-body-md text-slate-600 mt-1">
                      {t("step3.formatsPrefix")}{" "}
                      <strong className="text-slate-900">
                        .PDF, .STEP, .STP, .DWG, .DXF, .IGS, .ZIP, .RAR
                      </strong>{" "}
                      {t("step3.formatsSuffix")}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      {t("step3.badgeVirusScan")}
                    </span>
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      {t("step3.badgeEncryption")}
                    </span>
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      {t("step3.badgeNda")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-space-sm flex items-center justify-between p-space-sm bg-slate-50 rounded text-slate-500 text-label-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-steel-600 text-[18px]">
                    attach_file
                  </span>
                  <span>
                    {files.length > 0 ? (
                      <>
                        <span className="text-steel-600 font-semibold">
                          {t("step3.filesSelected", { count: files.length })}
                        </span>{" "}
                        {files
                          .map((f) => f.name)
                          .join(", ")
                          .slice(0, 60)}
                        {files.map((f) => f.name).join(", ").length > 60 ? "..." : ""}
                      </>
                    ) : (
                      t("step3.noFileSelected")
                    )}
                  </span>
                </div>
                <span className="text-label-sm text-slate-500 shrink-0">{t("step3.maxSize")}</span>
              </div>
            </div>

            {/* Step 4: Legal & submit */}
            <div className="bg-slate-50 p-space-lg rounded flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="flex items-start gap-3">
                <input
                  className="mt-1 w-4 h-4 rounded text-steel-600 focus:ring-steel-600 cursor-pointer"
                  id="nda-checkbox"
                  required
                  type="checkbox"
                  checked={form.ndaAccepted}
                  onChange={(e) => updateField("ndaAccepted", e.target.checked)}
                />
                <label
                  className="text-body-md text-slate-600 cursor-pointer select-none"
                  htmlFor="nda-checkbox"
                >
                  {t("step4.ndaConsentPrefix")}{" "}
                  {t("step4.ndaConsentMiddle")}{" "}
                  <strong className="text-slate-900">Non-Disclosure Agreement (NDA)</strong>{" "}
                  {t("step4.ndaConsentSuffix")}
                </label>
              </div>
              <button
                className="w-full md:w-auto shrink-0 px-space-xl py-space-md bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 active:translate-y-px disabled:opacity-60"
                id="submit-btn"
                type="submit"
                disabled={status === "submitting"}
              >
                <span>
                  {status === "submitting" ? t("step4.submittingCta") : t("step4.submitCta")}
                </span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
