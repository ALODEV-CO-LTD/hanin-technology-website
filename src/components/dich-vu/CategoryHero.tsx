export default function CategoryHero() {
  return (
    <section className="relative w-full bg-white border border-slate-200 rounded shadow-sm p-space-md lg:p-space-xl mb-space-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded text-label-sm font-bold tracking-wider uppercase">
              INDUSTRIAL SURFACE TREATMENT
            </span>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-label-sm uppercase">
              CÔNG NGHỆ CHUYỂN GIAO CHÂU ÂU &amp; NHẬT BẢN
            </span>
          </div>
          <h1 className="text-headline-xl-mobile md:text-headline-lg lg:text-display-hero text-slate-900 uppercase font-bold tracking-tight">
            DỊCH VỤ GIA CÔNG MẠ &amp; XỬ LÝ BỀ MẶT CÔNG NGHIỆP
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl leading-relaxed">
            Chuyên sâu trong lĩnh vực gia công xi mạ kim loại, mạ điện phân tự động SCADA và xử lý bề mặt kỹ thuật
            cao, đáp ứng các tiêu chuẩn dung sai khắt khe trong ngành ô tô, thiết bị điện và cơ khí chính xác.
          </p>

          <div className="grid grid-cols-3 gap-space-sm bg-slate-50 border border-slate-200 p-space-sm rounded">
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">Dung sai bề dày</span>
              <span className="text-title-md text-orange-600 font-bold tracking-tight">±0.1 µm</span>
              <span className="text-label-sm text-slate-500">Kiểm soát dòng vi mô</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">Thử nghiệm muối</span>
              <span className="text-title-md text-slate-900 font-bold tracking-tight">&gt; 1,200H</span>
              <span className="text-label-sm text-slate-500">ASTM B117 / ISO 9227</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">Hệ thống chất lượng</span>
              <span className="text-title-md text-slate-900 font-bold tracking-tight">IATF 16949</span>
              <span className="text-label-sm text-slate-500">ISO 9001:2015 Cert</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <a
              href="#rfq-form"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-space-lg py-3 rounded text-title-md shadow-sm transition-all"
            >
              <span>YÊU CẦU BÁO GIÁ KỸ THUẬT (RFQ)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#capacity-overview"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-space-lg py-3 rounded text-title-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              <span>XEM NĂNG LỰC DÂY CHUYỀN</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded overflow-hidden shadow-lg bg-slate-900 aspect-[4/3] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Dây chuyền mạ điện phân tự động với dung dịch hóa chất xanh phát quang, cẩu trục nâng chi tiết cơ khí (ảnh minh họa)"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNUWbtu-6mF-47Gk1oHXXyJOVwIjxt1jMnwPHiIsRKd5-Mx9Fkov5w63gs__fEcgwwzgV_Z-vKRbSS73Sz3WCrxS7MMkOc_RB6FPdCt5KgCyaidW2F52ulUmXdEeh_eNp7KwcY8uwyn0-vSmt1UP_859JtN6IOXI0GDsjdrq5wFODc1u1tv_i6RcJXzKItH1zLdI0T8JX0LVT3-sWkTJptYWKMbM9n17lteJGbAqsinL7sfHx1R7peqg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-space-sm bg-white/90 backdrop-blur-md rounded flex items-center justify-between shadow-md">
              <div>
                <p className="text-label-sm text-slate-500 uppercase">DÂY CHUYỀN TỰ ĐỘNG HÓA #04</p>
                <p className="text-title-md text-slate-900 font-bold">SCADA Automated Rack Plating</p>
              </div>
              <span className="bg-orange-100 text-orange-700 text-label-sm px-2 py-1 rounded font-bold uppercase">
                READY ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
