import Link from "next/link";

const CERTS = [
  {
    icon: "workspace_premium",
    label: "[ ISO ]",
    title: "Tiêu chuẩn Quản lý Chất lượng Sản xuất",
    desc: "Quy trình kiểm soát chất lượng chuẩn hóa cho từng công đoạn xử lý bề mặt kim loại công nghiệp.",
    status: "ĐÃ KIỂM ĐỊNH ĐẠT CHUẨN",
  },
  {
    icon: "eco",
    label: "[ ISO ]",
    title: "Tiêu chuẩn Quản lý Môi trường Công nghiệp",
    desc: "Tuân thủ các tiêu chuẩn xả thải, tái tuần hoàn nước công nghiệp và an toàn lưu trữ hóa chất mạ.",
    status: "ĐẠT CHUẨN ĐÁNH GIÁ MÔI TRƯỜNG",
  },
  {
    icon: "fact_check",
    label: "[ CERTIFICATION ]",
    title: "Chứng nhận Quy trình & Kiểm soát Bề mặt",
    desc: "Chứng nhận đánh giá độ dày lớp mạ, độ nhám bề mặt và kháng ăn mòn theo tiêu chuẩn quốc tế.",
    status: "THỬ NGHIỆM PHÒNG LAB ĐẠT CHUẨN",
  },
];

export default function QualityCertification() {
  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <h2 className="text-headline-xl text-slate-900 font-bold">
            Chất lượng là nền tảng trong toàn bộ quy trình sản xuất.
          </h2>
          <p className="text-body-md text-slate-600">
            Kiểm chuẩn nghiêm ngặt từ tiếp nhận nguyên liệu thô, pha chế dung
            dịch hóa chất đến thẩm định xuất xưởng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded shadow-sm flex flex-col gap-space-md relative overflow-hidden group hover:border-steel-300 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded bg-steel-100 flex items-center justify-center text-steel-600 font-bold shadow-sm">
                <span className="material-symbols-outlined text-[26px]">{cert.icon}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-headline-md text-steel-600 font-bold">{cert.label}</span>
                <h3 className="text-title-md text-slate-900 font-semibold">{cert.title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{cert.desc}</p>
              </div>
              <div className="pt-space-xs text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{cert.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-space-xs">
          <Link
            href="/nang-luc-san-xuat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-label-technical uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <span>XEM CHỨNG NHẬN</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
