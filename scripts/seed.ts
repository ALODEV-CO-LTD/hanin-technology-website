/**
 * Nạp dữ liệu ban đầu cho CMS từ nội dung sẵn có của website
 * (messages/{vi,zh,ko} + src/lib/*-data.ts) — không viết thêm nội dung mới.
 *
 *   npm run db:seed            # chỉ nạp vào bảng đang trống (an toàn chạy lại)
 *   npm run db:seed -- --reset # xoá dịch vụ/sản phẩm/tin/tuyển dụng/banner rồi nạp lại
 *
 * Tài khoản quản trị đầu tiên: đặt ADMIN_EMAIL + ADMIN_PASSWORD (>= 10 ký tự).
 * Nếu không đặt mật khẩu, script tự sinh và ghi vào data/initial-admin.txt (chmod 600).
 */
import { get, getDb, run, transaction } from "../src/server/db";
import { hashPassword } from "../src/server/auth";
import { loadBaseMessages } from "../src/server/content";
import { LOCALES, type I18nText, type Locale } from "../src/server/i18n";
import { getServices } from "./legacy-data/services-data";
import { getProducts } from "./legacy-data/products-data";
import { getFeaturedArticle, getNewsArticles } from "./legacy-data/news-data";
import { getJobs } from "./legacy-data/jobs-data";

type Tree = Record<string, unknown>;

function translator(locale: Locale, namespace: string) {
  const root = (loadBaseMessages(locale)[namespace] ?? {}) as Tree;
  return ((key: string) => {
    let node: unknown = root;
    for (const part of key.split(".")) {
      if (node && typeof node === "object") node = (node as Tree)[part];
      else return key;
    }
    return typeof node === "string" ? node : key;
  }) as never;
}

/** Gom kết quả của 3 ngôn ngữ thành 1 danh sách, mỗi trường chữ thành {vi,zh,ko}. */
function perLocale<T>(build: (t: never, locale: Locale) => T[], namespace: string): Record<Locale, T[]> {
  return Object.fromEntries(LOCALES.map((l) => [l, build(translator(l, namespace), l)])) as Record<Locale, T[]>;
}

const i18n = (pick: (l: Locale) => string | undefined): I18nText =>
  Object.fromEntries(LOCALES.map((l) => [l, pick(l) ?? ""])) as I18nText;

const json = (v: unknown) => JSON.stringify(v);
const count = (table: string) => Number(get<{ n: number }>(`SELECT COUNT(*) AS n FROM ${table}`)?.n ?? 0);

const reset = process.argv.includes("--reset");
getDb();

if (reset) {
  for (const t of ["services", "products", "posts", "jobs", "banners"]) run(`DELETE FROM ${t}`);
  console.log("Đã xoá nội dung cũ (services, products, posts, jobs, banners).");
}

/* ---------- Banner ---------- */
if (count("banners") === 0) {
  const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=1920&q=80&fm=jpg&fit=crop`;
  const banners: [string, string][] = [
    ["home-hero", "1716191299945-4c5b89703971"],
    ["gioi-thieu", "1720036236855-9a1a2e4d3f26"],
    ["dich-vu", "1720036236694-d0a231c52563"],
    ["san-pham", "1740209475472-aa7d280f7452"],
    ["nang-luc", "1652204775379-2b4ace437a2d"],
    ["tin-tuc", "1654703680007-d5d9699cddfd"],
    ["tuyen-dung", "1528953030358-b0c7de371f1f"],
    ["lien-he", "1595798896730-9fdf2e709649"],
  ];
  transaction(() => {
    for (const [placement, id] of banners) {
      run("INSERT INTO banners (placement, image, image_alt) VALUES (?, ?, ?)", placement, unsplash(id), json({}));
    }
  });
  console.log(`Banner: ${banners.length}`);
}

/* ---------- Dịch vụ ---------- */
if (count("services") === 0) {
  const data = perLocale((t) => getServices(t), "DichVu");
  transaction(() => {
    data.vi.forEach((vi, index) => {
      const at = (l: Locale) => data[l][index];
      run(
        `INSERT INTO services (slug, code, title_en, image, image_alt, badge, title, description,
           application_label, application_text, stat_label, sort) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        vi.slug, vi.code, vi.titleEn, vi.image,
        json(i18n((l) => at(l).imageAlt)),
        json(i18n((l) => at(l).badge)),
        json(i18n((l) => at(l).title)),
        json(i18n((l) => at(l).description)),
        json(i18n((l) => at(l).applicationLabel)),
        json(i18n((l) => at(l).applicationText)),
        json(i18n((l) => at(l).statLabel)),
        index,
      );
    });
  });
  console.log(`Dịch vụ: ${data.vi.length}`);
}

