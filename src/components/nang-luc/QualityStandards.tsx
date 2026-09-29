const CARDS = [
  {
    icon: "verified",
    iconAccent: true,
    tagLabel: "CHỨNG NHẬN CHẤT LƯỢNG",
    tagAccent: true,
    title: "ISO 9001:2015",
    desc: "Hệ thống quản lý chất lượng sản xuất, bảo đảm tính ổn định lặp lại của từng lô hàng gia công mạ cơ khí kỹ thuật cao.",
    footer: "AUDITED ANNUALLY // GLOBAL RECOGNITION",
  },
  {
    icon: "eco",
    iconAccent: false,
    tagLabel: "QUẢN LÝ MÔI TRƯỜNG",
    tagAccent: false,
    title: "ISO 14001:2015",
    desc: "Hệ thống quản lý môi trường và xử lý nước thải công nghiệp khép kín, bảo đảm tuân thủ quy chuẩn bảo vệ môi trường Việt Nam.",
    footer: "CLOSED-LOOP EFFLUENT TREATMENT",
  },
  {
    icon: "rule",
    iconAccent: false,
    tagLabel: "QUY CHUẨN XUẤT KHẨU",
    tagAccent: false,
    title: "[ASTM & RoHS/REACH]",
    desc: "Tuân thủ chỉ thị hạn chế chất nguy hại RoHS/REACH châu Âu, các tiêu chuẩn ASTM B117, ASTM B633 và tiêu chuẩn công nghiệp Nhật Bản JIS.",
    footer: "ZERO HAZARDOUS SUBSTANCES",
  },
];

export default function QualityStandards() {
  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
              MANAGEMENT STANDARDS
            </span>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">CHẤT LƯỢNG &amp; TIÊU CHUẨN</h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">
            Hệ thống quản lý chất lượng và quy chuẩn kỹ thuật được áp dụng toàn diện trong từng công đoạn sản
            xuất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center mb-space-md font-bold ${
                    card.iconAccent ? "bg-steel-100 text-steel-600" : "bg-slate-200/80 text-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <div
                  className={`text-label-technical tracking-widest uppercase mb-1 font-semibold ${
                    card.tagAccent ? "text-steel-600" : "text-slate-600"
                  }`}
                >
                  {card.tagLabel}
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{card.title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-space-md pt-space-xs text-label-sm text-slate-500 uppercase border-t border-slate-200/60">
                {card.footer}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <a
            className="inline-flex items-center gap-1 text-label-technical text-steel-600 hover:text-slate-900 font-semibold uppercase tracking-wider transition-colors"
            href="#"
          >
            XEM CHI TIẾT CHỨNG NHẬN →
          </a>
        </div>
      </div>
    </section>
  );
}
