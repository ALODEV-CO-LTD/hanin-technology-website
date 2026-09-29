import Link from "next/link";

const HIGHLIGHTS = [
  "Độ bám dính & chống ăn mòn vượt trội",
  "Kiểm định độ dày micron chuẩn xác",
  "Gia công quy mô công nghiệp hàng loạt",
  "Hệ thống xử lý nước thải đạt chuẩn",
];

export default function AboutHanin() {
  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-5 relative group">
            <div className="relative overflow-hidden rounded border border-slate-200 shadow-md bg-white aspect-[4/3] lg:aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Kỹ sư giám sát quy trình mạ kim loại tại HANIN (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-slate-200">
                <span className="text-[10px] text-orange-600 uppercase tracking-widest font-mono font-bold">
                  HỆ THỐNG KCS // BỂ MẠ SỐ 04
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-space-sm rounded border border-slate-200/80 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-title-md text-slate-900 font-semibold">
                    Quy Trình Kiểm Soát Khép Kín
                  </p>
                  <p className="text-[11px] text-slate-600">
                    TIÊU CHUẨN XỬ LÝ BỀ MẶT CÔNG NGHIỆP
                  </p>
                </div>
                <span className="material-symbols-outlined text-orange-600 text-[20px]">verified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-orange-600" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-orange-600 font-bold">
                VỀ HANIN VIỆT NAM
              </span>
            </div>
            <h2 className="text-headline-xl text-slate-900 font-bold">
              Năng lực tạo nên sự khác biệt.
            </h2>
            <div className="flex flex-col gap-space-sm text-body-md text-slate-600 leading-relaxed">
              <p>
                HANIN TECHNOLOGY VIỆT NAM tập trung vào lĩnh vực gia công mạ kim
                loại và năng lực sản xuất phục vụ khách hàng công nghiệp.
              </p>
              <p className="text-slate-600 bg-white border border-slate-200 p-space-md rounded">
                [Thông tin chính thức của doanh nghiệp sẽ được cập nhật đồng bộ
                theo tiêu chuẩn năng lực sản xuất và quy mô vận hành].
              </p>
            </div>
            <div className="grid grid-cols-2 gap-space-md pt-space-xs text-body-sm text-slate-700">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-orange-600 text-[18px]">
                    check_circle
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-space-sm">
              <Link
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 text-title-md uppercase tracking-wider text-orange-600 hover:text-orange-700 transition-colors group"
              >
                <span>XEM THÊM VỀ HANIN</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
