const SPECS = [
  {
    tag: "DÂY CHUYỀN MẠ",
    title: "XX Dây chuyền tự động & bán tự động",
    desc: "Lập trình hành trình điều khiển PLC, kiểm soát chính xác thời gian ngâm bể và cường độ dòng điện.",
  },
  {
    tag: "THIẾT BỊ",
    title: "XX Thiết bị bể mạ & phụ trợ chuyên dụng",
    desc: "Hệ thống lọc tuần hoàn, trao đổi nhiệt tự động và hệ thống sấy khô chân không công nghiệp.",
  },
  {
    tag: "KIỂM SOÁT CHẤT LƯỢNG",
    title: "XX Thiết bị đo lường & kiểm nghiệm quang phổ",
    desc: "Máy đo huỳnh quang tia X (XRF), buồng thử nghiệm sương muối gia tốc ASTM B117 và kiểm tra độ bám dính.",
  },
  {
    tag: "NĂNG LỰC SẢN XUẤT",
    title: "XX Tấn / Sản phẩm mỗi tháng",
    desc: "Sẵn sàng điều phối luồng sản xuất đáp ứng nhu cầu cung ứng định kỳ của các chuỗi cơ khí chế tạo.",
  },
];

export default function ManufacturingCapability() {
  return (
    <section className="w-full py-space-xl bg-surface-container-lowest" id="nang-luc">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
              OPERATIONAL INFRASTRUCTURE
            </span>
          </div>
          <h2 className="text-headline-xl text-on-surface font-bold uppercase">
            NĂNG LỰC SẢN XUẤT
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Từ dây chuyền sản xuất đến hệ thống kiểm soát chất lượng, năng lực
            vận hành là nền tảng tạo nên sự ổn định trong từng sản phẩm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-6 relative rounded overflow-hidden shadow-2xl bg-surface-container-low">
            <div className="relative aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Bể mạ tự động đang vận hành tại HANIN (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                className="w-full h-full object-cover brightness-85"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-label-technical text-emerald-400 uppercase tracking-widest">
                  OPERATIONAL STATUS: ACTIVE
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-low/90 backdrop-blur-md p-space-md rounded flex items-center justify-around text-xs text-on-surface">
                <div className="flex flex-col items-center">
                  <span className="text-secondary">TEMP_CONTROL</span>
                  <span className="font-bold text-primary">58.4 °C</span>
                </div>
                <div className="w-px h-6 bg-surface-container-highest" />
                <div className="flex flex-col items-center">
                  <span className="text-secondary">VOLTAGE_RMS</span>
                  <span className="font-bold text-primary">12.8 V</span>
                </div>
                <div className="w-px h-6 bg-surface-container-highest" />
                <div className="flex flex-col items-center">
                  <span className="text-secondary">CIRCULATION</span>
                  <span className="font-bold text-tertiary">99.4 %</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-sm">
              {SPECS.map((spec) => (
                <div
                  key={spec.tag}
                  className="p-space-md bg-surface-container rounded flex flex-col gap-1 transition-colors hover:bg-surface-container-high"
                >
                  <span className="text-label-technical uppercase tracking-wider text-primary">
                    {spec.tag}
                  </span>
                  <span className="text-headline-sm text-on-surface font-semibold">
                    {spec.title}
                  </span>
                  <span className="text-body-sm text-on-surface-variant">{spec.desc}</span>
                </div>
              ))}
            </div>
            <div className="pt-space-xs">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container hover:bg-inverse-primary text-on-primary text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md"
              >
                KHÁM PHÁ NĂNG LỰC →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
