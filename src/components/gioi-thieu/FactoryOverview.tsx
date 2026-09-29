export default function FactoryOverview() {
  return (
    <section className="w-full bg-[#f8fafc] py-space-xl border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <div className="flex items-center gap-space-xs text-label-technical tracking-widest text-steel-600 uppercase mb-space-xs font-bold">
              <span className="w-2 h-0.5 bg-steel-600" />
              CƠ SỞ HẠ TẦNG &amp; VẬN HÀNH
            </div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              HỆ THỐNG NHÀ MÁY
            </h2>
          </div>
          <p className="text-body-sm text-slate-500 max-w-md">
            Khám phá không gian sản xuất và hệ thống vận hành của HANIN.
          </p>
        </div>

        {/* Editorial Masonry Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-lg">
          {/* Main Large Photo: Modern Electroplating Line */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              role="img"
              aria-label="Dây chuyền mạ điện tự động công nghiệp với các bể hóa chất và cầu trục robot (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3iWq6Q8x7Z_ezljbRjJXG8PvcpqAOwpBGwmmu7J3EnPlwjt-ESDXQPZn-f3bGkrQo1j4Fktga1Nfs95Jy84yTg6hciMwQPhremUKIsgR3mimhB3o44tahvfbANNl2qbbXUJZ14ZiC5fCAh0Dy7JL9Hx_T_G2g-fk5Edk0e7SRVSfngXwCCp4lJDdWvYz-exCHChR-wHudNXNTbih0u5lwpmsbB1YgK4rArBQ8O3JSNqIBzt5ZNwkMLw')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-steel-600 animate-ping" />
              <span className="text-[10px] text-steel-600 uppercase tracking-widest font-bold">
                PHÂN KHU 01: DÂY CHUYỀN MẠ
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <p className="text-headline-sm font-semibold">Dây chuyền mạ tự động công nghiệp</p>
                <p className="text-body-sm text-slate-200">
                  Hệ thống bể mạ kiềm, axit và thụ động hóa bề mặt khép kín
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white border border-white/30">
                PLANT_A1
              </span>
            </div>
          </div>

          {/* 3 Smaller Auxiliary Photos */}
          <div className="lg:col-span-4 flex flex-col gap-gutter justify-between">
            {/* Aux Photo 1: Operator Monitoring Line */}
            <div className="relative h-[135px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label="Kỹ sư kiểm soát chất lượng vận hành trạm điều khiển PLC cạnh bể mạ (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO2uvWt8xZ536YyQhEYJ4tMDQSA_F8RQdHhM9bM7ZB-wMZ20tNyoSahZ2yEsXh63o9vlm-FKJE3lFtgtpoKw0mrgndMjdkzbIofNBppqs9oSAbfUBmVB6loE0Bps6z_jDqRd4wcOCtaszi2w7u2wqKoQZe-Xy0KFBp8ZUm4Kw9ojunATcWfAcTAmSFzOn6akWctZ7olr4NkCdWDucif0g9unLB_iNU9XvCZIFsMM-octzeubPl5rQOhA')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[9px] uppercase tracking-wider text-steel-600 bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 block w-max mb-1 font-bold">
                  PHÂN KHU 02: PHÒNG LAB &amp; KCS
                </span>
                <p className="text-xs text-white font-semibold">Phòng giám sát &amp; Điều phối</p>
              </div>
            </div>

            {/* Aux Photo 2: Precision Caliper Inspection */}
            <div className="relative h-[135px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Cận cảnh các chi tiết cơ khí đã mạ hoàn thiện (kẽm, niken, crôm) trên bàn kiểm tra kỹ thuật (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[9px] uppercase tracking-wider text-steel-600 bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 block w-max mb-1 font-bold">
                  PHÂN KHU 03: ĐỒ GÁ &amp; KIỂM ĐỊNH
                </span>
                <p className="text-xs text-white font-semibold">Bàn kiểm nghiệm đo lường dưỡng đo</p>
              </div>
            </div>

            {/* Aux Photo 3: Heavy Automated Crane System */}
            <div className="relative h-[135px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label="Cẩu trục công nghiệp tự động di chuyển linh kiện kim loại dọc theo dây chuyền mạ treo (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUE4O8LcBYpiU1uZa0sBwu5mLoOtBA0TDJKhgnbjojWLkEG6Lmlo6bgFKOSpwbkdbXDWGNd8Jl7c_EBjtKDhFGkEOGrMpEIsfX2wZGsclEuI_b2ZgmHNSu2kpVP-ipvio0oVimINqIus9N1kL16-dG_NTD3BwThp5R1GCzbwkTlfd7bSzmvQXTN5Bd58IfBs3xgBphDNC7g4sTzicnkDimUSEtHALHc1D3T1VE2yH25TV4-ddiokPfEA')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[9px] uppercase tracking-wider text-steel-600 bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 block w-max mb-1 font-bold">
                  PHÂN KHU 04: CẨU TRỤC TỰ ĐỘNG
                </span>
                <p className="text-xs text-white font-semibold">Khu vực cẩu trục gắp phôi tự động</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-space-sm px-space-lg py-space-sm rounded bg-white hover:bg-slate-50 text-slate-800 text-label-technical uppercase tracking-wider border border-slate-300 hover:border-steel-600 transition-all shadow-sm"
            href="#"
          >
            KHÁM PHÁ NĂNG LỰC SẢN XUẤT
            <span className="material-symbols-outlined text-[16px] text-steel-600">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
