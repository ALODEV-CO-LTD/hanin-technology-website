import Link from "next/link";
import { PLATING_SERVICES } from "@/lib/services-data";

export default function ServiceCategories() {
  return (
    <section className="w-full mb-space-xl">
      <div className="flex items-center justify-between mb-space-md">
        <div>
          <span className="text-label-sm text-steel-600 uppercase font-bold tracking-wider">
            DANH MỤC DỊCH VỤ CHI TIẾT
          </span>
          <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
            CÁC CÔNG NGHỆ XI MẠ CỐT LÕI
          </h2>
        </div>
        <span className="hidden md:inline-block text-label-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded">
          {PLATING_SERVICES.length} NHÓM CÔNG NGHỆ ĐẠT CHUẨN Ô TÔ &amp; HÀNG KHÔNG
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {PLATING_SERVICES.map((service) => (
          <div
            key={service.slug}
            className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={service.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={service.image}
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 text-white px-2 py-0.5 rounded text-label-sm uppercase font-semibold">
                {service.badge ?? `MÃ: ${service.code}`}
              </div>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
              <div>
                <h3 className="text-title-md text-slate-900 font-bold">{service.title}</h3>
                <p className="text-label-sm text-slate-500 font-medium uppercase mb-2">{service.titleEn}</p>
                <p className="text-body-md text-slate-600">{service.description}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-space-sm rounded">
                <span className="text-label-sm text-slate-500 uppercase font-bold block mb-1">
                  {service.applicationLabel}
                </span>
                <p className="text-body-md text-slate-800 font-medium">{service.applicationText}</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-label-sm text-steel-600 font-bold">{service.statLabel}</span>
                <Link
                  href={`/dich-vu-gia-cong-ma/${service.slug}`}
                  className="text-steel-600 text-label-technical font-bold uppercase inline-flex items-center gap-1 hover:underline"
                >
                  Chi tiết <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
