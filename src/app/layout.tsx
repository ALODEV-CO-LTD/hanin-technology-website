import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HANIN TECHNOLOGY VIỆT NAM",
  description:
    "HANIN TECHNOLOGY VIỆT NAM - Giải pháp gia công mạ kim loại và bề mặt công nghiệp chuẩn xác cao.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary">
        <Header />
        <main className="w-full pt-20 bg-surface min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
