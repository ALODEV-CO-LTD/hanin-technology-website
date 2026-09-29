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
      "https://lh3.googleusercontent.com/aida/AEtjO1WKDFGcG2EWy9oucbbPPg_ySP47FYSOc8k6inVvqZPsX1eyU8O5ApfBP3u6ESPzXXRPuK58GB6ci5upiD5JgOf8lf99NtCGdfYZuXhDu0R-Gwr0N4YYpK7bnl0cRtu-0L1y9B0neQ4hZvFbxtPdNm_FcMfUg7g7SYtcspSDp2vcIstjcVQMMjfxUxgAaqAsnD2b6sAMZh8NEErO7nARmMYhOqvEj3P9xqnqLhYB-3roUR4t2c8J2sFAd9i1",
    key: "tienXuLy",
  },
  {
    slug: "ma-crom-cung-cong-nghiep",
    code: "HAN-SRV-HCP-01",
    hasBadge: true,
    titleEn: "Hard Chrome Plating (Cr)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9YoBOnNH567ugkYUP0EQpSl7ZfxacfOzaSiNWdNOF7fOkfvX9SOFkRYC-iO77ufA_8B0h-ktxxvY9wlAlqFMf03ZlVwmkDt_LfRVhHbzLkxATKbs3_XIxiGL8vp86LKNaZcqlgKEnFRZH5D5YpmsAnsbps8byjmSoqEg_nieo_8BIVAqb5osDw4kWp3e_WydNkGE0Mba2_IY_T6xjTRNMZxavAGRcHk-vVOJKRA3zvBY2K8akOSdVzQ",
    key: "hardChrome",
  },
  {
    slug: "ma-niken-hoa-hoc-enp",
    code: "HAN-SRV-ENP-03",
    titleEn: "Electroless Nickel Plating (ENP)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFY0mKUKsKfpmZPu5TKoISAEl-wGQkZrKpt6keqQ2e7l8J2LPj1_zxcM1T6nt-G7p6gjrNtu5-KleM4T-QA3pmY8fFS-TSjk1RyqmNAvSMQKEKVG6c3cwnd_II7BSWfsWW_fyFn455SB3pf_rsJfA02oXEz_ePtDTYqgtdP8cKM5y_Eiknx_7XX9iZDkEnCnc7tqb0Rqn5h-TAqlag-dghtTttZZWhHXmb4Hlhso_ivQIIuPiEkqkBpw",
    key: "electrolessNickel",
  },
  {
    slug: "ma-kem-hop-kim-kem-niken",
    code: "HAN-SRV-ZN-02",
    titleEn: "Zinc & Zinc-Nickel Plating (Zn-Ni)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDz0p28RpX7niHdL3iFglKerNmrMDeb6y4rIYdrEr8KNQyoCwnd4_fwxn0CMpVhRLVD7IfC9AvKplH9EyadBngMZsbqjZXwYtc7j5HlfBWxFggI8YTCj4PSL49K-HcHV2xWjRxwf7FnSz3GqiFANj_P9oWkJbjrjTcwWerWgzGARjAoRN6tnX7XMJSwrmK0PEFfI19EsYmblBnuejdSf7YOOSY7FRibAqg81rKO0dm_O2eyHcXhgNy9-Q",
    key: "kemNiken",
  },
  {
    slug: "day-chuyen-son-ma-ket-hop",
    code: "HAN-SRV-DPX-05",
    titleEn: "Painting & Plating Duplex Line",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1XLIHqAlTlSCmdea9Z1Kkz1OGAOTOHIKSGsE8yuRihPuGUoaQfAr47I6SSvJVbzDR1bhBdGtL5NV3N_uc4ahFN-GqGiy3ghF7s0MAerjxNLdDjOY-punqbiXiL8Zp-S7eD2iUNXsfXKY8KzG8sUF02vweDsoQvnMUMzojFp9dE-3D6ddIRYCz3KoPKJm9rtqKNaIrqkrNA3cyC6fbfgNYfgv4r_5wy7rrruIE9zP22Kaw2bAIel3AbhLExM",
    key: "sonMaKetHop",
  },
  {
    slug: "xu-ly-nhom-ma-kim-loai-khac",
    code: "HAN-SRV-ANO-04",
    titleEn: "Anodizing & Specialized Finishing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrrgWIK97bbnXtebCIiyEg3as4T0FFVp0YlBrwPVZwMQJLUK_927paUrGz8p9TziSUIQArQmzzRUr8S1khEtl-jF7CaDvtj090OdTTx1TFOWXj4tpMMso3OcNU9RAYq6EhYy3BH4aVF6cA8fvxRCa1FQJt2_wpoQt6_zeni_9O_16eshWM7a4HBICv3rDazGvqiyer3cJ1N4LcQP8j5nFVzM65q81flNOHF78Uv-UHRZIJZYjou6dn2g",
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
