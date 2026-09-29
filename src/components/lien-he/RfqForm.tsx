"use client";

import { useState, type FormEvent } from "react";

const PLATING_OPTIONS = [
  { value: "niken", label: "Mạ Niken hóa học không điện (Electroless Nickel - ENP)" },
  { value: "crom", label: "Mạ Crom cứng kỹ thuật (Hard Chrome Plating - 65-70 HRC)" },
  { value: "kem", label: "Mạ Kẽm & Thụ động hóa Cr3+ (Zinc / Zinc-Nickel)" },
  { value: "anodize", label: "Anodizing nhôm kỹ thuật / Hard Anodize Type III" },
  { value: "bac", label: "Mạ Thiếc / Bạc dẫn điện cho thiết bị điện - Busbar" },
  { value: "other", label: "Gia công tổ hợp Mạ & Tiện Phay CNC theo yêu cầu" },
];

const VOLUME_OPTIONS = [
  { value: "sample", label: "Gia công mẫu thử R&D (1 - 50 chi tiết)" },
  { value: "pilot", label: "Lô sản xuất thử nghiệm (500 - 2.000 chi tiết)" },
  { value: "mass", label: "Sản xuất hàng loạt định kỳ (>10.000 pcs/tháng)" },
  { value: "oem", label: "Hợp đồng đối tác chiến lược OEM / Dài hạn" },
];

const inputClass =
  "w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600 shadow-sm placeholder:text-slate-400";

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
  platingService: PLATING_OPTIONS[0].value,
  volume: VOLUME_OPTIONS[0].value,
  description: "",
  ndaAccepted: false,
};

