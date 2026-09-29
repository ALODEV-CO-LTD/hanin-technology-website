const PILLARS = [
  {
    icon: "health_and_safety",
    tag: "PILLAR 01 // FACTORY 4.0",
    title: "Môi trường làm việc an toàn & hiện đại",
    desc: "Hệ thống nhà xưởng đạt chuẩn ISO 9001 & ISO 14001, dây chuyền mạ tự động PLC khép kín, trang thiết bị bảo hộ lao động tiêu chuẩn cao, khu vực kiểm nghiệm sạch sẽ và văn phòng làm việc tiện nghi.",
    metricLabel: "CHỈ TIẾU AN TOÀN",
    metricValue: "1.200+ NGÀY VÔ SỰ CỐ",
  },
  {
    icon: "trending_up",
    tag: "PILLAR 02 // GROWTH PATH",
    title: "Cơ hội phát triển & thăng tiến nghề nghiệp",
    desc: "Lộ trình thăng tiến minh bạch cho cả khối Kỹ sư chuyên môn (Technical Specialist) và Cán bộ Quản lý (Management Track). Đánh giá hiệu suất định kỳ dựa trên đóng góp thực tế và sáng kiến cải tiến Kaizen.",
    metricLabel: "ĐÁNH GIÁ ĐỊNH KỲ",
    metricValue: "2 LẦN / NĂM",
  },
  {
    icon: "model_training",
    tag: "PILLAR 03 // TECH TRANSFER",
    title: "Đào tạo kỹ thuật & chuyển giao công nghệ",
    desc: "Chương trình huấn luyện nội bộ bài bản từ chuyên gia luyện kim, tiếp cận công nghệ đo lường quang học huỳnh quang tia X (XRF), các khóa đào tạo Lean Six Sigma, Kaizen và quy trình tự động hóa SCADA tiên tiến.",
    metricLabel: "GIỜ ĐÀO TẠO/KỸ SƯ",
    metricValue: "80 GIỜ / NĂM",
  },
  {
    icon: "card_giftcard",
    tag: "PILLAR 04 // TOTAL REWARDS",
    title: "Văn hóa doanh nghiệp & chế độ đãi ngộ",
    desc: "Mức lương cạnh tranh theo năng lực, thưởng sản xuất và hiệu quả dự án, bảo hiểm sức khỏe toàn diện, xe đưa đón tuyến Hà Nội - Mê Linh, bữa ăn ca dinh dưỡng tại nhà máy và các hoạt động teambuilding thường niên.",
    metricLabel: "XE ĐƯA ĐÓN",
    metricValue: "TUYẾN NỘI THÀNH HÀ NỘI",
  },
];

export default function WhyHanin() {
  return (
    <section className="w-full py-space-xl bg-white">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="flex flex-col gap-2 max-w-3xl mb-space-xl">
          <div className="flex items-center gap-2 text-orange-600 text-label-technical uppercase tracking-widest">
            <span className="w-3 h-[2px] bg-orange-600" />
            <span>CULTURE &amp; WORKPLACE // TẠI SAO CHỌN HANIN?</span>
          </div>
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            NỀN TẢNG PHÁT TRIỂN SỰ NGHIỆP TẠI HANIN
          </h2>
          <p className="text-body-lg text-slate-600">
            Môi trường sản xuất công nghệ cao, tôn trọng kỷ luật kỹ thuật, an toàn lao động và tạo điều kiện tối
            đa cho từng cá nhân bứt phá năng lực chuyên môn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.tag}
              className="group p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm font-semibold text-orange-600 uppercase tracking-widest">
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
