import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/home/Hero";
import AboutHanin from "@/components/home/AboutHanin";
import PlatingServices from "@/components/home/PlatingServices";
import ManufacturingCapability from "@/components/home/ManufacturingCapability";
import FactoryShowcase from "@/components/home/FactoryShowcase";
import ProductsProjects from "@/components/home/ProductsProjects";
import QualityCertification from "@/components/home/QualityCertification";
import NewsUpdates from "@/components/home/NewsUpdates";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/", title: t("home.title"), description: t("home.description") });
}

export default function Home() {
  return (
    <ClientMessages keys={["AttachField", "DichVu.RfqFormCategory"]}>
    <div className="flex flex-col w-full text-on-surface">
      <Hero />
      <Reveal direction="right"><AboutHanin /></Reveal>
      <Reveal><PlatingServices /></Reveal>
      <Reveal direction="right"><ManufacturingCapability /></Reveal>
      <Reveal><FactoryShowcase /></Reveal>
      <Reveal><ProductsProjects /></Reveal>
      <Reveal><QualityCertification /></Reveal>
      <Reveal><NewsUpdates /></Reveal>
      <Reveal direction="left"><FinalCta /></Reveal>
    </div>
    </ClientMessages>
  );
}
