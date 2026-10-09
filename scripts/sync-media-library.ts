/**
 * Đồng bộ ảnh thật của nhà máy (public/images/factory/**) vào Thư viện ảnh của admin
 * với tên mô tả tiếng Việt, để chọn trong hộp "Chọn ảnh" của CMS. Chạy lại an toàn (cập nhật theo đường dẫn).
 *   npm run db:sync-media
 */
import fs from "node:fs";
import path from "node:path";
import { all, run, transaction } from "../src/server/db";

const DESC: Record<string, string> = {
  "kho-1": "Kho – can hoá chất xanh trên pallet (ảnh dọc)",
  "kho-2": "Kho – can hoá chất xếp trên pallet (ảnh dọc)",
  "kho-3": "Kho – dãy can hoá chất (ảnh dọc)",
  "kho-4": "Kho – kệ hàng có hàng quấn màng (ảnh dọc)",
  "kho-5": "Kho – hệ kệ hàng cao",
  "kho-6": "Kho – toàn cảnh kệ và pallet nhìn từ trên cao",
  "ma-quay-1": "Mạ quay – công nhân thao tác bể rửa (ảnh dọc)",
  "ma-quay-2": "Mạ quay – dây chuyền bể xanh (ảnh dọc)",
  "ma-quay-3": "Mạ quay – dây chuyền bể xanh, góc khác (ảnh dọc)",
  "ma-quay-4": "Mạ quay – tủ sấy (ảnh dọc)",
  "ma-quay-5": "Mạ quay – toàn cảnh xưởng thùng quay",
  "ma-quay-6": "Mạ quay – xưởng thùng quay, góc giữa",
  "ma-quay-7": "Mạ quay – xưởng thùng quay, góc cao",
  "ma-treo-1": "Mạ treo – giá treo sản phẩm dọc tường (ảnh dọc)",
  "ma-treo-2": "Mạ treo – dây chuyền tự động, cẩu cam",
  "ma-treo-3": "Mạ treo – dây chuyền tự động, góc khác",
  "ma-treo-4": "Mạ treo – tủ sấy (ảnh dọc)",
  "ma-treo-5": "Mạ treo – giá treo trong xưởng (ảnh dọc)",
  "phan-tich-1": "Phòng phân tích – khu thí nghiệm",
  "phan-tich-2": "Phòng phân tích – máy đo độ dày lớp mạ",
  "phan-tich-3": "Phòng phân tích – máy phun muối trung tính (NSS)",
  "phan-tich-4": "Phòng phân tích – máy phun muối CASS",
  "qc-1": "QC – khu kiểm tra IQC (nhân viên đang kiểm hàng)",
  "qc-2": "QC – khu kiểm tra IQC, góc khác",
  "qc-3": "QC – khu kiểm tra OQC",
  "qc-4": "QC – khu đóng gói, toàn cảnh",
  "qc-5": "QC – bàn kiểm tra thành phẩm, bảng chỉ dẫn phía trên",
  "qc-6": "QC – bàn kiểm tra thành phẩm, góc khác",
  "qc-7": "QC – dụng cụ đo: cân, panme, thước cặp",
  "qc-8": "QC – bàn kiểm tra và bảng chỉ dẫn quy trình",
  "showcase-kho": "Kho – bản HD cho khối trang chủ",
  "showcase-treo": "Mạ treo – bản HD cho khối trang chủ",
  "showcase-lab": "Phòng phân tích – bản HD cho khối trang chủ",
  "showcase-may": "Máy phun muối – bản HD cho khối trang chủ",
};

const ROOT = path.join(process.cwd(), "public");
const files = [
  ...fs.readdirSync(path.join(ROOT, "images/factory")).filter((f) => f.endsWith(".jpg")).map((f) => `images/factory/${f}`),
  ...fs.readdirSync(path.join(ROOT, "images/factory/hd")).filter((f) => f.endsWith(".jpg")).map((f) => `images/factory/hd/${f}`),
];

const result = transaction(() => {
  let added = 0;
  let updated = 0;
  for (const rel of files.sort()) {
    const code = path.basename(rel, ".jpg");
    const label = DESC[code];
    if (!label) continue;
    const webPath = `/${rel}`;
    const size = fs.statSync(path.join(ROOT, rel)).size;
    const existing = all<{ id: number }>("SELECT id FROM media WHERE path = ?", webPath)[0];
    if (existing) {
      run("UPDATE media SET original = ?, size = ? WHERE id = ?", `${label} (${code}).jpg`, size, existing.id);
      updated++;
    } else {
      run("INSERT INTO media (path, original, mime, size) VALUES (?, ?, 'image/jpeg', ?)", webPath, `${label} (${code}).jpg`, size);
      added++;
    }
  }
  return { added, updated };
});
console.log("Thư viện ảnh admin:", result);
