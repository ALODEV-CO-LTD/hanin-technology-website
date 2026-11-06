import { siteImg } from "@/server/site-images";
import * as data from "./block-images-data";

/**
 * Bản "sống" của ảnh các khối (block-images-data.ts): mỗi lần đọc một ảnh sẽ tra ảnh thay thế trong CMS
 * (mục "Hình ảnh trang") theo khoá "<nhóm>/<tên>/…". Chỉ dùng trong server component, trong hàm render.
 * Khoá và danh sách vị trí do scripts/scan-images.ts sinh từ block-images-data.ts.
 */
function live<T>(prefix: string, value: T): T {
  if (typeof value === "string") return siteImg(prefix, value) as T;
  if (value && typeof value === "object") {
    return new Proxy(value as object, {
      get(target, prop, receiver) {
        const v = Reflect.get(target, prop, receiver);
        if (typeof prop === "symbol" || typeof v === "function" || prop === "length") return v;
        return live(`${prefix}/${prop}`, v);
      },
    }) as T;
  }
  return value;
}

export const SERVICE_APPLICATION_IMAGES = live("dich-vu/ung-dung", data.SERVICE_APPLICATION_IMAGES);
export const SERVICE_PROCESS_IMAGES = live("dich-vu/quy-trinh", data.SERVICE_PROCESS_IMAGES);
export const SERVICE_FLOW_IMAGES = live("dich-vu/cong-doan", data.SERVICE_FLOW_IMAGES);
export const CERT_IMAGES = live("nang-luc/chung-nhan", data.CERT_IMAGES);
export const RELATED_SERVICE_IMAGES = live("san-pham/dich-vu-lien-quan", data.RELATED_SERVICE_IMAGES);
export const PRODUCT_PROFILE_GALLERY = live("san-pham/thu-vien", data.PRODUCT_PROFILE_GALLERY);
export const PRODUCTION_FLOW_IMAGES = live("nang-luc/quy-trinh-san-xuat", data.PRODUCTION_FLOW_IMAGES);
export const CORE_STRENGTH_IMAGES = live("gioi-thieu/the-manh", data.CORE_STRENGTH_IMAGES);
export const PROCESS_STAGE_IMAGES = live("nang-luc/cong-doan-quy-trinh", data.PROCESS_STAGE_IMAGES);
