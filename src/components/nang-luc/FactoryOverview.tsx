export default function FactoryOverview() {
  return (
    <section className="w-full py-space-xl bg-slate-50" id="he-thong-nha-may">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="flex items-center gap-space-sm mb-space-xl">
          <span className="w-2.5 h-2.5 bg-steel-600 rounded-sm" />
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">HỆ THỐNG NHÀ MÁY</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* LEFT: Photo & Badges */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 min-h-[420px] shadow-sm flex flex-col justify-end p-space-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Ngoại quan kiến trúc nhà máy sản xuất HANIN Technology Việt Nam tại khu công nghiệp Quang Minh (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiKd9nHn87ASNGIqA831NxWUU39pCRYt0pxzlJrZml7wBsLd2VGK1aa9SgZMJaB03inN6wvjKiwb1pn9RvJ3tqY_QaSRlF_WJ3iYKdOx5XD5nyG56vwqoSGMri-a5DsrQQqzhCdvlowrTusxawO9GxiS66yQGanwMO0AZaHIDRrXrBl_HdF_mNShZt0NmBY74on6wZsVRvxjiR_7o9hJKGrwolx5ygDbc6yvbjN1QTKrK6JG7_SZbdaA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="relative z-10 flex flex-wrap gap-space-xs">
              <span className="bg-white/95 backdrop-blur-md px-space-sm py-1 rounded text-label-technical text-steel-600 uppercase font-semibold shadow-sm">
                FACILITY: KCN QUANG MINH, HÀ NỘI
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md px-space-sm py-1 rounded text-label-technical text-white uppercase">
                SCALE: INDUSTRIAL CAMPUS
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md px-space-sm py-1 rounded text-label-technical text-slate-200 uppercase">
                STATUS: AUDITED &amp; APPROVED
              </span>
            </div>
          </div>

          {/* RIGHT: Description & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-xl rounded-lg shadow-sm">
            <div>
              <span className="text-label-technical tracking-widest text-steel-600 uppercase block mb-space-xs font-semibold">
                INFRASTRUCTURE &amp; SCALE
              </span>
              <h3 className="text-headline-md text-slate-900 uppercase mb-space-md">
                NHÀ MÁY HANIN TECHNOLOGY
              </h3>
              <p className="text-body-md text-slate-600 leading-relaxed mb-space-md">
                Không gian nhà xưởng được quy hoạch chuẩn hóa theo tiêu chuẩn công nghiệp hiện đại, tích hợp hệ
                thống kiểm soát môi trường trung tâm, trạm xử lý nước thải đạt QCVN 40:2011/BTNMT và các module
                mạ tự động khép kín.
              </p>
              <p className="text-body-sm text-slate-500 leading-relaxed mb-space-lg">
                Cơ sở hạ tầng được thiết kế đáp ứng tiêu chuẩn nghiêm ngặt của các tập đoàn cơ khí chính xác, tự
                động hóa và vi điện tử đến từ Nhật Bản, Hàn Quốc và EU.
              </p>
            </div>
            <div>
              {/* Technical specs table */}
              <div className="grid grid-cols-1 gap-space-xs mb-space-lg text-body-sm">
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">Vị trí (Location)</span>
                  <span className="text-slate-900 font-semibold text-right">
                    Lô CN-08, KCN Quang Minh, Mê Linh, Hà Nội
                  </span>
                </div>
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">Diện tích sản xuất</span>
                  <span className="text-steel-600 text-headline-sm font-bold">18,000 m²</span>
                </div>
                <div className="flex items-center justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">Năng lực cốt lõi</span>
                  <span className="text-slate-900 font-semibold text-right">
                    [Gia công mạ điện &amp; mạ hóa học kỹ thuật cao]
                  </span>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-wider font-semibold"
                href="#factory-gallery"
              >
                XEM HÌNH ẢNH NHÀ MÁY <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
