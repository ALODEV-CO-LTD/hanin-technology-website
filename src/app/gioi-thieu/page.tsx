import type { Metadata } from "next";
import IntroHero from "@/components/gioi-thieu/IntroHero";
import CompanyIntroduction from "@/components/gioi-thieu/CompanyIntroduction";
import CompanyJourney from "@/components/gioi-thieu/CompanyJourney";
import CoreStrengths from "@/components/gioi-thieu/CoreStrengths";
import FactoryOverview from "@/components/gioi-thieu/FactoryOverview";
import CapabilitySnapshot from "@/components/gioi-thieu/CapabilitySnapshot";
import DevelopmentDirection from "@/components/gioi-thieu/DevelopmentDirection";
import QualityStandardsPreview from "@/components/gioi-thieu/QualityStandardsPreview";
import ProfileDownloadCta from "@/components/gioi-thieu/ProfileDownloadCta";
import ContactCta from "@/components/gioi-thieu/ContactCta";

export const metadata: Metadata = {
  title: "Giới thiệu | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Tìm hiểu về HANIN TECHNOLOGY VIỆT NAM: định hướng phát triển và năng lực gia công mạ kim loại phục vụ khách hàng công nghiệp.",
};

export default function GioiThieuPage() {
  return (
    <div className="flex flex-col w-full">
      <IntroHero />
      <CompanyIntroduction />
      <CompanyJourney />
      <CoreStrengths />
      <FactoryOverview />
      <CapabilitySnapshot />
      <DevelopmentDirection />
      <QualityStandardsPreview />
      <ProfileDownloadCta />
      <ContactCta />
    </div>
  );
}
