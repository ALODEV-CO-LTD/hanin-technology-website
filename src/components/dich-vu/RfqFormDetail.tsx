"use client";

export default function RfqFormDetail() {
  return (
    <section className="w-full mb-space-xl" id="rfq-form">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-steel-100/60 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between pb-space-md mb-space-md bg-slate-50 border border-slate-200 p-space-md rounded">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mt-1 font-bold">
              GỬI THÔNG SỐ &amp; YÊU CẦU MẠ NIKEN HÓA HỌC (ENP)
            </h2>
            <p className="text-body-md text-slate-600 mt-1">
              Kỹ sư luyện kim HANIN phản hồi báo giá và kế hoạch mạ mẫu trong vòng 24 giờ làm việc.
            </p>
          </div>
          <div className="mt-space-sm md:mt-0 text-label-sm text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded">
            HOTLINE KỸ THUẬT: <strong className="text-steel-600 font-bold">+84 (0) 211 388 9021</strong>
          </div>
        </div>

        <form
          className="space-y-space-md"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Yêu cầu báo giá kỹ thuật mạ ENP đã được gửi đến bộ phận kỹ sư HANIN.");
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                Tên Doanh Nghiệp / Khách Hàng <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="VD: Tập Đoàn Chế Tạo Cơ Khí Samtech VN"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                Kỹ Sư Phụ Trách / Người Liên Hệ <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="VD: Kỹ sư Nguyễn Văn A"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                Email Kỹ Thuật / Báo Giá <span className="text-steel-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="eng-procurement@company.com"
                required
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                Vật Liệu Nền (Substrate) <span className="text-steel-600">*</span>
              </label>
              <select
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                defaultValue="S45C"
              >
                <option value="S45C">Thép Cacbon (S45C, S50C, SS400)</option>
                <option value="SCM440">Thép Hợp Kim (SCM440, SKD11, SUJ2)</option>
                <option value="SUS">Thép Không Gỉ (SUS304, SUS316, SUS420)</option>
                <option value="ALUMINUM">Hợp Kim Nhôm (A6061-T6, A7075)</option>
                <option value="COPPER">Đồng / Hợp Kim Đồng Thau</option>
                <option value="CAST_IRON">Gang Đúc / Gang Cầu FCD</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">Cấp Độ Phosphor Yêu Cầu</label>
              <select
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                defaultValue="HIGH_PHOS"
              >
                <option value="HIGH_PHOS">High Phos (&gt;10% P): kháng ăn mòn cao</option>
                <option value="MED_PHOS">Medium Phos (6-9% P): chống mài mòn</option>
                <option value="LOW_PHOS">Low Phos (1-4% P): tăng độ cứng nền</option>
                <option value="CONSULT">Nhờ Kỹ Sư HANIN Tư Vấn Theo Ứng Dụng</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">Chiều Dày Lớp Mạ (µm)</label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="VD: 15 µm ± 1.5 µm"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">Sản Lượng Dự Kiến</label>
              <input
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="VD: 2,500 chiếc/tháng (hoặc Mẫu test)"
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-label-sm text-slate-900 font-semibold uppercase">
                Ghi Chú Kỹ Thuật (Vị trí ren cần che, yêu cầu xử lý nhiệt, tiêu chuẩn thử nghiệm)
              </label>
              <textarea
                className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 text-body-md rounded focus:outline-none focus:bg-white focus:border-steel-300 transition-colors"
                placeholder="Ghi rõ các yêu cầu masking (bịt lỗ ren), nhiệt độ ủ Baking khử giòn hydro hoặc yêu cầu chứng chỉ kiểm tra muối ASTM B117..."
                rows={3}
              />
            </div>
            <div className="md:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200 p-space-sm rounded">
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-slate-900 font-semibold uppercase">Đính Kèm Bản Vẽ 2D / 3D</span>
                <p className="text-label-sm text-slate-500">Hỗ trợ STEP, IGES, DWG, PDF (Tối đa 50MB, bảo mật NDA)</p>
              </div>
              <label className="cursor-pointer mt-2 w-full py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-center text-label-technical uppercase rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-steel-600 text-[18px]">cloud_upload</span>
                <span>CHỌN FILE BẢN VẼ...</span>
                <input className="hidden" type="file" />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex items-center gap-2 text-slate-500 text-label-sm">
              <span className="material-symbols-outlined text-steel-600 text-[16px]">lock</span>
              <span>Cam kết bảo mật dữ liệu bản vẽ công nghệ theo thỏa thuận NDA quốc tế.</span>
            </div>
            <button
              className="inline-flex items-center gap-space-xs bg-steel-600 hover:bg-steel-700 text-white px-space-lg py-3 rounded text-label-technical uppercase tracking-wider shadow-sm transition-all"
              type="submit"
            >
              <span>GỬI YÊU CẦU BÁO GIÁ DỊCH VỤ MẠ ENP (24H RESPONSE)</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
