const MACHINES = [
  {
    badge: "HỆ THỐNG CẤP NGUỒN",
    title: "[MÁY / THIẾT BỊ 01: BỂ MẠ & NGUỒN CHỈNH LƯU TỰ ĐỘNG RECTIFIER]",
    desc: "Bộ nguồn xung cao tần tự động, cấp dòng điện phân ổn định cho bể mạ diện tích lớn.",
    specs: (
      <>
        Dòng tải: <span className="text-slate-900 font-semibold">12,000A</span>
        <br />
        Ổn định: <span className="text-slate-900 font-semibold">[±1%]</span>
        {" // "}Điều khiển:{" "}
        <span className="text-steel-600 font-semibold">[PLC]</span>
      </>
    ),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKGTdP7NCpJen2W2AWofNyibQ2wIMiSgAMPLTZ7v1k2-E5EtoeAH9vZtpvsEr4crGT4XSmIqRWNVogW99y-bgGoHB9e5vLSR1AvQyULKom4uVFuLouy_f5b5cb3_d3F3oAfwB9FuVXRr-F7scaCDinOmslbX3pMGCMHcxkdMSEj-WTZh7ntncyO8VUeEwAaqfaAQ9iaaBVqHWN0cxcf0-0xBm5cqCj2rF84_fazB80AOiXSd3vUXf5ng",
    alt: "Tủ điều khiển nguồn chỉnh lưu công suất cao cho bể mạ điện phân với đồng hồ số và công tắc mạch (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
  },
  {
    badge: "TIỀN XỬ LÝ BỀ MẶT",
    title: "[MÁY / THIẾT BỊ 02: BỂ RỬA & TẨY DẦU SIÊU ÂM ĐA TẦN SỐ]",
    desc: "Làm sạch bavia, dầu mỡ gia công bằng sóng siêu âm đa tần, bề mặt trơ lý hóa trước khi mạ.",
    specs: (
      <>
        Tần số: <span className="text-slate-900 font-semibold">[28 - 40 kHz]</span>
        <br />
        Gia nhiệt: <span className="text-slate-900 font-semibold">[Tự động]</span>
        {" // "}Thể tích:{" "}
        <span className="text-steel-600 font-semibold">850 m³</span>
      </>
    ),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
    alt: "Không gian nội thất nhà máy hoàn thiện bề mặt kim loại công nghiệp hiện đại",
  },
  {
    badge: "LOGISTICS NỘI BỘ",
    title: "[MÁY / THIẾT BỊ 03: CẨU TRỤC VẬN CHUYỂN PHÔI TỰ ĐỘNG (HOIST SYSTEM)]",
    desc: "Trục nâng hạ tự động dẫn hướng laser, chuyển giao phôi theo đúng chu trình ngâm nhúng cài đặt.",
    specs: (
      <>
        Tải trọng: <span className="text-slate-900 font-semibold">25 Tấn</span>
        <br />
        Tốc độ: <span className="text-slate-900 font-semibold">[Tùy biến PLC]</span>
        {" // "}Cảm biến:{" "}
        <span className="text-steel-600 font-semibold">[Laser]</span>
      </>
    ),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Rp9iUGeqni3A6u4Y3C-JoRdlsiZ3JPcevdQQ-JcImbiNSnXcvpd1_n9lbSPFdOtkXGmXJ8Yx311AAoAwa_C_Q1axzJc1TJSpiEZxnREJYdzd4qo0KJVN59JJcefB_TNtV2r_9v-9QQ7BzHkT0ZT6D4CUyOVaOPhuwRt7CgEeHBj7GH-QtFAgQ0kmBD1iFwD_6QkgwWS5IebEzVgCvo8z_6zf-OsY0N_7HWZ10e9pJsP0oIlTC1SNmg",
    alt: "Cẩu trục nâng hạ tự động vận chuyển các giá đỡ công nghiệp nặng trong dây chuyền hóa chất tự động (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
  },
  {
    badge: "XỬ LÝ NHIỆT SAU MẠ",
    title: "[MÁY / THIẾT BỊ 04: LÒ KHỬ HYDRO SAU MẠ (DE-EMBRITTLEMENT OVEN)]",
    desc: "Lò gia nhiệt tuần hoàn khử giòn hydro cho thép cường độ cao và linh kiện chịu tải trọng động.",
    specs: (
      <>
        Nhiệt tối đa: <span className="text-slate-900 font-semibold">[300°C - 500°C]</span>
        <br />
        Cảm biến: <span className="text-slate-900 font-semibold">[PID Digital]</span>
        {" // "}Chuẩn:{" "}
        <span className="text-steel-600 font-semibold">[ASTM F519]</span>
      </>
    ),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
    alt: "Ảnh cận cảnh chi tiết kim loại mạ điện hoàn thiện độ chính xác cao",
  },
];

export default function EquipmentGrid() {
  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
              HARDWARE ASSETS
            </span>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
              HỆ THỐNG MÁY MÓC &amp; THIẾT BỊ
            </h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">
            Thiết bị phục vụ đầy đủ các khâu từ tiền xử lý, mạ chính đến hoàn thiện bề mặt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {MACHINES.map((m) => (
            <div
              key={m.title}
              className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:border-steel-300 hover:shadow-md transition-all"
            >
              <div className="relative h-44 bg-slate-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" alt={m.alt} src={m.image} />
                <span className="absolute bottom-2 left-2 px-space-xs py-0.5 bg-white/90 border border-slate-200 text-steel-600 font-semibold rounded text-label-sm shadow-sm">
                  {m.badge}
                </span>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-title-md text-slate-900 uppercase mb-space-xs font-semibold">{m.title}</h4>
                  <p className="text-body-sm text-slate-600 mb-space-md">{m.desc}</p>
                </div>
                <div className="pt-space-sm bg-white border border-slate-200 p-space-xs rounded text-label-sm text-slate-600">
                  {m.specs}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
