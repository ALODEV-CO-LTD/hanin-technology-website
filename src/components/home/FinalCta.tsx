export default function FinalCta() {
  return (
    <section
      className="w-full py-space-xl bg-surface-container-lowest relative overflow-hidden"
      id="bao-gia"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,181,153,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,181,153,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="p-space-lg md:p-space-xl rounded bg-surface-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl shadow-2xl">
          <div className="flex flex-col gap-space-md max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-primary" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
                PROJECT CONSULTATION
              </span>
            </div>
            <h2 className="text-headline-xl md:text-display-hero text-on-surface font-bold leading-tight uppercase">
              BẠN CÓ DỰ ÁN CẦN GIA CÔNG MẠ?
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Gửi yêu cầu để HANIN có thể tiếp nhận và tư vấn giải pháp phù hợp
              với các thông số kỹ thuật tối ưu.
            </p>
            <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
              <a
                href="#nhan-bao-gia"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-container hover:bg-inverse-primary text-on-primary text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-xl"
              >
                <span>GỬI YÊU CẦU BÁO GIÁ</span>
                <span className="material-symbols-outlined text-[20px]">send</span>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-space-sm p-space-md bg-surface-container-high rounded lg:min-w-[320px]">
            <span className="text-label-technical uppercase tracking-widest text-primary pb-1">
              LIÊN HỆ TRỰC TIẾP
            </span>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-primary text-[20px]">call</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary">HOTLINE HỖ TRỢ</span>
                <span className="text-title-md text-on-surface font-bold">024 3512 6688</span>
              </div>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary">ZALO KỸ THUẬT</span>
                <a href="#" className="text-title-md text-tertiary hover:underline font-semibold">
                  CHAT VỚI HANIN
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary">HỘP THƯ BÁO GIÁ</span>
                <span className="text-body-md text-on-surface font-mono">hanin@example.com</span>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary uppercase">ĐỊA CHỈ NHÀ XƯỞNG</span>
                <span className="text-body-sm text-on-surface leading-tight">
                  Lô 660 KCN Quang Minh, Xã Quang Minh, TP Hà Nội
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
