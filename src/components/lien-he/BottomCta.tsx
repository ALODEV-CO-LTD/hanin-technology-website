export default function BottomCta() {
  return (
    <section className="w-full bg-slate-900 text-white py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-2">
          <span className="text-label-sm uppercase tracking-widest text-orange-500 font-bold">
            READY FOR HIGH-PRECISION DELIVERY
          </span>
          <h2 className="text-headline-md font-bold text-white tracking-tight uppercase">
            SẴN SÀNG NÂNG TẦM CHẤT LƯỢNG BỀ MẶT CƠ KHÍ CỦA BẠN
          </h2>
          <p className="text-body-md text-slate-300 max-w-2xl">
            Đội ngũ kỹ sư luyện kim và dây chuyền tự động hóa của HANIN TECHNOLOGY VIỆT NAM sẵn sàng
            đáp ứng mọi yêu cầu khắt khe nhất từ đối tác toàn cầu.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md shrink-0">
          <a
            href="#rfq-form"
            className="px-space-lg py-3.5 bg-orange-600 hover:bg-orange-700 text-white text-label-md uppercase tracking-wider font-bold rounded shadow-md transition-all"
          >
            GỬI BẢN VẼ NGAY
          </a>
          <a
            href="tel:02438186868"
            className="px-space-lg py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-label-md uppercase tracking-wider font-bold rounded transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>(+84) 24 3818 6868</span>
          </a>
        </div>
      </div>
    </section>
  );
}
