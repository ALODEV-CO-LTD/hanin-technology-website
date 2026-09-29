const STATS = [
  { value: "150+", label1: "ĐỐI TÁC", label2: "Khách hàng" },
  { value: "320+", label1: "HẠNG MỤC", label2: "Dự án" },
  { value: "24+", label1: "DÂY CHUYỀN", label2: "Thiết bị" },
  { value: "850+", label1: "TẤN/THÁNG", label2: "Năng lực sản xuất" },
];

export default function CompanySnapshot() {
  return (
    <section className="w-full bg-white py-space-lg border-y border-slate-200" id="company-snapshot">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
          {STATS.map((stat) => (
            <div
              key={stat.label2}
              className="flex flex-col gap-1 p-space-md bg-slate-50 border border-slate-200/80 rounded transition-colors hover:border-steel-200 hover:bg-steel-50/30"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-headline-xl text-steel-600 font-bold">{stat.value}</span>
                <span className="text-xs text-slate-500 uppercase font-semibold">{stat.label1}</span>
              </div>
              <span className="text-label-technical text-slate-600 uppercase tracking-wider">
                {stat.label2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
