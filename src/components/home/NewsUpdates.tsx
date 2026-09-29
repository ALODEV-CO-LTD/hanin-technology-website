const ARTICLES = [
  {
    tag: "Tin tức doanh nghiệp",
    year: "2025",
    title: "Định hướng phát triển năng lực công nghệ và mở rộng hệ thống gia công mạ",
    excerpt:
      "Tập trung nâng cao độ chính xác kỹ thuật và tuân thủ các quy chuẩn khắt khe từ đối tác B2B...",
  },
  {
    tag: "Hoạt động sản xuất",
    year: "2025",
    title: "Tối ưu hóa quy trình kiểm soát độ dày lớp mạ theo chuẩn công nghiệp",
    excerpt:
      "Ứng dụng các phương pháp đo lường hiện đại nhằm đảm bảo độ đồng đều trên từng lô sản phẩm...",
  },
  {
    tag: "Cập nhật dự án",
    year: "2025",
    title: "Triển khai hoàn thiện các gói gia công linh kiện phục vụ chuỗi cung ứng",
    excerpt:
      "Đáp ứng tiến độ và các yêu cầu kỹ thuật đối với nhóm sản phẩm gia công cơ khí phụ trợ...",
  },
];

export default function NewsUpdates() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-label-technical uppercase tracking-[0.2em] text-primary">
                NEWS &amp; UPDATES
              </span>
            </div>
            <h2 className="text-headline-xl text-on-surface font-bold">Tin tức &amp; cập nhật</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-secondary hover:text-primary transition-colors"
          >
            <span>XEM TẤT CẢ</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="p-space-lg bg-surface-container rounded shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between text-secondary">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-primary uppercase">
                    {article.tag}
                  </span>
                  <span className="text-xs font-mono">{article.year}</span>
                </div>
                <h3 className="text-title-md text-on-surface font-bold group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div className="pt-space-md flex items-center gap-2 text-primary text-[11px] uppercase tracking-wider">
                <span>ĐỌC BÀI VIẾT</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
