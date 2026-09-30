import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { gilroy } from "@/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";

export const metadata: Metadata = {
  title: "",
  description:
    "Giải pháp gia công mạ kim loại và bề mặt công nghiệp chuẩn xác cao.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={gilroy.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-steel-600 selection:text-white">
        <NextIntlClientProvider>
          <Header />
          <main className="w-full pt-20 bg-slate-50 min-h-screen">
            <PageFade>{children}</PageFade>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
