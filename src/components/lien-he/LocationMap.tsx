const DISTANCES = [
  {
    icon: "flight_takeoff",
    color: "text-steel-600",
    label: "Sân bay Quốc tế Nội Bài",
    value: "12 km (~15 phút)",
  },
  {
    icon: "directions_boat",
    color: "text-sky-700",
    label: "Cảng Quốc tế Hải Phòng (Lạch Huyện)",
    value: "120 km (~1h45)",
  },
  {
    icon: "precision_manufacturing",
    color: "text-slate-600",
    label: "KCN Bắc Thăng Long / VSIP Bắc Ninh",
    value: "18 - 35 km",
  },
];

export default function LocationMap() {
  return (
    <section className="w-full bg-slate-50 py-space-xl" id="map-section">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Map info & logistics instructions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-xl rounded shadow-sm">
            <div>
              <span className="text-label-technical uppercase tracking-widest text-steel-600 font-bold block mb-1">
                VỊ TRÍ CHIẾN LƯỢC // LOGISTICS ROUTE
              </span>
              <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight mb-space-md">
                VỊ TRÍ NHÀ MÁY &amp; ĐƯỜNG ĐI XE TẢI CONTAINER
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed mb-space-lg">
                Nhà máy Hanin Tech nằm tại vị trí trung tâm hành lang công nghiệp phía Bắc, thuận lợi
                kết nối hạ tầng giao thông logistics qua cao tốc Thăng Long - Nội Bài, đường Võ Văn
                Kiệt và đường Vành Đai 3 Hà Nội.
              </p>

              <div className="flex flex-col gap-space-sm mb-space-xl">
                {DISTANCES.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-space-sm bg-slate-50 rounded"
                  >
                    <span className="text-slate-900 font-semibold flex items-center gap-2 text-body-sm">
                      <span className={`material-symbols-outlined text-[20px] ${item.color}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-steel-600 font-bold text-body-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md bg-slate-50 -mx-space-xl -mb-space-xl p-space-lg">
              <a
                className="flex-1 py-space-sm px-space-md bg-steel-600 hover:bg-steel-700 text-white rounded text-label-md uppercase tracking-wider font-bold text-center transition-colors flex items-center justify-center gap-2"
                href="https://maps.google.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>MỞ GOOGLE MAPS</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
              <a
                className="py-space-sm px-space-md bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 rounded text-label-md uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
                href="#rfq-form"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>SƠ ĐỒ XE CONTAINER (PDF)</span>
              </a>
            </div>
          </div>

          {/* Static map visual (placeholder — chưa nối Google Maps API thật) */}
          <div className="lg:col-span-7 rounded overflow-hidden shadow-sm relative min-h-[420px] bg-slate-200">
            <div
              className="w-full h-full min-h-[420px] bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA85UYKWjtcuwrKepapp5MGDdkuAw_EkrbJcdYP0KEnhARjTxjDM6ysANOszfzGcmxjpiJvoxblg_GtRL2Y8qq3iM1754kBL6Xq_JW7mPT73PyXm5o9XleM1MYjMsmnLm-2tx8E8Ox6DbCkMhmmHJmz7Dv_jETW5jbr1bSSlnlsdXmR2vEqY2jq4fQmZ74s_TN3e4J_PUPdounLmttBxaKQrk7ngZiFBp1WnAjkOuzD1awXA3q2ZfyQfQ')",
              }}
              role="img"
              aria-label="Ảnh vệ tinh minh họa vị trí KCN Quang Minh, Mê Linh, Hà Nội (ảnh minh họa, sẽ thay bằng bản đồ Google Maps nhúng thật)"
            >
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white p-space-md rounded backdrop-blur-md max-w-xs shadow-md">
                <div className="flex items-center gap-2 text-steel-500 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-steel-500 animate-pulse" />
                  <span className="text-label-sm uppercase tracking-wider font-bold">
                    HANIN FACILITY GATE 1
                  </span>
                </div>
                <p className="text-title-md font-bold text-white">Lô CN-08 KCN Quang Minh</p>
                <p className="text-label-sm text-slate-300 mt-1">
                  Cổng kiểm soát an ninh container 40 feet tiếp nhận 24/7
                </p>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 p-space-sm rounded text-slate-900 shadow-sm text-label-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-steel-600 text-[20px]">
                  explore
                </span>
                <div>
                  <span className="block font-bold">GRID: HN-QMINH-08</span>
                  <span className="text-slate-500 text-[10px]">ELEV: +14.2m ASL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
