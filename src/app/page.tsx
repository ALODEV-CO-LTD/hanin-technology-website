import Hero from "@/components/home/Hero";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import AboutHanin from "@/components/home/AboutHanin";
import PlatingServices from "@/components/home/PlatingServices";
import ManufacturingCapability from "@/components/home/ManufacturingCapability";
import FactoryShowcase from "@/components/home/FactoryShowcase";
import ProductsProjects from "@/components/home/ProductsProjects";
import QualityCertification from "@/components/home/QualityCertification";
import NewsUpdates from "@/components/home/NewsUpdates";
import RecruitmentBanner from "@/components/home/RecruitmentBanner";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full text-on-surface">
      <Hero />
      <Reveal><CompanySnapshot /></Reveal>
      <Reveal><AboutHanin /></Reveal>
      <Reveal><PlatingServices /></Reveal>
      <Reveal><ManufacturingCapability /></Reveal>
      <Reveal><FactoryShowcase /></Reveal>
      <Reveal><ProductsProjects /></Reveal>
      <Reveal><QualityCertification /></Reveal>
      <Reveal><NewsUpdates /></Reveal>
      <Reveal><RecruitmentBanner /></Reveal>
      <Reveal><FinalCta /></Reveal>
    </div>
  );
}
