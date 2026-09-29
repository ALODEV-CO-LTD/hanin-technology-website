const THUMBS = [
  {
    label: "CAMPUS NGOẠI QUAN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgaOkZAc9wCfNzXPhqs5hFNbTEnM2xvvKsGwvUx7gtBUeFNEc8sQnMjPO80BonzgeDTpKJ5ubLrgnx6Pv-lqKTlCm8SQIwcyw1UihtqJKkMdnmGmESKkDwMO0kzC-4asIgzlqjSTSi4RF964X2caOxlURKhOgwvfYdw6ATaGqVbrWi-Lc9FKRZqKiBEfBZR_Y9OA0S3Ogk6U4HP-VypxdxIbo0bsyyylZYC_gTvS-kNsLFxJHxyPcrRQ",
    alt: "Ngoại quan kiến trúc campus nhà máy sản xuất công nghiệp hiện đại của HANIN Technology Việt Nam tại khu công nghiệp Quang Minh (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
  },
  {
    label: "ĐIỀU KHIỂN & VẬN HÀNH",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvBp7RiIBpk7NxoGWeGxZJ7uWqX_pU1m54UF5GCUCxiRmhguKnLD_SDs_co5Spd6vOinoKhbZ0qLIoHNEpNtBV4l2iaLanstN23ULsiXnBQrIHe--JMh5nEMs68dZUxBh579Uf0y5yRWrvTHb2aCGCm2PqaSCvUEgP-qQDkmnGPEUNUQgyoNmAIjvK2asXZkE3kP_vy9khtcYKY7o11JH9SREey42MVvCeDE9FdPHoo5zErCL1P30sXA",
    alt: "Kỹ sư kỹ thuật tại bảng điều khiển điện tử điều chỉnh mật độ dòng điện và thời gian ngâm nhúng cho lớp phủ kim loại công nghiệp (ảnh minh họa, sẽ thay bằng ảnh thực tế)",
  },
  {
    label: "SẢN PHẨM HOÀN THIỆN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
    alt: "Ảnh cận cảnh chi tiết kim loại mạ điện hoàn thiện độ chính xác cao",
  },
  {
    label: "HỆ THỐNG GÁ KẸP RACKS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
    alt: "Không gian nội thất nhà máy hoàn thiện bề mặt kim loại công nghiệp hiện đại",
  },
];

export default function FactoryGallery() {
  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200" id="factory-gallery">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
              PHOTO DOCUMENTATION
            </span>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
              KHÔNG GIAN NHÀ MÁY &amp; DÂY CHUYỀN THỰC TẾ
            </h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">
            Hình ảnh ghi lại thực tế tại nhà máy HANIN: từ ngoại quan, dây chuyền mạ, khu máy móc tới kỹ sư vận
            hành và phòng đo kiểm.
          </p>
        </div>

        {/* Main Featured Image */}
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-lg overflow-hidden bg-slate-200 mb-gutter group shadow-md border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            alt="Hành lang dây chuyền mạ tự động công nghệ cao với các bể hóa chất phát sáng, cẩu trục robot và sàn nhà sạch bóng trong nhà máy công nghiệp hiện đại (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI3db8cTjyz3mUD84Oi_CzhLyNPdD69lVtZEfNnlMHVqeb9Izs9XZUyXNa8hlKluCP-w3yaQWlueMnFG2RVvyVYRq80nhdqEydf09UmgNu68-vesb3s4bXES-thslj4UBB4BvFNLJnM-U-DDKlBnl3ifhJDyiScgRjL-x5HPzHopORtpn3pXmKkRlvah8arFBTtQqEXh9Il89Jdm63oTw_ZsHpL299cfiZn03hp0DqpYndmN2g0GhvPg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-space-sm py-1 bg-white/95 backdrop-blur rounded text-label-technical text-slate-900 font-semibold uppercase shadow-sm">
              AUTOMATED PLATING CORRIDOR // KHU VỰC VẬN HÀNH TRUNG TÂM
            </span>
            <span className="hidden sm:inline-block text-label-technical text-steel-400 font-semibold">
              HANIN TECH INDUSTRIAL CAMPUS
            </span>
          </div>
        </div>

        {/* Secondary Grid of 4 Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {THUMBS.map((thumb) => (
            <div
              key={thumb.label}
              className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 group shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={thumb.alt}
                src={thumb.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 px-space-xs py-0.5 bg-white/90 backdrop-blur rounded text-label-sm text-slate-800 font-semibold uppercase shadow-sm">
                {thumb.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
