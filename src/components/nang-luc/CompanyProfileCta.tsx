export default function CompanyProfileCta() {
  return (
    <section className="w-full py-space-xl bg-slate-900 text-white">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* LEFT: Text & Button */}
          <div className="lg:col-span-7">
            <span className="text-label-technical text-orange-400 font-semibold tracking-widest uppercase block mb-space-xs">
              OFFICIAL DOCUMENTATION // 2026
            </span>
            <h3 className="text-headline-lg text-white uppercase tracking-tight mb-space-md">
              TÌM HIỂU THÊM VỀ NĂNG LỰC HANIN
            </h3>
            <p className="text-body-lg text-slate-300 max-w-xl leading-relaxed mb-space-lg">
              Xem Company Profile để tìm hiểu chi tiết hơn về mặt bằng nhà xưởng, thông số dây chuyền, danh mục
              thiết bị kiểm nghiệm và năng lực đáp ứng của HANIN TECHNOLOGY.
            </p>
            <a
              className="inline-flex items-center gap-2 px-space-xl py-space-md bg-orange-600 hover:bg-orange-700 text-white text-headline-sm font-semibold uppercase rounded transition-all active:scale-[0.99] shadow-lg"
              href="#"
            >
              XEM COMPANY PROFILE (PDF) →
            </a>
          </div>

          {/* RIGHT: Realistic PDF booklet card mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-slate-800 border border-slate-700 text-white p-space-lg rounded-lg shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-slate-700">
                <span className="text-label-technical text-orange-400 font-semibold uppercase">HANIN VIETNAM</span>
                <span className="px-space-xs py-0.5 bg-slate-700 text-slate-300 rounded text-label-sm">
                  PDF 14.5 MB
                </span>
              </div>
              <div className="py-space-xl text-center">
                <span className="material-symbols-outlined text-[48px] text-orange-500 mb-space-xs">
                  menu_book
                </span>
                <div className="text-headline-sm uppercase text-white font-bold tracking-tight">
                  HANIN CAPABILITY PROFILE 2026
                </div>
                <p className="text-label-technical text-slate-400 uppercase mt-1">B2B INDUSTRIAL CATALOGUE</p>
              </div>
              <div className="pt-space-sm border-t border-slate-700 text-label-sm text-slate-400 flex items-center justify-between">
                <span>EDITION: 2026.01</span>
                <span className="text-orange-400 font-bold">READY TO DOWNLOAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
