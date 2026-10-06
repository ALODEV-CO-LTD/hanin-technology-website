"use client";

import { useEffect, useMemo, useState } from "react";
import { api, ApiError } from "./api";
import Dropdown from "./Dropdown";

type Locale = "vi" | "zh" | "ko";
const LOCALES: { key: Locale; label: string }[] = [
  { key: "vi", label: "Tiếng Việt" },
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

const NAMESPACE_LABELS: Record<string, string> = {
  Nav: "Menu điều hướng",
  LanguageSwitcher: "Chọn ngôn ngữ",
  Footer: "Chân trang (Footer)",
  Home: "Trang chủ",
  GioiThieu: "Giới thiệu",
  DichVu: "Dịch vụ gia công mạ (phần văn bản chung)",
  SanPham: "Sản phẩm & Dự án (phần văn bản chung)",
  NangLuc: "Năng lực sản xuất",
  TinTuc: "Tin tức (phần văn bản chung)",
  LienHe: "Liên hệ",
  TuyenDung: "Tuyển dụng (phần văn bản chung)",
  Legal: "Chính sách & Điều khoản",
  Meta: "Tiêu đề & mô tả SEO các trang",
};

export default function ContentEditor() {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [active, setActive] = useState("");
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [scope, setScope] = useState(""); // "" = nội dung chung; "svc:<slug>" | "prd:<slug>" = nội dung riêng của 1 mục
  const [locale, setLocale] = useState<Locale>("vi");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({}); // key -> giá trị đang sửa (theo locale hiện tại)
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [version, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);

  useEffect(() => {
    let cancelled = false;
    api<{ namespaces: Namespace[]; scopes: Scope[] }>("content").then((data) => {
      if (cancelled) return;
      setNamespaces(data.namespaces);
      setScopes(data.scopes);
      setActive((cur) => cur || data.namespaces[0]?.name || "");
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const scopeInfo = scopes.find((sc) => sc.id === scope);
  const currentNs = scopeInfo ? scopeInfo.namespace : active;

  useEffect(() => {
    if (!currentNs) return;
    let cancelled = false;
    api<{ entries: Entry[] }>(`content?namespace=${encodeURIComponent(currentNs)}${scope ? `&scope=${encodeURIComponent(scope)}` : ""}`).then((data) => {
      if (cancelled) return;
      setEntries(data.entries);
      setDraft({});
    });
    return () => {
      cancelled = true;
    };
  }, [currentNs, scope, version]);

  const visible = useMemo(() => {
    const f = filter.trim().toLowerCase();
    return entries.filter((e) => !f || e.key.toLowerCase().includes(f) || e.values[locale].toLowerCase().includes(f) || e.values.vi.toLowerCase().includes(f));
  }, [entries, filter, locale]);

  const dirty = Object.keys(draft).filter((k) => draft[k] !== entries.find((e) => e.key === k)?.values[locale]);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await api("content", { method: "PUT", body: { changes: dirty.map((key) => ({ locale, key, scope, value: draft[key] })) } });
      setMessage({ ok: true, text: `Đã lưu ${dirty.length} nội dung. Website cập nhật ngay.` });
      reload();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof ApiError ? err.message : "Không lưu được" });
    } finally {
      setSaving(false);
    }
  }

  async function reset(key: string) {
    if (!confirm("Khôi phục nội dung gốc cho mục này?")) return;
    await api("content", { method: "PUT", body: { changes: [{ locale, key, scope, value: null }] } });
    reload();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Nội dung trang</h1>
      <p className="text-sm text-slate-500 mb-4 max-w-3xl">
        Sửa các đoạn văn bản cố định của website (tiêu đề, mô tả, nút bấm, chân trang…). Mục được sửa sẽ có dấu chấm xanh; bấm “Khôi phục” để về nội dung gốc.
        Dịch vụ, sản phẩm, tin tức, tuyển dụng được quản lý ở các mục riêng.
        Muốn sửa nội dung chi tiết <strong>riêng cho một dịch vụ hoặc sản phẩm</strong> (quy trình, thông số, ứng dụng…) hãy chọn mục đó ở ô “Phạm vi”; còn lại là nội dung chung của toàn website.
      </p>

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
        {!scope && (
          <Dropdown
            className="w-full sm:w-80"
            ariaLabel="Chọn trang"
            value={active}
            onChange={setActive}
            options={namespaces.map((n) => ({
              value: n.name,
              label: `${NAMESPACE_LABELS[n.name] ?? n.name} (${n.count}${n.overrides ? `, đã sửa ${n.overrides}` : ""})`,
            }))}
          />
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

      <div className="sticky top-14 lg:top-0 z-20 -mx-4 sm:-mx-8 xl:-mx-10 px-4 sm:px-8 xl:px-10 py-2.5 mb-3 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex items-center gap-3">
        <button onClick={save} disabled={!dirty.length || saving} className="h-10 px-6 rounded bg-steel-600 hover:bg-steel-700 text-white font-semibold text-sm disabled:opacity-50">
          {saving ? "Đang lưu…" : `Lưu thay đổi${dirty.length ? ` (${dirty.length})` : ""}`}
        </button>
        {message && <span role="status" className={`text-sm ${message.ok ? "text-emerald-700" : "text-red-700"}`}>{message.text}</span>}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((entry) => {
          const value = draft[entry.key] ?? entry.values[locale];
          const long = value.length > 90 || value.includes("\n");
          return (
            <div key={entry.key} className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <code className="text-[11px] text-slate-400 break-all">
                  {entry.overridden[locale] && <span title="Đã chỉnh sửa" className="inline-block w-2 h-2 rounded-full bg-steel-600 mr-1.5 align-middle" />}
                  {entry.key}
                </code>
                {entry.overridden[locale] && (
                  <button onClick={() => reset(entry.key)} className="text-xs text-steel-600 hover:underline shrink-0">Khôi phục gốc</button>
                )}
              </div>
              {locale !== "vi" && <p className="text-xs text-slate-400 mb-1">VI: {entry.values.vi}</p>}
              {long ? (
                <textarea rows={Math.min(8, Math.ceil(value.length / 90) + 1)} lang={locale} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" value={value} onChange={(e) => setDraft({ ...draft, [entry.key]: e.target.value })} />
              ) : (
                <input lang={locale} className="w-full px-3 h-10 border border-slate-300 rounded text-sm" value={value} onChange={(e) => setDraft({ ...draft, [entry.key]: e.target.value })} />
              )}
            </div>
          );
        })}
        {visible.length === 0 && <p className="text-center text-sm text-slate-500 py-10">Không có mục phù hợp.</p>}
      </div>
    </div>
  );
}
