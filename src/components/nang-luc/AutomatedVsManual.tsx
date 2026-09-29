export default function AutomatedVsManual() {
  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="mb-space-xl text-center max-w-2xl mx-auto">
          <span className="text-label-technical text-steel-600 font-semibold tracking-widest uppercase block mb-1">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
            DÂY CHUYỀN TỰ ĐỘNG VS DÂY CHUYỀN THỦ CÔNG
          </h2>
          <p className="text-body-md text-slate-600 mt-2">
            Kết hợp hài hòa giữa công nghệ tự động hóa sản lượng lớn và tính linh hoạt thủ công của kỹ sư tay
            nghề cao cho các chi tiết đặc thù.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* AUTOMATED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Dây chuyền mạ tự động với màn hình điều khiển PLC SCADA và cẩu trục robot di chuyển chi tiết cơ khí vào bể xử lý hóa chất (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVT-9zhcvu2BzRYn6t-Ha5sPn3PYQhlp4Kp1gsR7rcI0QQZJ4BT7zXXiCl6oNStYgNE9VZcacy23mGZoyLIb5j6MrPBvgLvcU2PqW18U0VAJ9MVOnhnxD880RoaWYp1CKf61l4ho0f9GeQuTAeDjnHSf-GpovsTk-cIxB8gY4qNwL2_qFfP6M8aNPO1daRz4JpjvUgA2hbi-WYzB6t-WRHPEFGP5CmKlbQWSCLcJWkFJu_8_gutmHO9w"
                />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 bg-white/90 backdrop-blur border border-slate-200 rounded text-label-technical text-steel-600 font-semibold shadow-sm">
                  SYSTEM: SCADA AUTOMATED
                </div>
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">
                DÂY CHUYỀN TỰ ĐỘNG (AUTOMATED LINES)
              </h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">
                Dây chuyền được lập trình điều khiển tự động qua hệ thống PLC SCADA, kiểm soát chính xác từng
                giây thời gian ngâm bể, mật độ dòng điện phân tích và tự động bổ sung ion hóa chất duy trì ổn
                định dung dịch.
              </p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>Kiểm soát tự động qua PLC &amp; SCADA đồng bộ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>Đồng đều 100% độ dày trên từng mẻ gia công</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-steel-600 material-symbols-outlined text-[16px]">check_circle</span>
                <span>Tối ưu chu kỳ sản xuất &amp; loại bỏ hoàn toàn sai số thao tác</span>
              </div>
            </div>
          </div>

          {/* MANUAL / SPECIALIZED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Kỹ thuật viên tay nghề cao trong trang phục bảo hộ kiểm tra thủ công các giá gá chi tiết kim loại tùy chỉnh trước khi nhúng hóa chất (ảnh minh họa, sẽ thay bằng ảnh thực tế)"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC12paqn4gFgRmeNAjSxCJsd5QXtRNxE8kxDGBT9X_NW8-Xfl8CetECOLR4-LU2We8qKWs9pFxvTdHxzCf0RrKBmfCD7mCETHMtLdTPFMjRJxTgMgTpWHgKQKifVsFUPolYeyzOOZYb1IPguA9ya1drqRpy9GPlAI1T1Tw5dtOdVWMLxsu1wLlh6czPFovf6fMfyxqn2RLcGk3YVEPLOxGxj8q4P_feOaqcx_6TnEZDZr5rSmfEm9upuA"
                />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 bg-white/90 backdrop-blur border border-slate-200 rounded text-label-technical text-slate-700 font-semibold shadow-sm">
                  SYSTEM: SPECIALIZED R&amp;D
                </div>
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">
                DÂY CHUYỀN THỦ CÔNG &amp; BÁN TỰ ĐỘNG (MANUAL &amp; SPECIALIZED)
              </h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">
                Dành riêng cho các đơn hàng mẫu kỹ thuật R&amp;D, các chi tiết cơ khí kết cấu phức tạp đòi hỏi
                gá đặt chuyên biệt theo bản vẽ hình học riêng biệt và linh hoạt căn chỉnh tham số mạ tức thời.
              </p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">tune</span>
                <span>Linh hoạt thích ứng cho các chi tiết kết cấu khó</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">science</span>
                <span>Phục vụ hiệu quả các đơn hàng thử nghiệm R&amp;D &amp; mẫu nhỏ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 material-symbols-outlined text-[16px]">engineering</span>
                <span>Kỹ sư tay nghề cao trực tiếp xử lý và hiệu chỉnh gá kẹp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
