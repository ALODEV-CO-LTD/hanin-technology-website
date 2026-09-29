export default function RecruitmentBanner() {
  return (
    <section className="w-full py-space-lg bg-surface">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="p-space-lg md:p-space-xl rounded bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[linear-gradient(to_right,transparent,rgba(255,181,153,0.05))] pointer-events-none" />
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
                JOIN HANIN
              </span>
            </div>
            <h2 className="text-headline-lg text-on-surface font-bold">
              Cùng xây dựng tương lai công nghiệp.
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Khám phá các cơ hội nghề nghiệp tại HANIN. Gia nhập đội ngũ kỹ
              thuật và vận hành công nghệ cao.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0">
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-headline-lg text-primary font-bold">08</span>
              <span className="text-[11px] text-secondary uppercase">VỊ TRÍ ĐANG TUYỂN</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container hover:bg-inverse-primary text-on-primary text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md whitespace-nowrap"
            >
              <span>XEM VỊ TRÍ TUYỂN DỤNG</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
