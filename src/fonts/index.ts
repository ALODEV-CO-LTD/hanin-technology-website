import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    { path: "./SVN-Gilroy_Regular.otf", weight: "400", style: "normal" },
    { path: "./SVN-Gilroy_Medium.otf", weight: "500", style: "normal" },
    { path: "./SVN-Gilroy_SemiBold.otf", weight: "600", style: "normal" },
    { path: "./SVN-Gilroy_Bold.otf", weight: "700", style: "normal" },
    { path: "./SVN-Gilroy_Heavy.otf", weight: "800", style: "normal" },
    { path: "./SVN-Gilroy_Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});
