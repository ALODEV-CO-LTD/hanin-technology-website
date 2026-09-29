const LAB_ITEMS = [
  {
    icon: "biotech",
    title: "Máy Quang Phổ Tia X Huỳnh Quang (XRF)",
    desc: "Đo chính xác chiều dày lớp mạ đa tầng (Ni/Cr, Zn/Ni) với độ phân giải cấp độ nano-mét không phá hủy mẫu.",
  },
  {
    icon: "water",
    title: "Buồng Thử Nghiệm Phun Muối (Salt Spray Chamber)",
    desc: "Vận hành liên tục theo ASTM B117 và ISO 9227 để đánh giá khả năng chống ăn mòn gia tốc trong môi trường muối 5% NaCl.",
  },
  {
    icon: "straighten",
    title: "Thiết Bị CMM & Kính Hiển Vi Quang Học",
    desc: "Phân tích mặt cắt kim tương học, kiểm tra vết nứt vi mô, đo độ cứng micro Vickers và lực bám mạ.",
  },
];

const TEST_TABLE = [
  {
    method: "Độ dày lớp mạ",
    standard: "ASTM B568 / ISO 3497",
    criteria: "Dung sai ±0.1 µm",
    frequency: "Từng lô (100%)",
  },
  {
    method: "Kháng phun sương muối",
    standard: "ASTM B117 / ISO 9227",
    criteria: "Không gỉ trắng >240h, đỏ >1000h",
    frequency: "Định kỳ tuần",
  },
  {
    method: "Độ bám dính mạ",
    standard: "ASTM B571 / ISO 2819",
    criteria: "Không bong tróc khi uốn 180°",
    frequency: "Theo ca sản xuất",
  },
  {
    method: "Khử Hydro (Baking)",
    standard: "ASTM B850 / ISO 9588",
    criteria: "200°C ± 5°C trong 4h - 24h",
    frequency: "100% Chi tiết >1000 MPa",
  },
];

export default function QualityMetrology() {
  return (
    <section className="w-full mb-space-xl">
      <div className="bg-slate-50 border border-slate-200 rounded p-space-md lg:p-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div className="lg:col-span-5">
            <span className="text-label-sm text-steel-600 uppercase font-bold tracking-wider">
              HỆ THỐNG ĐO LƯỜNG VÀ KIỂM SOÁT
            </span>
            <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold mb-space-sm">
              PHÒNG THÍ NGHIỆM ĐO ĐỘ BỀN &amp; QUANG PHỔ XRF
            </h2>
            <p className="text-body-lg text-slate-600 mb-space-md">
              Chất lượng không chỉ dựa vào mắt nhìn. Mỗi lô thành phẩm đều được đối chiếu tiêu chuẩn quốc tế và cấp
              chứng nhận Certificate of Analysis (CoA) chi tiết.
            </p>
            <div className="flex flex-col gap-space-sm">
              {LAB_ITEMS.map((item) => (
                <div key={item.title} className="flex items-start gap-space-sm bg-white border border-slate-200 p-space-sm rounded shadow-sm">
                  <span className="material-symbols-outlined text-steel-600 text-[24px]">{item.icon}</span>
                  <div>
                    <span className="text-title-md text-slate-900 font-bold block">{item.title}</span>
                    <p className="text-body-md text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 p-space-md rounded shadow-sm">
              <div className="flex items-center justify-between pb-space-sm">
                <span className="text-title-md text-slate-900 font-bold uppercase">
                  BẢNG TIÊU CHUẨN THỬ NGHIỆM ĐỊNH MỨC
                </span>
                <span className="bg-slate-100 text-slate-600 text-label-sm px-2 py-0.5 rounded">REV-2025.A</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-body-md">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-label-sm uppercase">
                      <th className="py-2.5 px-3">Phương Pháp</th>
                      <th className="py-2.5 px-3">Tiêu Chuẩn Áp Dụng</th>
                      <th className="py-2.5 px-3">Chỉ Tiêu Đạt Chuẩn</th>
                      <th className="py-2.5 px-3">Tần Suất Kiểm Tra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {TEST_TABLE.map((row) => (
                      <tr key={row.method} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{row.method}</td>
                        <td className="py-2.5 px-3 text-slate-500">{row.standard}</td>
                        <td className="py-2.5 px-3 text-steel-600 font-bold">{row.criteria}</td>
                        <td className="py-2.5 px-3 text-slate-500">{row.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-space-md p-space-sm bg-slate-50 rounded flex items-center justify-between text-slate-500 text-label-sm">
                <span>Được hiệu chuẩn định kỳ theo chuẩn VILAS / ISO 17025</span>
                <span className="text-slate-900 font-semibold">BẢO HÀNH CHẤT LƯỢNG LỚP MẠ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
