import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const NAMESPACE_FILES = [
  "common",
  "home",
  "gioi-thieu",
  "dich-vu",
  "san-pham",
  "nang-luc",
  "tin-tuc",
  "lien-he",
  "tuyen-dung",
];

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

  const messages = Object.assign({}, ...modules);

  return { locale, messages };
});
