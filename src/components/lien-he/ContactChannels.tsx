export default function ContactChannels() {
  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="text-label-technical uppercase tracking-widest text-orange-600 font-bold">
              SECTION 01 // DIRECT CHANNELS
            </span>
            <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
              HỆ THỐNG TRỤ SỞ &amp; ĐẦU MỐI KỸ THUẬT
            </h2>
          </div>
          <span className="text-body-sm text-slate-500">
            Phục vụ khách hàng trong nước &amp; chuỗi cung ứng xuất khẩu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Card 1: Headquarter & manufacturing plant */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-orange-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">factory</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                TRỤ SỞ &amp; NHÀ MÁY
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                CÔNG TY TNHH HANIN TECHNOLOGY VIỆT NAM
              </h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">
                Lô CN-08, Khu Công Nghiệp Quang Minh, Huyện Mê Linh, TP. Hà Nội, Việt Nam
              </p>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-slate-500 block font-semibold">
                QUY MÔ VẬN HÀNH
              </span>
              <span className="text-body-sm text-slate-900">
                Tổ hợp mạ tự động PLC &amp; Lab đo kiểm CMM ISO 17025
              </span>
            </div>
          </div>

          {/* Card 2: Hotline & tech consulting */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-sky-700" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-sky-700 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                HOTLINE TIẾP NHẬN
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                TƯ VẤN BÁO GIÁ &amp; DUNG SAI
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">Hotline Phòng Báo Giá:</span>
                  <a
                    href="tel:02438186868"
                    className="font-bold text-orange-600 hover:underline text-title-md block"
                  >
                    (+84) 24 3818 6868
                  </a>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    Kỹ sư Luyện kim (Direct CAD/Spec):
                  </span>
                  <span className="font-semibold text-slate-900 block">
                    (+84) 988 123 456 (24/7 Hotline)
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md flex items-center justify-between">
              <span className="text-label-sm text-slate-500">Tư vấn trực tiếp: Zalo / WhatsApp</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>

          {/* Card 3: Dedicated email channels */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-orange-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                HỘP THƯ CHUYÊN BIỆT
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                TIẾP NHẬN HỒ SƠ THẦU &amp; RFQ
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    Phòng Kinh Doanh &amp; Đơn Hàng Mới:
                  </span>
                  <a
                    href="mailto:sales@hanintech.vn"
                    className="font-semibold text-orange-600 hover:underline block"
                  >
                    sales@hanintech.vn
                  </a>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    Phòng Kỹ Thuật, R&amp;D &amp; Thử Nghiệm:
                  </span>
                  <a
                    href="mailto:engineering@hanintech.vn"
                    className="font-semibold text-slate-900 hover:underline block"
                  >
                    engineering@hanintech.vn
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-slate-500 block">
                Cổng PGP Encryption sẵn sàng theo yêu cầu
              </span>
            </div>
          </div>

          {/* Card 4: Operating schedules */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-500" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                CA VẬN HÀNH
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                KHỐI VĂN PHÒNG &amp; SẢN XUẤT
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    Khối Kỹ Thuật &amp; Văn Phòng:
                  </span>
                  <span className="text-slate-900 block font-medium">
                    Thứ 2 – Thứ 7: 08:00 – 17:30
                  </span>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    Khối Xưởng Mạ &amp; CNC Vận Hành:
                  </span>
                  <span className="text-slate-900 block font-medium">
                    3 Ca liên tục (24/7) theo lệnh sản xuất
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block font-semibold">
                Trực xử lý sự cố dây chuyền 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
