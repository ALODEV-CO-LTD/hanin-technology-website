import type { MetadataRoute } from "next";
import { localizedPath } from "@/lib/seo";
import { LOCALES, absUrl } from "@/lib/site-url";
import { all } from "@/server/db";

const STATIC_PATHS = ["", "/gioi-thieu", "/nang-luc-san-xuat", "/dich-vu-gia-cong-ma", "/san-pham-du-an", "/tin-tuc", "/tuyen-dung", "/lien-he"];

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = (sql: string) => all<{ slug: string }>(sql).map((r) => r.slug);
  const paths = [
    ...STATIC_PATHS,
    ...slugs("SELECT slug FROM services WHERE active = 1").map((s) => `/dich-vu-gia-cong-ma/${s}`),
    ...slugs("SELECT slug FROM products WHERE active = 1").map((s) => `/san-pham-du-an/${s}`),
    ...slugs("SELECT slug FROM posts WHERE status = 'published'").map((s) => `/tin-tuc/${s}`),
  ];
  return paths.flatMap((p) =>
    LOCALES.map((l) => ({
      url: absUrl(localizedPath(l, p)),
      alternates: { languages: Object.fromEntries(LOCALES.map((x) => [x, absUrl(localizedPath(x, p))])) },
    })),
  );
}
