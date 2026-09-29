const APPLICATIONS = [
  {
    icon: "valve",
    tag: "NGÀNH DẦU KHÍ & THỦY LỰC",
    title: "Thân Van & Bi Van Cao Áp",
    desc: "High-Phos ENP (>10.5% P) cung cấp khả năng kháng axit hữu cơ, khí hydro sunfua (H2S) và muối mặn, độ cứng cao ngăn ngừa xước bề mặt khi đóng mở áp lực 5,000 PSI.",
    thickness: "Độ dày lớp mạ: 25 — 50 µm",
  },
  {
    icon: "precision_manufacturing",
    tag: "KHUÔN MẪU & TRUYỀN ĐỘNG CHÍNH XÁC",
    title: "Trục Vít Me & Khuôn Nhựa",
    desc: "Lớp mạ phân bổ siêu đồng đều giúp khuôn ép nhựa nhả khuôn trơn tru, rãnh bi vít me không cần qua công đoạn mài bóng lại sau mạ, giữ nguyên độ dung sai gia công ban đầu.",
    thickness: "Độ dày lớp mạ: 10 — 15 µm",
  },
  {
    icon: "sensors",
    tag: "ĐIỆN TỬ & VIỄN THÔNG CAO TẦN",
    title: "Hộp Tản Nhiệt & Hốc Sóng",
    desc: "Mạ trên nền hợp kim nhôm Al6061 chống oxy hóa, duy trì tính dẫn nhiệt cao và giữ khả năng hàn thiếc (solderability) tối ưu cho các trạm thu phát viễn thông 5G ngoài trời.",
    thickness: "Độ dày lớp mạ: 5 — 8 µm",
  },
  {
    icon: "directions_car",
    tag: "CÔNG NGHIỆP Ô TÔ (AUTOMOTIVE)",
    title: "Piston Thắng & Trục Khớp",
    desc: "Tuân thủ tiêu chuẩn IATF 16949, vượt mốc 1,000 giờ phun muối NSS không xuất hiện gỉ đỏ. Hệ số ma sát trượt thấp giúp cụm phanh hoạt động trơn tru trong suốt vòng đời xe.",
    thickness: "Độ dày lớp mạ: 20 — 30 µm",
  },
];

export default function DetailApplications() {
  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md mb-space-md gap-space-sm">
          <div>
            <span className="text-orange-600 text-label-sm uppercase tracking-wider font-semibold block mb-1">
              ỨNG DỤNG THỰC TẾ THEO PHÂN KHÚC
            </span>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">
              CÁC DÒNG SẢN PHẨM CƠ KHÍ GIA CÔNG MẠ ENP TẠI HANIN
            </h2>
          </div>
          <span className="text-label-sm text-slate-500">ĐÁP ỨNG TIÊU CHUẨN Ô TÔ &amp; HÀNG HẢI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {APPLICATIONS.map((item) => (
            <div key={item.title} className="bg-slate-50 border border-slate-200 p-space-md rounded flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-orange-600 mb-space-sm">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <span className="text-label-sm text-orange-600 uppercase font-semibold">{item.tag}</span>
                <h4 className="text-title-md text-slate-900 uppercase mt-1 mb-2 font-bold">{item.title}</h4>
                <p className="text-body-md text-slate-600">{item.desc}</p>
              </div>
              <div className="mt-space-md pt-space-xs text-label-sm text-slate-500">{item.thickness}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
