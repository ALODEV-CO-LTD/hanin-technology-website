export interface PlatingService {
  /** URL slug, dùng cho route /dich-vu-gia-cong-ma/[slug] */
  slug: string;
  /** Mã dịch vụ kỹ thuật, hiển thị dạng badge trên card & breadcrumb */
  code: string;
  /** Nhãn nổi bật góc ảnh (tuỳ chọn), ví dụ "TIÊU BIỂU: CHỐNG MÒN" */
  badge?: string;
  title: string;
  titleEn: string;
  description: string;
  applicationLabel: string;
  applicationText: string;
  statLabel: string;
  image: string;
  imageAlt: string;
}
