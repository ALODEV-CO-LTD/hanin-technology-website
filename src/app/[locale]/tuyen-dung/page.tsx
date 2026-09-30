import type { Metadata } from "next";
import PageHero from "@/components/tuyen-dung/PageHero";
import WhyHanin from "@/components/tuyen-dung/WhyHanin";
import JobBoard from "@/components/tuyen-dung/JobBoard";
import WorkEnvironment from "@/components/tuyen-dung/WorkEnvironment";
import ApplicationCta from "@/components/tuyen-dung/ApplicationCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description:
    "Vị trí tuyển dụng đang mở trong lĩnh vực gia công mạ kim loại và cơ khí chính xác.",
};

export default function TuyenDungPage() {
  return (
    <div className="flex flex-col w-full text-slate-800">
      <PageHero />
      <Reveal><WhyHanin /></Reveal>
      <Reveal><JobBoard /></Reveal>
      <Reveal><WorkEnvironment /></Reveal>
      <Reveal><ApplicationCta /></Reveal>
    </div>
  );
}
