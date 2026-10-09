"use client";

import Select from "@/components/ui/Select";
import { useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { submitInquiry } from "@/lib/submit-inquiry";
import {
  getDepartmentOptions,
  getLocationOptions,
  getTypeOptions,
  type Job,
  type JobDepartment,
  type JobLocation,
  type JobType,
} from "@/lib/jobs-data";
import Icon from "@/components/ui/Icon";

type SelectedJob = { id: string; title: string; department: string } | null;

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const t = useTranslations("TuyenDung");
  const tb = useTranslations("TuyenDung.JobBoard");
  const locale = useLocale();

  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<"all" | JobDepartment>("all");
  const [type, setType] = useState<"all" | JobType>("all");
  const [location, setLocation] = useState<"all" | JobLocation>("all");
  const [selectedJob, setSelectedJob] = useState<SelectedJob>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [cvName, setCvName] = useState("");

  const JOBS = jobs;
  const DEPARTMENT_OPTIONS = useMemo(() => getDepartmentOptions(t), [t]);
  const TYPE_OPTIONS = useMemo(() => getTypeOptions(t), [t]);
  const LOCATION_OPTIONS = useMemo(() => getLocationOptions(t), [t]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      const haystack = `${job.title} ${job.departmentLabel} ${job.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesDept = department === "all" || job.department === department;
      const matchesType = type === "all" || job.type === type;
      const matchesLoc = location === "all" || job.location === location;
      return matchesQuery && matchesDept && matchesType && matchesLoc;
    });
  }, [JOBS, query, department, type, location]);

  function resetFilters() {
    setQuery("");
    setDepartment("all");
    setType("all");
    setLocation("all");
  }

  function openApplyModal(job: Job) {
    setSubmitted(false);
    setSubmitError("");
    setCvName("");
    setSelectedJob({ id: job.id, title: job.title, department: job.departmentLabel });
  }

  function closeApplyModal() {
    setSelectedJob(null);
  }

  async function handleApplySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedJob || submitting) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("projectName", selectedJob.title);
    setSubmitting(true);
    setSubmitError("");
    const result = await submitInquiry(formData, {
      kind: "application",
      locale,
      source: `job:${selectedJob.id}`,
    });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(tb("submitError"));
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
    }, 2800);
  }

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-[var(--header-h)]" id="open-positions">
      <div className="mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2 max-w-2xl pb-space-sm">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            {tb("title")}
          </h2>
        </div>

        {/* Filter toolbar */}
        <div className="p-space-md bg-white rounded border border-slate-200 shadow-sm flex flex-col gap-space-md">
          <div className="relative w-full">
            <Icon name="search" className="absolute left-space-md top-1/2 -translate-y-1/2 text-slate-400 text-[20px]" />
            <input
              aria-label={tb("searchPlaceholder")}
              className="w-full pl-12 pr-space-md h-11 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder:text-slate-400 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 transition-all"
              placeholder={tb("searchPlaceholder")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label htmlFor="jobs-department" className="text-label-sm text-slate-600 uppercase tracking-wider font-semibold">
                {tb("departmentLabel")}
              </label>
              <Select
                id="jobs-department"
                className="h-11 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md"
                value={department}
                onChange={(v) => setDepartment(v as "all" | JobDepartment)}
                options={DEPARTMENT_OPTIONS}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="jobs-type" className="text-label-sm text-slate-600 uppercase tracking-wider font-semibold">
                {tb("typeLabel")}
              </label>
              <Select
                id="jobs-type"
                className="h-11 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md"
                value={type}
                onChange={(v) => setType(v as "all" | JobType)}
                options={TYPE_OPTIONS}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="jobs-location" className="text-label-sm text-slate-600 uppercase tracking-wider font-semibold">
                {tb("locationLabel")}
              </label>
              <Select
                id="jobs-location"
                className="h-11 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md"
                value={location}
                onChange={(v) => setLocation(v as "all" | JobLocation)}
                options={LOCATION_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-slate-500 text-label-sm">
            <div className="flex items-center gap-2">
              <span>{tb("resultsLabel")}</span>
              <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                {tb("resultsCount", { count: filteredJobs.length })}
              </span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="relative text-slate-600 hover:text-steel-600 focus-visible:outline-2 focus-visible:outline-steel-600 before:absolute before:-inset-x-2 before:-inset-y-3 transition-colors underline uppercase tracking-wider"
            >
              {tb("resetFilters")}
            </button>
          </div>
        </div>

        {/* Job listings */}
        <div className="flex flex-col gap-space-md">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="group rounded bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-steel-300 transition-all duration-300 overflow-hidden"
            >
              <div className="p-space-lg grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px_auto] gap-space-md lg:gap-space-lg lg:items-center">
                {/* Vị trí */}
                <div className="flex flex-col gap-space-sm min-w-0">
                  <span
                    className={`self-start px-2 py-0.5 rounded text-label-sm font-bold uppercase tracking-wider ${job.badgeClassName}`}
                  >
                    {job.departmentLabel}
                  </span>
                  <h3 className="text-headline-sm text-slate-900 uppercase font-bold leading-snug group-hover:text-steel-600 transition-colors">
                    {job.title}
                  </h3>
                  <ul className="flex flex-wrap items-center gap-x-space-lg gap-y-1 text-body-sm text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <Icon name="schedule" className="text-[16px] text-slate-400" />
                      {job.typeLabel}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Icon name="location_on" className="text-[16px] text-slate-400" />
                      {job.locationLabel}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Icon name="calendar_month" className="text-[16px] text-slate-400" />
                      <span>
                        {tb("deadlineLabel")} <strong className="text-slate-900 font-semibold">{job.deadline}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Mức lương */}
                <div className="flex flex-col gap-1 lg:border-l lg:border-slate-200 lg:pl-space-lg">
                  <span className="text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                    {tb("salaryLabel")}
                  </span>
                  <span className="text-title-md text-steel-700 font-bold leading-snug">{job.salary.replace(/^(Lương|薪资|薪資|급여)\s*[:：]\s*/, "")}</span>
                </div>

                {/* Ứng tuyển */}
                <button
                  type="button"
                  onClick={() => openApplyModal(job)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 px-space-md py-space-sm bg-steel-600 hover:bg-steel-700 text-white text-title-md rounded shadow-sm transition-colors uppercase tracking-wider whitespace-nowrap"
                >
                  <span>{tb("applyNow")}</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </button>
              </div>

              {/* Yêu cầu chính */}
              {job.tags.length > 0 && (
                <div className="px-space-lg py-space-md bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-start gap-space-xs sm:gap-space-md">
                  <span className="shrink-0 sm:w-28 pt-0.5 text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                    {tb("requirementsLabel")}
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-space-lg gap-y-1.5 text-body-sm text-slate-700">
                    {job.tags.slice(0, 2).map((tag) => (
                      <li key={tag} className="flex items-start gap-1.5">
                        <Icon name="check_circle" className="text-[16px] text-steel-600 mt-0.5 shrink-0" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}

          {filteredJobs.length === 0 && (
            <div className="p-space-xl rounded bg-white border border-slate-200 text-center text-slate-500 text-body-md">
              {tb("noResults")}
            </div>
          )}
        </div>
      </div>

      {/* Apply modal */}
      {selectedJob && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onClick={closeApplyModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeApplyModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedJob.title}
            className="relative w-full max-w-lg rounded bg-white border border-slate-200 p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 24px 60px -16px rgba(15,23,42,0.5)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-title-md text-slate-900 uppercase font-semibold">{selectedJob.title}</h3>
                <span className="text-body-sm text-slate-500">{selectedJob.department}</span>
              </div>
              <button
                type="button"
                onClick={closeApplyModal}
                aria-label={tb("closeModal")}
                className="relative w-8 h-8 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-steel-600 focus-visible:outline-2 focus-visible:outline-steel-600 before:absolute before:-inset-1.5 transition-colors"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {!submitted ? (
              <form className="flex flex-col gap-space-sm" onSubmit={handleApplySubmit}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="apply-fullName" className="text-label-sm text-slate-600 uppercase font-semibold">{tb("fullNameLabel")}</label>
                  <input
                    className="h-11 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                    placeholder={tb("fullNamePlaceholder")}
                    id="apply-fullName"
                    name="fullName"
                    required
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="apply-phone" className="text-label-sm text-slate-600 uppercase font-semibold">
                      {tb("phoneLabel")}
                    </label>
                    <input
                      className="h-11 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder={tb("phonePlaceholder")}
                      id="apply-phone"
                      name="phone"
                      required
                      type="tel"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="apply-email" className="text-label-sm text-slate-600 uppercase font-semibold">{tb("emailLabel")}</label>
                    <input
                      className="h-11 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder={tb("emailPlaceholder")}
                      id="apply-email"
                      name="email"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="apply-experience" className="text-label-sm text-slate-600 uppercase font-semibold">
                    {tb("experienceLabel")}
                  </label>
                  <Select
                    id="apply-experience"
                    name="experience"
                    className="h-11 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md"
                    options={["fresh", "one_two", "three_five", "above_five"].map((k) => ({ value: tb(`experienceOptions.${k}`), label: tb(`experienceOptions.${k}`) }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-slate-600 uppercase font-semibold">
                    {tb("cvLabel")}
                  </span>
                  <label className="p-space-md rounded border border-dashed focus-within:ring-2 focus-within:ring-steel-600/40 border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Icon name="upload_file" className="text-steel-600 text-[28px]" />
                    <span className="text-body-md text-slate-900 break-all text-center">{cvName || tb("cvDropText")}</span>
                    <span className="text-label-sm text-slate-500">{tb("cvSizeNote")}</span>
                    <input className="sr-only" name="files" required type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip" onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")} />
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="apply-message" className="text-label-sm text-slate-600 uppercase font-semibold">
                    {tb("messageLabel")}
                  </label>
                  <textarea
                    id="apply-message"
                    className="p-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                    name="message"
                    placeholder={tb("messagePlaceholder")}
                    rows={3}
                  />
                </div>
                {submitError && (
                  <div role="alert" className="p-space-sm rounded bg-red-50 text-red-700 text-body-sm">
                    {submitError}
                  </div>
                )}
                <div className="pt-1 flex items-center justify-end gap-space-sm">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="min-h-11 px-space-md py-space-sm rounded bg-slate-100 text-slate-600 hover:text-slate-900 text-title-md uppercase transition-colors"
                  >
                    {tb("cancelButton")}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="min-h-11 px-space-md py-space-sm rounded bg-steel-600 text-white hover:bg-steel-700 text-title-md uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? tb("submitting") : tb("submitButton")}
                  </button>
                </div>
              </form>
            ) : (
              <div role="status" className="p-space-md rounded bg-steel-50 text-steel-700 text-body-md text-center">
                {tb("submitSuccess")}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
