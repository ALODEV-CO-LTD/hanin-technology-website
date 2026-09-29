import Link from "next/link";
import { getRelatedServices } from "@/lib/services-data";

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedServices(currentSlug, 3);

  return (
    <section className="w-full mb-space-lg">
      <div className="flex items-center justify-between pb-space-sm mb-space-md flex-wrap gap-space-sm">
        <div>
          <span className="text-steel-600 text-label-sm uppercase tracking-wider font-semibold block mb-1">
            HỆ SINH THÁI GIA CÔNG BỀ MẶT
          </span>
          <h3 className="text-headline-sm text-slate-900 tracking-tight uppercase font-bold">
            CÁC DỊCH VỤ GIA CÔNG MẠ CHUYÊN NGÀNH BỔ TRỢ
          </h3>
        </div>
        <Link
          href="/dich-vu-gia-cong-ma"
          className="text-label-technical text-steel-600 uppercase font-semibold flex items-center gap-1 hover:underline"
        >
          <span>XEM TOÀN BỘ DANH MỤC</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {related.map((service) => (
          <Link
            key={service.slug}
            href={`/dich-vu-gia-cong-ma/${service.slug}`}
            className="group bg-white border border-slate-200 p-space-md rounded shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-label-sm text-steel-600 uppercase font-semibold">{service.code}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">
                  arrow_forward
                </span>
              </div>
              <h4 className="text-title-md text-slate-900 uppercase group-hover:text-steel-600 transition-colors font-bold">
                {service.title}
              </h4>
              <p className="text-body-md text-slate-600 mt-2">{service.description}</p>
            </div>
            <div className="mt-space-md pt-space-xs text-label-sm text-slate-500">{service.statLabel}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
