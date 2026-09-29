export default function ProductQuoteCta() {
  return (
    <section className="w-full bg-slate-100 py-space-xl" id="quote-form">
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-space-xl bg-white border border-slate-200 rounded relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-space-md">
            <svg className="text-orange-600" fill="currentColor" height="400" viewBox="0 0 100 100" width="400">
              <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" fill="currentColor" r="20" />
            </svg>
          </div>
          <div className="relative z-10 max-w-[840px] flex flex-col gap-space-md">
            <span className="text-label-technical text-orange-600 uppercase tracking-widest font-semibold">
              TECHNICAL ESTIMATION &amp; CONSULTING DESK
            </span>
            <h2 className="text-headline-xl-mobile lg:text-headline-xl text-slate-900 uppercase tracking-tight">
              CÓ YÊU CẦU GIA CÔNG TƯƠNG TỰ CHO DỰ ÁN CỦA BẠN?
            </h2>
            <p className="text-body-lg text-slate-600 leading-relaxed">
              Gửi hồ sơ bản vẽ 2D/3D (PDF, CAD, STP) và tiêu chuẩn kỹ thuật bề mặt yêu cầu. Đội ngũ
              kỹ sư luyện kim HANIN sẽ tính toán diện tích phủ, tư vấn quy trình hóa lý tối ưu và
              gửi báo giá chi tiết trong vòng{" "}
              <span className="text-orange-600 font-semibold">04 giờ làm việc</span>.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-orange-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-orange-700 active:scale-95 transition-all shadow-md"
                href="#"
              >
                <span>GỬI YÊU CẦU BÁO GIÁ DỰ ÁN</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <div className="flex flex-col text-label-sm text-slate-500">
                <span>CAM KẾT BẢO MẬT BẢN VẼ (NDA)</span>
                <span className="text-slate-800 font-medium">PHẢN HỒI KỸ THUẬT: &lt; 4 GIỜ</span>
              </div>
            </div>
            <div className="pt-space-md border-t border-slate-200 flex flex-wrap items-center gap-space-lg text-label-technical text-slate-500">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-orange-600 text-[20px]">call</span>
                <span>
                  Hotline Kỹ thuật:{" "}
                  <strong className="text-slate-900 tracking-wider font-mono">
                    (+84) 24 3818 6688
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-orange-600 text-[20px]">
                  mark_email_unread
                </span>
                <span>
                  Email Tiếp nhận CAD:{" "}
                  <strong className="text-slate-900 tracking-wider font-mono">
                    sales@hanintech.vn
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
