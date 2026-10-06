import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactHero from "@/components/lien-he/ContactHero";
import ContactChannels from "@/components/lien-he/ContactChannels";
import RfqForm from "@/components/lien-he/RfqForm";
import LocationMap from "@/components/lien-he/LocationMap";
import DirectChannels from "@/components/lien-he/DirectChannels";
import ContactFaq from "@/components/lien-he/ContactFaq";
import BottomCta from "@/components/lien-he/BottomCta";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("lienHe.title"), description: t("lienHe.description") };
}

export default function LienHePage() {
  return (
    <div className="flex flex-col w-full text-slate-800">
      <ContactHero />
      <Reveal><ContactChannels /></Reveal>
      <Reveal><RfqForm /></Reveal>
      <Reveal direction="left"><LocationMap /></Reveal>
      <Reveal><DirectChannels /></Reveal>
      <Reveal><ContactFaq /></Reveal>
      <Reveal><BottomCta /></Reveal>
    </div>
  );
}
