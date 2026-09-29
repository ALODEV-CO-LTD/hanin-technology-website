export default function ProductsProjects() {
  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-orange-600 font-bold">
                SẢN PHẨM &amp; DỰ ÁN
              </span>
            </div>
            <h2 className="text-headline-xl text-slate-900 font-bold">
              Sản phẩm và dự án tiêu biểu.
            </h2>
            <p className="text-body-md text-slate-600">
              Khám phá các sản phẩm và dự án gia công được thực hiện bởi HANIN.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-slate-600 hover:text-orange-600 transition-colors whitespace-nowrap font-semibold"
          >
            <span>XEM TẤT CẢ DỰ ÁN</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          <div className="lg:col-span-7 flex flex-col bg-white border border-slate-200 rounded overflow-hidden group shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300">
            <div className="relative h-[340px] md:h-[400px] overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Chi tiết bánh răng và trục cơ khí chính xác sau gia công mạ (ảnh minh họa)"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded border border-slate-200 shadow-sm">
                <span className="text-[10px] text-orange-600 uppercase font-mono tracking-wider font-bold">
                  DUNG SAI: ±0.003mm
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                <span className="text-label-technical text-slate-700 uppercase font-semibold">
                  Cơ khí chính xác
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col justify-between flex-1 gap-space-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-orange-600 uppercase font-bold">
                    DỰ ÁN TIÊU BIỂU 01
                  </span>
                  <span className="text-xs text-slate-500 font-mono">DUNG SAI: ±0.003mm</span>
                </div>
                <h3 className="text-headline-sm text-slate-900 font-bold group-hover:text-orange-600 transition-colors">
                  Chi tiết truyền động & bánh răng cơ khí chính xác
                </h3>
                <p className="text-body-md text-slate-600">
                  Gia công mạ bảo vệ bề mặt chống mài mòn cao, duy trì độ chính
                  xác bước răng và tăng tuổi thọ chu kỳ làm việc trong môi
                  trường ma sát cao.
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-xs text-slate-500 group-hover:text-orange-600 transition-colors">
                <span className="text-label-technical uppercase tracking-wider font-semibold">
                  THÔNG SỐ LỚP MẠ →
                </span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="flex-1 flex flex-col justify-between p-space-lg bg-white border border-slate-200 rounded group shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-orange-600 uppercase font-bold">
                    DỰ ÁN TIÊU BIỂU 02
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-semibold">
                    Công nghiệp ô tô / Xe máy
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-slate-900 font-bold group-hover:text-orange-600 transition-colors">
                    Linh kiện vỏ bọc kim loại & phụ kiện phụ trợ
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">
                    Lớp mạ đồng nhất kháng ăn mòn muối phun đạt tiêu chuẩn thử
                    nghiệm ngoại quan cao, phục vụ cho các nhà sản xuất OEM phụ
                    tùng xe máy, ô tô.
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-slate-500 group-hover:text-orange-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  XEM CHI TIẾT DỰ ÁN
                </span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between p-space-lg bg-white border border-slate-200 rounded group shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-orange-600 uppercase font-bold">
                    DỰ ÁN TIÊU BIỂU 03
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-semibold">
                    Thiết bị điện tử công nghiệp
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-slate-900 font-bold group-hover:text-orange-600 transition-colors">
                    Phần cứng kim khí kỹ thuật cao
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">
                    Xử lý bề mặt các khối đấu nối kim loại, chân cắm tiếp xúc
                    dẫn điện và thanh giằng điện tử với độ dày lớp mạ kiểm soát
                    dưới 5 micron.
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-slate-500 group-hover:text-orange-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  XEM CHI TIẾT DỰ ÁN
                </span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
