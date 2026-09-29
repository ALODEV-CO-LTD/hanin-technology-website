import type { Metadata } from "next";
import ContactHero from "@/components/lien-he/ContactHero";
import ContactChannels from "@/components/lien-he/ContactChannels";
import RfqForm from "@/components/lien-he/RfqForm";
import LocationMap from "@/components/lien-he/LocationMap";
import DirectChannels from "@/components/lien-he/DirectChannels";
import ContactFaq from "@/components/lien-he/ContactFaq";
import BottomCta from "@/components/lien-he/BottomCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Liên hệ & Yêu cầu báo giá | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Liên hệ HANIN TECHNOLOGY VIỆT NAM để được tư vấn giải pháp kỹ thuật xi mạ kim loại, gia công cơ khí chính xác và gửi yêu cầu báo giá (RFQ) kèm bản vẽ CAD.",
};

export default function LienHePage() {
  return (
    <div className="flex flex-col w-full text-slate-800">
      <ContactHero />
      <Reveal><ContactChannels /></Reveal>
      <Reveal><RfqForm /></Reveal>
      <Reveal><LocationMap /></Reveal>
      <Reveal><DirectChannels /></Reveal>
      <Reveal><ContactFaq /></Reveal>
      <Reveal><BottomCta /></Reveal>
    </div>
  );
}
