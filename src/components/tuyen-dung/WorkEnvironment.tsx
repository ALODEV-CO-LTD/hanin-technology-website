export default function WorkEnvironment() {
  return (
    <section className="w-full py-space-xl bg-white">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            HÌNH ẢNH MÔI TRƯỜNG LÀM VIỆC THỰC TẾ
          </h2>
          <p className="text-body-lg text-slate-600">
            Hình ảnh thực tế tại nhà máy HANIN TECHNOLOGY VIỆT NAM: dây chuyền tự động hóa vận hành theo kỷ luật
            lao động nghiêm ngặt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main featured image */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[440px] md:h-[500px] rounded overflow-hidden shadow-sm group bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Khu vực điều hành & vận hành dây chuyền mạ tự động trung tâm tại HANIN Tech (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-space-lg left-space-lg right-space-lg flex flex-col gap-1 text-white">
                <div className="inline-flex items-center gap-2 text-steel-300 text-label-sm uppercase tracking-widest font-bold">
                  <span className="w-2 h-2 rounded-full bg-steel-400 animate-pulse" />
                  <span>PRODUCTION FACILITY 01</span>
                </div>
                <h3 className="text-headline-sm uppercase text-white font-semibold">
                  Khu vực điều hành &amp; vận hành dây chuyền mạ tự động trung tâm
                </h3>
                <p className="text-body-sm text-white/90 max-w-xl">
                  Dây chuyền mạ Niken &amp; Crom cứng khép kín với hệ thống xử lý khí thải và giám sát tự động
                  bằng vi điều khiển PLC.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting visuals */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="relative w-full h-[236px] md:h-[238px] rounded overflow-hidden shadow-sm group bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Thành phẩm linh kiện cơ khí sau mạ đạt chuẩn xuất khẩu chất lượng cao (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent" />
              <div className="absolute bottom-space-md left-space-md right-space-md flex flex-col text-white">
                <span className="text-label-sm text-steel-300 uppercase tracking-wider font-semibold">
                  METROLOGY &amp; QC INSPECTION
                </span>
                <h4 className="text-title-md uppercase font-semibold">
                  Thành phẩm linh kiện cơ khí chính xác sau mạ
                </h4>
                <p className="text-label-sm text-white/80">
                  Kiểm tra độ dày lớp mạ micromet (µm) bằng đầu đo quang phổ XRF
                </p>
              </div>
            </div>

            <div className="p-space-lg rounded bg-slate-100 border border-slate-200 shadow-sm flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-steel-600 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">biotech</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-500 text-label-sm font-bold uppercase">
                    ISO/IEC 17025
                  </span>
                </div>
                <h4 className="text-title-md text-slate-900 uppercase font-semibold">
                  Phòng kiểm nghiệm hóa lý vi mô
                </h4>
                <p className="text-body-sm text-slate-600">
                  Trang bị đầy đủ buồng phun sương muối NSS/AASS gia tốc độ ăn mòn, máy đo độ bám dính lớp mạ và
                  thiết bị phân tích dung dịch Hull Cell.
                </p>
              </div>
              <div className="pt-space-sm flex items-center gap-2 text-slate-500 text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-steel-600">verified</span>
                <span>100% lô hàng xuất xưởng đều có chứng chỉ CoC &amp; RoHS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
