const STEPS = [
  {
    index: "01",
    icon: "cleaning_services",
    title: "Chuẩn Bị & Tiền Xử Lý",
    desc: "Làm sạch cơ học, tẩy dầu hóa chất siêu âm đa giai đoạn và tẩy gỉ axit định chuẩn.",
    note: "Kiểm tra sức căng bề mặt",
  },
  {
    index: "02",
    icon: "electric_meter",
    title: "Mạ Điện Phân / Hóa Học",
    desc: "SCADA tự động cấp nguồn chỉnh lưu, giám sát nhiệt độ và thời gian phản ứng từng giây.",
    note: "Dung sai bể: ±0.5°C",
  },
  {
    index: "03",
    icon: "water_drop",
    title: "Rửa Đa Cấp & Thụ Động Hóa",
    desc: "Rửa ngược dòng tầng cấp khử ion DI nước sạch, thụ động hóa Cr(III) chống hoen ố.",
    note: "Khử ứng suất Hydro",
  },
  {
    index: "04",
    icon: "verified",
    title: "Kiểm Chuẩn QA/QC XRF",
    desc: "Đo bề dày không phá hủy bằng tia X huỳnh quang, thử uốn bám dính và phun muối sương.",
    note: "Báo cáo CoA theo lô",
  },
  {
    index: "05",
    icon: "inventory_2",
    title: "Đóng Gói Bảo Quản VCI",
    desc: "Sấy khô cưỡng bức, bảo quản bằng túi màng chống rỉ bay hơi VCI xuất khẩu đường biển.",
    note: "Chuẩn xuất khẩu EU/USA",
  },
];

export default function ProcessFlow() {
  return (
    <section className="w-full bg-white border border-slate-200 rounded p-space-md lg:p-space-xl mb-space-xl shadow-sm">
      <div className="flex flex-col mb-space-lg">
        <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
          SƠ ĐỒ CHU TRÌNH GIA CÔNG XI MẠ CHÍNH XÁC
        </h2>
        <p className="text-body-md text-slate-600 max-w-3xl">
          Mỗi công đoạn được giám sát bằng cảm biến pH, nhiệt độ, dòng điện tích hợp IoT và ghi nhận vào nhật ký
          sản xuất số hóa để truy xuất nguồn gốc.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm">
        {STEPS.map((step) => (
          <div
            key={step.index}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-space-md rounded flex flex-col justify-between transition-colors"
          >
            <div className="flex items-center justify-between mb-space-sm">
              <span className="text-headline-md text-steel-600 font-bold">{step.index}</span>
              <span className="material-symbols-outlined text-slate-500 text-[24px]">{step.icon}</span>
            </div>
            <div>
              <h4 className="text-title-md text-slate-900 font-bold uppercase mb-1">{step.title}</h4>
              <p className="text-body-md text-slate-600">{step.desc}</p>
            </div>
            <div className="mt-space-sm pt-space-xs text-label-sm text-slate-500">
              <span>{step.note}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
