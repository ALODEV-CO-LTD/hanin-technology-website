import { all } from "./db";

/** 30 khách hàng tiêu biểu đúng tên trong Company Profile. dbName: tên bản ghi trong bảng clients có logo đã đối chiếu đúng thương hiệu. */
const FEATURED: { name: string; dbName?: string }[] = [
  { name: "LG Electronics" },
  { name: "D&M Global" },
  { name: "World Co." },
  { name: "Dong Kwang Vina" },
  { name: "Troy Hardware Việt Nam", dbName: "TROY HARDWARE" },
  { name: "Camex Việt Nam" },
  { name: "Anam Electronics" },
  { name: "SEGI Việt Nam" },
  { name: "Skylink" },
  { name: "Panasonic Việt Nam" },
  { name: "Safety Hardware Việt Nam (Inlead)", dbName: "SAFETY HARDWARE" },
  { name: "Kaijai Việt Nam" },
  { name: "Takagi Việt Nam" },
  { name: "TKR Việt Nam" },
  { name: "Mizuho" },
  { name: "MITAC Việt Nam" },
  { name: "Viglacera", dbName: "VIGLACERA" },
  { name: "Kim loại Ngũ kim Tin Ping Việt Nam", dbName: "TIN PING" },
  { name: "VinFast" },
  { name: "WMA Việt Nam" },
  { name: "KYOEI Việt Nam" },
  { name: "Innotek" },
  { name: "World Honor Việt Nam", dbName: "WORLD HONOR" },
  { name: "Quốc tế QJT Việt Nam", dbName: "QJT" },
  { name: "Fuzukaku Việt Nam" },
  { name: "An Phú Việt" },
  { name: "Uniden Việt Nam" },
  { name: "Yu-Won NRT", dbName: "YUWON" },
  { name: "VTC Tech", dbName: "VTC TECH" },
  { name: "Fa Yang Lighting (FAYANG)", dbName: "FAYANG" },
];

export interface FeaturedClient {
  name: string;
  logo: string;
}

export function getFeaturedClients(): FeaturedClient[] {
  const logos = new Map<string, string>();
  try {
    for (const row of all("SELECT name, logo FROM clients WHERE logo != ''")) {
      logos.set(String(row.name), String(row.logo));
    }
  } catch {
    /* DB không đọc được: hiển thị toàn bộ ô chữ */
  }
  return FEATURED.map(({ name, dbName }) => ({ name, logo: (dbName && logos.get(dbName)) || "" }));
}
