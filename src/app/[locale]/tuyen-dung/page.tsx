import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/tuyen-dung/PageHero";
import WhyHanin from "@/components/tuyen-dung/WhyHanin";
import JobBoard from "@/components/tuyen-dung/JobBoard";
import WorkEnvironment from "@/components/tuyen-dung/WorkEnvironment";
import ApplicationCta from "@/components/tuyen-dung/ApplicationCta";
import Reveal from "@/components/ui/Reveal";
import { getJobs } from "@/server/public";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("tuyenDung.title"), description: t("tuyenDung.description") };
}

export default async function TuyenDungPage() {
  const locale = await getLocale();
  const tTuyenDung = await getTranslations("TuyenDung");
  const jobs = getJobs(locale, (key) => tTuyenDung(key as never));

  return (
    <ClientMessages keys={["TuyenDung"]}>
    <div className="flex flex-col w-full text-slate-800">
      <PageHero />
      <Reveal><WhyHanin /></Reveal>
      <Reveal><JobBoard jobs={jobs} /></Reveal>
      <Reveal direction="right"><WorkEnvironment /></Reveal>
      <Reveal direction="left"><ApplicationCta /></Reveal>
    </div>
    </ClientMessages>
  );
}
