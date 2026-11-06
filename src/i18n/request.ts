import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { NAMESPACE_FILES, applyOverrides, scopeFromPath } from "@/server/content";
import { resolveFacts } from "@/lib/facts";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const modules = await Promise.all(
    NAMESPACE_FILES.map((name) =>
      import(`../../messages/${locale}/${name}.json`)
        .then((m) => m.default)
        .catch(() => ({}))
    )
  );

  // Áp các chỉnh sửa nội dung từ CMS (bảng content_overrides) lên bản dịch gốc.
  // Trang chi tiết dịch vụ/sản phẩm còn được áp nội dung riêng của từng mục (scope).
  const path = (await headers()).get("x-hanin-path") ?? "";
  // Token số liệu ({{area}}...) thay SAU khi áp CMS: chỉnh sửa của quản trị luôn thắng, không bị số liệu chung ghi đè.
  const messages = resolveFacts(applyOverrides(Object.assign({}, ...modules), locale, scopeFromPath(path)), locale);

  return { locale, messages };
});
