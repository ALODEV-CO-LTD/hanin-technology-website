const LINES = [
  {
    tag: "01 // AUTOMATED BARREL LINE",
    badge: "SCADA CONTROL",
    title: "[DÂY CHUYỀN 01: DÂY CHUYỀN MẠ QUAY TỰ ĐỘNG PLC]",
    desc: "Dùng cho linh kiện ốc vít, bu-lông, phụ tùng nhỏ: công suất lớn, độ bám dính cao, chiều dày lớp mạ đồng đều trong từng mẻ quay khép kín.",
    specLabel1: "CÔNG SUẤT:",
    specValue1: "850 Tấn/tháng",
    specLabel2: "DUNG SAI:",
    specValue2: "[±0.2 µm]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiLEyraQZoiFKXRZK-kKbEjCzHq20OLP8VYEAIGmTRKHWwWTKjkLdqlTN-QXvVgwq7VIbnl96w_lRVJ6oSILfvqe6hwSlFb6OWdVRHP4f_k9pZ_OKXbxSqQZ-PEKXOHjcsNdS-ctIM6zUgt3pnsD3jdPT_RKiid7QKZ5Wm-kggOX75yTDYPmDvKtM91ped3_l66t8Y0H0iSod3lxNq0bK_EiuFwl4q2ZMX-fMK_kfs1yvSbpT9HFGxJQ",
    alt: "Dây chuyền mạ quay thùng tự động với trục quay ngâm chìm trong bể hóa chất mạ điện và tay điều khiển chính xác (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
    imageOrder: "",
  },
  {
    tag: "02 // RACK PLATING LINE",
    badge: "HEAVY DUTY",
    title: "[DÂY CHUYỀN 02: DÂY CHUYỀN MẠ TREO TỰ ĐỘNG & BÁN TỰ ĐỘNG]",
    desc: "Dùng cho chi tiết cơ khí chính xác, trục ty ben thủy lực, khuôn mẫu và bánh răng cỡ lớn. Gá treo chuyên dụng, không va đập, giữ đúng dung sai biên dạng.",
    specLabel1: "CÔNG SUẤT:",
    specValue1: "120,000 Sản phẩm/tháng",
    specLabel2: "KÍCH THƯỚC BỂ:",
    specValue2: "60 × 40 m",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDB_GDtgTuGWQ11eXyw3ln1I983UzyAD1puXLPdxQQrrMF4LTkJrj7Q2nJax-nYxbOuNg17ACAdUFpiZgLWUlmIwl8TZDBGcm8tHAXVuJeV8vLgEAFawY6al08_7_WX6mBbvn4eZudzKH11P-bOglwuQVEOzBlsrH1-t8iEV8hNQNTXSNhZpIQcjEZx0g-hFSoqnuMinXx6LiZk3U64BaRdq0uDdejVod0LFd8KtAiBNUYelDkaJUw",
    alt: "Kỹ sư QA nữ trong đồng phục bảo hộ sạch vận hành bảng điều khiển điện tử chính xác tại nhà máy hoàn thiện bề mặt kim loại tiên tiến (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
    imageOrder: "order-first lg:order-last",
  },
  {
    tag: "03 // CHEMICAL ENP & ANODIZING LINE",
    badge: "MIL-SPEC COMPLIANT",
    title: "[DÂY CHUYỀN 03: DÂY CHUYỀN MẠ HÓA HỌC & XỬ LÝ NHÔM CHUYÊN SÂU]",
    desc: "Xử lý mạ Niken hóa học không điện (Electroless Nickel Plating - ENP) và Anodizing nhôm, cho khả năng chống mài mòn, chống ăn mòn hóa chất và độ cứng bề mặt cao.",
    specLabel1: "BỂ PHẢN ỨNG:",
    specValue1: "[Nhiệt độ ổn định ±1°C]",
    specLabel2: "ĐỘ DÀY:",
    specValue2: "[5 - 50 µm]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
    alt: "Không gian nội thất nhà máy hoàn thiện bề mặt kim loại công nghiệp hiện đại",
    imageOrder: "",
  },
];

export default function ProductionLines() {
  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200" id="day-chuyen">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <div className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase mb-1">
            PRODUCTION INFRASTRUCTURE
          </div>
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            DÂY CHUYỀN SẢN XUẤT
          </h2>
          <p className="text-body-md text-slate-600">
            Các dây chuyền gia công bề mặt được bố trí riêng cho từng dòng sản phẩm cơ khí và linh kiện điện tử.
          </p>
        </div>

        <div className="flex flex-col gap-space-lg">
          {LINES.map((line) => (
            <div
              key={line.tag}
              className="grid grid-cols-1 lg:grid-cols-12 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-steel-300 hover:shadow-md transition-all group"
            >
              <div className={`lg:col-span-5 relative min-h-[260px] bg-slate-200 ${line.imageOrder}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={line.alt}
                  src={line.image}
                />
              </div>
              <div className="lg:col-span-7 p-space-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                    <span className="text-label-technical text-steel-600 tracking-widest uppercase font-semibold">
                      {line.tag}
                    </span>
                    <span className="px-space-xs py-0.5 bg-slate-200/80 text-slate-700 rounded text-label-technical">
                      {line.badge}
                    </span>
                  </div>
                  <h3 className="text-headline-md text-slate-900 uppercase mb-space-sm">{line.title}</h3>
                  <p className="text-body-md text-slate-600 leading-relaxed mb-space-md">{line.desc}</p>
                </div>
                <div className="pt-space-md bg-white border border-slate-200 p-space-md rounded flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="text-label-technical text-slate-800">
                    <span className="text-slate-500">{line.specLabel1}</span>{" "}
                    <span className="text-steel-600 font-bold">{line.specValue1}</span>
                    {" // "}
                    <span className="text-slate-500">{line.specLabel2}</span>{" "}
                    <span className="text-slate-900 font-bold">{line.specValue2}</span>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-label-technical text-steel-600 hover:text-slate-900 font-semibold uppercase transition-colors"
                    href="#"
                  >
                    XEM THÔNG SỐ DÂY CHUYỀN →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
