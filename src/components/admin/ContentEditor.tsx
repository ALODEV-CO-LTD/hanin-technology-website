"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { api, ApiError } from "./api";
import SaveButton, { useSavedFlash } from "./SaveButton";
import { toast } from "@/components/ct999/thong-bao-toast/store";
import { confirm } from "./dialog";
import Dropdown from "./Dropdown";
import { CONTENT_PAGES, parseContentKey } from "./content-labels";
import LivePageEditor from "./LivePageEditor";

type Locale = "vi" | "en" | "zh" | "ko";
const LOCALES: { key: Locale; label: string }[] = [
  { key: "vi", label: "Tiếng Việt" },
  { key: "en", label: "English" },
  { key: "zh", label: "中文" },
  { key: "ko", label: "한국어" },
];

interface Entry {
  key: string;
  values: Record<Locale, string>;
  overridden: Record<Locale, boolean>;
}
interface Scope {
  id: string;
  label: string;
  namespace: string;
}
interface Namespace {
  name: string;
  count: number;
  overrides: number;
}

/** Ô không phải văn bản người đọc thấy trên trang (mô tả ảnh, đường dẫn trang): ẩn khỏi trang chỉnh sửa. */
/** Ô văn bản tự co giãn theo nội dung (không bị cắt, không có thanh cuộn). */
function AutoText({ value, ...props }: { value: string } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value">) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  });
  return <textarea ref={ref} rows={1} value={value} {...props} />;
}

type Item = { a: Entry; b?: Entry; c?: Entry };
/** Cặp "tiêu đề: nội dung" (label/value, title/desc…) gộp thành một dòng; các ô còn lại là một đoạn riêng. */
const PAIRS: [RegExp, string][] = [
  [/\.label$/, ".value"],
  [/Label$/, "Value"],
  [/\.title$/, ".desc"],
  [/\.title$/, ".description"],
  [/\.name$/, ".role"],
];
function buildItems(entries: Entry[], locale: Locale): Item[] {
  // Ô trống do chính người dùng xoá (đã chỉnh sửa) vẫn hiện để điền lại; ô trống từ gốc thì bỏ qua.
  const byKey = new Map(entries.filter((e) => e.values[locale].trim() || e.overridden[locale]).map((e) => [e.key, e]));
  const used = new Set<string>();
  const items: Item[] = [];
  for (const e of byKey.values()) {
    if (used.has(e.key)) continue;
    used.add(e.key);
    let partner: Entry | undefined;
    for (const [re, rep] of PAIRS) {
      if (!re.test(e.key)) continue;
      const other = byKey.get(e.key.replace(re, rep));
      if (other && !used.has(other.key)) {
        partner = other;
        break;
      }
    }
    if (partner) used.add(partner.key);
    // Ghi chú đi kèm cặp label/value nằm ngay dòng dưới.
    const note = partner && /\.label$/.test(e.key) ? byKey.get(e.key.replace(/\.label$/, ".note")) : undefined;
    if (note) used.add(note.key);
    items.push({ a: e, b: partner, c: note });
  }
  return items;
}
const EMPTY = "[trống]";
const show = (e: Entry, locale: Locale) => e.values[locale] || EMPTY;
const hide = (v: string) => (v.trim() === EMPTY ? "" : v);
const itemText = (it: Item, locale: Locale) =>
  it.b ? `${show(it.a, locale)}: ${show(it.b, locale)}${it.c ? `\n${show(it.c, locale)}` : ""}` : show(it.a, locale);
const boxText = (items: Item[], locale: Locale) => items.map((it) => itemText(it, locale)).join("\n\n");

