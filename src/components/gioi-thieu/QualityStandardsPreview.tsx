const CERTIFICATES = [
  {
    tag: "[ CHỨNG NHẬN ISO ]",
    icon: "workspace_premium",
    title: "Hệ thống Quản lý Chất lượng Sản xuất",
    desc: "Tiêu chuẩn ISO 9001:2015: quản lý kiểm soát quy trình gia công cơ khí và xi mạ chính xác.",
    standard: "TIÊU CHUẨN: ISO 9001:2015",
    status: "ĐÃ XÁC NHẬN",
  },
  {
    tag: "[ CHỨNG NHẬN ISO ]",
    icon: "eco",
    title: "Hệ thống Quản lý Môi trường Công nghiệp",
    desc: "Tiêu chuẩn ISO 14001:2015: kiểm soát nước thải tuần hoàn và khí thải hóa chất công nghiệp.",
    standard: "TIÊU CHUẨN: ISO 14001:2015",
    status: "ĐÃ XÁC NHẬN",
  },
  {
    tag: "[ TIÊU CHUẨN QUỐC TẾ ]",
    icon: "fact_check",
    title: "Chứng nhận Quy trình & Kiểm soát Bề mặt",
    desc: "[Compliance Placeholder] Đáp ứng chỉ thị RoHS và thử nghiệm muối ASTM.",
    standard: "TIÊU CHUẨN: TUÂN THỦ RoHS",
    status: "ĐẠT CHUẨN",
  },
];

export default function QualityStandardsPreview() {
  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <div className="flex items-center gap-space-xs text-label-technical tracking-widest text-steel-600 uppercase mb-space-xs font-bold">
              <span className="w-2 h-0.5 bg-steel-600" />
              CHỨNG NHẬN &amp; CAM KẾT CHẤT LƯỢNG
            </div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              CHẤT LƯỢNG &amp; TIÊU CHUẨN
            </h2>
          </div>
          <p className="text-body-sm text-slate-500 max-w-md">
            [Thông tin chính thức về hệ thống quản lý chất lượng và chứng nhận của HANIN]
          </p>
        </div>

        {/* 3 Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.title}
              className="p-space-lg rounded bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 shadow-sm transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="text-[11px] text-steel-600 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-steel-100/70 border border-steel-200">
                    {cert.tag}
                  </span>
                  <span className="material-symbols-outlined text-slate-500">{cert.icon}</span>
                </div>
                <h3 className="text-title-md text-slate-900 font-semibold mb-2">{cert.title}</h3>
                <p className="text-body-sm text-slate-600">{cert.desc}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{cert.standard}</span>
                <span className="text-sky-700 font-semibold">{cert.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-space-sm text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-widest font-bold"
            href="#"
          >
            XEM CHỨNG NHẬN
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
