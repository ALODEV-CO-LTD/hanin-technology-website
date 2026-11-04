import { getClients } from "./public";

export interface FeaturedClient {
  name: string;
  logo: string;
}

/** Khách hàng tiêu biểu cho Trang chủ: cùng bảng CMS "Khách hàng tiêu biểu" với trang Giới thiệu. Logo gốc từ Company Profile (npm run db:client-logos). */
export function getFeaturedClients(): FeaturedClient[] {
  return getClients().map(({ name, logo }) => ({ name, logo }));
}
