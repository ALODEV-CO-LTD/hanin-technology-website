const SUBSTRATES = [
  "Thép hợp kim: SCM440, SKD11",
  "Thép cacbon: S45C, S50C, SS400",
  "Inox Austenitic & Martensitic",
  "Hợp kim Nhôm: A6061, A7075 (Zincate)",
  "Đồng thau (Brass) & Đồng đỏ",
  "Gang cầu (Ductile Iron)",
];

export default function DetailOverview() {
  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-md mb-space-md bg-slate-50 border border-slate-200 p-space-md rounded">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">
              TỔNG QUAN NGUYÊN LÝ &amp; PHẠM VI ỨNG DỤNG
            </h2>
          </div>
          <div className="text-label-sm text-slate-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-steel-600 text-[18px]">verified_user</span>
            <span>ROHS &amp; REACH COMPLIANT (LEAD &amp; CADMIUM FREE)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Cột 1: Bản chất cơ chế phản ứng */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-steel-600 flex items-center justify-center text-white text-title-md">
                01
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">Bản Chất Cơ Chế Phản Ứng</h3>
            </div>
            <p className="text-body-md text-slate-600">
              Mạ điện phân bị chi phối bởi mật độ dòng điện nên dày ở mép góc, mỏng ở rãnh sâu. Mạ Niken hóa học ENP
              thì vận hành theo nguyên lý{" "}
              <strong className="text-slate-900 font-semibold">lắng đọng tự xúc tác</strong>.
            </p>
            <div className="bg-white border border-slate-200 p-space-sm rounded text-label-sm text-slate-600 my-2">
              <code>[Ni²⁺ + 2e⁻ → Ni] // [H₂PO₂⁻ + H₂O → H₂PO₃⁻ + 2H⁺ + 2e⁻]</code>
            </div>
            <p className="text-body-md text-slate-600">
              Lớp Niken-Phosphor (Ni-P) hình thành đồng đều trên mọi điểm tiếp xúc dung dịch, tạo cấu trúc vô định
              hình (Amorphous) chống ăn mòn.
            </p>
          </div>

          {/* Cột 2: Phạm vi ứng dụng chiến lược */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-slate-600 flex items-center justify-center text-white text-title-md">
                02
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">Phạm Vi Ứng Dụng Chiến Lược</h3>
            </div>
            <p className="text-body-md text-slate-600">
              Dùng cho thiết bị công nghiệp nặng và cơ khí chính xác làm việc trong môi trường ma sát cao, ăn mòn
              hóa chất và nhiệt độ khắc nghiệt:
            </p>
            <ul className="flex flex-col gap-1.5 text-body-md text-slate-600 mt-1">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-steel-600 text-[18px] mt-0.5">check_circle</span>
                <span>
                  <strong>Dầu khí &amp; Khí hóa lỏng:</strong> Van bi áp lực cao, ống dẫn chống khí H2S/CO2.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-steel-600 text-[18px] mt-0.5">check_circle</span>
                <span>
                  <strong>Khuôn mẫu chính xác:</strong> Khuôn ép nhựa quang học không sinh khuyết tật bám dính.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-steel-600 text-[18px] mt-0.5">check_circle</span>
                <span>
                  <strong>Bán dẫn &amp; Thiết bị chân không:</strong> Giảm thoát khí vật liệu (outgassing).
                </span>
              </li>
            </ul>
          </div>

          {/* Cột 3: Chủng loại kim loại nền */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-slate-500 flex items-center justify-center text-white text-title-md">
                03
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">Chủng Loại Kim Loại Nền</h3>
            </div>
            <p className="text-body-md text-slate-600">
              Quy trình tiền xử lý của HANIN cho phép mạ ENP ổn định trên các dòng hợp kim công nghiệp sau:
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SUBSTRATES.map((item) => (
                <span
                  key={item}
                  className="bg-white border border-slate-200 px-2 py-1 rounded text-label-sm text-slate-800 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
