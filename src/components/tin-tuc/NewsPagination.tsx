export default function NewsPagination() {
  return (
    <section className="w-full bg-white py-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="text-label-md text-slate-500">
          Hiển thị <span className="text-slate-900 font-bold">trang 1 trên 8</span> (Tổng cộng 48
          bài viết chuyên ngành)
        </div>
        <nav aria-label="Pagination" className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            className="px-space-sm py-1.5 rounded-lg bg-slate-100 text-slate-500 transition-colors text-title-md flex items-center gap-1 opacity-50 cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Trước</span>
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-lg bg-steel-600 text-white text-title-md font-bold transition-all shadow-sm"
          >
            1
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md transition-all"
          >
            2
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md transition-all"
          >
            3
          </button>
          <span className="px-1 text-slate-500 text-title-md">...</span>
          <button
            type="button"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md transition-all"
          >
            8
          </button>
          <button
            type="button"
            className="px-space-sm py-1.5 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors text-title-md flex items-center gap-1"
          >
            <span>Sau</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </nav>
      </div>
    </section>
  );
}
