const SNAPSHOT_STATS = [
  {
    label: "THIẾT BỊ MÁY MÓC",
    value: "50",
    suffix: "+",
    desc: "Thiết bị hiện đại",
    note: "QUY CHUẨN: ĐẠT KIỂM ĐỊNH",
  },
  {
    label: "DÂY CHUYỀN SẢN XUẤT",
    value: "06",
    suffix: "+",
    desc: "Dây chuyền vận hành",
    note: "HỆ: QUAY & TREO TỰ ĐỘNG",
  },
  {
    label: "PHÂN KHU NHÀ XƯỞNG",
    value: "04",
    suffix: "",
    desc: "Khu vực sản xuất",
    note: "TIÊU CHUẨN: PHÒNG SẠCH KHÉP KÍN",
  },
  {
    label: "CÔNG SUẤT HÀNG THÁNG",
    value: "1.200",
    suffix: "+",
    desc: "Tấn sản phẩm / tháng",
    note: "CÔNG SUẤT: TRỌNG LƯỢNG MÃ HÓA",
  },
];

export default function CapabilitySnapshot() {
  return (
    <section className="w-full bg-white py-space-lg border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {SNAPSHOT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col p-space-sm md:p-space-md">
              <span className="text-[10px] text-orange-600 uppercase tracking-widest mb-1 font-bold">
                {stat.label}
              </span>
              <div className="text-headline-xl md:text-display-hero text-slate-900 font-bold tracking-tight font-mono">
                {stat.value}
                <span className="text-orange-600">{stat.suffix}</span>
              </div>
              <span className="text-body-sm text-slate-600 mt-1">{stat.desc}</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">{stat.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
