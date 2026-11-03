import { getTranslations } from "next-intl/server";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { normalizeSocialUrl } from "@/lib/social";
import { getPhones, getSettings, telHref } from "@/server/settings";

/**
 * Thanh liên hệ nhanh dính đáy màn hình điện thoại (dưới 1024px): Gọi ngay, Zalo (nếu CMS có link), Báo giá.
 * Layout chừa chỗ bằng một khối cao 3,5rem sau chân trang để không che nội dung.
 */
export default async function StickyContact() {
  const t = await getTranslations("StickyContact");
  const phone = getPhones().main;
  const zalo = normalizeSocialUrl("zalo", getSettings().zaloUrl ?? "");
  const item = "flex h-14 min-w-0 items-center justify-center gap-2 px-2 text-body-sm font-semibold whitespace-nowrap active:opacity-80";

  return (
    <nav
      aria-label={t("aria")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="flex divide-x divide-slate-200 [&>*]:flex-1">
        {phone ? (
          <a href={telHref(phone)} className={`${item} text-steel-700`}>
            <Icon name="call" className="text-[20px]" />
            {t("label")}
          </a>
        ) : null}
        {zalo ? (
          <a href={zalo} target="_blank" rel="noopener noreferrer" className={`${item} text-steel-700`}>
            <Icon name="zalo" className="text-[20px]" />
            {t("zalo")}
          </a>
        ) : null}
        <Link href="/lien-he#rfq-form" className={`${item} bg-[#E5A93C] text-[#0F172A]`}>
          <Icon name="request_quote" className="text-[20px]" />
          {t("quote")}
        </Link>
      </div>
    </nav>
  );
}
