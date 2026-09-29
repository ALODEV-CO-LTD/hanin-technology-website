import type { Metadata } from "next";
import PageHero from "@/components/tuyen-dung/PageHero";
import WhyHanin from "@/components/tuyen-dung/WhyHanin";
import JobBoard from "@/components/tuyen-dung/JobBoard";
import WorkEnvironment from "@/components/tuyen-dung/WorkEnvironment";
import ApplicationCta from "@/components/tuyen-dung/ApplicationCta";

export const metadata: Metadata = {
  title: "Tuyển dụng | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Khám phá các vị trí tuyển dụng đang mở tại HANIN TECHNOLOGY VIỆT NAM - cơ hội nghề nghiệp trong lĩnh vực gia công mạ kim loại và cơ khí chính xác.",
};

export default function TuyenDungPage() {
  return (
    <div className="flex flex-col w-full text-slate-800">
      <PageHero />
      <WhyHanin />
      <JobBoard />
      <WorkEnvironment />
      <ApplicationCta />
    </div>
  );
}