/* ---------- Sản phẩm & dự án ---------- */
if (count("products") === 0) {
  const data = perLocale((t) => getProducts(t), "SanPham");
  transaction(() => {
    data.vi.forEach((vi, index) => {
      const at = (l: Locale) => data[l][index];
      const chips = vi.specChips.map((_, i) => ({
        label: i18n((l) => at(l).specChips[i]?.label),
        value: i18n((l) => at(l).specChips[i]?.value),
      }));
      run(
        `INSERT INTO products (slug, category_slug, lot, image, image_alt, image_badge, title, description,
           spec_chips, show_in_grid, featured, spotlight, sort) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        vi.slug, vi.categorySlug, vi.lot, vi.image,
        json(i18n((l) => at(l).imageAlt)),
        json(i18n((l) => at(l).imageBadge)),
        json(i18n((l) => at(l).title)),
        json(i18n((l) => at(l).description)),
        json(chips),
        vi.showInGrid ? 1 : 0,
        vi.featured ? 1 : 0,
        vi.slug === "cum-linh-kien-khung-vo-banh-rang-b2b" ? 1 : 0,
        index,
      );
    });
  });
  console.log(`Sản phẩm/dự án: ${data.vi.length}`);
}

/* ---------- Tin tức ---------- */
if (count("posts") === 0) {
  const articles = perLocale((t) => getNewsArticles(t), "TinTuc");
  const featured = perLocale((t) => [getFeaturedArticle(t)], "TinTuc");
  const toIso = (dmy: string) => dmy.split("/").reverse().join("-");
  transaction(() => {
    // Bài tiêu điểm
    const f = (l: Locale) => featured[l][0];
    run(
      `INSERT INTO posts (slug, category_key, tech_badge, image, image_alt, title, excerpt, author, author_role,
         metrics, read_time, published_at, featured) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1)`,
      "ung-dung-cong-nghe-ma-niken-hoa-hoc-enp-trong-che-tao-banh-rang-robot",
      "cong-nghe", f("vi").standard, f("vi").image,
      json(i18n((l) => f(l).imageAlt)),
      json(i18n((l) => f(l).title)),
      json(i18n((l) => f(l).excerpt)),
      json(i18n((l) => f(l).author)),
      json(i18n((l) => f(l).authorRole)),
      json(f("vi").metrics.map((_, i) => ({ label: i18n((l) => f(l).metrics[i]?.label), value: i18n((l) => f(l).metrics[i]?.value) }))),
      json(i18n((l) => f(l).readTime)),
      "2026-04-18",
    );
    articles.vi.forEach((vi) => {
      const at = (l: Locale) => articles[l].find((a) => a.id === vi.id)!;
      run(
        `INSERT INTO posts (slug, category_key, tech_badge, image, image_alt, title, excerpt, author, read_time, published_at)
         VALUES (?,?,?,?,?,?,?,?,?,?)`,
        vi.id, vi.categoryKey, vi.techBadge, vi.image,
        json(i18n((l) => at(l).imageAlt)),
        json(i18n((l) => at(l).title)),
        json(i18n((l) => at(l).excerpt)),
        json(i18n((l) => at(l).author)),
        json(i18n((l) => at(l).readTime)),
        toIso(vi.date),
      );
    });
  });
  console.log(`Tin tức: ${articles.vi.length + 1}`);
}

/* ---------- Tuyển dụng ---------- */
if (count("jobs") === 0) {
  const data = perLocale((t) => getJobs(t), "TuyenDung");
  transaction(() => {
    data.vi.forEach((vi, index) => {
      const at = (l: Locale) => data[l][index];
      run(
        `INSERT INTO jobs (slug, department, job_type, location, title, salary, tags, deadline, sort)
         VALUES (?,?,?,?,?,?,?,?,?)`,
        vi.id, vi.department, vi.type, vi.location,
        json(i18n((l) => at(l).title)),
        json(i18n((l) => at(l).salary)),
        json(vi.tags.map((_, i) => ({ text: i18n((l) => at(l).tags[i]) }))),
        json(i18n((l) => at(l).deadline)),
        index,
      );
    });
  });
  console.log(`Tuyển dụng: ${data.vi.length}`);
}

/* ---------- Tài khoản quản trị đầu tiên ---------- */
if (count("users") === 0) {
  // Không đặt ADMIN_PASSWORD => tạo tài khoản DEMO 1 / 1. ĐỔI trước khi mở cho khách/công khai.
  const email = process.env.ADMIN_EMAIL || (process.env.ADMIN_PASSWORD ? "admin@hanintech.vn" : "1");
  const password = process.env.ADMIN_PASSWORD || "1";
  if (process.env.ADMIN_PASSWORD && password.length < 10) {
    console.error("ADMIN_PASSWORD phải có ít nhất 10 ký tự.");
    process.exit(1);
  }
  run("INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Quản trị viên', ?, 'admin')", email, hashPassword(password));
  console.log(process.env.ADMIN_PASSWORD ? `Đã tạo tài khoản quản trị ${email}.` : 'Đã tạo tài khoản DEMO: "1" / "1" — nhớ đổi mật khẩu khi chạy thật.');
}

console.log("Seed hoàn tất.");
