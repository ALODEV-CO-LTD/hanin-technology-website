const STEPS = [
  {
    index: "BƯỚC 01",
    icon: "cleaning_services",
    title: "Tẩy Siêu Âm",
    desc: "Tẩy dầu mỡ hóa học & sóng siêu âm đa tần 40kHz, loại bỏ hoàn toàn dầu làm mát gia công CNC và màng oxit vi mô.",
    note: "Kiểm tra màng nước Water-Break Free 100%.",
    highlight: false,
  },
  {
    index: "BƯỚC 02",
    icon: "science",
    title: "Kích Hoạt Vi Mô",
    desc: "Tẩy gỉ nhẹ và hoạt hóa bề mặt bằng dung dịch axit ức chế ăn mòn nền, mở lộ cấu trúc tinh thể nguyên bản của kim loại.",
    note: "Thời gian: 30 - 90 giây tùy mác thép.",
    highlight: false,
  },
  {
    index: "BƯỚC 03",
    icon: "precision_manufacturing",
    title: "Mạ ENP Phản Ứng",
    desc: "Nhúng bể mạ tuần hoàn lọc 1µm. Kiểm soát tự động nhiệt độ 88–90°C, pH 4.6–4.8 bằng bơm định lượng quang phổ.",
    note: "Tốc độ tạo màng: 15–20 µm/giờ.",
    highlight: true,
  },
  {
    index: "BƯỚC 04",
    icon: "water_drop",
    title: "Rửa Ngược DI Water",
    desc: "Hệ thống bể rửa tràn 3 cấp nối tiếp bằng nước siêu tinh khiết (Deionized Water < 5 µS/cm), triệt tiêu hóa chất tồn dư.",
    note: "Độ dẫn điện nước xả: < 15 µS/cm.",
    highlight: false,
  },
  {
    index: "BƯỚC 05",
    icon: "local_fire_department",
    title: "Xử Lý Nhiệt Sau Mạ",
    desc: "Ủ nhiệt trong lò điện đối lưu. Khử hiện tượng giòn hydro (200°C x 4h) hoặc gia nhiệt kết tinh Ni₃P (400°C x 1h) để tăng cứng.",
    note: "Tăng cứng cực hạn lên đến 68 HRC.",
    highlight: false,
  },
  {
    index: "BƯỚC 06",
    icon: "verified",
    title: "QA/QC & Đóng Gói VCI",
    desc: "Đo chiều dày XRF ngẫu nhiên theo mẻ AQL 0.4. Đóng gói màng bọc ức chế ăn mòn VCI chuyên dụng xuất khẩu toàn cầu.",
    note: "Cấp CoA (Certificate of Analysis) kèm hàng.",
    highlight: false,
  },
];

export default function DetailProcess() {
  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex items-center justify-between pb-space-sm mb-space-lg flex-wrap gap-space-sm">
          <div>
            <span className="text-orange-600 text-label-sm uppercase tracking-wider font-semibold block mb-1">
              TIÊU CHUẨN KIỂM SOÁT QUY TRÌNH KỸ THUẬT
            </span>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">
              CHU TRÌNH MẠ NIKEN HÓA HỌC 06 CẤP ĐỘ
            </h2>
          </div>
          <span className="hidden md:inline bg-slate-100 px-3 py-1 rounded text-label-sm text-slate-500">
            SCADA AUTOMATED CYCLE // 10 TURNOVERS/HR
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-sm">
          {STEPS.map((step) => (
            <div
              key={step.index}
              className={`flex flex-col p-space-sm rounded ${
                step.highlight ? "bg-orange-50 border border-orange-100" : "bg-slate-50 border border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between text-orange-600 text-title-md mb-2">
                <span className="font-bold">{step.index}</span>
                <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
              </div>
              <h4 className="text-title-md text-slate-900 uppercase mb-1 font-bold">{step.title}</h4>
              <p className="text-body-md text-slate-600">{step.desc}</p>
              <div
                className={`mt-auto pt-space-xs text-label-sm ${
                  step.highlight ? "text-orange-600 font-semibold" : "text-slate-500"
                }`}
              >
                {step.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
