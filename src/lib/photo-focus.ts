/**
 * Điểm lấy nét (object-position "x% y%") của từng ảnh nhà máy: khi khung ảnh hẹp hơn ảnh gốc
 * (khung ngang rộng, khung vuông...) phần được giữ lại là vùng quanh điểm này thay vì chính giữa.
 * Chủ thể trong ảnh nhà máy thường nằm ở nửa dưới (sàn, kệ, bể), nửa trên là trần và đèn.
 * Ảnh không có trong bảng (ảnh tải lên từ CMS...) dùng chính giữa.
 */
const FOCUS: Record<string, string> = {
  // KHO
  "kho-1": "50% 72%", "kho-2": "50% 70%", "kho-3": "50% 70%", "kho-4": "50% 56%", "kho-5": "50% 60%", "kho-6": "50% 62%",
  "showcase-kho": "50% 62%",
  // MẠ QUAY
  "ma-quay-1": "50% 55%", "ma-quay-2": "50% 62%", "ma-quay-3": "50% 62%", "ma-quay-4": "50% 50%",
  "ma-quay-5": "50% 62%", "ma-quay-6": "50% 62%", "ma-quay-7": "50% 62%",
  // MẠ TREO
  "ma-treo-1": "50% 42%", "ma-treo-2": "50% 48%", "ma-treo-3": "50% 48%", "ma-treo-4": "50% 52%", "ma-treo-5": "50% 46%",
  "showcase-treo": "50% 48%",
  // PHÂN TÍCH
  "phan-tich-1": "50% 58%", "phan-tich-2": "50% 55%", "phan-tich-3": "50% 50%", "phan-tich-4": "50% 50%",
  "showcase-lab": "50% 58%", "showcase-may": "50% 45%",
  // QC
  "qc-1": "50% 42%", "qc-2": "50% 42%", "qc-3": "50% 46%", "qc-4": "50% 56%", "qc-5": "50% 55%", "qc-6": "50% 55%",
  "qc-7": "50% 62%", "qc-8": "50% 55%",
};

/** object-position mặc định cho ảnh; undefined nếu không có trong bảng. */
export function photoFocus(src: string | undefined | null): string | undefined {
  if (!src) return undefined;
  const base = src.split("?")[0].split("/").pop()?.replace(/\.[a-z0-9]+$/i, "");
  return base ? FOCUS[base] : undefined;
}
