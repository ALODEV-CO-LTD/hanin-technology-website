import SocialLinks from "@/components/ui/SocialLinks";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LAYOUT_KEYS, pickMessages } from "@/i18n/client-messages";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { gilroy } from "@/fonts";
import Header from "@/components/layout/Header";
import { siteImg } from "@/server/site-images";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";
import StickyContact from "@/components/layout/StickyContact";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL, absUrl } from "@/lib/site-url";
import { getPhones, getSettings } from "@/server/settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { metadataBase: new URL(SITE_URL), title: t("site.title"), description: t("site.description") };
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
  const messages = pickMessages(await getMessages(), LAYOUT_KEYS);
  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const settings = getSettings();
  const orgLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "HANIN Plating",
        legalName: "Công ty Cổ phần Công nghiệp Mạ HANIN",
        url: SITE_URL,
        logo: absUrl("/hanin-logo.png"),
        telephone: getPhones().main || undefined,
        email: settings.salesEmail || undefined,
        address: { "@type": "PostalAddress", streetAddress: tFooter("address"), addressCountry: "VN" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "HANIN Plating",
        description: tMeta("site.description"),
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={gilroy.variable}>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-steel-600 selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={orgLd} />
          <Header logoSrc={siteImg("layout/Logo#1", "/hanin-logo.png")} />
          <main className="w-full pt-[var(--header-h)] bg-slate-50 min-h-screen">
            <PageFade>{children}</PageFade>
          </main>
          <Footer />
          <div aria-hidden="true" className="h-[calc(3.5rem+env(safe-area-inset-bottom))] bg-white lg:hidden" />
          <StickyContact />
          <SocialLinks floating />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
