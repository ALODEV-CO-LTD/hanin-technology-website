/**
 * Nguồn duy nhất cho số liệu doanh nghiệp lặp lại nhiều nơi trên website.
 * Trong messages/*.json viết token {{khóa}} hoặc {{khóa:định-dạng}}; token được thay bằng số ở đây khi nạp bản dịch
 * (src/i18n/request.ts và loadBaseMessages cho trang quản trị). Sửa số ở một chỗ này là cập nhật mọi trang, mọi ngôn ngữ.
 *
 * Quy tắc không ghi đè: chỉnh sửa nội dung trong CMS (bảng content_overrides) được áp SAU token nên luôn thắng; chuỗi đã sửa tay
 * trong CMS giữ nguyên văn bản quản trị đã nhập.
 * Số liệu theo Company Profile 11126 và số liệu chính thức do Bên A cung cấp (khách hàng, mặt bằng, năm thành lập).
 */
export const FACTS = {
  /** Mặt bằng nhà máy mạ, m². */
  area: 2230,
  /** Công suất xử lý nước thải, m³/ngày đêm. */
  waste: 130,
  /** Nhân sự nhà máy mạ. */
  staff: 70,
  /** Năm thành lập. */
  founded: 2023,
  /** Số khách hàng (hơn). */
  customers: 100,
  /** Mã lô của nhà máy mạ trong KCN Quang Minh. */
  lot: "49G",
  /** Model máy đo độ dày lớp mạ. */
  apc: "APC-100",
  /** Hanin Tech (công ty mẹ): mã lô, nhân lực toàn hệ thống, năm thành lập. */
  hqLot: "660",
  hqStaff: 350,
  hqFounded: 2018,
  /** Dải công suất [min, max]. auto/hang/rotPcs: sản phẩm/ngày; rot: kg/ngày. */
  auto: [30000, 50000],
  hang: [10000, 20000],
  rot: [3000, 5000],
  rotPcs: [10000, 30000],
} as const;

type Locale = string;

function group(n: number, locale: Locale): string {
  const sep = locale === "vi" ? "." : ",";
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

function range(r: readonly [number, number], fmt: string, locale: Locale): string | null {
  const [a, b] = r;
  switch (fmt) {
    case "full": return `${group(a, locale)}–${group(b, locale)}`;
    case "fullTilde": return `${group(a, locale)}~${group(b, locale)}`;
    case "k": return `${a / 1000}–${b / 1000}`; // nghìn
    case "wan": return `${a / 10000}–${b / 10000}`; // vạn (zh)
    case "ton": return `${a / 1000}–${b / 1000}`; // tấn
    case "tonTilde": return `${a / 1000}~${b / 1000}`;
    default: return null;
  }
}

export function fact(name: string, fmt: string | undefined, locale: Locale): string | null {
  const v = (FACTS as Record<string, string | number | readonly number[]>)[name];
  if (v === undefined) return null;
  if (typeof v === "string") return v;
  if (typeof v === "number") return name === "founded" || name === "hqFounded" ? String(v) : group(v, locale);
  return range(v as readonly [number, number], fmt ?? "full", locale);
}

const TOKEN = /\{\{(\w+)(?::(\w+))?\}\}/g;

/** Thay token số liệu trong cây bản dịch. Token không biết giữ nguyên để lộ lỗi sớm. */
export function resolveFacts<T>(tree: T, locale: Locale): T {
  if (typeof tree === "string") {
    return (tree.includes("{{") ? tree.replace(TOKEN, (m, n, f) => fact(n, f, locale) ?? m) : tree) as T;
  }
  if (Array.isArray(tree)) return tree.map((v) => resolveFacts(v, locale)) as T;
  if (tree && typeof tree === "object") {
    return Object.fromEntries(Object.entries(tree).map(([k, v]) => [k, resolveFacts(v, locale)])) as T;
  }
  return tree;
}
