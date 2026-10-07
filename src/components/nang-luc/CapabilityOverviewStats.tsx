import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  {
    key: "equipment",
    accent: false,
  },
  {
    key: "lines",
    accent: false,
  },
  {
    key: "zones",
    padStart: 2,
    accent: false,
  },
  {
    key: "precision",
    decimals: 1,
    accent: true,
  },
] as const;

export default function CapabilityOverviewStats() {
  const t = useTranslations("NangLuc.CapabilityOverviewStats");
  // Giá trị số, tiền tố, hậu tố, đơn vị lấy từ messages để chủ site sửa được trong CMS.
  const num = (key: string) => {
    const n = Number(t(key));
    return Number.isFinite(n) ? n : 0;
  };

  return (
    <section className="w-full bg-white border-b border-slate-200 py-space-xl">
      <div className="mx-auto px-margin w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {STATS.map((stat) => (
            <div key={stat.key} className="p-space-md lg:p-space-lg">
              <div className="text-label-technical text-steel-600 tracking-widest uppercase mb-1">
                {t(`items.${stat.key}.label`)}
              </div>
              <div
                className={`text-headline-xl font-bold tracking-tight ${
                  stat.accent ? "text-steel-600" : "text-slate-900"
                }`}
              >
                <CountUp
                  end={num(`items.${stat.key}.end`)}
                  prefix={t(`items.${stat.key}.prefix`)}
                  suffix={t(`items.${stat.key}.suffix`)}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                  padStart={"padStart" in stat ? stat.padStart : 0}
                />
                {t(`items.${stat.key}.unit`) && (
                  <span className="text-headline-md font-normal text-slate-500">{t(`items.${stat.key}.unit`)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
