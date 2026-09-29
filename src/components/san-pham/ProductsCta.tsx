export default function ProductsCta() {
  return (
    <section className="w-full bg-slate-100 border-y border-slate-200 py-space-xl my-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col items-center text-center">
        <h2 className="text-headline-xl-mobile lg:text-headline-xl uppercase text-slate-900 max-w-2xl font-bold">
          BẠN CÓ DỰ ÁN CẦN GIA CÔNG?
        </h2>
        <p className="text-body-lg text-slate-600 max-w-2xl mt-space-sm mb-space-lg leading-relaxed">
          Gửi bản vẽ 2D/3D hoặc trao đổi trực tiếp với đội ngũ kỹ sư giải pháp bề mặt của HANIN để
          nhận báo giá chi tiết và phương án tối ưu chi phí.
        </p>
        <a
          className="inline-flex items-center justify-center px-space-xl py-space-sm bg-steel-600 text-white font-bold text-title-md uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-xl"
          href="#bao-gia"
        >
          NHẬN BÁO GIÁ →
        </a>
        <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-xl text-label-technical text-slate-500">
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-steel-600 text-[16px]">call</span>
            <span>HOTLINE KỸ THUẬT: (+84) 24 3818 6688</span>
          </div>
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-steel-600 text-[16px]">mail</span>
            <span>EMAIL: sales@hanintech.vn</span>
          </div>
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">schedule</span>
            <span>PHẢN HỒI KỸ THUẬT TRONG 04 GIỜ LÀM VIỆC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
