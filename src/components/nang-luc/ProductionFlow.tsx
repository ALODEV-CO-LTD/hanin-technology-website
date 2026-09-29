const STEPS = [
  {
    step: "STEP // 01",
    title: "01 // TIẾP NHẬN YÊU CẦU & BẢN VẼ",
    desc: "Đánh giá bản vẽ kỹ thuật CAD, tính toán chính xác diện tích mạ, độ phức tạp khe rãnh và lập bảng quy trình công nghệ tối ưu.",
    standard: "TIÊU CHUẨN: DFM ASSESSMENT",
  },
  {
    step: "STEP // 02",
    title: "02 // CHUẨN BỊ BỀ MẶT",
    desc: "Tẩy dầu mỡ hóa học và sóng siêu âm, tẩy rỉ hoạt hóa bề mặt trong bể acid chuyên dụng loại bỏ hoàn toàn màng oxit.",
    standard: "TIÊU CHUẨN: SURFACE ETCHING",
  },
  {
    step: "STEP // 03",
    title: "03 // GIA CÔNG MẠ CHÍNH",
    desc: "Vận hành mạ điện phân hoặc mạ hóa học theo chu trình cài đặt tự động PLC, giám sát mật độ dòng và nhiệt độ liên tục.",
    standard: "TIÊU CHUẨN: SCADA MONITORED",
  },
  {
    step: "STEP // 04",
    title: "04 // KIỂM TRA ĐO LƯỜNG",
    desc: "Đo độ dày lớp mạ bằng huỳnh quang tia X (XRF), kiểm tra độ bám dính theo ASTM D3359 và kiểm tra ngoại quan 100% lô hàng.",
    standard: "TIÊU CHUẨN: XRF & ADHESION TEST",
  },
  {
    step: "STEP // 05",
    title: "05 // HOÀN THIỆN & KHỬ HYDRO",
    desc: "Thụ động hóa bảo vệ, sấy khô tuần hoàn khí nóng và đưa vào lò khử giòn hydro theo chuẩn ASTM F519 đối với chi tiết chịu lực.",
    standard: "TIÊU CHUẨN: ASTM F519 DE-EMBRITTLEMENT",
  },
  {
    step: "STEP // 06",
    title: "06 // ĐÓNG GÓI & BÀN GIAO",
    desc: "Đóng gói chống ẩm theo tiêu chuẩn xuất khẩu VCI, dán nhãn QR truy xuất nguồn gốc và bàn giao kèm đầy đủ chứng chỉ chất lượng COA.",
    standard: "TIÊU CHUẨN: VCI ANTI-CORROSION PACKAGING",
  },
];

export default function ProductionFlow() {
  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
            STANDARD WORKFLOW
          </span>
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            QUY TRÌNH SẢN XUẤT
          </h2>
          <p className="text-body-md text-slate-600">
            Tiến trình sản xuất 6 bước khép kín đảm bảo chất lượng từ nguyên liệu đầu vào tới nghiệm thu xuất
            xưởng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                  <span className="text-label-technical text-steel-600 font-bold">{s.step}</span>
                  <span className="w-2 h-2 rounded-full bg-steel-600" />
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{s.title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-space-md pt-space-xs text-slate-500 text-label-sm border-t border-slate-200/60">
                {s.standard}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
