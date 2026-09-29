import Link from "next/link";
import { getSpotlightProject } from "@/lib/products-data";

export default function FeaturedProjectSpotlight() {
  const project = getSpotlightProject();

  return (
    <section className="w-full bg-slate-100 border-y border-slate-200 py-space-xl overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-white border border-slate-200 rounded overflow-hidden shadow-md">
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] h-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              src={project.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30" />
            <div className="absolute top-space-md left-space-md right-space-md flex items-center justify-between pointer-events-none">
              <div className="px-space-sm py-space-xs bg-white/90 border border-slate-200 backdrop-blur-md rounded text-label-technical text-sky-700 font-bold shadow-sm">
                {project.imageBadge}
              </div>
              <div className="px-space-sm py-space-xs bg-white/90 border border-slate-200 backdrop-blur-md rounded text-label-technical text-steel-600 flex items-center gap-1.5 font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-steel-600 animate-ping" /> NHIỆT ĐỘ BỂ
                MẠ: 58.4°C
              </div>
            </div>
            <div className="absolute bottom-space-md left-space-md right-space-md bg-white/95 border border-slate-200 backdrop-blur-md p-space-sm rounded flex items-center justify-between text-slate-500 text-label-technical shadow-sm">
              <span className="font-semibold">CHU TRÌNH TỰ ĐỘNG PLC: BĂNG TẢI TREO</span>
              <span className="text-slate-900 font-bold">500.000 SẢN PHẨM / THÁNG</span>
            </div>
          </div>
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <h2 className="text-headline-lg text-slate-900 uppercase leading-snug font-bold">
                {project.title}
              </h2>
            </div>
            <p className="text-body-md text-slate-600 leading-relaxed">{project.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
              {project.specChips.map((chip) => (
                <div
                  key={chip.label}
                  className="p-space-sm bg-slate-50 border border-slate-200 rounded flex flex-col gap-1"
                >
                  <span className="text-label-technical uppercase text-slate-500 font-medium">
                    {chip.label}
                  </span>
                  <span className="text-body-sm text-slate-900 font-semibold">{chip.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-sm">
              <Link
                href={`/san-pham-du-an/${project.slug}`}
                className="inline-flex items-center justify-center px-space-md py-space-sm bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md font-bold"
              >
                XEM CHI TIẾT DỰ ÁN NÀY →
              </Link>
              <a
                className="inline-flex items-center justify-center px-space-md py-space-sm bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-label-technical uppercase tracking-wider rounded transition-colors font-bold"
                href="#"
              >
                TẢI CASE STUDY (PDF) ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
