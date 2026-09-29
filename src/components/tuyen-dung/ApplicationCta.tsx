export default function ApplicationCta() {
  return (
    <section className="w-full py-space-xl bg-slate-100 relative">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="relative p-space-xl md:p-12 rounded bg-white border border-slate-200 shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-steel-600 via-steel-400 to-steel-600" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-steel-600/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-2 text-steel-600 text-label-technical uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-steel-600" />
                <span>JOIN OUR TEAM // CƠ HỘI NGHỀ NGHIỆP</span>
              </div>
              <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
                GIA NHẬP ĐỘI NGŨ HANIN
              </h2>
              <p className="text-body-lg text-slate-600 leading-relaxed max-w-xl">
                Gửi hồ sơ ứng tuyển (CV) hoặc liên hệ trực tiếp bộ phận Tuyển dụng để được tư vấn vị trí phù hợp
                với đội ngũ kỹ sư và chuyên gia xử lý bề mặt của HANIN.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-1">
                <div className="p-space-sm rounded bg-slate-50 flex items-start gap-2">
                  <span className="material-symbols-outlined text-steel-600 text-[20px] mt-0.5 shrink-0">
                    mail
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-slate-500 uppercase font-semibold">Email nhận hồ sơ</span>
                    <a
                      className="text-title-md text-slate-900 hover:text-steel-600 transition-colors font-bold"
                      href="mailto:tuyendung@hanintech.vn"
                    >
                      tuyendung@hanintech.vn
                    </a>
                  </div>
                </div>
                <div className="p-space-sm rounded bg-slate-50 flex items-start gap-2">
                  <span className="material-symbols-outlined text-steel-600 text-[20px] mt-0.5 shrink-0">
                    phone_in_talk
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-slate-500 uppercase font-semibold">
                      Hotline Tuyển dụng
                    </span>
                    <a
                      className="text-title-md text-slate-900 hover:text-steel-600 transition-colors font-bold"
                      href="tel:+842438186868"
                    >
                      (+84) 24 3818 6868 (Ext: 108)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-md p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-title-md text-slate-900 uppercase tracking-wider font-semibold">
                NỘP HỒ SƠ ỨNG TUYỂN NHANH
              </span>
              <p className="text-body-md text-slate-600">
                HANIN tiếp nhận hồ sơ ứng viên kể cả khi vị trí bạn quan tâm chưa được đăng tuyển chính thức.
              </p>
              <div className="flex flex-col gap-space-sm pt-1">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 py-space-sm px-space-md bg-steel-600 hover:bg-steel-700 text-white text-title-md rounded shadow-sm transition-colors uppercase tracking-wider text-center"
                  href="#open-positions"
                >
                  <span>XEM VỊ TRÍ TUYỂN DỤNG</span>
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
                </a>
                <a
                  className="w-full inline-flex items-center justify-center gap-2 py-space-sm px-space-md bg-white border border-slate-200 text-slate-900 hover:text-steel-600 text-title-md rounded shadow-sm hover:bg-slate-100 transition-colors uppercase tracking-wider text-center"
                  href="mailto:tuyendung@hanintech.vn?subject=%5BHANIN%20TECH%20CAREERS%5D%20H%E1%BB%93%20s%C6%A1%20%E1%BB%A9ng%20tuy%E1%BB%83n%20v%E1%BB%8B%20tr%C3%AD%3A"
                >
                  <span>GỬI CV TRỰC TIẾP (EMAIL)</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-500 text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">lock</span>
                <span>Bảo mật thông tin ứng viên theo quy chuẩn ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
