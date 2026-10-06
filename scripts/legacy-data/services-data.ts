// Bản chụp nội dung tĩnh cũ của website, chỉ dùng cho scripts/seed.ts để nạp dữ liệu ban đầu vào CMS.
// Website đang chạy KHÔNG import file này.
import type { useTranslations } from "next-intl";

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

type ServicesTranslator = ReturnType<typeof useTranslations<"DichVu">>;

/** Dữ liệu tĩnh không cần dịch: slug, mã dịch vụ, tên tiếng Anh, ảnh minh họa. */
const SERVICE_KEYS = [
  {
    slug: "tien-xu-ly-be-mat",
    code: "S-PRE-01",
    titleEn: "Surface Pre-treatment & Cleaning",
    image:
      "/images/factory/ma-quay-1.jpg",
    key: "tienXuLy",
  },
  {
    slug: "ma-crom-cung-cong-nghiep",
    code: "HAN-SRV-HCP-01",
    hasBadge: true,
    titleEn: "Hard Chrome Plating (Cr)",
    image:
      "/images/factory/ma-treo-2.jpg",
    key: "hardChrome",
  },
  {
    slug: "ma-niken-hoa-hoc-enp",
    code: "HAN-SRV-ENP-03",
    titleEn: "Electroless Nickel Plating (ENP)",
    image:
      "/images/factory/ma-quay-3.jpg",
    key: "electrolessNickel",
  },
  {
    slug: "ma-kem-hop-kim-kem-niken",
    code: "HAN-SRV-ZN-02",
    titleEn: "Zinc & Zinc-Nickel Plating (Zn-Ni)",
    image:
      "/images/factory/ma-quay-7.jpg",
    key: "kemNiken",
  },
  {
    slug: "day-chuyen-son-ma-ket-hop",
    code: "HAN-SRV-DPX-05",
    titleEn: "Painting & Plating Duplex Line",
    image:
      "/images/factory/ma-treo-3.jpg",
    key: "sonMaKetHop",
  },
  {
    slug: "xu-ly-nhom-ma-kim-loai-khac",
    code: "HAN-SRV-ANO-04",
    titleEn: "Anodizing & Specialized Finishing",
    image:
      "/images/factory/ma-treo-4.jpg",
    key: "xuLyNhom",
  },
] as const;

export function getServices(t: ServicesTranslator): PlatingService[] {
  return SERVICE_KEYS.map(({ slug, code, image, titleEn, key, ...rest }) => ({
    slug,
    code,
    titleEn,
    image,
    badge: "hasBadge" in rest && rest.hasBadge ? t(`services.${key}.badge`) : undefined,
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
    applicationLabel: t(`services.${key}.applicationLabel`),
    applicationText: t(`services.${key}.applicationText`),
    statLabel: t(`services.${key}.statLabel`),
    imageAlt: t(`services.${key}.imageAlt`),
  }));
}

export function getServiceBySlug(t: ServicesTranslator, slug: string): PlatingService | undefined {
  return getServices(t).find((service) => service.slug === slug);
}

/** Dịch vụ có nội dung trang chi tiết đầy đủ (mẫu ENP), dùng làm fallback cho các slug khác. */
export const DETAIL_TEMPLATE_SLUG = "ma-niken-hoa-hoc-enp";

export function getRelatedServices(t: ServicesTranslator, currentSlug: string, limit = 3): PlatingService[] {
  return getServices(t)
    .filter((service) => service.slug !== currentSlug)
    .slice(0, limit);
}
