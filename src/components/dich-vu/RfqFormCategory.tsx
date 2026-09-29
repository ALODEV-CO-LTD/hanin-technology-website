"use client";

export default function RfqFormCategory() {
  return (
    <section className="w-full bg-white border border-slate-200 rounded p-space-md lg:p-space-xl shadow-sm mb-space-xl" id="rfq-form">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-space-lg">
          <span className="text-label-sm text-steel-600 uppercase font-bold tracking-widest">
            GATEWAY BÁO GIÁ KỸ THUẬT
          </span>
          <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
            YÊU CẦU BÁO GIÁ DỊCH VỤ XI MẠ (RFQ SPECIFICATION)
          </h2>
          <p className="text-body-md text-slate-600 mt-2 max-w-xl mx-auto">
            Gửi thông số, bản vẽ và tiêu chuẩn kiểm thử. Kỹ sư luyện kim Hanin phản hồi báo giá trong 24 giờ.
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-space-md"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Yêu cầu RFQ đã được chuyển tới Ban Kỹ Thuật Hanin Technology!");
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Tên Doanh Nghiệp / Công Ty *</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="VD: Công ty TNHH Cơ Khí Chính Xác..."
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Người Liên Hệ &amp; Chức Vụ *</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="Họ tên - Kỹ sư vật tư / Trưởng phòng mua hàng"
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Số Điện Thoại Kỹ Thuật / Zalo *</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="+84 ..."
              required
              type="tel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Email Nhận Báo Giá *</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="engineering@company.com"
              required
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Chủng Loại Xi Mạ Yêu Cầu *</label>
            <select
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              required
              defaultValue=""
            >
              <option value="">-- Chọn giải pháp bề mặt --</option>
              <option value="hard-chrome">Mạ Crom Cứng Công Nghiệp (Hard Chrome)</option>
              <option value="electroless-nickel">Mạ Niken Hóa Học Không Điện (ENP)</option>
              <option value="zinc-nickel">Mạ Hợp Kim Kẽm-Niken (Zn-Ni Automotive)</option>
              <option value="anodizing">Xử Lý Anodizing Nhôm Kỹ Thuật</option>
              <option value="custom">Tổ hợp mạ tùy chỉnh theo bản vẽ</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">Sản Lượng Dự Kiến / Đợt Giao *</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="VD: 5,000 pcs / tháng hoặc Theo đơn thử nghiệm"
              type="text"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-label-sm text-slate-900 uppercase font-bold">
              Yêu Cầu Kỹ Thuật Chi Tiết (Bề dày mạ, Giờ phun muối, Vật liệu nền)
            </label>
            <textarea
              className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder-slate-400 text-body-md outline-none focus:bg-white focus:border-steel-300 transition-all"
              placeholder="Nhập các tiêu chuẩn mong muốn, ví dụ: Nền thép S45C, bề dày mạ Ni 15-20µm, phun muối >480h không gỉ đỏ..."
              rows={3}
            />
          </div>
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-space-md rounded flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-steel-600 text-[32px]">attach_file</span>
              <div>
                <p className="text-title-md text-slate-900 font-bold">Đính Kèm Bản Vẽ Kỹ Thuật</p>
                <p className="text-label-sm text-slate-500">Hỗ trợ định dạng: PDF, STEP, DWG, IGES (Dung lượng tối đa 25MB)</p>
              </div>
            </div>
            <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-space-md py-2 rounded text-label-technical font-semibold transition-all">
              <span>CHỌN TẬP TIN</span>
              <input className="hidden" type="file" />
            </label>
          </div>
          <div className="md:col-span-2 flex items-center justify-between pt-space-sm flex-wrap gap-space-sm">
            <div className="flex items-center gap-2 text-slate-500 text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-steel-600">security</span>
              <span>Cam kết bảo mật thỏa thuận NDA cho mọi tài liệu bản vẽ khách hàng.</span>
            </div>
            <button
              className="bg-steel-600 hover:bg-steel-700 text-white px-space-xl py-3 rounded text-title-md font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              type="submit"
            >
              <span>XÁC NHẬN GỬI YÊU CẦU BÁO GIÁ RFQ</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
