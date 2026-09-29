import Link from "next/link";

const SERVICES = [
  {
    index: "01",
    tag: "CƠ KHÍ CHÍNH XÁC",
    title: "DỊCH VỤ MẠ 01",
    desc: "Gia công mạ bề mặt cơ khí chính xác đáp ứng độ bền và khả năng chống ăn mòn công nghiệp.",
  },
  {
    index: "02",
    tag: "DẪN ĐIỆN & LINH KIỆN",
    title: "DỊCH VỤ MẠ 02",
    desc: "Giải pháp mạ bảo vệ và tăng cường tính dẫn điện, thẩm mỹ cho chi tiết kỹ thuật cao.",
  },
  {
    index: "03",
    tag: "KIỂM SOÁT MICRON",
    title: "DỊCH VỤ MẠ 03",
    desc: "Công nghệ xử lý bề mặt kim loại với khả năng kiểm soát độ dày lớp mạ chuẩn micron.",
  },
  {
    index: "04",
    tag: "HÀNG LOẠT LỚN",
    title: "DỊCH VỤ MẠ 04",
    desc: "Gia công mạ quy mô công nghiệp hàng loạt với độ đồng đều và ổn định cao.",
  },
];

export default function PlatingServices() {
  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-steel-600" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-steel-600 font-bold">
                DỊCH VỤ XI MẠ
              </span>
            </div>
            <h2 className="text-headline-lg text-slate-900 font-bold">
              Dịch vụ gia công mạ theo nhu cầu công nghiệp.
            </h2>
          </div>
          <Link
            href="/dich-vu-gia-cong-ma"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 transition-colors whitespace-nowrap"
          >
            <span>XEM TẤT CẢ DỊCH VỤ</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {SERVICES.map((service) => (
            <Link
              key={service.index}
              href="/dich-vu-gia-cong-ma"
              className="flex flex-col justify-between p-space-lg bg-slate-50 border border-slate-200 rounded hover:border-steel-300 hover:shadow-lg hover:bg-white transition-all duration-200 group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-headline-lg text-steel-600 font-bold">{service.index}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 uppercase font-semibold">
                    {service.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-headline-sm text-slate-900 font-semibold group-hover:text-steel-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
              <div className="pt-space-lg flex items-center justify-between text-slate-500 group-hover:text-steel-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  CHI TIẾT KỸ THUẬT
                </span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