export default function RfqForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    setFiles(list ? Array.from(list) : []);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.fullName ||
      !form.company ||
      !form.email ||
      !form.phone ||
      !form.platingService ||
      !form.ndaAccepted
    ) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    console.log("RFQ form submit (demo):", { ...form, files: files.map((f) => f.name) });

    // Demo only — chưa nối backend thật (Phase 1). Phần xử lý gửi email/CRM sẽ triển khai riêng.
    setTimeout(() => {
      setStatus("success");
    }, 900);
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setFiles([]);
    setStatus("idle");
  }

  return (
    <section className="w-full bg-white py-space-xl" id="rfq-form">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="bg-white border border-slate-200 rounded shadow-lg overflow-hidden">
          {/* Form header ribbon */}
          <div className="bg-slate-900 text-white px-space-xl py-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-orange-600 text-white text-label-sm rounded font-semibold">
                  FORM CHUYÊN DỤNG
                </span>
                <span className="text-slate-300 text-label-sm uppercase">
                  PORTAL TIẾP NHẬN YÊU CẦU BÁO GIÁ KỸ THUẬT (RFQ)
                </span>
              </div>
              <h2 className="text-headline-md font-bold uppercase tracking-tight text-white">
                GỬI YÊU CẦU BÁO GIÁ &amp; TÀI LIỆU KỸ THUẬT DỰ ÁN
              </h2>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-label-sm bg-slate-800 px-3 py-1.5 rounded">
              <span className="material-symbols-outlined text-orange-500 text-[18px]">lock</span>
              <span>Chuẩn bảo mật SSL 256-bit // NDA Protected</span>
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
                  <span className="text-body-md font-semibold">
                    Đang gửi yêu cầu báo giá (demo — chưa nối backend thật)...
                  </span>
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
                        ĐÃ GỬI YÊU CẦU (DEMO — CHƯA NỐI BACKEND THẬT)
                      </p>
                      <p className="text-body-md text-emerald-800 mt-1">
                        Đây là bản mô phỏng giao diện thuộc Phase 1. Phần xử lý gửi email/CRM thật
                        sẽ được HANIN triển khai ở giai đoạn tiếp theo của hợp đồng.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-label-sm font-semibold shrink-0"
                  >
                    Tạo yêu cầu khác
                  </button>
                </div>
              )}
              {status === "error" && (
                <div className="p-space-md bg-red-50 text-red-800 rounded border-l-4 border-red-600 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600 text-[24px]">error</span>
                    <span className="text-body-md font-semibold">
                      Vui lòng điền đầy đủ các trường bắt buộc (*) và xác nhận cam kết bảo mật NDA
                      trước khi gửi.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-red-700 font-bold text-label-sm hover:underline shrink-0"
                  >
                    Thử lại
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Main form body */}
          <form className="p-space-xl flex flex-col gap-space-xl" onSubmit={handleSubmit}>
            {/* Step 1: Corporate & contact info */}
            <div>
              <div className="flex items-center gap-3 mb-space-lg bg-slate-50 px-space-md py-space-sm rounded">
                <span className="w-6 h-6 rounded bg-orange-600 text-white font-bold flex items-center justify-center text-label-sm">
                  01
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  THÔNG TIN KHÁCH HÀNG &amp; DOANH NGHIỆP LIÊN HỆ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="fullName">
                    Họ và tên người liên hệ <span className="text-orange-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    className={inputClass}
                    placeholder="Nguyễn Văn A"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="company">
                    Tên công ty / Doanh nghiệp <span className="text-orange-600">*</span>
                  </label>
                  <input
                    id="company"
                    className={inputClass}
                    placeholder="Công ty CP Cơ khí Chế tạo..."
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="email">
                    Email công vụ / Nhận báo giá <span className="text-orange-600">*</span>
                  </label>
                  <input
                    id="email"
                    className={inputClass}
                    placeholder="name@company.com"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="phone">
                    Số điện thoại di động / Zalo <span className="text-orange-600">*</span>
                  </label>
                  <input
                    id="phone"
                    className={inputClass}
                    placeholder="0912 345 678"
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
                <span className="w-6 h-6 rounded bg-orange-600 text-white font-bold flex items-center justify-center text-label-sm">
                  02
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  THÔNG TIN KỸ THUẬT &amp; CÔNG NGHỆ GIA CÔNG XI MẠ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="projectName">
                    Tên sản phẩm / Dự án gia công
                  </label>
                  <input
                    id="projectName"
                    className={inputClass}
                    placeholder="Ví dụ: Trục piston thủy lực, Busbar đồng, Vỏ khuôn nhôm"
                    type="text"
                    value={form.projectName}
                    onChange={(e) => updateField("projectName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="platingService">
                    Dịch vụ xi mạ quan tâm <span className="text-orange-600">*</span>
                  </label>
                  <select
                    id="platingService"
                    className={inputClass.replace("h-11 px-3.5", "h-11 px-3")}
                    required
                    value={form.platingService}
                    onChange={(e) => updateField("platingService", e.target.value)}
                  >
                    {PLATING_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-slate-900 font-semibold" htmlFor="volume">
                    Sản lượng dự kiến &amp; Tiến độ giao hàng
                  </label>
                  <select
                    id="volume"
                    className={inputClass.replace("h-11 px-3.5", "h-11 px-3")}
                    value={form.volume}
                    onChange={(e) => updateField("volume", e.target.value)}
                  >
                    {VOLUME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
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
                  <span>Mô tả chi tiết dung sai, chiều dày lớp mạ &amp; tiêu chuẩn thử nghiệm</span>
                  <span className="text-label-sm text-slate-500 font-normal">
                    Hỗ trợ tiêu chuẩn: ISO, ASTM, DIN, JIS
                  </span>
                </label>
                <textarea
                  id="description"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600 shadow-sm placeholder:text-slate-400"
                  placeholder="Ví dụ: Vật liệu nền Thép S45C; Lớp mạ Crom cứng dày 30-40 µm; Độ cứng yêu cầu ≥ 850 HV; Yêu cầu thử phun sương muối ASTM B117 đạt 96 giờ không rỉ sét; Địa điểm giao hàng: Bắc Ninh..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: CAD file upload */}
            <div>
              <div className="flex items-center gap-3 mb-space-lg bg-slate-50 px-space-md py-space-sm rounded">
                <span className="w-6 h-6 rounded bg-orange-600 text-white font-bold flex items-center justify-center text-label-sm">
                  03
                </span>
                <span className="text-title-md font-bold text-slate-900 uppercase tracking-wider">
                  ĐÍNH KÈM BẢN VẼ KỸ THUẬT (2D / 3D CAD FILE)
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
                  <div className="w-14 h-14 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                  </div>
                  <div>
                    <p className="text-title-md font-bold text-slate-900">
                      KÉO THẢ TẬP TIN BẢN VẼ HOẶC BẤM ĐỂ CHỌN FILE
                    </p>
                    <p className="text-body-md text-slate-600 mt-1">
                      Định dạng hỗ trợ:{" "}
                      <strong className="text-slate-900">
                        .PDF, .STEP, .STP, .DWG, .DXF, .IGS, .ZIP, .RAR
                      </strong>{" "}
                      (Tối đa 50MB/file)
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      Auto Virus Scan
                    </span>
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      Secure Server Encryption
                    </span>
                    <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-label-sm">
                      Bảo mật NDA tự động
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-space-sm flex items-center justify-between p-space-sm bg-slate-50 rounded text-slate-500 text-label-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-600 text-[18px]">
                    attach_file
                  </span>
                  <span>
                    {files.length > 0 ? (
                      <>
                        <span className="text-orange-600 font-semibold">
                          Đã chọn {files.length} tập tin:
                        </span>{" "}
                        {files
                          .map((f) => f.name)
                          .join(", ")
                          .slice(0, 60)}
                        {files.map((f) => f.name).join(", ").length > 60 ? "..." : ""}
                      </>
                    ) : (
                      "Chưa có tập tin nào được chọn. Quý khách có thể gửi kèm bản vẽ trực tiếp qua email: sales@hanintech.vn"
                    )}
                  </span>
                </div>
                <span className="text-label-sm text-slate-500 shrink-0">MAX: 50MB</span>
              </div>
            </div>

            {/* Step 4: Legal & submit */}
            <div className="bg-slate-50 p-space-lg rounded flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="flex items-start gap-3">
                <input
                  className="mt-1 w-4 h-4 rounded text-orange-600 focus:ring-orange-600 cursor-pointer"
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
                  Tôi đồng ý cho <strong className="text-slate-900">HANIN TECHNOLOGY VIỆT NAM</strong>{" "}
                  xử lý thông tin kỹ thuật này để khảo sát tính khả thi và báo giá dự án. HANIN cam
                  kết bảo vệ dữ liệu theo thỏa thuận bảo mật{" "}
                  <strong className="text-slate-900">Non-Disclosure Agreement (NDA)</strong> nghiêm
                  ngặt.
                </label>
              </div>
              <button
                className="w-full md:w-auto shrink-0 px-space-xl py-space-md bg-orange-600 hover:bg-orange-700 text-white text-title-md uppercase tracking-wider rounded font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 active:translate-y-px disabled:opacity-60"
                id="submit-btn"
                type="submit"
                disabled={status === "submitting"}
              >
                <span>
                  {status === "submitting" ? "ĐANG GỬI..." : "GỬI YÊU CẦU BÁO GIÁ KỸ THUẬT"}
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
