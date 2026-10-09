import SocialLinks from "@/components/ui/SocialLinks";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { gilroy } from "@/fonts";
import Header from "@/components/layout/Header";
import { siteImg } from "@/server/site-images";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("site.title"), description: t("site.description") };
}

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
    <html lang={locale} data-scroll-behavior="smooth" className={gilroy.variable}>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-steel-600 selection:text-white">
        <NextIntlClientProvider>
          <Header logoSrc={siteImg("layout/Logo#1", "/hanin-logo.png")} />
          <main className="w-full pt-[var(--header-h)] bg-slate-50 min-h-screen">
            <PageFade>{children}</PageFade>
          </main>
          <Footer />
          <SocialLinks floating />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
