import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import IntroHero from "@/components/gioi-thieu/IntroHero";
import CompanyIntroduction from "@/components/gioi-thieu/CompanyIntroduction";
import CompanyJourney from "@/components/gioi-thieu/CompanyJourney";
import CoreStrengths from "@/components/gioi-thieu/CoreStrengths";
import FactoryOverview from "@/components/gioi-thieu/FactoryOverview";
import FeaturedClients from "@/components/gioi-thieu/FeaturedClients";
import DevelopmentDirection from "@/components/gioi-thieu/DevelopmentDirection";
import QualityStandardsPreview from "@/components/gioi-thieu/QualityStandardsPreview";
import ProfileDownloadCta from "@/components/gioi-thieu/ProfileDownloadCta";
import ContactCta from "@/components/gioi-thieu/ContactCta";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("gioiThieu.title"), description: t("gioiThieu.description") };
}

export default function GioiThieuPage() {
  return (
    <div className="flex flex-col w-full">
      <IntroHero />
      <Reveal direction="right"><CompanyIntroduction /></Reveal>
      <Reveal><CompanyJourney /></Reveal>
      <Reveal><CoreStrengths /></Reveal>
      <Reveal><FactoryOverview /></Reveal>
      <Reveal><FeaturedClients /></Reveal>
      <Reveal><DevelopmentDirection /></Reveal>
      <Reveal><QualityStandardsPreview /></Reveal>
      <Reveal direction="left"><ProfileDownloadCta /></Reveal>
      <Reveal><ContactCta /></Reveal>
    </div>
  );
}