/** Văn bản ô → giá trị từng khoá; null nếu số đoạn (cách nhau dòng trống) không khớp. */
function parseBox(text: string, items: Item[], locale: Locale): { key: string; value: string }[] | null {
  const blocks = text.split(/\n\s*\n/).map((b) => b.replace(/^\n+|\s+$/g, "")).filter((b) => b !== "");
  if (blocks.length !== items.length) return null;
  const out: { key: string; value: string }[] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const b = blocks[i];
    if (!it.b) {
      out.push({ key: it.a.key, value: hide(b) });
      continue;
    }
    const nl = b.indexOf("\n");
    const head = it.c && nl >= 0 ? b.slice(0, nl) : b;
    if (it.c && nl < 0) return null;
    const noteText = it.c ? b.slice(nl + 1).trim() : "";
    const prefix = `${show(it.a, locale)}: `;
    let label: string;
    let value: string;
    if (head.startsWith(prefix)) {
      label = it.a.values[locale];
      value = hide(head.slice(prefix.length));
    } else {
      const at = head.indexOf(": ");
      if (at < 0) return null;
      label = hide(head.slice(0, at));
      value = hide(head.slice(at + 2));
    }
    out.push({ key: it.a.key, value: label }, { key: it.b.key, value });
    if (it.c) out.push({ key: it.c.key, value: hide(noteText) });
  }
  return out;
}

const HIDDEN_FIELD = /(^|\.)(alt|[a-zA-Z]*Alt|breadcrumb[a-zA-Z]*|ariaLabel|[a-zA-Z]*AriaLabel)$/;

