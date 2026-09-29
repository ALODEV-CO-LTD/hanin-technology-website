const CORE_VALUES = [
  {
    icon: "straighten",
    title: "CHÍNH XÁC",
    index: "/ 01",
    desc: "[Thông tin] Kiểm soát dung sai độ dày micron, tuân thủ thông số kỹ thuật bản vẽ.",
    note: "DUNG SAI: ĐỘ DÀY ĐẠT CẤP ĐỘ MICRON",
  },
  {
    icon: "cyclone",
    title: "ỔN ĐỊNH",
    index: "/ 02",
    desc: "[Thông tin] Đảm bảo đồng đều chất lượng giữa các lô hàng sản xuất, giảm tỷ lệ lỗi cơ tính.",
    note: "ĐỘ ĐỒNG ĐỀU LÔ HÀNG: TIÊU CHUẨN 99.8%",
  },
  {
    icon: "handshake",
    title: "ĐỒNG HÀNH",
    index: "/ 03",
    desc: "[Thông tin] Phối hợp xử lý bài toán kỹ thuật bề mặt cùng khách hàng công nghiệp trong chuỗi cung ứng.",
    note: "HỢP TÁC: ĐỐI TÁC CHIẾN LƯỢC CHUỖI CUNG ỨNG",
  },
];

export default function DevelopmentDirection() {
  return (
    <section className="w-full bg-[#f8fafc] py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Layout: Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-xl">
          <div className="lg:col-span-5">
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              Định hướng phát triển
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-body-md md:text-body-lg text-slate-600 leading-relaxed">
              [Thông tin chính thức về định hướng phát triển của HANIN: nâng cao chất lượng lớp mạ, chuẩn hóa quy
              trình kỹ thuật và tối ưu chi phí cho chuỗi cung ứng.]
            </p>
          </div>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {CORE_VALUES.map((value) => (
            <div
              key={value.title}
              className="p-space-lg rounded bg-white border border-slate-200 hover:border-steel-600/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded bg-steel-50 border border-steel-100 flex items-center justify-center mb-space-md text-steel-600">
                <span className="material-symbols-outlined">{value.icon}</span>
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs font-bold flex items-center gap-2">
                {value.title}
                <span className="font-mono text-xs text-steel-600 font-normal">{value.index}</span>
              </h3>
              <p className="text-body-md text-slate-600 leading-relaxed">{value.desc}</p>
              <div className="mt-space-md pt-space-sm border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                {value.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
