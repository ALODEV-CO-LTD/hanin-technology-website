import Link from "next/link";

export default function CapabilityHero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-100 -mt-20 pt-28 pb-16 border-b border-slate-200">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVbGJwGBLCtR1FfUH6k02r2P-NiR8BAPFHnKHa0jtHPUl35bfil2EmH5HU_MuFoZ3ANHR2WUVUfFOyDEfy6xH2h8L_JXgXpud4nJiFxbIFhpWxMYp7ji-bzcQ73VEptZXwO2AGP8ot9l9tXlwQPWiGSKjxyVdf-Y5rIg1a0zRe2CQmQXe3CVHX22FXJIAwpE3XO8moxoHF9x6JPFGsgntioSxKEkNyDcZSpbFwu5Jbizom9bSXp7a-1w')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

      <div className="relative max-w-[1280px] mx-auto px-margin w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <Link className="hover:text-steel-600 transition-colors" href="/">
              Trang chủ
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-steel-600 font-semibold">Năng lực sản xuất</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded shadow-sm">
              FACILITY CODE: HN-MFG // LAT: 21.2025° N, 105.7725° E
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 border border-steel-200 rounded">
              <span className="w-2 h-2 rounded-full bg-steel-600 animate-pulse" />
              <span className="text-xs font-bold text-steel-700 uppercase">OPERATIONAL // 100% ONLINE</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl pt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight uppercase mb-4">
            NĂNG LỰC SẢN XUẤT
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Hệ sinh thái nhà xưởng chuẩn hóa, chuỗi dây chuyền mạ tự động điều khiển PLC SCADA và phòng thí nghiệm
            kiểm định vi mô đạt chuẩn quốc tế của HANIN TECHNOLOGY.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-8">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-steel-600 hover:bg-steel-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-all active:scale-[0.99] shadow-sm"
            href="#he-thong-nha-may"
          >
            KHÁM PHÁ NHÀ MÁY →
          </a>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
            href="#day-chuyen"
          >
            DÂY CHUYỀN SẢN XUẤT
          </a>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
            href="#kiem-nghiem"
          >
            PHÒNG ĐO KIỂM QA/QC
          </a>
        </div>
      </div>
    </section>
  );
}
