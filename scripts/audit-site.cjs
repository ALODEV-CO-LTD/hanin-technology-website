#!/usr/bin/env node
/**
 * Audit front-end cho website: đọc sitemap rồi kiểm từng trang.
 *   npm run audit:site                       (mặc định http://localhost:3100)
 *   node scripts/audit-site.cjs https://hanin.maxmin.vn
 * Kiểm: HTTP, title/description (có + độ dài), canonical tự tham chiếu, hreflang vi/zh/ko + x-default,
 * og:title/description/url/image, đúng 1 <h1> không rỗng và có từ chung với title, ảnh thiếu alt,
 * liên kết rỗng/#/javascript:, tel:/mailto: sạch, target=_blank thiếu rel noopener noreferrer,
 * chữ mẫu/placeholder, thẻ span/div/p/a/section/ul/li đóng mở không cân, link nội bộ chết (HTTP 200, có cache).
 * Thoát mã 1 nếu có LỖI (cảnh báo không tính).
 */
const base = (process.argv[2] || "http://localhost:3100").replace(/\/+$/, "");
const CONCURRENCY = 6;
const LOCALES = ["vi", "zh", "ko"];

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, text: await res.text(), url: res.url };
}

// Cache trạng thái link nội bộ; giới hạn song song bằng hàng đợi.
const linkCache = new Map();
async function linkStatus(path) {
  if (!linkCache.has(path)) {
    linkCache.set(
      path,
      fetch(base + path, { redirect: "follow" })
        .then((r) => {
          r.body?.cancel?.().catch(() => {});
          return r.status;
        })
        .catch(() => 0),
    );
  }
  return linkCache.get(path);
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k], k);
      }
    }),
  );
  return out;
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3]) : null;
};
const metaContent = (html, key, val) => {
  for (const t of html.match(/<meta\b[^>]*>/gi) || []) if (attr(t, key) === val) return attr(t, "content");
  return null;
};
const stripTags = (s) => decode(s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
// Độ dài hiển thị: ký tự CJK tính 2 (rộng gấp đôi).
const vlen = (s) => [...s].reduce((n, c) => n + (/[\u1100-\u11ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(c) ? 2 : 1), 0);
// Từ: chuỗi chữ >= 3 ký tự; với CJK dùng cặp ký tự liền nhau.
const words = (s) => {
  const out = [];
  for (const w of s.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []) {
    if (/[\u1100-\u11ff\u3400-\u9fff\uac00-\ud7af]/.test(w)) for (let i = 0; i < w.length - 1; i++) out.push(w.slice(i, i + 2));
    else if (w.length >= 3) out.push(w);
  }
  return out;
};

const PLACEHOLDERS = [/lorem ipsum/i, /đang được cập nhật/i, /\bTODO\b/, /\bundefined\b/, /\[object Object\]/, /MISSING_MESSAGE/, /\bNaN\b/];
const BALANCE_TAGS = ["div", "span", "p", "a", "section", "ul", "li", "main", "header", "footer", "button", "h2", "h3"];

function audit(html, finalUrl) {
  const errors = [];
  const warns = [];
  const head = html.split(/<\/head>/i)[0];
  const body = html.slice(head.length);
  const finalPath = new URL(finalUrl).pathname;

  // title / description
  const title = decode(((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim());
  if (!title) errors.push("thiếu <title>");
  else {
    if (vlen(title) > 70) warns.push(`title dài ${vlen(title)} ký tự (>70)`);
    if (vlen(title) < 15) warns.push(`title ngắn ${vlen(title)} ký tự (<15)`);
  }
  const desc = metaContent(head, "name", "description");
  if (!desc) errors.push("thiếu meta description");
  else {
    if (vlen(desc) > 170) warns.push(`description dài ${vlen(desc)} ký tự (>170)`);
    if (vlen(desc) < 50) warns.push(`description ngắn ${vlen(desc)} ký tự (<50)`);
  }

  // canonical
  const canon = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/i) || [])[0];
  if (!canon) errors.push("thiếu canonical");
  else {
    const href = attr(canon, "href");
    let ok = false;
    try {
      ok = new URL(href).pathname.replace(/\/$/, "") === finalPath.replace(/\/$/, "") && /^https?:\/\//.test(href);
    } catch {}
    if (!ok) errors.push(`canonical không khớp URL trang: ${href} (trang: ${finalPath})`);
  }

  // hreflang
  const alts = (head.match(/<link\b[^>]*rel="alternate"[^>]*>/gi) || []).map((t) => attr(t, "hreflang")).filter(Boolean);
  for (const l of [...LOCALES, "x-default"]) if (!alts.includes(l)) errors.push(`thiếu hreflang ${l}`);

  // Open Graph
  for (const k of ["og:title", "og:description", "og:url", "og:image"]) if (!metaContent(head, "property", k)) errors.push(`thiếu ${k}`);

  // h1
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length !== 1) errors.push(`có ${h1s.length} thẻ <h1> (cần đúng 1)`);
  else {
    const h1 = stripTags(h1s[0]);
    if (!h1) errors.push("<h1> rỗng");
    else if (title && finalPath.replace(/^\/(zh|ko)/, "") !== "" && finalPath.replace(/^\/(zh|ko)/, "") !== "/") {
      const tw = new Set(words(title));
      if (!words(h1).some((w) => tw.has(w)) && !words(h1).some((w) => title.toLowerCase().includes(w)))
        warns.push(`h1 "${h1.slice(0, 50)}" không có từ chung với title`);
    }
  }

  // ảnh
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => attr(t, "alt") === null).length;
  if (noAlt) errors.push(`${noAlt} ảnh thiếu thuộc tính alt`);

  // liên kết
  const anchors = body.match(/<a\b[^>]*>/gi) || [];
  const emptyHref = anchors.filter((t) => /^(#?|javascript:.*)$/i.test((attr(t, "href") ?? "x").trim()) && attr(t, "href") !== null).length;
  if (emptyHref) errors.push(`${emptyHref} liên kết href rỗng, "#" hoặc javascript:`);
  const blank = anchors.filter((t) => attr(t, "target") === "_blank" && !/noopener/.test(attr(t, "rel") || "") || (attr(t, "target") === "_blank" && !/noreferrer/.test(attr(t, "rel") || ""))).length;
  if (blank) errors.push(`${blank} liên kết target=_blank thiếu rel noopener noreferrer`);
  for (const t of anchors) {
    const href = attr(t, "href");
    if (!href) continue;
    if (/^tel:/i.test(href) && !/^tel:\+?[0-9]+$/.test(href)) errors.push(`tel: không sạch: ${JSON.stringify(href)}`);
    if (/^mailto:/i.test(href) && !/^mailto:[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+(\?[^\s<>]*)?$/.test(href)) errors.push(`mailto: không sạch: ${JSON.stringify(href)}`);
  }
  if (/href="(tel|mailto):[^"]*<br/i.test(html)) errors.push("tel:/mailto: chứa <br>");

  // chữ mẫu (chỉ nội dung hiển thị, bỏ script)
  const visible = stripTags(body);
  for (const re of PLACEHOLDERS) {
    const m = visible.match(re);
    if (m) errors.push(`chữ mẫu/placeholder: "${m[0]}"`);
  }

  // thẻ đóng mở (chỉ phần body ngoài script/style/comment)
  const clean = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, "");
  for (const tag of BALANCE_TAGS) {
    const open = (clean.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "gi")) || []).filter((x) => !x.endsWith("/>")).length;
    const close = (clean.match(new RegExp(`</${tag}>`, "gi")) || []).length;
    if (open !== close) errors.push(`thẻ <${tag}> không cân: mở ${open}, đóng ${close}`);
  }

  if (!/application\/ld\+json/.test(html)) warns.push("chưa có JSON-LD");

  // link nội bộ để kiểm trạng thái
  const internal = new Set();
  for (const t of anchors) {
    const href = attr(t, "href");
    // /cdn-cgi/ do Cloudflare chèn (che email), không phải link của site.
    if (!href || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/cdn-cgi/")) continue;
    internal.add(href.split("#")[0].split("?")[0] || "/");
  }
  return { errors: [...new Set(errors)], warns, internal: [...internal] };
}

