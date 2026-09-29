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

export const PLATING_SERVICES: PlatingService[] = [
  {
    slug: "tien-xu-ly-be-mat",
    code: "S-PRE-01",
    title: "Tiền Xử Lý Bề Mặt",
    titleEn: "Surface Pre-treatment & Cleaning",
    description:
      "Tẩy dầu mỡ siêu âm đa khoang, tẩy rỉ axit định lượng kiểm soát nồng độ và hoạt hóa bề mặt vi mô nhằm tối đa hóa lực liên kết phân tử lớp phủ.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Phôi kim loại dập nóng/nguội, linh kiện sau gia công phay tiện CNC chính xác.",
    statLabel: "Tẩy dầu sạch 100% không để vệt",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1WKDFGcG2EWy9oucbbPPg_ySP47FYSOc8k6inVvqZPsX1eyU8O5ApfBP3u6ESPzXXRPuK58GB6ci5upiD5JgOf8lf99NtCGdfYZuXhDu0R-Gwr0N4YYpK7bnl0cRtu-0L1y9B0neQ4hZvFbxtPdNm_FcMfUg7g7SYtcspSDp2vcIstjcVQMMjfxUxgAaqAsnD2b6sAMZh8NEErO7nARmMYhOqvEj3P9xqnqLhYB-3roUR4t2c8J2sFAd9i1",
    imageAlt: "Khu vực tiền xử lý & tẩy dầu bề mặt kim loại (ảnh minh họa)",
  },
  {
    slug: "ma-crom-cung-cong-nghiep",
    code: "HAN-SRV-HCP-01",
    badge: "TIÊU BIỂU: CHỐNG MÒN",
    title: "Mạ Crom Cứng Công Nghiệp",
    titleEn: "Hard Chrome Plating (Cr)",
    description:
      "Tạo lớp mạ có độ cứng bề mặt vượt trội (65 - 72 HRC), hệ số ma sát cực thấp, chống xước cơ học và ổn định nhiệt độ làm việc khắc nghiệt.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Trục piston xilanh thủy lực, con lăn cán thép công nghiệp, khuôn dập chính xác.",
    statLabel: "Độ cứng: 65 - 72 HRC | Bề dày đến 300µm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9YoBOnNH567ugkYUP0EQpSl7ZfxacfOzaSiNWdNOF7fOkfvX9SOFkRYC-iO77ufA_8B0h-ktxxvY9wlAlqFMf03ZlVwmkDt_LfRVhHbzLkxATKbs3_XIxiGL8vp86LKNaZcqlgKEnFRZH5D5YpmsAnsbps8byjmSoqEg_nieo_8BIVAqb5osDw4kWp3e_WydNkGE0Mba2_IY_T6xjTRNMZxavAGRcHk-vVOJKRA3zvBY2K8akOSdVzQ",
    imageAlt: "Trục và chi tiết cơ khí mạ crom cứng công nghiệp (ảnh minh họa)",
  },
  {
    slug: "ma-niken-hoa-hoc-enp",
    code: "HAN-SRV-ENP-03",
    title: "Mạ Niken Hóa Học Không Dùng Điện",
    titleEn: "Electroless Nickel Plating (ENP)",
    description:
      "Phản ứng khử hóa học tự xúc tác cho phép độ dày đồng đều 100% trên các góc nhọn, ren sâu và biên dạng lỗ rỗng, kháng hóa chất xuất sắc.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Van điều áp công nghiệp, linh kiện hàng không vũ trụ, thiết bị bán dẫn.",
    statLabel: "Hàm lượng P: Mid (6-9%) & High (>10%)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFY0mKUKsKfpmZPu5TKoISAEl-wGQkZrKpt6keqQ2e7l8J2LPj1_zxcM1T6nt-G7p6gjrNtu5-KleM4T-QA3pmY8fFS-TSjk1RyqmNAvSMQKEKVG6c3cwnd_II7BSWfsWW_fyFn455SB3pf_rsJfA02oXEz_ePtDTYqgtdP8cKM5y_Eiknx_7XX9iZDkEnCnc7tqb0Rqn5h-TAqlag-dghtTttZZWhHXmb4Hlhso_ivQIIuPiEkqkBpw",
    imageAlt: "Van và chi tiết cơ khí mạ niken hóa học ENP (ảnh minh họa)",
  },
  {
    slug: "ma-kem-hop-kim-kem-niken",
    code: "HAN-SRV-ZN-02",
    title: "Mạ Kẽm & Hợp Kim Kẽm-Niken",
    titleEn: "Zinc & Zinc-Nickel Plating (Zn-Ni)",
    description:
      "Bảo vệ catốt hy sinh vượt trội. Công nghệ Zn-Ni kháng phun muối lên đến 1,500 giờ trước gỉ đỏ, chịu nhiệt độ cao trong khoang động cơ xe.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Bulong, ecu cường độ cao, linh kiện dập gầm ô tô xe máy, phụ tùng phanh.",
    statLabel: "Kháng muối: >1200h ASTM B117",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDz0p28RpX7niHdL3iFglKerNmrMDeb6y4rIYdrEr8KNQyoCwnd4_fwxn0CMpVhRLVD7IfC9AvKplH9EyadBngMZsbqjZXwYtc7j5HlfBWxFggI8YTCj4PSL49K-HcHV2xWjRxwf7FnSz3GqiFANj_P9oWkJbjrjTcwWerWgzGARjAoRN6tnX7XMJSwrmK0PEFfI19EsYmblBnuejdSf7YOOSY7FRibAqg81rKO0dm_O2eyHcXhgNy9-Q",
    imageAlt: "Bulong và chi tiết dập gầm ô tô mạ kẽm-niken (ảnh minh họa)",
  },
  {
    slug: "day-chuyen-son-ma-ket-hop",
    code: "HAN-SRV-DPX-05",
    title: "Dây Chuyền Sơn & Mạ Kết Hợp",
    titleEn: "Painting & Plating Duplex Line",
    description:
      "Tích hợp hệ thống sấy công nghiệp và lớp lót mạ kẽm/phốt phát, tăng cường độ bám dính màng sơn tĩnh điện chịu tác động môi trường biển.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Vỏ tủ điều khiển điện tử, khung kim loại máy móc cơ khí, thiết bị viễn thông.",
    statLabel: "Độ bám dính: Cấp 0 (ISO 2409)",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1XLIHqAlTlSCmdea9Z1Kkz1OGAOTOHIKSGsE8yuRihPuGUoaQfAr47I6SSvJVbzDR1bhBdGtL5NV3N_uc4ahFN-GqGiy3ghF7s0MAerjxNLdDjOY-punqbiXiL8Zp-S7eD2iUNXsfXKY8KzG8sUF02vweDsoQvnMUMzojFp9dE-3D6ddIRYCz3KoPKJm9rtqKNaIrqkrNA3cyC6fbfgNYfgv4r_5wy7rrruIE9zP22Kaw2bAIel3AbhLExM",
    imageAlt: "Kỹ sư kiểm tra dây chuyền sơn và mạ kết hợp (ảnh minh họa)",
  },
  {
    slug: "xu-ly-nhom-ma-kim-loai-khac",
    code: "HAN-SRV-ANO-04",
    title: "Xử Lý Nhôm & Mạ Kim Loại Khác",
    titleEn: "Anodizing & Specialized Finishing",
    description:
      "Tạo màng oxit nhôm Al₂O₃ nhân tạo bền vững, anode hóa cứng (Hard Anodizing), mạ đồng (Cu), thiếc (Sn) và hoàn thiện thụ động hóa Crom III.",
    applicationLabel: "ỨNG DỤNG ĐIỂN HÌNH:",
    applicationText: "Linh kiện nhôm tản nhiệt, chi tiết quang học, thanh dẫn điện thanh cái busbar.",
    statLabel: "Độ cách điện: >1000V DC | Hard Coat 50µm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrrgWIK97bbnXtebCIiyEg3as4T0FFVp0YlBrwPVZwMQJLUK_927paUrGz8p9TziSUIQArQmzzRUr8S1khEtl-jF7CaDvtj090OdTTx1TFOWXj4tpMMso3OcNU9RAYq6EhYy3BH4aVF6cA8fvxRCa1FQJt2_wpoQt6_zeni_9O_16eshWM7a4HBICv3rDazGvqiyer3cJ1N4LcQP8j5nFVzM65q81flNOHF78Uv-UHRZIJZYjou6dn2g",
    imageAlt: "Chi tiết nhôm anode hóa và mạ kim loại khác (ảnh minh họa)",
  },
];

export function getServiceBySlug(slug: string): PlatingService | undefined {
  return PLATING_SERVICES.find((service) => service.slug === slug);
}

/** Dịch vụ có nội dung trang chi tiết đầy đủ (mẫu ENP) — dùng làm fallback cho các slug khác. */
export const DETAIL_TEMPLATE_SLUG = "ma-niken-hoa-hoc-enp";

export function getRelatedServices(currentSlug: string, limit = 3): PlatingService[] {
  return PLATING_SERVICES.filter((service) => service.slug !== currentSlug).slice(0, limit);
}
