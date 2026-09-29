import Link from "next/link";

const SPEC_HIGHLIGHTS = [
  {
    icon: "verified_user",
    label: "BẢO MẬT NDA 100%",
    desc: "Cam kết bảo mật tuyệt đối bản vẽ & quyền sở hữu trí tuệ",
  },
  {
    icon: "file_present",
    label: "2D/3D CAD FILE",
    desc: "Hỗ trợ định dạng STEP, DWG, DXF, IGES, PDF dung lượng 50MB+",
  },
  {
    icon: "science",
    label: "TƯ VẤN LUYỆN KIM",
    desc: "Kỹ sư vật liệu tư vấn trực tiếp chiều dày, ASTM & dung sai",
  },
];

export default function ContactHero() {
  return (
    <>
      {/* Breadcrumb & SLA status strip */}
      <section className="w-full bg-slate-100 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-margin py-space-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-600 text-body-sm">
            <Link href="/" className="hover:text-steel-600 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="text-slate-900 font-semibold">Liên hệ &amp; Báo giá kỹ thuật</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-label-sm uppercase tracking-wider text-slate-600">
              COMMUNICATION &amp; B2B INQUIRY // SLA RESPONSE: TRONG VÒNG 04 GIỜ LÀM VIỆC
            </span>
          </div>
        </div>
      </section>

      {/* Page hero: technical contact & RFQ portal */}
      <section className="w-full bg-white py-space-xl">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left hero content */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-1 bg-steel-50 text-steel-600 text-label-sm uppercase tracking-wider rounded font-semibold">
                  CONTACT HANIN // KẾT NỐI KỸ THUẬT
                </span>
                <span className="text-slate-500 text-label-sm">REF: HN-VNM-QUANGMINH</span>
              </div>
              <h1 className="text-headline-xl-mobile lg:text-display-hero font-bold tracking-tight text-slate-900 uppercase">
                LIÊN HỆ &amp;{" "}
                <span className="text-steel-600 underline decoration-steel-600/30 decoration-4 underline-offset-8">
                  YÊU CẦU BÁO GIÁ
                </span>{" "}
                KỸ THUẬT
              </h1>
              <p className="text-body-lg text-slate-600 leading-relaxed">
                HANIN TECHNOLOGY VIỆT NAM tư vấn giải pháp kỹ thuật xi mạ kim loại, gia công cơ khí
                chính xác và báo giá cho đối tác B2B, nhà thầu OEM/Tier-1 và doanh nghiệp FDI.
              </p>

              {/* Engineering spec highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                {SPEC_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.label}
                    className="p-space-md bg-slate-50 border border-slate-200 rounded shadow-sm flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2 text-steel-600">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-label-sm uppercase tracking-wider font-bold">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-body-sm text-slate-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right hero visual anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white border border-slate-200 rounded overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Toàn cảnh nhà máy HANIN TECHNOLOGY VIỆT NAM (ảnh minh họa, sẽ thay bằng ảnh thực tế do Bên A cung cấp)"
                  className="w-full h-80 lg:h-[420px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMAHR12DSPrsWOQHWfdTlDaNpp1LwgPnGnq6D7BdQzZ6xmVyK6MjotF4vVi7AmWKi92WGLKtgCUn84s6Iz8U6HKcl2LaJFMIAUD15w17JHyk1lcgy3m8Ct2ZKPFvoGwcoftf8ZNRrli07g18kQAWUAMBu4F5GoAmoiQxJiuEiUVJQWmhdq2KIs2ju1_DUY8vIA8cBP_UnnSRlCyz26_u4obDo1zxnsNlp9WLKHvm8HWCWhIfbve8rbwg"
                />
                {/* Technical overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-space-md rounded shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-label-sm uppercase tracking-wider text-slate-500 block">
                      TỔNG HÀNH DINH &amp; NHÀ MÁY
                    </span>
                    <span className="text-title-md font-bold text-slate-900 block">
                      KCN Quang Minh, Mê Linh, Hà Nội
                    </span>
                    <span className="text-label-sm text-steel-600 font-semibold">
                      Tọa độ: 21.2025° N, 105.7725° E
                    </span>
                  </div>
                  <a
                    href="#map-section"
                    className="w-10 h-10 rounded bg-steel-600 hover:bg-steel-700 text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">near_me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
