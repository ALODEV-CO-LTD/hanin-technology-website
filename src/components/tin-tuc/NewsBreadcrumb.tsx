export default function NewsBreadcrumb() {
  return (
    <section className="w-full bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs text-label-sm text-slate-500">
          <a href="#" className="hover:text-steel-600 transition-colors">
            Trang chủ
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-slate-900 font-semibold">Tin tức</span>
        </div>
        <div className="flex items-center gap-space-sm text-label-sm">
          <span className="px-space-xs py-0.5 rounded bg-white text-slate-500 uppercase font-semibold border border-slate-200">
            CMS PORTAL: INDUSTRY INSIGHTS // STATUS: UPDATED REGULARLY
          </span>
          <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-steel-50 text-steel-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-steel-600 animate-pulse" />
            REALTIME R&amp;D SYNC
          </span>
        </div>
      </div>
    </section>
  );
}
