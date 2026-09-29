const MILESTONES = [
  {
    index: "01",
    yearTag: "[NĂM KHỞI ĐẦU]",
    phase: "GIAI ĐOẠN 01 // KHỞI ĐẦU NỀN TẢNG",
    title: "Thành lập cơ sở & xây dựng quy chuẩn",
    desc: "Thành lập cơ sở & xây dựng quy chuẩn mạ kim loại công nghiệp ban đầu, tối ưu hóa công thức hóa chất xử lý ban đầu.",
  },
  {
    index: "02",
    yearTag: "[NĂM PHÁT TRIỂN]",
    phase: "GIAI ĐOẠN 02 // MỞ RỘNG DÂY CHUYỀN",
    title: "Mở rộng hệ thống dây chuyền tự động",
    desc: "Mở rộng hệ thống dây chuyền mạ tự động & nâng cấp phòng kiểm soát chất lượng đạt chuẩn đo lường kỹ thuật cao.",
  },
  {
    index: "03",
    yearTag: "[NĂM CHUẨN HÓA]",
    phase: "GIAI ĐOẠN 03 // CHUẨN HÓA QUỐC TẾ",
    title: "Kiểm nghiệm Micron & Đồng bộ B2B",
    desc: "Đạt quy chuẩn kiểm nghiệm độ dày micron và đồng bộ giải pháp xử lý bề mặt B2B cho các tập đoàn đối tác quốc tế.",
  },
];

export default function CompanyJourney() {
  return (
    <section className="w-full bg-[#f8fafc] py-space-xl border-y border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <div className="flex items-center gap-space-xs text-label-technical tracking-widest text-orange-600 uppercase mb-space-xs font-bold">
              <span className="w-2 h-0.5 bg-orange-600" />
              LỊCH SỬ PHÁT TRIỂN
            </div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              HÀNH TRÌNH PHÁT TRIỂN
            </h2>
          </div>
          <p className="text-body-sm text-slate-500 max-w-md">
            [Thông tin lịch sử và các dấu mốc phát triển của HANIN]
          </p>
        </div>

        {/* Engineering Timeline Layout */}
        <div className="relative pt-6">
          {/* Connecting Technical Ruler Line */}
          <div className="hidden lg:block absolute top-10 left-6 right-6 h-px bg-slate-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent" />
          </div>

          {/* 4 Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {MILESTONES.map((item) => (
              <div
                key={item.index}
                className="relative flex flex-col p-space-md rounded bg-white border border-slate-200 hover:border-orange-600/60 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-label-technical text-orange-600 font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {item.index}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-600 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                    {item.yearTag}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400 mb-2">{item.phase}</div>
                <h3 className="text-title-md text-slate-900 font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}

            {/* Card 04 — Current & Future */}
            <div className="relative flex flex-col p-space-md rounded bg-[#F0F6FB] border border-[#CFE1F3] hover:border-[#2F80C0] shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="w-8 h-8 rounded bg-[#2F80C0] flex items-center justify-center text-label-technical text-white font-bold">
                  04
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#2F80C0] px-2 py-0.5 bg-[#E2EFF9] rounded border border-[#CFE1F3] font-semibold">
                  [HIỆN TẠI &amp; TƯƠNG LAI]
                </span>
              </div>
              <div className="text-xs font-mono text-[#2F80C0] mb-2 font-semibold">
                GIAI ĐOẠN 04 // HỆ SINH THÁI BỀN VỮNG
              </div>
              <h3 className="text-title-md text-[#0B1F3A] font-semibold mb-2 group-hover:text-[#2F80C0] transition-colors">
                Đối tác gia công mạ tin cậy
              </h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">
                Định vị đối tác gia công mạ tin cậy cho các chuỗi sản xuất công nghiệp phụ trợ, mở rộng quy chuẩn
                bền vững và công nghệ sạch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
