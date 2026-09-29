const STRENGTHS = [
  {
    index: "01",
    icon: "precision_manufacturing",
    title: "01 NĂNG LỰC SẢN XUẤT",
    desc: "[Thông tin năng lực sản xuất: hệ thống bể mạ quy mô lớn, đáp ứng đơn hàng công nghiệp liên tục với khối lượng linh kiện lớn mỗi ngày.]",
    metricLabel: "CHỈ SỐ: CÔNG SUẤT VẬN HÀNH LIÊN TỤC",
    metricValue: "CUNG ỨNG ỔN ĐỊNH",
    metricClass: "text-sky-700",
  },
  {
    index: "02",
    icon: "memory",
    title: "02 CÔNG NGHỆ & THIẾT BỊ",
    desc: "[Thông tin công nghệ: dây chuyền bán tự động và tự động điều khiển PLC, kiểm soát dòng điện và thời gian mạ theo tham số kỹ thuật.]",
    metricLabel: "HỆ THỐNG: ĐIỀU KHIỂN TỰ ĐỘNG PLC",
    metricValue: "CHỈNH LƯU DÒNG ±1%",
    metricClass: "text-sky-700",
  },
  {
    index: "03",
    icon: "verified",
    title: "03 KIỂM SOÁT CHẤT LƯỢNG",
    desc: "[Thông tin kiểm soát chất lượng: đo độ dày lớp mạ chuẩn micron bằng máy huỳnh quang tia X (XRF), thử nghiệm phun sương muối theo ASTM B117.]",
    metricLabel: "ĐỘ CHÍNH XÁC: ±0.1 µm MÁY XRF",
    metricValue: "PHUN MUỐI ASTM B117",
    metricClass: "text-sky-700",
  },
  {
    index: "04",
    icon: "support_agent",
    title: "04 KỸ THUẬT & HỖ TRỢ",
    desc: "[Thông tin hỗ trợ kỹ thuật: tư vấn xi mạ theo bản vẽ, tối ưu quy trình theo yêu cầu kỹ thuật của từng cấu kiện cơ khí.]",
    metricLabel: "TƯ VẤN KỸ THUẬT CHUYÊN SÂU",
    metricValue: "HỖ TRỢ DOANH NGHIỆP 24/7",
    metricClass: "text-steel-600 font-bold",
  },
];

export default function CoreStrengths() {
  return (
    <section className="w-full bg-white py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col mb-space-xl">
          <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
            THẾ MẠNH CỦA HANIN
          </h2>
        </div>

        {/* Grid of 4 Structured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {STRENGTHS.map((item) => (
            <div
              key={item.index}
              className="p-space-lg rounded bg-slate-50 border border-slate-200 hover:border-steel-600/60 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-space-sm mb-space-md">
                  <span className="text-label-technical text-steel-600 font-bold tracking-widest">
                    THẾ MẠNH // {item.index}
                  </span>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-steel-600 transition-colors">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs font-bold">{item.title}</h3>
                <p className="text-body-md text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.metricLabel}</span>
                <span className={item.metricClass}>{item.metricValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
