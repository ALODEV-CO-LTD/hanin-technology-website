import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Ảnh tĩnh trong /public không đổi tên khi thay nội dung (ảnh CMS tải lên luôn có tên mới), nên cho phép
// trình duyệt và Cloudflare lưu đệm lâu; stale-while-revalidate giúp cập nhật mượt khi có thay thế.
const STATIC_CACHE = "public, max-age=604800, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  // Cho phép build vào thư mục tạm (scripts/safe-build.sh) rồi hoán đổi, tránh để người dùng thấy trang mất CSS khi đang build.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Ảnh cục bộ được tối ưu qua /_next/image (WebP, đúng kích thước theo màn hình) rồi lưu đệm 30 ngày.
    formats: ["image/webp"],
    // 75 (mặc định) cho ảnh nhỏ/logo; 90 cho ảnh nhà máy: WebP q75 làm vỡ khối ở vùng chuyển sắc và cạnh mảnh.
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/uploads/**" }, { pathname: "/hanin-logo.png" }],
  },
  async headers() {
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
      { source: "/hanin-logo.:ext", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
    ];
  },
};

export default withNextIntl(nextConfig);
