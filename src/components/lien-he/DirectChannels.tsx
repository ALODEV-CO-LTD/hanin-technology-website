import { useTranslations } from "next-intl";
import { getPhones, getSettings, telHref } from "@/server/settings";
import Icon from "@/components/ui/Icon";

const CHANNEL_KEYS = ["hotline", "zalo", "email", "audit"] as const;
const CHANNEL_META: Record<
  (typeof CHANNEL_KEYS)[number],
  { icon: string; href: string; external: boolean }
> = {
  hotline: { icon: "call", href: "tel:02438186868", external: false },
  zalo: { icon: "chat", href: "https://zalo.me", external: true },
  email: { icon: "forward_to_inbox", href: "mailto:Haninplating@gmail.com", external: false },
  audit: { icon: "domain_verification", href: "#rfq-form", external: false },
};

export default function DirectChannels() {
  const t = useTranslations("LienHe.DirectChannels");
  const { zaloUrl, salesEmail } = getSettings();
  const { main: hotline } = getPhones();

  return (
    <section className="w-full bg-slate-50 py-space-lg sm:py-space-xl">
      <div className="mx-auto px-margin">
        <div className="text-center max-w-3xl mx-auto mb-space-md sm:mb-space-xl">
          <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm sm:gap-gutter">
          {CHANNEL_KEYS.map((key) => {
            const base = CHANNEL_META[key];
            const meta =
              key === "zalo" && zaloUrl
                ? { ...base, href: zaloUrl }
                : key === "hotline"
                  ? { ...base, href: telHref(hotline) }
                  : key === "email"
                    ? { ...base, href: `mailto:${salesEmail}` }
                    : base;
            return (
              <a
                key={key}
                data-card
                href={meta.href}
                target={meta.external ? "_blank" : undefined}
                rel={meta.external ? "noopener noreferrer" : undefined}
                className="p-space-sm sm:p-space-lg bg-slate-50 hover:bg-white border border-slate-200 rounded transition-all shadow-sm hover:shadow-md group flex flex-row items-center gap-3 sm:flex-col sm:items-stretch sm:justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-600"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:block">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded bg-steel-50 text-steel-600 flex items-center justify-center sm:mb-space-md group-hover:bg-steel-600 group-hover:text-white transition-colors">
                    <Icon name={meta.icon} className="text-[26px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-label-sm uppercase tracking-wider text-slate-600 font-bold block sm:mb-1">
                      {t(`channels.${key}.label`)}
                    </span>
                    <h3 className="text-title-md font-bold text-slate-900 sm:mb-space-sm break-words">
                      {key === "hotline" ? hotline : t(`channels.${key}.title`)}
                    </h3>
                    <p className="hidden sm:block text-body-sm text-slate-600 leading-normal">
                      {t(`channels.${key}.desc`)}
                    </p>
                  </div>
                </div>
                <Icon name="chevron_right" className="sm:hidden text-[22px] text-steel-600 shrink-0" />
                <span className="hidden sm:inline-flex mt-space-md text-steel-600 text-label-md font-bold items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t(`channels.${key}.cta`)}</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
