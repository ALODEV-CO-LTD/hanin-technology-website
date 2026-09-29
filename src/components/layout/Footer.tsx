const FOOTER_COLUMNS = [
  {
    title: "Doanh nghiệp",
    links: [
      { label: "Giới thiệu", href: "#" },
      { label: "Năng lực sản xuất", href: "#nang-luc" },
    ],
  },
  {
    title: "Dịch vụ & Sản phẩm",
    links: [
      { label: "Dịch vụ gia công mạ", href: "#" },
      { label: "Sản phẩm & Dự án", href: "#" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { label: "Tin tức", href: "#" },
      { label: "Tuyển dụng", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-highest mt-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-headline-sm text-on-primary font-bold">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-headline-sm uppercase tracking-wider text-on-surface font-bold leading-none">
                  HANIN
                </span>
                <span className="text-label-technical tracking-[0.14em] text-primary uppercase mt-0.5">
                  TECHNOLOGY VN
                </span>
              </div>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
              HANIN TECHNOLOGY VIỆT NAM - Giải pháp gia công mạ kim loại và bề mặt
              công nghiệp chuẩn xác cao.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <span className="text-label-technical text-secondary uppercase px-space-xs py-0.5 bg-surface-container-high rounded border border-surface-variant">
                ISO 9001:2015
              </span>
              <span className="text-label-technical text-secondary uppercase px-space-xs py-0.5 bg-surface-container-high rounded border border-surface-variant">
                RoHS COMPLIANT
              </span>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2 flex flex-col gap-space-sm">
              <h3 className="text-label-technical uppercase tracking-widest text-primary pb-space-xs border-b border-surface-container-high">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-space-xs text-body-sm">
                {col.links.map((link) => (
                  <li key={link.label} className="py-0.5">
                    <a
                      href={link.href}
                      className="text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-primary pb-space-xs border-b border-surface-container-high">
              Liên hệ kỹ thuật
            </h3>
            <div className="flex flex-col gap-space-xs text-body-sm text-on-surface-variant">
              <p className="leading-tight">
                <span className="text-on-surface font-semibold block mb-0.5">
                  Địa chỉ:
                </span>
                Lô 660 KCN Quang Minh, Xã Quang Minh, TP Hà Nội
              </p>
              <p className="leading-tight">
                <span className="text-on-surface font-semibold block mb-0.5">
                  Hotline:
                </span>
                024 3512 6688
              </p>
              <p className="leading-tight">
                <span className="text-on-surface font-semibold block mb-0.5">
                  Email:
                </span>
                hanin@example.com
              </p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <a href="#" className="text-label-technical text-tertiary hover:underline">
                  Zalo Chat
                </a>
                <span className="text-outline-variant">•</span>
                <a href="#" className="text-label-technical text-tertiary hover:underline">
                  Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-space-xl pt-space-md border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-technical text-secondary">
          <p>© 2026 HANIN TECHNOLOGY VIỆT NAM. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-on-surface transition-colors">
              Chính sách bảo mật
            </a>
            <span className="text-outline-variant">|</span>
            <a href="#" className="hover:text-on-surface transition-colors">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