(async () => {
  const sm = await get(`${base}/sitemap.xml`);
  if (sm.status !== 200) {
    console.error(`Không đọc được ${base}/sitemap.xml (HTTP ${sm.status})`);
    process.exit(2);
  }
  // Sitemap trỏ tới tên miền sản xuất; đổi sang địa chỉ đang kiểm để chạy được trên máy dev.
  const urls = [...new Set([...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]).replace(/^https?:\/\/[^/]+/, base)))];
  let bad = 0;
  let warned = 0;

  const results = await pool(urls, CONCURRENCY, async (u) => {
    let r;
    try {
      r = await get(u);
    } catch (e) {
      return { u, fatal: `(${e.message})` };
    }
    if (r.status !== 200) return { u, fatal: `HTTP ${r.status}` };
    // canonical tuyệt đối phải dùng cùng host với lúc chạy? Chỉ so đường dẫn, host kiểm riêng bằng /^https?:/.
    return { u, ...audit(r.text, r.url) };
  });

  const allInternal = new Set();
  for (const r of results) (r.internal || []).forEach((l) => allInternal.add(l));
  await pool([...allInternal], CONCURRENCY, linkStatus);

  for (const r of results) {
    const path = r.u.replace(base, "");
    if (r.fatal) {
      console.log(`LỖI  ${path}  ${r.fatal}`);
      bad++;
      continue;
    }
    const errors = [...r.errors];
    for (const l of r.internal) {
      const st = await linkStatus(l);
      if (st !== 200) errors.push(`link nội bộ chết: ${l} (HTTP ${st})`);
    }
    if (errors.length) bad++;
    if (r.warns.length) warned++;
    if (errors.length || r.warns.length) {
      console.log(`${errors.length ? "LỖI " : "CẢNH BÁO"}  ${path}`);
      errors.forEach((e) => console.log(`   - ${e}`));
      r.warns.forEach((w) => console.log(`   · ${w}`));
    }
  }
  console.log(`\nĐã kiểm ${urls.length} trang, ${allInternal.size} link nội bộ: ${bad} trang có lỗi, ${warned} trang có cảnh báo.`);
  process.exit(bad ? 1 : 0);
})();
