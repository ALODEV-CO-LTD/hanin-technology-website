import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    { path: "./SVN-Gilroy_Regular.woff2", weight: "400", style: "normal" },
    { path: "./SVN-Gilroy_Medium.woff2", weight: "500", style: "normal" },
    { path: "./SVN-Gilroy_SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./SVN-Gilroy_Bold.woff2", weight: "700", style: "normal" },
    { path: "./SVN-Gilroy_Heavy.woff2", weight: "800", style: "normal" },
    { path: "./SVN-Gilroy_Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});
