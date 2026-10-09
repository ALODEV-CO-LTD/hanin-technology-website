/**
 * Chọn ảnh minh hoạ cho phần nội dung mẫu dùng chung của trang chi tiết (thư viện ảnh, năng lực...).
 * Mỗi sản phẩm/dịch vụ (theo slug) nhận một bộ ảnh khác nhau từ kho ảnh thật của nhà máy,
 * không trùng ảnh đại diện của chính nó và không lặp ảnh trong cùng một trang.
 */
const f = (name: string) => `/images/factory/${name}.jpg`;

// Kho ảnh bộ ảnh sản phẩm: CỐ Ý không chứa ảnh riêng của sản phẩm (qc-7, qc-2, qc-3, kho-2, qc-5, kho-5)
// và ảnh dịch vụ; chỉ ảnh NGANG (khung 1.6–2.3), vì các khối "Dự án liên quan"/"Dịch vụ liên quan" ngay bên dưới đang hiện những ảnh đó.
export const PRODUCT_GALLERY_POOL = [
  "qc-1", "phan-tich-1", "phan-tich-2", "qc-4", "phan-tich-3", "qc-6", "qc-8", "kho-6",
].map(f);

// Chỉ dùng ảnh NGANG: các khung của trang chi tiết dịch vụ có tỉ lệ 1.3–2.1 (rộng), ảnh dọc sẽ bị cắt mất 60–75%.
export const SERVICE_GALLERY_POOL = [
  "ma-quay-5", "ma-treo-2", "ma-quay-6", "ma-treo-3", "ma-quay-7", "kho-6", "phan-tich-1",
].map(f);

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export function pickImages(seed: string, pool: string[], count: number, exclude: string[] = []): string[] {
  const start = hash(seed) % pool.length;
  const picked: string[] = [];
  for (let i = 0; i < pool.length && picked.length < count; i++) {
    const candidate = pool[(start + i) % pool.length];
    if (!exclude.includes(candidate) && !picked.includes(candidate)) picked.push(candidate);
  }
  return picked;
}
