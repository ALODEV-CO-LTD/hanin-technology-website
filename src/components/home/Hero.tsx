export default function Hero() {
  return (
    <section className="relative w-full min-h-[840px] xl:h-[880px] flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Dây chuyền mạ tự động tại HANIN TECHNOLOGY (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-margin py-space-xl flex flex-col justify-between h-full">
        <div className="max-w-3xl flex flex-col gap-space-md pt-space-lg">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-white/10 backdrop-blur-md border border-white/15 shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-steel-500 animate-pulse" />
            <span className="text-label-technical tracking-[0.16em] uppercase text-steel-400 font-semibold">
              HANIN TECHNOLOGY VIỆT NAM
            </span>
            <span className="text-[10px] text-slate-300 tracking-widest pl-2 border-l border-white/20">
              TIÊU CHUẨN: B2B-IND-VN
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-display-hero-mobile xl:text-display-hero text-white uppercase tracking-tight font-bold">
              GIA CÔNG XI MẠ <span className="text-steel-500">CHÍNH XÁC</span>
            </h1>
            <p className="text-headline-md text-slate-200 font-semibold tracking-tight">
              Giải pháp gia công mạ kim loại cho công nghiệp hiện đại.
            </p>
          </div>

          <p className="text-body-lg text-slate-300 max-w-2xl leading-relaxed">
            Cung cấp giải pháp gia công mạ và năng lực sản xuất phục vụ nhu cầu
            công nghiệp, với định hướng chính xác, ổn định và kiểm soát chất
            lượng.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            >
              KHÁM PHÁ NĂNG LỰC
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
            >
              YÊU CẦU TƯ VẤN →
            </a>
          </div>
        </div>

        <div className="pt-space-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
          <div className="flex items-center gap-space-lg text-label-technical text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-steel-400">DÂY CHUYỀN:</span>
              <span>TỰ ĐỘNG KHỨP 04</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-steel-400">DUNG SAI:</span>
              <span>±0.002 MM</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-steel-400">ĐỊA ĐIỂM:</span>
              <span>KCN QUANG MINH, HN</span>
            </div>
          </div>
          <a
            href="#company-snapshot"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-widest text-slate-300 hover:text-steel-400 transition-colors"
          >
            <span>CUỘN XUỐNG KHÁM PHÁ</span>
            <span className="material-symbols-outlined text-[16px] animate-bounce">
              arrow_downward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
