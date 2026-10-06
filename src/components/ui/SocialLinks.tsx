import Icon from "@/components/ui/Icon";
import { SOCIAL_CHANNELS, normalizeSocialUrl } from "@/lib/social";
import { getSettings } from "@/server/settings";

/** Hàng nút icon mạng xã hội: tự lấy link từ CMS, kênh nào chưa có link thì không hiện. */
export default function SocialLinks({ className = "", floating = false }: { className?: string; floating?: boolean }) {
  const settings = getSettings();
  const items = SOCIAL_CHANNELS.map((c) => ({ ...c, href: normalizeSocialUrl(c.key, settings[c.settingKey] ?? "") })).filter(
    (c) => c.href,
  );
  if (items.length === 0) return null;
  return (
    <ul
      className={
        floating
          ? `fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-space-sm ${className}`
          : `flex flex-wrap items-center gap-space-sm ${className}`
      }
    >
      {items.map((c) => (
        <li key={c.key}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            title={c.label}
            className={`flex items-center justify-center bg-[var(--neu-bg)] ${floating ? "h-9 w-8 rounded-l-lg" : "h-10 w-10 rounded-lg"} text-slate-600 shadow-sm transition-all hover:text-steel-600 active:shadow-[var(--neu-inset)]`}
          >
            <Icon name={c.icon} className="text-[20px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
