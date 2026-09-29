const ITEMS = [
  {
    no: "01",
    title: "THỬ NGHIỆM ĐỘ BỀN & ĂN MÒN (SALT SPRAY TEST)",
    desc: "Buồng phun sương muối gia tốc ASTM B117, buồng thử nghiệm sốc nhiệt chu kỳ và thử nghiệm độ ẩm tuần hoàn đánh giá khả năng chống gỉ sét lên đến 1,000+ giờ đối với lớp mạ kẽm niken và crom.",
  },
  {
    no: "02",
    title: "ĐO ĐỘ DÀY BẰNG HUỲNH QUANG TIA X (X-RAY FLUORESCENCE)",
    desc: "Thiết bị quang phổ XRF chuyên dụng đo chính xác độ dày lớp mạ đa lớp ở cấp độ micron không phá hủy mẫu, xác định chính xác tỷ lệ hàm lượng hợp kim trong lớp phủ bề mặt.",
  },
  {
    no: "03",
    title: "KIỂM SOÁT BỂ MẠ & NỒNG ĐỘ HÓA CHẤT",
    desc: "Định kỳ phân tích hàm lượng nồng độ ion kim loại và chất phụ gia hàng ngày qua máy chuẩn độ điện thế tự động, máy đo quang phổ và hệ thống giám sát độ pH trực tuyến liên tục 24/7.",
  },
];

export default function TestingAnalysis() {
  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200" id="kiem-nghiem">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="mb-space-xl">
          <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
            METROLOGY &amp; VALIDATION
          </span>
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">PHÂN TÍCH &amp; KIỂM NGHIỆM</h2>
          <p className="text-body-md text-slate-600 max-w-3xl mt-1">
            Phòng phân tích hóa nghiệm và đo lường vi mô hiện đại, kiểm định chất lượng toàn diện trước khi xuất
            kho theo quy chuẩn quốc tế.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* LEFT: Metrology Photo */}
          <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 min-h-[380px] shadow-sm flex flex-col justify-end p-space-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Ảnh cận cảnh chi tiết kim loại mạ điện hoàn thiện độ chính xác cao trên bàn kiểm tra công nghiệp (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="relative z-10 flex flex-wrap gap-space-xs">
              <span className="bg-white/95 backdrop-blur-md px-space-sm py-1 rounded text-label-technical text-steel-600 uppercase font-semibold shadow-sm">
                QA/QC LABORATORY // ISO/IEC 17025 STANDARD READY
              </span>
            </div>
          </div>

          {/* RIGHT: 3 Technical Information Blocks */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            {ITEMS.map((item) => (
              <div
                key={item.no}
                className="p-space-lg bg-white border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 transition-colors"
              >
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="w-7 h-7 rounded bg-steel-100 text-steel-600 flex items-center justify-center text-label-technical font-bold">
                    {item.no}
                  </span>
                  <h3 className="text-headline-sm text-slate-900 uppercase">{item.title}</h3>
                </div>
                <p className="text-body-sm text-slate-600 leading-relaxed pl-9">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
