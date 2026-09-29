import Link from "next/link";

const COMPANY_LINKS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới thiệu doanh nghiệp", href: "/gioi-thieu" },
  { label: "Năng lực sản xuất", href: "/nang-luc-san-xuat" },
  { label: "Tin tức & Sự kiện", href: "/tin-tuc" },
  { label: "Cơ hội tuyển dụng", href: "/tuyen-dung" },
];

const SERVICE_LINKS = [
  { label: "Mạ Niken kỹ thuật (Electroless Nickel)", href: "/dich-vu-gia-cong-ma/ma-niken-hoa-hoc-enp" },
  { label: "Mạ Crom cứng công nghiệp (Hard Chrome)", href: "/dich-vu-gia-cong-ma/ma-crom-cung-cong-nghiep" },
  { label: "Anodizing nhôm & Hard Anodize", href: "/dich-vu-gia-cong-ma/xu-ly-nhom-ma-kim-loai-khac" },
  { label: "Mạ Kẽm - Niken chống ăn mòn cao", href: "/dich-vu-gia-cong-ma/ma-kem-hop-kim-kem-niken" },
  { label: "Bảng thông số tra cứu dung sai micron", href: "/nang-luc-san-xuat" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hanin-logo.svg" alt="HANIN Plating" className="h-10 w-auto" />
            </Link>
            <p className="text-body-sm text-slate-600 leading-relaxed max-w-sm">
              HANIN TECHNOLOGY VIỆT NAM — Nhà máy gia công xi mạ kỹ thuật cao,
              xử lý bề mặt kim loại cơ khí chính xác theo tiêu chuẩn công
              nghiệp Nhật Bản và quốc tế.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                ISO 9001:2015
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                ISO 14001
              </span>
              <span className="text-label-technical text-slate-700 uppercase px-2.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-semibold">
                RoHS &amp; REACH
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-orange-600 font-bold pb-space-xs border-b border-slate-200">
              Doanh nghiệp
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label} className="py-0.5">
                  <Link href={link.href} className="text-slate-600 hover:text-orange-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-orange-600 font-bold pb-space-xs border-b border-slate-200">
              Dịch vụ &amp; Sản phẩm
            </h3>
            <ul className="flex flex-col gap-space-xs text-body-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label} className="py-0.5">
                  <Link href={link.href} className="text-slate-600 hover:text-orange-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="text-label-technical uppercase tracking-widest text-orange-600 font-bold pb-space-xs border-b border-slate-200">
              Liên hệ kỹ thuật
            </h3>
            <div className="flex flex-col gap-space-xs text-body-sm text-slate-600">
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">Địa chỉ:</span>
                Lô CN-08, Khu Công Nghiệp Quang Minh, Huyện Mê Linh, Hà Nội
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">Hotline:</span>
                (+84) 24 3818 6868 / 0988 123 456
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">Email:</span>
                sales@hanintech.vn / engineering@hanintech.vn
              </p>
              <p className="leading-tight">
                <span className="text-slate-900 font-semibold block mb-0.5">Giờ làm việc:</span>
                Thứ 2 - Thứ 7: 08:00 - 17:30 (Trực ca 24/7)
              </p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <Link href="/lien-he" className="text-label-technical text-sky-700 hover:underline">
                  Zalo Chat Kỹ Thuật
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/lien-he" className="text-label-technical text-sky-700 hover:underline">
                  Google Maps Chỉ Đường
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-space-xl pt-space-md border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-technical text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hệ thống dây chuyền mạ &amp; đo lường CMM: SẴN SÀNG HOẠT ĐỘNG</span>
          </div>
          <p>© 2026 HANIN TECHNOLOGY VIỆT NAM. Tất cả quyền được bảo lưu. Chuẩn ISO 9001:2015.</p>
          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-orange-600 transition-colors">
              Chính sách bảo mật
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
