export default function ContactCta() {
  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-steel-50 border border-steel-200 mb-space-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-steel-600" />
          <span className="text-[11px] text-steel-600 uppercase tracking-widest font-bold">
            SẴN SÀNG HỢP TÁC &amp; ĐỒNG HÀNH
          </span>
        </div>
        <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight max-w-2xl mb-space-sm font-bold">
          BẠN MUỐN TÌM HIỂU THÊM VỀ HANIN?
        </h2>
        <p className="text-body-md md:text-body-lg text-slate-600 max-w-xl leading-relaxed mb-space-lg">
          Liên hệ với HANIN để trao đổi về nhu cầu gia công mạ và hợp tác kỹ thuật theo dự án.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-md">
          {/* Primary Action */}
          <a
            className="inline-flex items-center justify-center px-space-lg py-space-sm bg-steel-600 hover:bg-steel-700 text-white rounded text-label-technical uppercase tracking-wider transition-all duration-150 active:scale-[0.99] shadow-md shadow-steel-500/20"
            href="#"
          >
            LIÊN HỆ HANIN →
          </a>
          {/* Secondary Action */}
          <a
            className="inline-flex items-center justify-center px-space-lg py-space-sm bg-slate-50 hover:bg-slate-100 text-slate-800 rounded text-label-technical uppercase tracking-wider transition-all duration-150 border border-slate-300 hover:border-slate-400 shadow-sm"
            href="#"
          >
            NHẬN BÁO GIÁ
          </a>
        </div>
      </div>
    </section>
  );
}
