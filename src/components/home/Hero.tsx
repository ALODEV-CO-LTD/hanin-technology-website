export default function Hero() {
  return (
    <section className="relative w-full min-h-[840px] xl:h-[880px] flex items-center overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Dây chuyền mạ tự động tại HANIN TECHNOLOGY (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface-container-lowest/40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,181,153,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,181,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-margin py-space-xl flex flex-col justify-between h-full">
        <div className="max-w-3xl flex flex-col gap-space-md pt-space-lg">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-surface-container-high/90 backdrop-blur-md shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="text-label-technical tracking-[0.16em] uppercase text-primary">
              HANIN TECHNOLOGY VIỆT NAM
            </span>
            <span className="text-[10px] text-secondary tracking-widest pl-2">
              SPEC: B2B-IND-VN
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-display-hero-mobile xl:text-display-hero text-on-surface uppercase tracking-tight font-bold">
              PRECISION METAL <span className="text-primary">PLATING</span>
            </h1>
            <p className="text-headline-md text-secondary-fixed font-semibold tracking-tight">
              Giải pháp gia công mạ kim loại cho công nghiệp hiện đại.
            </p>
          </div>

          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Cung cấp giải pháp gia công mạ và năng lực sản xuất phục vụ nhu cầu
            công nghiệp, với định hướng chính xác, ổn định và kiểm soát chất
            lượng.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container hover:bg-inverse-primary text-on-primary text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md"
            >
              KHÁM PHÁ NĂNG LỰC
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container hover:bg-surface-bright text-on-surface text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-sm"
            >
              NHẬN BÁO GIÁ
            </a>
          </div>
        </div>

        <div className="pt-space-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
          <div className="flex items-center gap-space-lg text-label-technical text-secondary">
            <div className="flex items-center gap-2">
              <span className="text-primary">LINE_SYS:</span>
              <span>AUTO_CAROUSEL_04</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">TOLERANCE:</span>
              <span>±0.002 MM</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-primary">LOCATION:</span>
              <span>QUANG MINH IP, HN</span>
            </div>
          </div>
          <a
            href="#company-snapshot"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="material-symbols-outlined text-[16px] animate-bounce">
              arrow_downward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