export default function ContentEditor() {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [activePage, setActivePage] = useState("home");
  const [mode, setMode] = useState<"live" | "list">("live");
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [scope, setScope] = useState(""); // "" = nội dung chung; "svc:<slug>" | "prd:<slug>" = nội dung riêng của 1 mục
  const [locale, setLocale] = useState<Locale>("vi");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({}); // khoá -> giá trị đang sửa (theo ngôn ngữ hiện tại)
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(""); // tìm trong toàn bộ website
  const searching = !scope && search.trim().length >= 2;
  const [changedView, setChangedView] = useState(false); // xem mọi mục đã sửa trên toàn website
  const [onlyChanged, setOnlyChanged] = useState(false);
  const { saved, flash } = useSavedFlash();
  const [saving, setSaving] = useState(false);

  const [version, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);

  useEffect(() => {
    let cancelled = false;
    api<{ namespaces: Namespace[]; scopes: Scope[] }>("content").then((data) => {
      if (cancelled) return;
      setNamespaces(data.namespaces);
      setScopes(data.scopes);
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const scopeInfo = scopes.find((sc) => sc.id === scope);
  const pageInfo = CONTENT_PAGES.find((p) => p.id === activePage) ?? CONTENT_PAGES[0];
  const pageNamespaces = scopeInfo ? [scopeInfo.namespace] : pageInfo.namespaces.filter((n) => namespaces.some((x) => x.name === n));
  const nsKey = pageNamespaces.join(",");

  useEffect(() => {
    if (!nsKey || searching || changedView) return;
    let cancelled = false;
    Promise.all(nsKey.split(",").map((ns) => api<{ entries: Entry[] }>(`content?namespace=${encodeURIComponent(ns)}${scope ? `&scope=${encodeURIComponent(scope)}` : ""}`))).then((all) => {
      if (cancelled) return;
      setEntries(all.flatMap((d) => d.entries));
      setDraft({});
    });
    return () => {
      cancelled = true;
    };
  }, [nsKey, scope, version, searching, changedView]);

  useEffect(() => {
    if (!changedView) return;
    let cancelled = false;
    api<{ entries: Entry[] }>("content?changed=1").then((data) => {
      if (cancelled) return;
      setEntries(data.entries);
      setDraft({});
    });
    return () => {
      cancelled = true;
    };
  }, [changedView, version]);

  useEffect(() => {
    if (!searching || changedView) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      api<{ entries: Entry[] }>(`content?search=${encodeURIComponent(search.trim())}`).then((data) => {
        if (cancelled) return;
        setEntries(data.entries);
        setDraft({});
      });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searching, search, version, changedView]);

  const visible = useMemo(() => {
    const f = filter.trim().toLowerCase();
    return entries.filter(
      (e) =>
        !HIDDEN_FIELD.test(e.key) &&
        (!onlyChanged || LOCALES.some((l) => e.overridden[l.key])) &&
        (!f || e.key.toLowerCase().includes(f) || e.values[locale].toLowerCase().includes(f) || e.values.vi.toLowerCase().includes(f)),
    );
  }, [entries, filter, locale, onlyChanged]);
  /** khối → nhóm con → ô; trong chế độ tìm kiếm / đã sửa thì gom thêm theo trang lớn. */
  const tree = useMemo(() => {
    const pages = new Map<string, Map<string, { label: string; subs: Map<string, { entry: Entry; field: string }[]> }>>();
    for (const entry of visible) {
      const k = parseContentKey(entry.key);
      const sections = pages.get(k.page) ?? new Map();
      const svc = /^DichVu\.ServiceDetail\.([^.]+)$/.exec(k.section);
      const prd = /^SanPham\.detail\.([^.]+)$/.exec(k.section);
      const named = svc ? scopes.find((sc) => sc.id === `svc:${svc[1]}`) : prd ? scopes.find((sc) => sc.id === `prd:${prd[1]}`) : undefined;
      const sec = sections.get(k.section) ?? { label: named ? `Nội dung riêng › ${named.label.split(" › ")[1] ?? named.label}` : k.sectionLabel, subs: new Map() };
      sec.subs.set(k.sub, [...(sec.subs.get(k.sub) ?? []), { entry, field: k.field }]);
      sections.set(k.section, sec);
      pages.set(k.page, sections);
    }
    const order = CONTENT_PAGES.map((p) => p.id);
    return [...pages].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
  }, [visible, scopes]);
  const changedHere = entries.filter((e) => LOCALES.some((l) => e.overridden[l.key])).length;
  const changedSite = namespaces.reduce((sum, n) => sum + n.overrides, 0);

  /** mỗi khối (section) là một ô văn bản duy nhất gồm mọi đoạn của khối. */
  const boxes = useMemo(() => {
    const m = new Map<string, Item[]>();
    for (const [, sections] of tree) for (const [section, sec] of sections) m.set(section, buildItems([...sec.subs.values()].flat().map((x) => x.entry), locale));
    return m;
  }, [tree, locale]);

  const { pending, invalid } = useMemo(() => {
    const pending: { key: string; value: string }[] = [];
    const invalid: string[] = [];
    const current = new Map(entries.map((e) => [e.key, e.values[locale]]));
    for (const [id, text] of Object.entries(draft)) {
      const items = boxes.get(id);
      if (!items) continue;
      const parts = parseBox(text, items, locale);
      if (!parts) {
        invalid.push(id);
        continue;
      }
      for (const p of parts) if (p.value !== (current.get(p.key) ?? "").trimEnd()) pending.push(p);
    }
    return { pending, invalid };
  }, [draft, boxes, entries, locale]);
  const dirty = pending;

  async function save() {
    if (invalid.length) {
      toast.error("Mỗi đoạn phải cách nhau một dòng trống, dòng “tiêu đề: nội dung” giữ dấu hai chấm; muốn ẩn đoạn nào thì ghi [trống]. Ô báo đỏ cần sửa lại.");
      return;
    }
    setSaving(true);
    try {
      await api("content", { method: "PUT", body: { changes: pending.map((c) => ({ locale, key: c.key, scope, value: c.value })) } });
      toast.success(`Đã lưu ${pending.length} nội dung. Website cập nhật ngay.`);
      flash();
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không lưu được");
    } finally {
      setSaving(false);
    }
  }

  async function resetBox(items: Item[]) {
    const keys = items.flatMap((it) => [it.a, it.b, it.c]).filter((e): e is Entry => !!e && e.overridden[locale]).map((e) => e.key);
    if (keys.length === 0) return;
    if (!(await confirm({ title: `Khôi phục nội dung gốc (${locale.toUpperCase()}) cho khối này?`, message: `${keys.length} đoạn đã sửa sẽ quay về bản gốc.`, confirmLabel: "Khôi phục" }))) return;
    await api("content", { method: "PUT", body: { changes: keys.map((key) => ({ locale, key, scope, value: null })) } });
    toast.success("Đã khôi phục nội dung gốc.");
    reload();
  }

  async function resetMany(body: Record<string, unknown>, label: string) {
    if (!(await confirm({ title: label, message: "Tất cả chỉnh sửa trong phạm vi này (mọi ngôn ngữ) sẽ quay về nội dung gốc. Không thể hoàn tác.", confirmLabel: "Khôi phục", danger: true }))) return;
    try {
      const r = await api<{ reset: number }>("content", { method: "PUT", body: { resetAll: true, ...body } });
      toast.success(`Đã khôi phục ${r.reset} mục về nội dung gốc.`);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không khôi phục được");
    }
  }

  async function resetPageNamespaces() {
    if (!(await confirm({ title: `Khôi phục tất cả mục đã sửa trong “${pageInfo.label}”?`, message: "Tất cả chỉnh sửa của trang này (mọi ngôn ngữ) sẽ quay về nội dung gốc. Không thể hoàn tác.", confirmLabel: "Khôi phục", danger: true }))) return;
    try {
      let n = 0;
      for (const ns of pageNamespaces) n += (await api<{ reset: number }>("content", { method: "PUT", body: { resetAll: true, namespace: ns } })).reset;
      toast.success(`Đã khôi phục ${n} mục về nội dung gốc.`);
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không khôi phục được");
    }
  }

  const COMMON_NS = ["Nav", "LanguageSwitcher", "Footer", "Common", "AttachField", "StickyContact"];
  const liveAvailable = activePage !== "seo";
  const modeToggle = (
    <div className="inline-flex rounded border border-slate-300 overflow-hidden mb-4 text-sm" role="tablist" aria-label="Cách sửa">
      {([["live", "Sửa trên trang thật"], ["list", "Danh sách văn bản"]] as const).map(([id, label]) => (
        <button key={id} role="tab" aria-selected={mode === id} onClick={() => { setMode(id); setDraft({}); reload(); }} className={`h-9 px-4 ${mode === id ? "bg-steel-600 text-white font-semibold" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
          {label}
        </button>
      ))}
    </div>
  );

  if (mode === "live" && liveAvailable) {
    const detailPath = scope.startsWith("svc:") ? `/dich-vu-gia-cong-ma/${scope.slice(4)}` : scope.startsWith("prd:") ? `/san-pham-du-an/${scope.slice(4)}` : pageInfo.path;
    const liveUrl = `${locale === "vi" ? "" : `/${locale}`}${detailPath === "/" && locale !== "vi" ? "" : detailPath}`;
    const liveNs = [...new Set([...(scope ? [] : pageInfo.namespaces), ...(scope ? [scopeInfo?.namespace ?? "DichVu"] : []), ...COMMON_NS])].filter((n) => namespaces.some((x) => x.name === n));
    return (
      <div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Nội dung trang</h1>
        <p className="text-sm text-slate-500 mb-3 max-w-3xl">Chọn trang rồi bấm thẳng vào chữ trên trang để sửa tại chỗ, xong bấm “Lưu thay đổi”.</p>
        {modeToggle}
        <div className="flex flex-wrap gap-1.5 mb-3" role="tablist" aria-label="Chọn trang">
          {CONTENT_PAGES.filter((p) => p.id !== "seo").map((p) => (
            <button key={p.id} role="tab" aria-selected={activePage === p.id && !scope} onClick={() => { setActivePage(p.id); setScope(""); }} className={`h-9 px-3 rounded border text-sm ${activePage === p.id && !scope ? "bg-steel-600 border-steel-600 text-white font-semibold" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-3">
          <Dropdown
            className="w-full sm:w-96"
            ariaLabel="Trang chi tiết"
            value={scope}
            onChange={(v) => {
              setScope(v);
              if (v.startsWith("svc:")) setActivePage("dich-vu");
              else if (v.startsWith("prd:")) setActivePage("san-pham");
            }}
            options={[{ value: "", label: "Trang chi tiết: không (trang chính)" }, ...scopes.map((sc) => ({ value: sc.id, label: sc.label }))]}
          />
          <div className="flex gap-1" role="tablist" aria-label="Ngôn ngữ">
            {LOCALES.map((l) => (
              <button key={l.key} role="tab" aria-selected={locale === l.key} onClick={() => setLocale(l.key)} className={`px-4 h-10 rounded text-sm font-semibold border ${locale === l.key ? "bg-steel-600 text-white border-steel-600" : "bg-white border-slate-300"}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <LivePageEditor key={`${liveUrl}-${locale}`} url={liveUrl} locale={locale} namespaces={liveNs} scope={scope} scopeNs={scopeInfo?.namespace ?? ""} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Nội dung trang</h1>
      {modeToggle}
      <p className="text-sm text-slate-500 mb-4 max-w-3xl">
        Chọn trang ở hàng nút bên dưới: toàn bộ chữ của trang hiện ra từ đầu đến cuối, mỗi đoạn một ô, sửa trực tiếp rồi bấm “Lưu thay đổi”.
        Đoạn đã sửa có viền xanh và nút “↺ gốc” để khôi phục. Danh sách dịch vụ, sản phẩm, tin tức, tuyển dụng quản lý ở các mục riêng; muốn sửa nội dung chi tiết <strong>riêng cho một dịch vụ hoặc sản phẩm</strong> chọn mục đó ở ô “Phạm vi”.
      </p>

      {!scope && (
        <div className="mb-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Tìm trong TOÀN BỘ nội dung website (ví dụ: hotline, địa chỉ, ISO, bảo mật…)"
            aria-label="Tìm trong toàn bộ nội dung website"
            className="h-11 w-full px-4 border border-slate-300 rounded bg-white text-sm"
          />
          {searching && <p className="mt-1 text-xs text-slate-500">Kết quả tìm kiếm ({entries.length}{entries.length >= 80 ? "+" : ""}) - xoá ô tìm kiếm để quay lại danh sách theo trang.</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-3 mb-4">
        <Dropdown
          className="w-full sm:w-72"
          ariaLabel="Phạm vi"
          value={scope}
          onChange={(v) => {
            setScope(v);
            setDraft({});
          }}
          options={[{ value: "", label: "Phạm vi: nội dung chung toàn website" }, ...scopes.map((sc) => ({ value: sc.id, label: sc.label }))]}
        />
        {!scope && !searching && !changedView && (
          <a href={pageInfo.path} target="_blank" rel="noreferrer" className="h-10 px-3 inline-flex items-center rounded border border-slate-300 bg-white text-sm text-steel-700 hover:bg-slate-50">
            Xem trang ↗
          </a>
        )}
        <div className="flex gap-1" role="tablist" aria-label="Ngôn ngữ">
          {LOCALES.map((l) => (
            <button key={l.key} role="tab" aria-selected={locale === l.key} onClick={() => {
                setLocale(l.key);
                setDraft({});
              }}
              className={`px-4 h-10 rounded text-sm font-semibold border ${locale === l.key ? "bg-steel-600 text-white border-steel-600" : "bg-white border-slate-300"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Lọc theo từ khoá…" className="h-10 px-3 border border-slate-300 rounded bg-white text-sm w-64" />
      </div>

      {!scope && !searching && !changedView && (
        <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Chọn trang">
          {CONTENT_PAGES.map((p) => {
            const nss = namespaces.filter((n) => p.namespaces.includes(n.name));
            const count = nss.reduce((a, n) => a + n.count, 0);
            const ov = nss.reduce((a, n) => a + n.overrides, 0);
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={activePage === p.id}
                onClick={() => {
                  setActivePage(p.id);
                  setDraft({});
                }}
                className={`h-9 px-3 rounded border text-sm ${activePage === p.id ? "bg-steel-600 border-steel-600 text-white font-semibold" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
              >
                {p.label} <span className={activePage === p.id ? "text-white/80" : "text-slate-400"}>({count}{ov ? `, đã sửa ${ov}` : ""})</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="sticky top-14 lg:top-0 z-20 -mx-4 sm:-mx-8 xl:-mx-10 px-4 sm:px-8 xl:px-10 py-2.5 mb-3 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex items-center gap-3">
        <SaveButton type="button" onClick={save} saving={saving} saved={saved} disabled={!dirty.length} className="min-w-[11rem]">
          {`Lưu thay đổi${dirty.length ? ` (${dirty.length})` : ""}`}
        </SaveButton>
      </div>

      {/* Công cụ khôi phục */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
        {changedView ? (
          <>
            <span className="font-semibold text-slate-800">Mọi mục đã sửa trên website ({entries.length})</span>
            <button onClick={() => setChangedView(false)} className="h-9 px-3 rounded border border-slate-300 bg-white">← Quay lại danh sách theo trang</button>
            {entries.length > 0 && (
              <button onClick={() => resetMany({ all: true }, `Khôi phục TẤT CẢ ${entries.length} mục đã sửa trên toàn website?`)} className="h-9 px-3 rounded border border-red-300 text-red-700 bg-white font-semibold">
                ↺ Khôi phục tất cả về gốc
              </button>
            )}
          </>
        ) : (
          <>
            <label className="inline-flex items-center gap-2 h-9 px-3 rounded border border-slate-300 bg-white cursor-pointer">
              <input type="checkbox" checked={onlyChanged} onChange={(e) => setOnlyChanged(e.target.checked)} className="accent-steel-600" />
              Chỉ hiện mục đã sửa ({changedHere})
            </label>
            {changedHere > 0 && !searching && (
              <button
                onClick={() => scope ? resetMany({ scope }, `Khôi phục tất cả ${changedHere} mục đã sửa trong “${scopeInfo?.label}”?`) : pageNamespaces.length === 1 ? resetMany({ namespace: pageNamespaces[0] }, `Khôi phục tất cả ${changedHere} mục đã sửa trong “${pageInfo.label}”?`) : resetPageNamespaces()}
                className="h-9 px-3 rounded border border-red-300 text-red-700 bg-white font-semibold"
              >
                ↺ Khôi phục tất cả trong nhóm này
              </button>
            )}
            {!scope && (
              <button onClick={() => setChangedView(true)} className="h-9 px-3 rounded border border-steel-600 text-steel-700 bg-white font-semibold">
                Xem mọi mục đã sửa trên website{changedSite ? ` (${changedSite})` : ""}
              </button>
            )}
          </>
        )}
      </div>

      {tree.length === 0 && <p className="text-center text-sm text-slate-500 py-10">Không có mục phù hợp.</p>}
      {tree.map(([pageId, sections]) => (
        <section key={pageId} className="mb-8">
          {(searching || changedView) && <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b-2 border-steel-600">{CONTENT_PAGES.find((p) => p.id === pageId)?.label ?? pageId}</h2>}
          {[...sections].map(([section, sec]) => {
            return (
              <div key={section} className="mb-6">
                <div className="flex items-center gap-3 mb-2 sticky top-[7.5rem] lg:top-[3.25rem] z-10 py-1 bg-slate-50/90">
                  <span className="text-xs font-bold uppercase tracking-wide text-steel-700 whitespace-nowrap">{sec.label}</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                {(() => {
                  const items = boxes.get(section) ?? [];
                  const base = boxText(items, locale);
                  const text = draft[section] ?? base;
                  const edited = section in draft && text !== base;
                  const bad = invalid.includes(section);
                  const changedN = items.flatMap((it) => [it.a, it.b, it.c]).filter((e) => e && e.overridden[locale]).length;
                  return (
                    <div className="relative">
                      {(edited || changedN > 0) && (
                        <div className="absolute -top-1 right-2 z-[1] flex gap-1.5">
                          {edited && <button onClick={() => setDraft((d) => { const n = { ...d }; delete n[section]; return n; })} className="h-6 px-2 rounded border border-slate-300 bg-white text-[11px] text-slate-600">Bỏ thay đổi</button>}
                          {changedN > 0 && <button onClick={() => resetBox(items)} title={`Có ${changedN} đoạn đã sửa; bấm để khôi phục nội dung gốc (${locale.toUpperCase()})`} className="h-6 px-2 rounded border border-steel-600 bg-white text-[11px] font-semibold text-steel-700">↺ gốc ({changedN})</button>}
                        </div>
                      )}
                      <AutoText
                        lang={locale}
                        spellCheck={false}
                        className={`w-full resize-none overflow-hidden px-4 py-3 rounded-lg border text-[15px] leading-relaxed bg-white ${bad ? "border-red-400 bg-red-50" : edited ? "border-amber-400" : changedN > 0 ? "border-steel-600" : "border-slate-200"} focus:border-steel-600 focus:outline-none`}
                        value={text}
                        onChange={(e) => setDraft({ ...draft, [section]: e.target.value })}
                      />
                      {bad && <p role="alert" className="mt-1 text-xs text-red-700">Mỗi đoạn cách nhau đúng một dòng trống (đừng thêm hoặc bớt đoạn), các dòng dạng “tiêu đề: nội dung” cần giữ dấu hai chấm. Muốn ẩn một đoạn, ghi [trống] vào đoạn đó.</p>}
                      {locale !== "vi" && (
                        <details className="mt-1">
                          <summary className="text-xs text-slate-500 cursor-pointer">Xem bản tiếng Việt để đối chiếu</summary>
                          <pre className="mt-1 whitespace-pre-wrap text-xs text-slate-500 bg-slate-50 rounded p-2">{boxText(items, "vi")}</pre>
                        </details>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
