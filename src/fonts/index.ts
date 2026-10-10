import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    { path: "./SVN-Gilroy_Regular.woff2", weight: "400", style: "normal" },
    { path: "./SVN-Gilroy_Medium.woff2", weight: "500", style: "normal" },
    { path: "./SVN-Gilroy_SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./SVN-Gilroy_Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
  // Chỉ nạp 4 độ đậm thật sự dùng (400/500/600/700). Heavy 800 (chỉ tiêu đề chân trang) và Black 900 (không dùng) đã bỏ:
  // trình duyệt dùng bản 700 cho font-extrabold. Giữ preload để tải song song với CSS, tránh chuỗi CSS → font làm chậm FCP.
});
