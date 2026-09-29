const PILLARS = [
  {
    icon: "health_and_safety",
    tag: "PILLAR 01 // FACTORY 4.0",
    title: "Môi trường làm việc an toàn & hiện đại",
    desc: "Nhà xưởng đạt chuẩn ISO 9001 & ISO 14001, dây chuyền mạ tự động PLC khép kín, đầy đủ bảo hộ lao động và khu vực kiểm nghiệm riêng biệt.",
    metricLabel: "CHỈ TIẾU AN TOÀN",
    metricValue: "1.200+ NGÀY VÔ SỰ CỐ",
  },
  {
    icon: "trending_up",
    tag: "PILLAR 02 // GROWTH PATH",
    title: "Cơ hội phát triển & thăng tiến nghề nghiệp",
    desc: "Lộ trình thăng tiến rõ ràng theo hướng Kỹ sư chuyên môn (Technical Specialist) hoặc Quản lý (Management Track). Đánh giá hiệu suất định kỳ dựa trên kết quả công việc và sáng kiến Kaizen.",
    metricLabel: "ĐÁNH GIÁ ĐỊNH KỲ",
    metricValue: "2 LẦN / NĂM",
  },
  {
    icon: "model_training",
    tag: "PILLAR 03 // TECH TRANSFER",
    title: "Đào tạo kỹ thuật & chuyển giao công nghệ",
    desc: "Đào tạo nội bộ từ chuyên gia luyện kim, thực hành đo lường huỳnh quang tia X (XRF), các khóa Lean Six Sigma, Kaizen và quy trình tự động hóa SCADA.",
    metricLabel: "GIỜ ĐÀO TẠO/KỸ SƯ",
    metricValue: "80 GIỜ / NĂM",
  },
  {
    icon: "card_giftcard",
    tag: "PILLAR 04 // TOTAL REWARDS",
    title: "Văn hóa doanh nghiệp & chế độ đãi ngộ",
    desc: "Lương theo năng lực, thưởng sản xuất và hiệu quả dự án, bảo hiểm sức khỏe, xe đưa đón tuyến Hà Nội - Mê Linh, bữa ăn ca tại nhà máy và hoạt động teambuilding thường niên.",
    metricLabel: "XE ĐƯA ĐÓN",
    metricValue: "TUYẾN NỘI THÀNH HÀ NỘI",
  },
];

export default function WhyHanin() {
  return (
    <section className="w-full py-space-xl bg-white">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="flex flex-col gap-2 max-w-3xl mb-space-xl">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            NỀN TẢNG PHÁT TRIỂN SỰ NGHIỆP TẠI HANIN
          </h2>
          <p className="text-body-lg text-slate-600">
            Môi trường sản xuất công nghệ cao, kỷ luật kỹ thuật và an toàn lao động, với lộ trình phát triển
            chuyên môn rõ ràng cho từng vị trí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.tag}
              className="group p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-steel-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-steel-600 group-hover:bg-steel-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm font-semibold text-steel-600 uppercase tracking-widest">
                    {pillar.tag}
                  </span>
                  <h3 className="text-title-md text-slate-900 uppercase font-semibold">{pillar.title}</h3>
                </div>
                <p className="text-body-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-label-sm text-slate-500">
                <span>{pillar.metricLabel}</span>
                <span className="text-slate-900 font-semibold">{pillar.metricValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
