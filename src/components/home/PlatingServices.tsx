import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import ServicePhotoCard from "@/components/ui/ServicePhotoCard";

const PILLARS = [
  { href: "/dich-vu-gia-cong-ma/ma-crom-cung-cong-nghiep", image: "/images/profile-lib/chi-tiet-op-mat-na-ma-crom.jpg" },
  { href: "/dich-vu-gia-cong-ma/ma-niken-hoa-hoc-enp", image: "/images/profile-lib/tam-chi-tiet-may-niken-hoa.jpg" },
  { href: "/dich-vu-gia-cong-ma/day-chuyen-son-ma-ket-hop", image: "/images/profile-lib/day-chuyen-phun-son-tu-dong.jpg" },
] as const;

export default function PlatingServices() {
  const t = useTranslations("HomeServices");

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-headline-lg text-slate-900 font-bold">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/dich-vu-gia-cong-ma"
            className="inline-flex items-center gap-2 py-3 -my-3 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 font-semibold transition-colors whitespace-nowrap"
          >
            <span>{t("ctaAll")}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {PILLARS.map((p, i) => (
            <ServicePhotoCard
              key={p.href}
              href={p.href}
              image={p.image}
              imageAlt={t(`pillars.${i}.imageAlt`)}
              title={t(`pillars.${i}.title`)}
              description={t(`pillars.${i}.desc`)}
              chips={t.raw(`pillars.${i}.chips`) as string[]}
              index={i}
              footer={t("detailLabel")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
