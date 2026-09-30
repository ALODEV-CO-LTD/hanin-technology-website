import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { NAMESPACE_FILES, applyOverrides } from "@/server/content";

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
  const messages = applyOverrides(Object.assign({}, ...modules), locale);

  return { locale, messages };
});
