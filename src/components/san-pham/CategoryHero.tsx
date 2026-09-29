export default function CategoryHero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-100 border-b border-slate-200 py-space-xl lg:py-16">
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Chi tiết cơ khí được gia công mạ chính xác (ảnh minh họa)"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-100/95 to-slate-100/80 z-0" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-margin flex flex-col justify-between min-h-[280px] gap-space-lg">
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm text-label-technical tracking-widest uppercase">
            <span className="text-slate-500 font-medium">Trang chủ</span>
            <span className="text-slate-400">/</span>
            <span className="text-steel-600 font-bold">Sản phẩm &amp; Dự án</span>
            <span className="text-slate-400">{"//"}</span>
            <span className="text-slate-500">
              DANH MỤC DỰ ÁN &amp; CHI TIẾT GIA CÔNG // TIÊU CHUẨN: B2B_METALLIC
            </span>
          </div>
          <h1 className="text-display-hero-mobile lg:text-display-hero uppercase tracking-tight text-slate-900 mt-space-xs font-bold">
            Sản phẩm &amp; Dự án
          </h1>
          <p className="text-body-lg text-slate-600 max-w-3xl leading-relaxed mt-space-xs">
            Sản phẩm và dự án gia công mạ kim loại kỹ thuật cao thực hiện bởi HANIN: kiểm soát
            dung sai micron, độ đồng đều lớp phủ và độ bền môi trường khắt khe.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md">
          <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs bg-white border border-slate-200 rounded shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-label-technical text-slate-900 uppercase tracking-wider font-semibold">
              DỰ ÁN ĐANG THỰC HIỆN: 150+ LÔ HÀNG
            </span>
          </div>
          <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs bg-white border border-slate-200 rounded shadow-sm">
            <span className="material-symbols-outlined text-steel-600 text-[16px]">verified</span>
            <span className="text-label-technical text-slate-900 uppercase tracking-wider font-semibold">
              TỶ LỆ ĐẠT CHẤT LƯỢNG: 99.8%
            </span>
          </div>
          <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs bg-white border border-slate-200 rounded shadow-sm">
            <span className="material-symbols-outlined text-sky-700 text-[16px]">eco</span>
            <span className="text-label-technical text-slate-900 uppercase tracking-wider font-semibold">
              ĐẠT CHUẨN RoHS &amp; REACH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
