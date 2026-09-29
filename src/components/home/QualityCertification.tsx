const CERTS = [
  {
    icon: "workspace_premium",
    label: "[ ISO ]",
    title: "Tiêu chuẩn Quản lý Chất lượng Sản xuất",
    desc: "Quy trình kiểm soát chất lượng chuẩn hóa cho từng công đoạn xử lý bề mặt kim loại công nghiệp.",
    status: "VERIFIED COMPLIANCE",
  },
  {
    icon: "eco",
    label: "[ ISO ]",
    title: "Tiêu chuẩn Quản lý Môi trường Công nghiệp",
    desc: "Tuân thủ các tiêu chuẩn xả thải, tái tuần hoàn nước công nghiệp và an toàn lưu trữ hóa chất mạ.",
    status: "ENVIRONMENTAL AUDIT READY",
  },
  {
    icon: "fact_check",
    label: "[ CERTIFICATION ]",
    title: "Chứng nhận Quy trình & Kiểm soát Bề mặt",
    desc: "Chứng nhận đánh giá độ dày lớp mạ, độ nhám bề mặt và kháng ăn mòn theo tiêu chuẩn quốc tế.",
    status: "LAB TESTED",
  },
];

export default function QualityCertification() {
  return (
    <section className="w-full py-space-xl bg-surface-bright/20 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
            QUALITY &amp; CERTIFICATION
          </span>
          <h2 className="text-headline-xl text-on-surface font-bold">
            Chất lượng là nền tảng trong toàn bộ quy trình sản xuất.
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Kiểm chuẩn nghiêm ngặt từ tiếp nhận nguyên liệu thô, pha chế dung
            dịch hóa chất đến thẩm định xuất xưởng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="p-space-lg bg-surface-container rounded shadow-md flex flex-col gap-space-md relative overflow-hidden group hover:bg-surface-container-high transition-colors"
            >
              <div className="w-12 h-12 rounded bg-surface-container-lowest flex items-center justify-center text-primary font-bold shadow-inner">
                <span className="material-symbols-outlined text-[26px]">{cert.icon}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-headline-md text-primary font-bold">{cert.label}</span>
                <h3 className="text-title-md text-on-surface font-semibold">{cert.title}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{cert.desc}</p>
              </div>
              <div className="pt-space-xs text-[11px] text-secondary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{cert.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-space-xs">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-technical uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <span>XEM CHỨNG NHẬN</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
