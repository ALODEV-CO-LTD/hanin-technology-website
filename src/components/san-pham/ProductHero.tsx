import type { Product } from "@/lib/products-data";
import { PRODUCT_DETAIL_CONTENT } from "@/lib/products-data";

export default function ProductHero({ product }: { product: Product }) {
  const { heroStats, heroDescription, heroImage, heroImageAlt } = PRODUCT_DETAIL_CONTENT;

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-steel-50 border border-steel-200 text-steel-700 font-mono text-xs uppercase font-semibold">
                PROJECT DOSSIER // {product.lot}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 font-mono text-xs uppercase">
                DANH MỤC: {product.category.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight leading-tight">
              {product.title}
            </h1>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{heroDescription}</p>
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded">
              {(["steel", "sky", "slate"] as const).map((color, index) => {
                const stat = heroStats[index];
                if (!stat) return null;
                const valueColor =
                  color === "steel"
                    ? "text-steel-600"
                    : color === "sky"
                    ? "text-sky-700"
                    : "text-slate-900";
                const wrapperClass =
                  index === 0
                    ? "flex flex-col border-r border-slate-200 pr-3"
                    : index === 1
                    ? "flex flex-col border-r border-slate-200 pr-3 pl-2"
                    : "flex flex-col pl-2";
                return (
                  <div key={stat.label} className={wrapperClass}>
                    <span className="text-xs text-slate-500 uppercase font-mono">{stat.label}</span>
                    <span className={`text-lg md:text-xl font-bold ${valueColor} font-mono mt-1`}>
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-400">{stat.note}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-steel-600 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md"
                href="#quote-form"
              >
                <span>LIÊN HỆ BÁO GIÁ DỰ ÁN</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm uppercase tracking-wider rounded hover:bg-slate-100 hover:border-slate-300 transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-steel-600 text-[18px]">download</span>
                <span>TẢI BẢN VẼ KỸ THUẬT / SPEC SHEET (PDF)</span>
              </a>
            </div>
            <div className="flex items-center gap-5 pt-2 border-t border-slate-200 text-xs text-slate-500 font-mono flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
                <span className="text-slate-700 font-medium font-sans">ISO 9001:2015 CERTIFIED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sky-700 text-[16px]">shield</span>
                <span className="text-slate-700 font-medium font-sans">ROHS &amp; REACH COMPLIANT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-steel-600 text-[16px]">biotech</span>
                <span className="text-slate-700 font-medium font-sans">XRF COATING ASSAY</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="relative w-full aspect-[4/3] bg-slate-100 border border-slate-200 rounded overflow-hidden group shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={heroImageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={heroImage}
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between p-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded text-slate-600 text-xs shadow-sm font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-slate-900 font-medium">METROLOGY: 100% INSPECTED</span>
                </div>
                <span className="text-steel-600 font-semibold">TOLERANCE: ±0.1 µM</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="material-symbols-outlined text-steel-600 text-[18px]">straighten</span>
                  <span className="font-mono font-medium">PANME DIGITAL CALLOUT: 12.74mm</span>
                </div>
                <span className="text-emerald-700 font-mono font-semibold">ROBUST PASS</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between rounded">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-steel-600 text-[20px]">science</span>
                <span className="text-sm text-slate-700 font-medium">
                  Độ cứng vi mô sau nhiệt luyện hydro:
                </span>
              </div>
              <span className="text-base font-bold text-steel-600 font-mono">850 - 920 HV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
