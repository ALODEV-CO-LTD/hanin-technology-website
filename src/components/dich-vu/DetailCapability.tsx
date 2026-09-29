const FEATURES = [
  {
    icon: "tune",
    title: "Tự động châm hóa chất bù (Auto Chemical Dosing):",
    desc: "Cảm biến quang kế đo liên tục hàm lượng ion Niken tự do và kích hoạt bơm định lượng vi sai, giữ tỷ lệ dung dịch ổn định trong dải ±0.2 g/L.",
  },
  {
    icon: "cyclone",
    title: "Cẩu trục giàn chuyển tải tự động hóa:",
    desc: "Hệ thống rung và xoay giá mạ liên tục trong bể, loại bỏ sai số thao tác thủ công và xua tan túi khí hydro đọng trong lỗ ren sâu, hốc mù.",
  },
  {
    icon: "filter_alt",
    title: "Lọc tuần hoàn 10 turnovers/giờ:",
    desc: "Dung dịch qua màng lọc polypropylene 1-micron liên tục, triệt tiêu mạt kim loại lơ lửng và hiện tượng mạ nổi hột.",
  },
];

export default function DetailCapability() {
  return (
    <section className="w-full mb-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-6 flex flex-col gap-space-sm">
          <div className="w-full h-80 rounded overflow-hidden shadow-sm relative bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Kỹ sư HANIN kiểm tra giám sát màn hình điều khiển SCADA dây chuyền mạ tự động (ảnh minh họa)"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-space-sm py-1 rounded text-slate-900 text-label-sm shadow-sm">
              SCADA PLC SIEMENS S7-1500 // TELEMETRY 24/7
            </div>
          </div>
          <div className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">NĂNG LỰC DÂY CHUYỀN</span>
              <span className="text-title-md text-slate-900 font-bold">120,000 Chi Tiết / Tháng</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-label-sm text-slate-500 uppercase">KÍCH THƯỚC BỂ TỐI ĐA</span>
              <span className="text-title-md text-steel-600 font-bold">1800 x 900 x 1200 mm</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center bg-white border border-slate-200 p-space-lg rounded shadow-sm">
          <span className="text-steel-600 text-label-sm uppercase tracking-wider font-semibold mb-1">
            DÂY CHUYỀN TỰ ĐỘNG HÓA CAO CẤP
          </span>
          <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mb-space-sm font-bold">
            CÔNG NGHỆ BỂ MẠ &amp; QUẢN TRỊ BẢN THANG NỒNG ĐỘ
          </h2>
          <p className="text-body-lg text-slate-600 mb-space-md">
            Bể mạ Polypropylene chịu hóa chất, gia cường thép không gỉ SUS304, gia nhiệt gián tiếp qua cụm trao đổi
            nhiệt Teflon và thạch anh để tránh tự phân hủy hóa chất.
          </p>
          <div className="space-y-space-sm text-body-md text-slate-600">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-steel-600 text-[20px] mt-0.5">{feature.icon}</span>
                <div>
                  <strong className="text-slate-900 font-semibold">{feature.title}</strong> {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
