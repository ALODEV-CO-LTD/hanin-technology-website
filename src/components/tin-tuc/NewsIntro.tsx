export default function NewsIntro() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
          <div className="lg:col-span-8 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-orange-600 text-label-technical tracking-widest uppercase font-bold">
              <span className="w-2.5 h-0.5 bg-orange-600" />
              NEWS &amp; UPDATES // HANIN TECHNOLOGY
            </div>
            <h1 className="text-display-hero-mobile lg:text-display-hero text-slate-900 uppercase tracking-tight font-bold">
              TIN TỨC &amp; <span className="text-orange-600">BẢN TIN</span> KỸ THUẬT
            </h1>
            <p className="text-body-lg text-slate-600 max-w-2xl mt-space-xs">
              Cập nhật những hoạt động doanh nghiệp mới nhất, đột phá nghiên cứu công nghệ xử lý bề
              mặt kim loại, quy chuẩn đo kiểm chất lượng và góc nhìn chuyên sâu từ nhà máy HANIN.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm justify-end">
            <div className="bg-slate-50 border border-slate-200 p-space-md rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">Kho tư liệu</span>
                <span className="text-headline-sm text-slate-900 font-bold">68+ Bài viết</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined">library_books</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-space-md rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">Kiểm định chuyên sâu</span>
                <span className="text-headline-sm text-slate-900 font-bold">
                  5 Chuyên mục kỹ thuật
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined">verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
