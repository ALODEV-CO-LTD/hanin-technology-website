"use client";

import { useMemo, useState, type FormEvent } from "react";
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
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-20" id="open-positions">
      <div className="mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2 max-w-2xl pb-space-sm">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            {tb("title")}
          </h2>
          <p className="text-body-lg text-slate-600">
            {tb("description")}
          </p>
        </div>

        {/* Filter toolbar */}
        <div className="p-space-md bg-white rounded border border-slate-200 shadow-sm flex flex-col gap-space-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="w-full pl-12 pr-space-md h-11 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder:text-slate-400 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 transition-all"
              placeholder={tb("searchPlaceholder")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                {tb("departmentLabel")}
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none h-10 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 cursor-pointer"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as "all" | JobDepartment)}
                >
                  {DEPARTMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                {tb("typeLabel")}
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none h-10 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 cursor-pointer"
                  value={type}
                  onChange={(e) => setType(e.target.value as "all" | JobType)}
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                {tb("locationLabel")}
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none h-10 px-space-sm bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 cursor-pointer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as "all" | JobLocation)}
                >
                  {LOCATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
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
              className="hover:text-steel-600 transition-colors underline uppercase tracking-wider"
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
              className="group p-space-lg rounded bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-steel-300 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"
            >
              <div className="flex flex-col gap-space-sm max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-label-sm font-bold uppercase tracking-wider ${job.badgeClassName}`}
                  >
                    {job.departmentLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-label-sm font-semibold">
                    {job.typeLabel}
                  </span>
                  <span className="flex items-center gap-1 text-label-sm text-slate-500">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {job.locationLabel}
                  </span>
                </div>

                <h3 className="text-headline-sm text-slate-900 uppercase font-semibold group-hover:text-steel-600 transition-colors">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2 py-1 rounded bg-steel-50 text-steel-700 text-label-technical font-bold">
                    {job.salary}
                  </span>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-label-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-space-sm shrink-0 pt-space-sm lg:pt-0">
                <span className="text-label-sm text-slate-500">
                  {tb("deadlineLabel")} <strong className="text-slate-900 font-semibold">{job.deadline}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => openApplyModal(job)}
                  className="inline-flex items-center gap-2 px-space-md py-space-sm bg-steel-600 hover:bg-steel-700 text-white text-title-md rounded shadow-sm transition-colors uppercase tracking-wider"
                >
                  <span>{tb("applyNow")}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
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
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          onClick={closeApplyModal}
        >
          <div
            className="relative w-full max-w-lg rounded bg-white shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto"
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
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-steel-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {!submitted ? (
              <form className="flex flex-col gap-space-sm" onSubmit={handleApplySubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">{tb("fullNameLabel")}</label>
                  <input
                    className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                    placeholder={tb("fullNamePlaceholder")}
                    name="fullName"
                    required
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="text-label-sm text-slate-500 uppercase font-semibold">
                      {tb("phoneLabel")}
                    </label>
                    <input
                      className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder={tb("phonePlaceholder")}
                      name="phone"
                      required
                      type="tel"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-label-sm text-slate-500 uppercase font-semibold">{tb("emailLabel")}</label>
                    <input
                      className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder={tb("emailPlaceholder")}
                      name="email"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    {tb("experienceLabel")}
                  </label>
                  <select name="experience" className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40">
                    <option value={tb("experienceOptions.fresh")}>{tb("experienceOptions.fresh")}</option>
                    <option value={tb("experienceOptions.one_two")}>{tb("experienceOptions.one_two")}</option>
                    <option value={tb("experienceOptions.three_five")}>{tb("experienceOptions.three_five")}</option>
                    <option value={tb("experienceOptions.above_five")}>{tb("experienceOptions.above_five")}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    {tb("cvLabel")}
                  </label>
                  <label className="p-space-md rounded border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-steel-600 text-[28px]">upload_file</span>
                    <span className="text-body-md text-slate-900">{tb("cvDropText")}</span>
                    <span className="text-label-sm text-slate-500">{tb("cvSizeNote")}</span>
                    <input className="hidden" name="files" required type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip" />
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    {tb("messageLabel")}
                  </label>
                  <textarea
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
                    className="px-space-md py-space-sm rounded bg-slate-100 text-slate-500 hover:text-slate-900 text-title-md uppercase transition-colors"
                  >
                    {tb("cancelButton")}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-space-md py-space-sm rounded bg-steel-600 text-white hover:bg-steel-700 text-title-md uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? tb("submitting") : tb("submitButton")}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-space-md rounded bg-steel-50 text-steel-700 text-body-md text-center">
                {tb("submitSuccess")}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
