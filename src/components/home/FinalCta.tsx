import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="w-full py-space-xl bg-slate-50 relative overflow-hidden" id="bao-gia">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="p-space-lg md:p-space-xl rounded bg-white border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl shadow-lg">
          <div className="flex flex-col gap-space-md max-w-2xl">
            <h2 className="text-headline-xl md:text-display-hero text-slate-900 font-bold leading-tight uppercase">
              BẠN CÓ DỰ ÁN CẦN GIA CÔNG MẠ?
            </h2>
            <p className="text-body-lg text-slate-600">
              Gửi yêu cầu, đội kỹ thuật HANIN sẽ liên hệ tư vấn theo thông số
              cụ thể của bạn.
            </p>
            <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md"
              >
                <span>GỬI YÊU CẦU BÁO GIÁ</span>
                <span className="material-symbols-outlined text-[20px]">send</span>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-space-sm p-space-md bg-slate-50 border border-slate-200 rounded lg:min-w-[320px]">
            <span className="text-label-technical uppercase tracking-widest text-steel-600 font-bold pb-1">
              LIÊN HỆ TRỰC TIẾP
            </span>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-steel-600 text-[20px]">call</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase">HOTLINE HỖ TRỢ</span>
                <span className="text-title-md text-slate-900 font-bold">(+84) 24 3818 6868</span>
              </div>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-steel-600 text-[20px]">chat</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase">ZALO KỸ THUẬT</span>
                <Link href="/lien-he" className="text-title-md text-sky-700 hover:underline font-semibold">
                  CHAT VỚI HANIN
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-steel-600 text-[20px]">mail</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase">HỘP THƯ BÁO GIÁ</span>
                <span className="text-body-md text-slate-800 font-mono">sales@hanintech.vn</span>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-2 text-slate-600 border-t border-slate-200">
              <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase">ĐỊA CHỈ NHÀ XƯỞNG</span>
                <span className="text-body-sm text-slate-800 leading-tight">
                  Lô CN-08, KCN Quang Minh, Huyện Mê Linh, Hà Nội
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
