const STATS = [
  {
    label: "MÁY & THIẾT BỊ",
    value: "42+",
    desc: "Thiết bị mạ & phụ trợ (SPEC: HIGH-PRECISION CNC & TANKS)",
    accent: false,
  },
  {
    label: "DÂY CHUYỀN HOẠT ĐỘNG",
    value: "16",
    desc: "Dây chuyền sản xuất tự động PLC & bán tự động chuyên sâu",
    accent: false,
  },
  {
    label: "PHÂN KHU QUY HOẠCH",
    value: "05",
    desc: "Khu vực chuyên biệt (Plating, Chemical, Cleanroom, QA Lab)",
    accent: false,
  },
  {
    label: "ĐỘ CHÍNH XÁC KỸ THUẬT",
    value: "±0.2",
    unit: "µm",
    desc: "Độ dày dung sai micron & sản lượng định mức đạt chuẩn ASTM",
    accent: true,
  },
];

export default function CapabilityOverviewStats() {
  return (
    <section className="w-full bg-white border-b border-slate-200 py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-space-lg bg-slate-50 border border-slate-200/80 rounded-lg shadow-sm hover:border-orange-300 hover:bg-orange-50/20 transition-all"
            >
              <div className="text-label-technical text-orange-600 tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div
                className={`text-headline-xl font-bold tracking-tight ${
                  stat.accent ? "text-orange-600" : "text-slate-900"
                }`}
              >
                {stat.value}
                {stat.unit && <span className="text-headline-md font-normal text-slate-500">{stat.unit}</span>}
              </div>
              <div className="text-body-sm text-slate-500 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
