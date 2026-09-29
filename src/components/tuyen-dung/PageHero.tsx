import Link from "next/link";

export default function PageHero() {
  return (
    <section className="relative w-full bg-slate-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-steel-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-margin pt-space-xl pb-space-xl relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-lg">
          <div className="flex items-center gap-2 text-label-technical text-slate-500 tracking-wider uppercase">
            <Link className="hover:text-steel-600 transition-colors" href="/">
              Trang chủ
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-steel-600 font-bold">Tuyển dụng</span>
          </div>
          <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded bg-white shadow-sm text-slate-500 text-label-sm font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-steel-600 animate-pulse" />
            <span>PORTAL: TALENT &amp; CAREERS // STATUS: ACTIVE RECRUITMENT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center pt-space-sm">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-2 text-steel-600 text-label-technical tracking-widest uppercase">
              <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
              <span>CAREERS // HANIN TECHNOLOGY</span>
            </div>
            <h1 className="text-display-hero-mobile md:text-display-hero text-slate-900 tracking-tight uppercase font-bold">
              CƠ HỘI <span className="text-steel-600">NGHỀ NGHIỆP</span>
            </h1>
            <p className="text-body-lg text-slate-600 max-w-2xl leading-relaxed">
              Gia nhập <strong className="text-slate-900 font-semibold">HANIN TECHNOLOGY VIỆT NAM</strong> — Nơi kỹ
              thuật chính xác gặp gỡ tư duy sản xuất hiện đại. Cùng xây dựng chuỗi cung ứng cơ khí và giải pháp xử
              lý bề mặt kim loại tiêu chuẩn quốc tế.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-sm">
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">Tiêu chuẩn</span>
                <span className="text-title-md text-slate-900">ISO &amp; 5S Kaizen</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">Đãi ngộ</span>
                <span className="text-title-md text-slate-900">Lộ trình rõ ràng</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">Phát triển</span>
                <span className="text-title-md text-slate-900">Đào tạo 1:1</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">Nhà máy</span>
                <span className="text-title-md text-slate-900">KCN Quang Minh</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-space-md lg:mt-0">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden shadow-md bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Phân xưởng xi mạ kỹ thuật cao tự động hoá tại HANIN Technology (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between gap-space-sm text-white">
                <div className="flex flex-col">
                  <span className="text-label-sm text-steel-300 uppercase tracking-wider">
                    DÂY CHUYỀN TỰ ĐỘNG
                  </span>
                  <span className="text-title-md">Tổ hợp sản xuất &amp; mạ kỹ thuật cao</span>
                </div>
                <span className="px-2 py-1 rounded bg-steel-600 text-white text-label-sm uppercase tracking-widest font-bold shrink-0">
                  HI-TECH LAB
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-space-sm px-space-md py-space-sm bg-white rounded shadow-lg">
              <div className="w-10 h-10 rounded bg-steel-100 flex items-center justify-center text-steel-600 shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-title-md text-slate-900">100% Đãi ngộ chuẩn</span>
                <span className="text-label-sm text-slate-500">Bảo hiểm 24/7 &amp; Xe đưa đón</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
