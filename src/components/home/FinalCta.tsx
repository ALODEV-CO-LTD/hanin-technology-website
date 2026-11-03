import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import PhoneLinks from "@/components/ui/PhoneLinks";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";
import { CONSULT_ZALO_WECHAT, CONSULT_ZALO_WECHAT_KAKAO, DEFAULT_HOTLINE } from "@/lib/social";
import { getPhones, getSettings } from "@/server/settings";

const TAX_CODE = "0110300983";
const FALLBACK_EMAILS = ["huyvinh82@gmail.com", "vankhanhminhkhang@gmail.com"];

export default function FinalCta() {
  const t = useTranslations("Home.FinalCta");
  const d = useTranslations("HomeContact.Direct");
  const { salesEmail, engineeringEmail } = getSettings();
  const consult = new Set([CONSULT_ZALO_WECHAT, CONSULT_ZALO_WECHAT_KAKAO]);
  const hotlines = getPhones().general.filter((p) => !consult.has(p.number));
  const emails = [...new Set([...FALLBACK_EMAILS, salesEmail, engineeringEmail].filter(Boolean))];
  const distances = [
    { icon: "flight_takeoff", label: d("airport"), km: "~10 km" },
    { icon: "location_on", label: d("center"), km: "~20 km" },
    { icon: "directions_car", label: d("haiphong"), km: "~140 km" },
  ];
  const row = "flex items-start gap-space-sm";
  const iconCls = "mt-0.5 text-[22px] text-steel-600";
  const label = "text-label-sm uppercase font-bold text-slate-600";
  const link = "text-body-md font-semibold text-slate-900 hover:text-steel-600";

  return (
    <section className="w-full py-space-xl bg-white scroll-mt-[var(--header-h)]" id="bao-gia">
      <div className="mx-auto px-margin">
        <div className="mb-space-lg text-center flex flex-col items-center gap-space-sm">
          <h2 className="text-headline-xl md:text-display-hero text-slate-900 font-bold leading-tight uppercase">{t("title")}</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl">{t("description")}</p>
        </div>
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2 lg:items-stretch">
          <div className="relative overflow-hidden rounded border border-slate-200 bg-white shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md before:absolute before:inset-x-0 before:top-0 before:h-1 before:[background:var(--color-steel-600)] before:content-['']">
            <h3 className="text-headline-sm text-slate-900 font-bold uppercase">{d("heading")}</h3>
            <ul className="flex flex-col gap-space-md">
              <li className={row}>
                <Icon name="location_on" className={iconCls} />
                <div>
                  <p className={label}>{d("addressLabel")}</p>
                  <p className="text-body-md text-slate-900">{d("address")}</p>
                </div>
              </li>
              <li className={row}>
                <Icon name="fact_check" className={iconCls} />
                <div>
                  <p className={label}>{d("taxLabel")}</p>
                  <p className="text-body-md text-slate-900">{TAX_CODE}</p>
                </div>
              </li>
              <li className={row}>
                <Icon name="call" className={iconCls} />
                <div>
                  <p className={label}>{d("hotlineLabel")}</p>
                  <p className={link}>
                    <PhoneLinks phones={hotlines.length > 0 ? hotlines : [{ number: DEFAULT_HOTLINE }]} className="hover:text-steel-600" />
                  </p>
                </div>
              </li>
              <li className={row}>
                <Icon name="chat" className={iconCls} />
                <div>
                  <p className={label}>{d("consultLabel")}</p>
                  <p className="text-body-md text-slate-900">
                    <span className="text-slate-600">{d("consultA")}: </span>
                    <PhoneLinks phones={[{ number: CONSULT_ZALO_WECHAT }]} className="font-semibold hover:text-steel-600" />
                  </p>
                  <p className="text-body-md text-slate-900">
                    <span className="text-slate-600">{d("consultB")}: </span>
                    <PhoneLinks phones={[{ number: CONSULT_ZALO_WECHAT_KAKAO }]} className="font-semibold hover:text-steel-600" />
                  </p>
                </div>
              </li>
              <li className={row}>
                <Icon name="mail" className={iconCls} />
                <div className="min-w-0">
                  <p className={label}>{d("emailLabel")}</p>
                  {emails.map((email) => (
                    <p key={email} className="break-all">
                      <a href={`mailto:${email}`} className={link}>
                        {email}
                      </a>
                    </p>
                  ))}
                </div>
              </li>
            </ul>
            <div className="border-t border-slate-200 pt-space-md">
              <p className={`${label} mb-space-xs`}>{d("distanceHeading")}</p>
              <ul className="flex flex-col gap-space-xs">
                {distances.map((x) => (
                  <li key={x.label} className="flex items-center gap-space-sm text-body-md text-slate-900">
                    <Icon name={x.icon} className="text-[20px] text-steel-600" />
                    <span className="flex-1">{x.label}</span>
                    <span className="font-semibold">{x.km}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <RfqFormCategory className="" />
        </div>
      </div>
    </section>
  );
}
