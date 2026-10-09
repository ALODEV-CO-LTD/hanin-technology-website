/**
 * Chuyển tên pháp lý công ty Việt Nam ("Công ty TNHH X Việt Nam") sang tiếng Trung/Hàn cho người đọc bản dịch.
 * Chỉ dịch phần hình thức công ty, "Việt Nam" và một số từ ngành thường gặp; tên riêng (X) giữ nguyên.
 * Tên không khớp mẫu được giữ nguyên, nên khách hàng nhập thêm trong CMS vẫn hiển thị an toàn.
 */
const WORDS: Record<"zh" | "ko", [string, string][]> = {
  zh: [
    ["Kim loại Ngũ kim", "五金金属"], ["Công nghiệp Ngũ kim", "五金工业"], ["Thiết bị vệ sinh", "卫浴设备"],
    ["Quốc tế", "国际"], ["Sản xuất", "制造"], ["Công nghiệp", "工业"],
  ],
  ko: [
    ["Kim loại Ngũ kim", "금속 하드웨어"], ["Công nghiệp Ngũ kim", "하드웨어 산업"], ["Thiết bị vệ sinh", "위생설비"],
    ["Quốc tế", "인터내셔널"], ["Sản xuất", "제조"], ["Công nghiệp", "산업"],
  ],
};
const FORMS = {
  zh: { ltd: "有限责任公司", single: "一人有限责任公司", jsc: "股份公司", plain: "公司", vn: "越南 " },
  ko: { ltd: "유한회사", single: "1인 유한회사", jsc: "주식회사", plain: "회사", vn: "베트남 " },
};

export function localizeLegalName(name: string, locale: string): string {
  if (locale !== "zh" && locale !== "ko") return name;
  const m = name.trim().match(/^Công ty\s+(TNHH Một thành viên|TNHH MTV|TNHH|Cổ phần|CP)?\s*(.*)$/i);
  if (!m) return name;
  const kind = /Một thành viên|MTV/i.test(m[1] ?? "") ? "single" : /^TNHH$/i.test(m[1] ?? "") ? "ltd" : /Cổ phần|^CP$/i.test(m[1] ?? "") ? "jsc" : "plain";
  let rest = m[2].trim();
  const vietnam = /\s*Việt Nam$/i.test(rest);
  rest = rest.replace(/\s*Việt Nam$/i, "");
  for (const [vi, tr] of WORDS[locale]) rest = rest.replace(new RegExp(vi, "gi"), tr);
  const f = FORMS[locale];
  return `${vietnam ? f.vn : ""}${rest.trim()} ${f[kind]}`.replace(/\s+/g, " ").trim();
}
