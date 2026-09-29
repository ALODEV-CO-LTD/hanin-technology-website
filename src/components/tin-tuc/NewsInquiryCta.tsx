export default function NewsInquiryCta() {
  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="bg-white border border-slate-200 rounded-xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
          {/* Subtle industrial background watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-slate-900 select-none">
            <span className="material-symbols-outlined text-[240px]">precision_manufacturing</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <h2 className="text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
                CẦN TRAO ĐỔI VỀ <span className="text-steel-600">SẢN PHẨM / DỰ ÁN?</span>
              </h2>
              <p className="text-body-lg text-slate-600 max-w-3xl">
                Kỹ sư hóa học và xử lý bề mặt kim loại của HANIN hỗ trợ giải đáp thắc mắc kỹ thuật,
                tối ưu quy trình và tư vấn phương án mạ phù hợp cho dự án của bạn.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-xs text-title-md text-slate-900">
                  <span className="material-symbols-outlined text-steel-600 text-[20px]">
                    call
                  </span>
                  <span>
                    Hotline: <strong className="text-slate-900">(+84) 24 3818 6868</strong>
                  </span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-space-xs text-title-md text-slate-900">
                  <span className="material-symbols-outlined text-steel-600 text-[20px]">
                    mail
                  </span>
                  <span>
                    Email: <strong className="text-slate-900">engineering@hanintech.vn</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-sm justify-center">
              <a
                href="#lien-he"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md bg-steel-600 text-white text-title-md rounded-lg shadow-sm hover:bg-steel-700 transition-all uppercase tracking-wider text-center"
              >
                <span>LIÊN HỆ HANIN</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </a>
              <a
                href="#bao-gia"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md rounded-lg transition-all uppercase tracking-wider text-center"
              >
                <span className="material-symbols-outlined text-[20px]">request_quote</span>
                <span>NHẬN BÁO GIÁ DỰ ÁN</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
