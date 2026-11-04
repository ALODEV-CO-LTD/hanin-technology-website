import { useServiceNs } from "@/lib/service-ns";
import { useTranslations } from "next-intl";
import type { PlatingService } from "@/lib/services-data";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";
import HeroImage from "@/components/ui/HeroImage";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

/** Tiêu đề, mã, badge, mô tả và ảnh lấy từ CMS (service); các chỉ số kỹ thuật bên dưới là nội dung mẫu dùng chung. */
export default function DetailHero({ service, breadcrumb }: { service: PlatingService; breadcrumb: { label: string; href?: string }[] }) {
  const t = useTranslations(useServiceNs(service.slug, "DetailHero"));
  const to = useTranslations(useServiceNs(service.slug, "DetailOverview"));
  const tp = useTranslations(useServiceNs(service.slug, "DetailProcess"));
  const th = useTranslations("DichVu.HeroSummary");
  const clean = (text: string) => text.split(":")[0].replace(/\s*\(.*\)\s*$/, "").trim();
  const APPLICATIONS = ["item1Strong", "item2Strong", "item3Strong"].map((k) => clean(to(`col2.${k}`)));
  const SUBSTRATES = ["m1", "m2", "m3", "m4", "m5", "m6"].filter((k) => to.has(`col3.substrates.${k}`)).map((k) => clean(to(`col3.substrates.${k}`)));
  const STEPS = ["s1", "s2", "s3", "s4", "s5", "s6"].filter((k) => tp.has(`${k}.title`)).map((k) => tp(`${k}.title`));
  const STATS = ["stat1", "stat2", "stat3", "stat4"].filter((k) => t.has(`${k}.label`)).map((k) => ({ key: k, value: t(`${k}.value`) }));
  const STAT_COLS = STATS.length >= 4 ? "lg:grid-cols-4" : STATS.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  const GROUPS = [
    { label: to("col2.title"), items: APPLICATIONS, numbered: false },
    { label: to("col3.title"), items: SUBSTRATES, numbered: false },
    { label: th("process"), items: STEPS, numbered: true },
  ].filter((g) => g.items.length > 0);

  return (
    <section className="w-full flex flex-col">
      <div className="relative flex min-h-[min(calc(100svh-var(--header-h)),560px)] sm:min-h-[calc(100svh-var(--header-h))] w-full flex-col justify-end overflow-hidden bg-slate-50">
        <HeroImage src={service.image} alt={service.imageAlt} />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full lg:w-3/4 banner-scrim" />
        <div className="relative z-10 w-full px-margin py-space-lg lg:py-space-xl flex flex-col gap-space-md">
          <PageBreadcrumb className="banner-text" variant="dark" items={breadcrumb} />
          <div className="flex flex-col gap-space-sm max-w-3xl banner-text">
            <span className="self-start text-label-sm text-white uppercase font-semibold tracking-wider border border-white/50 px-2 py-1 rounded">{service.code}</span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-white tracking-tight uppercase font-bold">
              {service.title}
              <span className="block text-steel-100 text-headline-sm md:text-headline-md mt-1 font-bold">{service.titleEn}</span>
            </h1>
            <p className="text-body-md md:text-body-lg text-white leading-relaxed">{service.description}</p>
          </div>

          <dl className={`grid grid-cols-2 ${STAT_COLS} gap-px overflow-hidden rounded border border-steel-200 bg-steel-200 max-w-4xl`}>
            {STATS.map((item) => (
              <div key={item.key} className="flex flex-col gap-0.5 bg-steel-50 p-2 sm:p-space-sm sm:gap-1">
                <dt className="text-label-technical uppercase text-steel-600 font-semibold">{t(`${item.key}.label`)}</dt>
                <dd className="text-title-md font-bold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-space-sm">
            <a
              href="#rfq-form"
              className="inline-flex min-h-11 items-center gap-space-xs bg-steel-600 hover:bg-steel-700 text-white px-space-md py-3 rounded text-label-technical uppercase tracking-wider transition-all"
            >
              <span>{t("ctaPrimary")}</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <Link
              href="/lien-he#rfq-form"
              className="inline-flex min-h-11 items-center gap-space-xs border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 px-space-md py-3 rounded text-label-technical uppercase tracking-wider transition-all"
            >
              <Icon name="support_agent" className="text-[18px]" />
              <span>{t("ctaSecondary")}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-margin pt-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md bg-white border border-slate-200 rounded shadow-sm p-space-md sm:p-space-lg">
          {GROUPS.map((group, gi) => (
            <div key={group.label} className={`flex-col gap-2 ${gi === 1 ? "hidden sm:flex" : "flex"}`}>
              <h2 className="text-label-technical uppercase tracking-wider text-steel-600 font-semibold">{group.label}</h2>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <li key={`${item}-${i}`} className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-body-sm text-slate-800">
                    {group.numbered && <span className="font-bold text-steel-600">{i + 1}</span>}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
