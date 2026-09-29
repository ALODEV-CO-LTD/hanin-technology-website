"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  DEPARTMENT_OPTIONS,
  JOBS,
  LOCATION_OPTIONS,
  TYPE_OPTIONS,
  type JobDepartment,
  type JobLocation,
  type JobType,
} from "@/lib/jobs-data";

type SelectedJob = { title: string; department: string } | null;

export default function JobBoard() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<"all" | JobDepartment>("all");
  const [type, setType] = useState<"all" | JobType>("all");
  const [location, setLocation] = useState<"all" | JobLocation>("all");
  const [selectedJob, setSelectedJob] = useState<SelectedJob>(null);
  const [submitted, setSubmitted] = useState(false);

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
  }, [query, department, type, location]);

  function resetFilters() {
    setQuery("");
    setDepartment("all");
    setType("all");
    setLocation("all");
  }

  function openApplyModal(title: string, dept: string) {
    setSubmitted(false);
    setSelectedJob({ title, department: dept });
  }

  function closeApplyModal() {
    setSelectedJob(null);
  }

  function handleApplySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
    }, 2800);
  }

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-20" id="open-positions">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-sm">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2 text-steel-600 text-label-technical uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px]">work_outline</span>
              <span>OPPORTUNITIES // VỊ TRÍ TUYỂN DỤNG</span>
            </div>
            <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
              VỊ TRÍ ĐANG TUYỂN DỤNG
            </h2>
            <p className="text-body-lg text-slate-600">
              Khám phá các vị trí tuyển dụng phù hợp với chuyên môn của bạn tại văn phòng điều hành và nhà máy sản
              xuất HANIN.
            </p>
          </div>
          <div className="flex items-center gap-2 px-space-md py-space-sm bg-white rounded shadow-sm text-slate-500 text-label-sm font-semibold tracking-wider uppercase self-start md:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>CMS DYNAMIC JOB BOARD // {JOBS.length.toString().padStart(2, "0")} VỊ TRÍ ĐANG MỞ</span>
          </div>
        </div>

        {/* Filter toolbar */}
        <div className="p-space-md bg-white rounded border border-slate-200 shadow-sm flex flex-col gap-space-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="w-full pl-12 pr-space-md h-11 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder:text-slate-400 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40 transition-all"
              placeholder="Tìm kiếm vị trí công việc, chức danh kỹ thuật, từ khóa (ví dụ: PLC, R&D, QA, Cơ khí)..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-500 uppercase tracking-wider font-semibold">
                Phòng ban
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
                Hình thức làm việc
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
                Địa điểm làm việc
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
              <span>Hiển thị kết quả:</span>
              <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                {filteredJobs.length} vị trí khả dụng
              </span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="hover:text-steel-600 transition-colors underline uppercase tracking-wider"
            >
              Đặt lại bộ lọc
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
                  Hạn nộp: <strong className="text-slate-900 font-semibold">{job.deadline}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => openApplyModal(job.title, job.departmentLabel)}
                  className="inline-flex items-center gap-2 px-space-md py-space-sm bg-steel-600 hover:bg-steel-700 text-white text-title-md rounded shadow-sm transition-colors uppercase tracking-wider"
                >
                  <span>ỨNG TUYỂN NGAY</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}

          {filteredJobs.length === 0 && (
            <div className="p-space-xl rounded bg-white border border-slate-200 text-center text-slate-500 text-body-md">
              Không tìm thấy vị trí phù hợp với bộ lọc hiện tại. Vui lòng thử từ khóa khác.
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
                <span className="text-label-sm text-steel-600 uppercase tracking-widest font-bold">
                  HỒ SƠ ỨNG TUYỂN
                </span>
                <h3 className="text-title-md text-slate-900 uppercase font-semibold">{selectedJob.title}</h3>
                <span className="text-body-sm text-slate-500">{selectedJob.department}</span>
              </div>
              <button
                type="button"
                onClick={closeApplyModal}
                aria-label="Đóng"
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-steel-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {!submitted ? (
              <form className="flex flex-col gap-space-sm" onSubmit={handleApplySubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">Họ và tên *</label>
                  <input
                    className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                    placeholder="Ví dụ: Nguyễn Văn An"
                    required
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="text-label-sm text-slate-500 uppercase font-semibold">
                      Số điện thoại *
                    </label>
                    <input
                      className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder="09xx xxx xxx"
                      required
                      type="tel"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-label-sm text-slate-500 uppercase font-semibold">Email *</label>
                    <input
                      className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                      placeholder="ten@email.com"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    Số năm kinh nghiệm
                  </label>
                  <select className="h-10 px-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40">
                    <option>Mới tốt nghiệp / Dưới 1 năm</option>
                    <option>1 - 2 năm kinh nghiệm</option>
                    <option>3 - 5 năm kinh nghiệm</option>
                    <option>Trên 5 năm kinh nghiệm</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    Đính kèm CV (PDF, DOCX) *
                  </label>
                  <label className="p-space-md rounded border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-steel-600 text-[28px]">upload_file</span>
                    <span className="text-body-md text-slate-900">Kéo thả tệp hoặc bấm để chọn CV</span>
                    <span className="text-label-sm text-slate-500">Tối đa 15MB (.pdf, .doc, .docx)</span>
                    <input className="hidden" required type="file" />
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label-sm text-slate-500 uppercase font-semibold">
                    Lời nhắn / Giới thiệu bản thân
                  </label>
                  <textarea
                    className="p-space-sm rounded border border-slate-200 bg-slate-50 text-slate-900 text-body-md focus:outline-none focus:ring-2 focus:ring-steel-600/40"
                    placeholder="Tóm tắt ngắn gọn thế mạnh kỹ thuật hoặc mong muốn nghề nghiệp của bạn..."
                    rows={3}
                  />
                </div>
                <div className="pt-1 flex items-center justify-end gap-space-sm">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="px-space-md py-space-sm rounded bg-slate-100 text-slate-500 hover:text-slate-900 text-title-md uppercase transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-space-md py-space-sm rounded bg-steel-600 text-white hover:bg-steel-700 text-title-md uppercase tracking-wider transition-colors"
                  >
                    Gửi đơn ứng tuyển
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-space-md rounded bg-steel-50 text-steel-700 text-body-md text-center">
                ✓ Hồ sơ ứng tuyển đã được tiếp nhận thành công. Bộ phận Nhân sự HANIN sẽ liên hệ với bạn trong
                vòng 48 giờ làm việc!
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
