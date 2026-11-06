import { all } from "./db";
import { getImageOverrides } from "./site-images";
import slots from "./site-images.generated.json";
import refs from "./media-refs.generated.json";

/** Một chỗ trên website đang dùng ảnh: trang lớn / khối (trang nhỏ) / nhóm con / tên vị trí. */
export interface Usage {
  page: string;
  section: string;
  sub: string;
  label: string;
}

/** Khoá slot "<trang>/<khối>#n" hoặc "<trang>/<nhóm>/<mục>/<tên>" -> Usage (khớp image-labels.parseSlotKey). */
function fromSlotKey(key: string): Usage {
  const [page, second, ...rest] = key.split("/");
  const [comp, num] = second.split("#");
  const section = `${page}/${comp}`;
  if (num !== undefined) return { page, section, sub: "", label: `Ảnh ${num}` };
  if (rest.length >= 2) return { page, section, sub: rest[0], label: rest.slice(1).join("/") };
  return { page, section, sub: "", label: rest.join("/") };
}

/**
 * Với mỗi đường dẫn ảnh: các vị trí đang dùng nó (ảnh mặc định của vị trí, ảnh thay thế trong CMS,
 * banner, ảnh đại diện dịch vụ/sản phẩm/bài viết, logo khách hàng).
 */
export function getMediaUsage(): Map<string, Usage[]> {
  const map = new Map<string, Usage[]>();
  const add = (path: string | null | undefined, u: Usage) => {
    if (!path) return;
    const list = map.get(path) ?? [];
    if (!list.some((x) => x.section === u.section && x.sub === u.sub && x.label === u.label)) list.push(u);
    map.set(path, list);
  };

  // Ảnh cố định trong mã/nội dung: khối = tên tệp chứa (ví dụ PlatingServices).
  for (const [img, list] of Object.entries(refs as Record<string, { page: string; section: string }[]>))
    for (const r of list) add(img, { page: r.page, section: r.section, sub: "", label: r.section.split("/")[1] });

  const overrides = getImageOverrides();
  for (const s of slots) add(overrides[s.key] || s.url, fromSlotKey(s.key));

  for (const r of all<{ placement: string; image: string }>("SELECT placement, image FROM banners WHERE active = 1"))
    add(r.image, { page: "banner", section: "banner/banner", sub: "", label: r.placement });
  for (const r of all<{ title: string; image: string }>("SELECT title, image FROM services"))
    add(r.image, { page: "dich-vu", section: "dich-vu/anh-dai-dien", sub: "", label: r.title });
  for (const r of all<{ title: string; image: string }>("SELECT title, image FROM products"))
    add(r.image, { page: "san-pham", section: "san-pham/anh-dai-dien", sub: "", label: r.title });
  for (const r of all<{ title: string; image: string }>("SELECT title, image FROM posts"))
    add(r.image, { page: "tin-tuc", section: "tin-tuc/anh-bai-viet", sub: "", label: r.title });
  for (const r of all<{ name: string; logo: string }>("SELECT name, logo FROM clients"))
    add(r.logo, { page: "khach-hang", section: "khach-hang/logo", sub: "", label: r.name });
  return map;
}
