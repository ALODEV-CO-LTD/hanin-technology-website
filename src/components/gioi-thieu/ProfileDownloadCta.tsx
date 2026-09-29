export default function ProfileDownloadCta() {
  return (
    <section className="w-full bg-[#f8fafc] py-space-xl border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* High Contrast Industrial Block */}
        <div className="p-space-lg md:p-space-xl rounded-lg bg-white border border-slate-200 shadow-xl relative overflow-hidden">
          {/* Background Grid Watermark */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
                KHÁM PHÁ HỒ SƠ NĂNG LỰC HANIN
              </h2>
              <p className="text-body-md text-slate-600 max-w-xl leading-relaxed">
                Tìm hiểu sâu hơn về sản phẩm, nhà máy, thiết bị, năng lực sản xuất và hệ thống chất lượng của HANIN
                qua bộ tài liệu chi tiết.
              </p>
              <div className="pt-space-xs">
                <a
                  className="inline-flex items-center gap-space-sm px-space-lg py-space-sm rounded bg-steel-600 hover:bg-steel-700 text-white text-label-technical uppercase tracking-wider transition-all duration-150 active:scale-[0.99] shadow-md shadow-steel-500/20"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  TẢI HỒ SƠ NĂNG LỰC (PDF) →
                </a>
              </div>
            </div>

            {/* Right: Profile Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[1/1.3] rounded-lg bg-slate-50 border border-slate-200 shadow-lg p-space-md flex flex-col justify-between group hover:border-steel-600/50 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-space-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-steel-600 flex items-center justify-center font-bold text-white text-xs">
                      H
                    </div>
                    <span className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                      HANIN VIỆT NAM
                    </span>
                  </div>
                  <span className="text-[9px] text-steel-600 font-bold font-mono">CATALOG DOANH NGHIỆP</span>
                </div>
                <div className="my-space-md p-space-sm bg-white rounded border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-steel-600 text-[36px] mb-2 opacity-90">
                    menu_book
                  </span>
                  <span className="text-xs font-bold text-slate-900 uppercase">HỒ SƠ NĂNG LỰC HANIN</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">
                    PHIÊN BẢN 2026 // TÀI LIỆU KỸ THUẬT
                  </span>
                  <div className="w-16 h-0.5 bg-steel-600 my-2" />
                  <span className="text-[9px] text-slate-400 font-mono">
                    THÔNG SỐ KỸ THUẬT &amp; CÁC DỰ ÁN TIÊU BIỂU
                  </span>
                </div>
                <div className="flex items-center justify-between pt-space-xs border-t border-slate-200 text-[10px] text-slate-500">
                  <span>ĐỊNH DẠNG PDF • 14.8 MB</span>
                  <span className="text-sky-700 font-semibold group-hover:underline">XEM TÀI LIỆU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
