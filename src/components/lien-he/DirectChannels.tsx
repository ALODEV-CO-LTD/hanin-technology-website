const CHANNELS = [
  {
    icon: "call",
    label: "GỌI HOTLINE KHẨN CẤP",
    title: "(+84) 24 3818 6868",
    desc: "Kết nối trực tiếp chuyên viên kỹ thuật giải pháp trong vòng 30 giây.",
    cta: "Gọi ngay bây giờ",
    href: "tel:02438186868",
    external: false,
  },
  {
    icon: "chat",
    label: "ZALO OFFICIAL B2B",
    title: "HANIN TECH OFFICIAL",
    desc: "Chat kỹ thuật 24/7, gửi nhanh ảnh mẫu thực tế và trao đổi bản vẽ sơ bộ.",
    cta: "Mở khung chat Zalo",
    href: "https://zalo.me",
    external: true,
  },
  {
    icon: "forward_to_inbox",
    label: "EMAIL TẬP TIN DUNG LƯỢNG LỚN",
    title: "sales@hanintech.vn",
    desc: "Dành cho các gói thầu dự án lớn đính kèm link Drive, OneDrive hoặc WeTransfer.",
    cta: "Soạn thư gửi báo giá",
    href: "mailto:sales@hanintech.vn",
    external: false,
  },
  {
    icon: "domain_verification",
    label: "ĐĂNG KÝ AUDIT NHÀ MÁY",
    title: "FACTORY TOUR / AUDIT",
    desc: "Tiếp đón đoàn chuyên gia đánh giá năng lực nhà cung ứng chuẩn ISO 9001/14001.",
    cta: "Đặt lịch hẹn khảo sát",
    href: "#rfq-form",
    external: false,
  },
];

export default function DirectChannels() {
  return (
    <section className="w-full bg-white py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="text-label-technical uppercase tracking-widest text-orange-600 font-bold block mb-1">
            SECTION 04 // REAL-TIME ESCALATION
          </span>
          <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
            KÊNH KẾT NỐI TRỰC TIẾP NHANH CHÓNG
          </h2>
          <p className="text-body-md text-slate-500 mt-2">
            Dành cho các yêu cầu gia công khẩn cấp, đơn hàng xuất khẩu hoặc lịch kiểm tra thực địa
            dây chuyền mạ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="p-space-lg bg-slate-50 hover:bg-white border border-slate-200 rounded transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded bg-orange-50 text-orange-600 flex items-center justify-center mb-space-md group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{channel.icon}</span>
                </div>
                <span className="text-label-sm uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  {channel.label}
                </span>
                <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                  {channel.title}
                </h3>
                <p className="text-body-sm text-slate-600 leading-normal">{channel.desc}</p>
              </div>
              <span className="mt-space-md text-orange-600 text-label-md font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{channel.cta}</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
