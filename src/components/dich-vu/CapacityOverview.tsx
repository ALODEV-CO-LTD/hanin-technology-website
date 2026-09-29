const CAPABILITIES = [
  {
    icon: "precision_manufacturing",
    iconBg: "bg-steel-100",
    iconColor: "text-steel-600",
    title: "Dây Chuyền SCADA Tự Động",
    desc: "Điều khiển hành trình cẩu trục, mật độ dòng điện A/dm² và thời gian nhúng bể chính xác bằng phần mềm PLC đồng bộ, loại bỏ sai lệch con người.",
    statLeft: "Sản lượng: 450 Tấn/Tháng",
    statRight: "0% Lỗi bọt khí",
    statRightColor: "text-steel-600",
  },
  {
    icon: "science",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    title: "Dây Chuyền Chi Tiết Phức Tạp",
    desc: "Khuôn gá kỹ thuật tùy chỉnh chuyên dụng cho linh kiện vi cơ khí, chi tiết ren trong rỗng và bề mặt đòi hỏi mạ che chắn vùng dung sai lắp ghép.",
    statLeft: "Độ phức tạp: Rãnh sâu <0.5mm",
    statRight: "Gá treo chuyên dụng",
    statRightColor: "text-sky-700",
  },
  {
    icon: "water_ec",
    iconBg: "bg-slate-200",
    iconColor: "text-slate-700",
    title: "Xử Lý Nước Thải & Môi Trường",
    desc: "Hệ thống lọc tuần hoàn và trung hòa hóa chất đạt quy chuẩn QCVN 40:2011/BTNMT, bảo đảm tính bền vững cho chuỗi cung ứng xuất khẩu toàn cầu.",
    statLeft: "Công suất lọc: 300 m³/ngày",
    statRight: "QCVN Loại A",
    statRightColor: "text-slate-900",
  },
];

export default function CapacityOverview() {
  return (
    <section className="w-full mb-space-xl" id="capacity-overview">
      <div className="bg-slate-50 border border-slate-200 rounded p-space-md lg:p-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
              HỆ THỐNG GIA CÔNG XI MẠ CHUYÊN BIỆT
            </h2>
          </div>
          <p className="text-body-md text-slate-600 max-w-lg">
            02 xưởng sản xuất tích hợp hệ thống xử lý nước thải tuần hoàn khép kín, kiểm soát nồng độ bể mạ điện tử
            và phân tích quang học trực tiếp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {CAPABILITIES.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 p-space-md rounded shadow-sm">
              <div className={`w-10 h-10 rounded ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-space-sm`}>
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
              <h3 className="text-title-md text-slate-900 font-bold mb-1">{item.title}</h3>
              <p className="text-body-md text-slate-600">{item.desc}</p>
              <div className="mt-space-sm pt-space-xs text-label-sm text-slate-500 uppercase flex items-center justify-between">
                <span>{item.statLeft}</span>
                <span className={`font-bold ${item.statRightColor}`}>{item.statRight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
