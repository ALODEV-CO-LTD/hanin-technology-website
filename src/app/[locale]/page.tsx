import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/home/Hero";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import AboutHanin from "@/components/home/AboutHanin";
import PlatingServices from "@/components/home/PlatingServices";
import ManufacturingCapability from "@/components/home/ManufacturingCapability";
import FactoryShowcase from "@/components/home/FactoryShowcase";
import ProductsProjects from "@/components/home/ProductsProjects";
import QualityCertification from "@/components/home/QualityCertification";
import NewsUpdates from "@/components/home/NewsUpdates";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("home.title"), description: t("home.description") };
}

export default function Home() {
  return (
    <div className="flex flex-col w-full text-on-surface">
      <Hero />
      <Reveal><CompanySnapshot /></Reveal>
      <Reveal direction="right"><AboutHanin /></Reveal>
      <Reveal><PlatingServices /></Reveal>
      <Reveal direction="right"><ManufacturingCapability /></Reveal>
      <Reveal><FactoryShowcase /></Reveal>
      <Reveal><ProductsProjects /></Reveal>
      <Reveal><QualityCertification /></Reveal>
      <Reveal><NewsUpdates /></Reveal>
      <Reveal direction="left"><FinalCta /></Reveal>
    </div>
  );
}
