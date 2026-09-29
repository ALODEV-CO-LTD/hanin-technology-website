export default function SpecTrustNote() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-margin py-space-md">
      <div className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex items-start gap-space-md">
        <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-steel-600 shrink-0">
          <span className="material-symbols-outlined text-[24px]">terminal</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label-technical uppercase tracking-wider text-steel-600 font-bold">
            CAM KẾT KỸ THUẬT &amp; DỮ LIỆU ĐO KIỂM TIÊU CHUẨN
          </span>
          <p className="text-body-sm text-slate-600 leading-relaxed">
            Tất cả sản phẩm và dự án tại HANIN được gia công theo bản vẽ kỹ thuật 2D/3D và tiêu
            chuẩn thử nghiệm nghiêm ngặt của từng đối tác OEM/Tier-1. Dữ liệu trên đây là khuôn mẫu
            thể hiện năng lực gia công thực tế trong buồng thử nghiệm đạt chuẩn ISO/IEC 17025.
          </p>
        </div>
      </div>
    </section>
  );
}
