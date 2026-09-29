import { useTranslations } from "next-intl";

const CHANNEL_KEYS = ["hotline", "zalo", "email", "audit"] as const;
const CHANNEL_META: Record<
  (typeof CHANNEL_KEYS)[number],
  { icon: string; href: string; external: boolean }
> = {
  hotline: { icon: "call", href: "tel:02438186868", external: false },
  zalo: { icon: "chat", href: "https://zalo.me", external: true },
  email: { icon: "forward_to_inbox", href: "mailto:sales@hanintech.vn", external: false },
  audit: { icon: "domain_verification", href: "#rfq-form", external: false },
};

export default function DirectChannels() {
  const t = useTranslations("LienHe.DirectChannels");

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-body-md text-slate-500 mt-2">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CHANNEL_KEYS.map((key) => {
            const meta = CHANNEL_META[key];
            return (
              <a
                key={key}
                href={meta.href}
                target={meta.external ? "_blank" : undefined}
                rel={meta.external ? "noopener noreferrer" : undefined}
                className="p-space-lg bg-slate-50 hover:bg-white border border-slate-200 rounded transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-steel-50 text-steel-600 flex items-center justify-center mb-space-md group-hover:bg-steel-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[26px]">{meta.icon}</span>
                  </div>
                  <span className="text-label-sm uppercase tracking-wider text-slate-500 font-bold block mb-1">
                    {t(`channels.${key}.label`)}
                  </span>
                  <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                    {t(`channels.${key}.title`)}
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-normal">
                    {t(`channels.${key}.desc`)}
                  </p>
                </div>
                <span className="mt-space-md text-steel-600 text-label-md font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t(`channels.${key}.cta`)}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
