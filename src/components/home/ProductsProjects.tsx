export default function ProductsProjects() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
                PRODUCTS &amp; PROJECTS
              </span>
            </div>
            <h2 className="text-headline-xl text-on-surface font-bold">
              Sản phẩm và dự án tiêu biểu.
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Khám phá các sản phẩm và dự án gia công được thực hiện bởi HANIN.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-secondary hover:text-primary transition-colors whitespace-nowrap"
          >
            <span>XEM TẤT CẢ DỰ ÁN</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          <div className="lg:col-span-7 flex flex-col bg-surface-container rounded overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300">
            <div className="relative h-[340px] md:h-[400px] overflow-hidden bg-surface-container-lowest">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Chi tiết bánh răng và trục cơ khí chính xác sau gia công mạ (ảnh minh họa)"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded">
                <span className="text-[10px] text-primary uppercase font-mono tracking-wider">
                  PROJECT REF: P-01
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-surface-container-high/90 backdrop-blur-md px-2.5 py-1 rounded">
                <span className="text-label-technical text-secondary uppercase">Cơ khí chính xác</span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col justify-between flex-1 gap-space-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-primary uppercase">PROJECT 01</span>
                  <span className="text-xs text-on-surface-variant font-mono">TOL: ±0.003mm</span>
                </div>
                <h3 className="text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                  Chi tiết truyền động & bánh răng cơ khí chính xác
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Gia công mạ bảo vệ bề mặt chống mài mòn cao, duy trì độ chính
                  xác bước răng và tăng tuổi thọ chu kỳ làm việc trong môi
                  trường ma sát cao.
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-xs text-secondary group-hover:text-primary transition-colors">
                <span className="text-label-technical uppercase tracking-wider">
                  THÔNG SỐ LỚP MẠ →
                </span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="flex-1 flex flex-col justify-between p-space-lg bg-surface-container rounded group shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-primary uppercase">PROJECT 02</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-secondary uppercase">
                    Công nghiệp ô tô / Xe máy
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-on-surface font-bold group-hover:text-primary transition-colors">
                    Linh kiện vỏ bọc kim loại & phụ kiện phụ trợ
                  </h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Lớp mạ đồng nhất kháng ăn mòn muối phun đạt tiêu chuẩn thử
                    nghiệm ngoại quan cao, phục vụ cho các nhà sản xuất OEM phụ
                    tùng xe máy, ô tô.
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-secondary group-hover:text-primary transition-colors">
                <span className="text-[11px] uppercase tracking-wider">XEM CHI TIẾT DỰ ÁN</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between p-space-lg bg-surface-container rounded group shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-primary uppercase">PROJECT 03</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-secondary uppercase">
                    Thiết bị điện tử công nghiệp
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-on-surface font-bold group-hover:text-primary transition-colors">
                    Phần cứng kim khí kỹ thuật cao
                  </h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Xử lý bề mặt các khối đấu nối kim loại, chân cắm tiếp xúc
                    dẫn điện và thanh giằng điện tử với độ dày lớp mạ kiểm soát
                    dưới 5 micron.
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-secondary group-hover:text-primary transition-colors">
                <span className="text-[11px] uppercase tracking-wider">XEM CHI TIẾT DỰ ÁN</span>
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
