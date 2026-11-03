import { getTranslations } from "next-intl/server";
import Icon from "@/components/ui/Icon";
import SocialQrPopup from "@/components/ui/SocialQrPopup";
import {
  CONSULT_ZALO_WECHAT,
  CONSULT_ZALO_WECHAT_KAKAO,
  DEFAULT_HOTLINE,
  SOCIAL_CHANNELS,
  normalizeSocialUrl,
} from "@/lib/social";
import { getPhones, getSettings, telHref } from "@/server/settings";

/** Đường dẫn ảnh QR do CMS lưu: chỉ nhận /uploads/... hoặc link http(s). */
function qrUrl(raw: string): string {
  const v = (raw ?? "").trim();
  return /^\/uploads\/[\w./-]+$/.test(v) || /^https?:\/\//i.test(v) ? v : "";
}

/**
 * Thanh liên hệ nổi bên phải (desktop): Hotline, Zalo, WeChat, KakaoTalk, rồi các mạng xã hội có link trong CMS.
 * WeChat / KakaoTalk mở cửa sổ nhỏ: ảnh QR từ CMS nếu có, nếu chưa có thì hiện ID kèm nút sao chép.
 */
export default async function SocialLinks({ className = "", floating = false }: { className?: string; floating?: boolean }) {
  const settings = getSettings();
  const t = await getTranslations("HomeContact.Social");
  const consult = new Set([CONSULT_ZALO_WECHAT, CONSULT_ZALO_WECHAT_KAKAO]);
  const hotline = getPhones().general.find((p) => !consult.has(p.number))?.number ?? DEFAULT_HOTLINE;
  const items = SOCIAL_CHANNELS.map((c) => ({ ...c, href: normalizeSocialUrl(c.key, settings[c.settingKey] ?? "") })).filter(
    (c) => c.href,
  );
  const btn = `flex items-center justify-center bg-[var(--neu-bg)] ${floating ? "h-9 w-8 rounded-l-lg" : "h-10 w-10 rounded-lg"} text-slate-600 shadow-sm transition-all hover:text-steel-600 active:shadow-[var(--neu-inset)]`;
  // Không dùng shadow-md/sm: globals.css đổi nền mọi phần tử có lớp đó về màu neumorphism.
  // Thanh nổi: nút tròn màu thương hiệu, sát mép phải, tương tự thanh liên hệ của các website công nghiệp.
  const dot = "flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_3px_10px_rgb(0_0_0/0.3)] ring-1 ring-black/5 transition-transform duration-150 hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:scale-95";
  const BRAND: Record<string, string> = {
    zalo: "bg-[#0068FF] text-[13px] font-bold tracking-tight",
    facebook: "bg-[#1877F2]",
    youtube: "bg-[#FF0000]",
    linkedin: "bg-[#0A66C2]",
    instagram: "bg-[#E4405F]",
  };

  return (
    <ul
      aria-label={floating ? t("aria") : undefined}
      className={
        floating
          ? `fixed bottom-28 right-3 z-40 max-lg:hidden flex flex-col items-center gap-3 ${className}`
          : `flex flex-wrap items-center gap-space-sm ${className}`
      }
    >
      {floating ? (
        <li>
          <a href={telHref(hotline)} aria-label={`${t("hotline")} ${hotline}`} title={`${t("hotline")} ${hotline}`} className={`${dot} bg-[#D32F2F]`}>
            <Icon name="call" className="text-[22px]" />
          </a>
        </li>
      ) : null}
      {items.filter((c) => !floating || c.key === "zalo").map((c) => (
        <li key={c.key}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            title={c.label}
            className={floating ? `${dot} ${BRAND[c.key] ?? "bg-slate-700"}` : btn}
          >
            {floating && c.key === "zalo" ? <span aria-hidden="true">Zalo</span> : <Icon name={c.icon} className={floating ? "text-[22px]" : "text-[20px]"} />}
          </a>
        </li>
      ))}
      {floating ? (
        <>
          <li>
            <SocialQrPopup channel="wechat" icon="wechat" contactId={CONSULT_ZALO_WECHAT} qrSrc={qrUrl(settings.wechatQr)} buttonClassName={`${dot} bg-[#09B83E]`} />
          </li>
          <li>
            <SocialQrPopup channel="kakao" icon="kakao" contactId={CONSULT_ZALO_WECHAT_KAKAO} qrSrc={qrUrl(settings.kakaoQr)} buttonClassName={`${dot} !bg-[#FEE500] !text-[#191919] text-[11px] font-extrabold`} label="TALK" />
          </li>
        </>
      ) : null}
      {(floating ? items.filter((c) => c.key !== "zalo") : []).map((c) => (
        <li key={c.key}>
          <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.label} title={c.label} className={`${dot} ${BRAND[c.key] ?? "bg-slate-700"}`}>
            <Icon name={c.icon} className="text-[22px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
