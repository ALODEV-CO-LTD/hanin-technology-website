const ROWS = [
  {
    item: "Độ dày màng mạ (Thickness)",
    device: "Máy quang phổ huỳnh quang tia X (Fischer XRF)",
    standard: "ASTM B568 // ISO 3497",
    criteria: "Đạt ±1.0 µm so với bản vẽ thiết kế",
    frequency: "5 mẫu / mẻ (AQL L-II)",
  },
  {
    item: "Độ cứng vi mô (Microhardness)",
    device: "Máy đo vi độ cứng Vickers (Tải 100gf)",
    standard: "ASTM E384",
    criteria: "> 500 HV (Nguyên bản) / > 900 HV (Sau Baking)",
    frequency: "1 mẫu coupon / ca làm việc",
  },
  {
    item: "Khả năng kháng sương muối",
    device: "Buồng phun sương muối tuần hoàn NSS 5% NaCl",
    standard: "ASTM B117 // ISO 9227",
    criteria: "Không xuất hiện gỉ đỏ trong 500h - 1,000h",
    frequency: "Mẫu đại diện định kỳ tháng",
  },
  {
    item: "Độ bám dính lớp mạ (Adhesion)",
    device: "Thử nghiệm bẻ gập Mandrel 180° & Quench Sốc Nhiệt",
    standard: "ASTM B571",
    criteria: "Không bong tróc màng, không tách lớp vi mô",
    frequency: "100% mẫu kiểm tra coupon",
  },
  {
    item: "Độ rỗng vi mô (Porosity)",
    device: "Thử nghiệm phản ứng Ferroxyl Test",
    standard: "ASTM B733 Sec. 9.6",
    criteria: "Không tạo điểm xanh Fe-ferricyanide",
    frequency: "Mẫu coupon kiểm tra mẻ",
  },
];

export default function DetailQaTable() {
  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-sm mb-space-md gap-space-sm">
          <div>
            <span className="text-orange-600 text-label-sm uppercase tracking-wider font-semibold block mb-1">
              PHÒNG ĐO KIỂM &amp; THỬ NGHIỆM ĐỘC LẬP
            </span>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">
              QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG TIÊU CHUẨN QUỐC TẾ
            </h2>
          </div>
          <div className="text-label-sm text-slate-500">100% LÔ SẢN XUẤT ĐỀU CÓ DỮ LIỆU LƯU TRỮ 5 NĂM</div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-body-md">
            <thead>
              <tr className="bg-slate-100 text-slate-900 text-label-technical uppercase">
                <th className="py-3 px-4">Hạng Mục Kiểm Tra</th>
                <th className="py-3 px-4">Thiết Bị Đo Kiểm Chuyên Dụng</th>
                <th className="py-3 px-4">Tiêu Chuẩn Áp Dụng</th>
                <th className="py-3 px-4">Tiêu Chí Đạt Chuẩn (Acceptance Criteria)</th>
                <th className="py-3 px-4">Tần Suất Kiểm Tra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ROWS.map((row) => (
                <tr key={row.item} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-600" />
                      {row.item}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{row.device}</td>
                  <td className="py-3 px-4 text-label-sm text-slate-500">{row.standard}</td>
                  <td className="py-3 px-4 text-slate-900 font-medium">{row.criteria}</td>
                  <td className="py-3 px-4 text-slate-600">{row.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
