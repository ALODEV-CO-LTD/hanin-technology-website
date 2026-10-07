"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import Dropdown from "./Dropdown";
import HistoryPanel from "./HistoryPanel";
import { MediaPickerModal } from "./MediaPicker";

type Locale = "vi" | "zh" | "ko";
const LOCALES: { key: Locale; label: string }[] = [
  { key: "vi", label: "Tiếng Việt" },
  { key: "zh", label: "中文" },
  { key: "ko", label: "한국어" },
];

export interface FieldDefLite {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  help?: string;
  maxLength?: number;
  options?: { value: string; label: string }[];
  itemFields?: FieldDefLite[];
  maxItems?: number;
  min?: number;
  max?: number;
  defaultValue?: unknown;
}

type Values = Record<string, unknown>;

const inputClass = "w-full px-3 py-2 border border-slate-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-steel-600 text-sm";

function emptyValue(field: FieldDefLite): unknown {
  switch (field.type) {
    case "i18n-text":
    case "i18n-textarea":
      return { vi: "", zh: "", ko: "" };
    case "list":
      return [];
    case "boolean":
      return field.defaultValue ?? false;
    case "number":
      return field.defaultValue ?? 0;
    case "date":
      return new Date().toISOString().slice(0, 10);
    case "select":
      return field.defaultValue ?? field.options?.[0]?.value ?? "";
    default:
      return (field.defaultValue as string) ?? "";
  }
}

function collectMissing(fields: FieldDefLite[], values: Values, locale: Locale): boolean {
  return fields.some((f) => {
    const v = values[f.name];
    if (f.type.startsWith("i18n")) {
      const t = v as Record<Locale, string> | undefined;
      return Boolean(t?.vi) && !t?.[locale];
    }
    if (f.type === "list" && Array.isArray(v) && f.itemFields) {
      return v.some((item) => collectMissing(f.itemFields!, item as Values, locale));
    }
    return false;
  });
}

function ImageInput({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  const [picking, setPicking] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start">
      <div className="w-full sm:w-40 aspect-[4/3] shrink-0 bg-slate-100 border border-slate-200 rounded overflow-hidden flex items-center justify-center text-xs text-slate-400">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          "Chưa có ảnh"
        )}
      </div>
      <div className="flex-1 w-full flex flex-col gap-2">
        <input id={id} className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/… hoặc https://…" />
        <div className="flex gap-2">
          <button type="button" onClick={() => setPicking(true)} className="px-3 h-9 rounded bg-slate-800 text-white text-sm hover:bg-slate-700">
            Chọn / tải ảnh lên
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="px-3 h-9 rounded border border-slate-300 text-sm bg-white">
              Bỏ ảnh
            </button>
          )}
        </div>
      </div>
      {picking && (
        <MediaPickerModal
          onClose={() => setPicking(false)}
          onSelect={(item) => {
            onChange(item.path);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

interface FieldProps {
  field: FieldDefLite;
  value: unknown;
  onChange: (v: unknown) => void;
  locale: Locale;
  errors: Record<string, string>;
  path: string;
}

function Field({ field, value, onChange, locale, errors, path }: FieldProps) {
  const error = errors[path];
  const id = `f-${path}`;
  let control: React.ReactNode;

  switch (field.type) {
    case "text":
      control = <input id={id} className={inputClass} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} maxLength={field.maxLength} />;
      break;
    case "textarea":
      control = <textarea id={id} rows={5} className={inputClass} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "i18n-text":
    case "i18n-textarea": {
      const map = (value as Record<Locale, string>) ?? {};
      const Tag = field.type === "i18n-text" ? "input" : "textarea";
      control = (
        <Tag
          id={id}
          key={locale}
          className={inputClass + (field.type === "i18n-textarea" ? " min-h-28 leading-relaxed" : "")}
          {...(field.type === "i18n-textarea" ? { rows: field.maxLength && field.maxLength > 5000 ? 14 : 5 } : {})}
          value={map[locale] ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onChange({ ...map, [locale]: e.target.value })}
          placeholder={locale === "vi" ? "" : `Bản dịch (nếu trống sẽ dùng tiếng Việt)`}
          lang={locale}
        />
      );
      break;
    }
    case "image":
      control = <ImageInput id={id} value={String(value ?? "")} onChange={onChange} />;
      break;
    case "select":
      control = (
        <Dropdown
          id={id}
          value={String(value ?? "")}
          options={field.options ?? []}
          allowEmpty={!field.required}
          onChange={(v) => onChange(v)}
        />
      );
      break;
    case "boolean":
      control = (
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
          <input id={id} type="checkbox" className="w-4 h-4 accent-steel-600" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{Boolean(value) ? "Bật" : "Tắt"}</span>
        </label>
      );
      break;
    case "number":
      control = <input id={id} type="number" inputMode="numeric" step={1} min={field.min ?? 0} max={field.max ?? 9999} className={inputClass + " max-w-32"} value={Number(value ?? 0)} onKeyDown={(e) => { if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault(); }} onChange={(e) => onChange(e.target.value === "" ? 0 : Math.min(Math.max(Math.trunc(Number(e.target.value)) || 0, field.min ?? 0), field.max ?? 9999))} />;
      break;
    case "date":
      control = <input id={id} type="date" className={inputClass + " max-w-48"} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "list": {
      const items = (Array.isArray(value) ? value : []) as Values[];
      const max = field.maxItems ?? 30;
      const move = (from: number, to: number) => {
        const next = [...items];
        [next[from], next[to]] = [next[to], next[from]];
        onChange(next);
      };
      control = (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded bg-slate-50 p-3 flex flex-col gap-3">
              {field.itemFields?.map((sub) => (
                <Field
                  key={sub.name}
                  field={sub}
                  value={item[sub.name]}
                  locale={locale}
                  errors={errors}
                  path={`${path}.${index}.${sub.name}`}
                  onChange={(v) => onChange(items.map((it, i) => (i === index ? { ...it, [sub.name]: v } : it)))}
                />
              ))}
              <div className="flex gap-2 text-xs">
                <button type="button" disabled={index === 0} onClick={() => move(index, index - 1)} className="px-2 py-1 border rounded bg-white disabled:opacity-40">↑ Lên</button>
                <button type="button" disabled={index === items.length - 1} onClick={() => move(index, index + 1)} className="px-2 py-1 border rounded bg-white disabled:opacity-40">↓ Xuống</button>
                <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="px-2 py-1 border border-red-200 text-red-700 rounded bg-white">Xoá mục</button>
              </div>
            </div>
          ))}
          {items.length < max && (
            <button
              type="button"
              onClick={() => onChange([...items, Object.fromEntries((field.itemFields ?? []).map((s) => [s.name, emptyValue(s)]))])}
              className="self-start px-3 h-9 rounded border border-dashed border-slate-400 text-sm text-slate-700 hover:bg-slate-50"
            >
              + Thêm mục
            </button>
          )}
        </div>
      );
      break;
    }
    default:
      control = null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {field.label}
        {field.required && <span className="text-red-600"> *</span>}
      </label>
      {control}
      {field.help && <p className="text-xs text-slate-500">{field.help}</p>}
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
    </div>
  );
}

interface Props {
  resource: { key: string; label: string; singular: string; fields: FieldDefLite[] };
  initial: Values | null;
  id: number | null;
}

export default function ResourceForm({ resource, initial, id }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => {
    const base: Values = {};
    for (const f of resource.fields) base[f.name] = initial?.[f.name] ?? emptyValue(f);
    return base;
  });
  const [locale, setLocale] = useState<Locale>("vi");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const hasI18n = useMemo(() => resource.fields.some((f) => f.type.startsWith("i18n") || f.type === "list"), [resource.fields]);
  const missing = useMemo(
    () => Object.fromEntries(LOCALES.map((l) => [l.key, collectMissing(resource.fields, values, l.key)])) as Record<Locale, boolean>,
    [resource.fields, values],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage(null);
    try {
      if (id) {
        await api(`${resource.key}/${id}`, { method: "PUT", body: values });
        setMessage({ type: "ok", text: "Đã lưu thay đổi." });
        router.refresh();
      } else {
        await api(resource.key, { body: values });
        router.push(`/admin/${resource.key}`);
        router.refresh();
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.errors ?? {});
        setMessage({ type: "error", text: err.errors ? "Vui lòng kiểm tra các trường được đánh dấu." : err.message });
      } else {
        setMessage({ type: "error", text: "Không lưu được, vui lòng thử lại." });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="sticky top-14 lg:top-0 z-20 -mx-4 sm:-mx-8 xl:-mx-10 px-4 sm:px-8 xl:px-10 py-3 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <Link href={`/admin/${resource.key}`} className="text-sm font-medium text-steel-600 hover:underline">←{resource.label}</Link>
          <h1 className="text-xl font-bold text-slate-900">{id ? `Sửa ${resource.singular}` : `Thêm ${resource.singular}`}</h1>
        </div>
        <button disabled={saving} className="h-10 px-6 rounded bg-steel-600 hover:bg-steel-700 text-white font-semibold text-sm disabled:opacity-60">
          {saving ? "Đang lưu…" : "Lưu"}
        </button>
      </div>

      {message && (
        <p role={message.type === "error" ? "alert" : "status"} className={`mt-4 text-sm rounded px-3 py-2 border ${message.type === "ok" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {message.text}
        </p>
      )}

      {hasI18n && (
        <div className="mt-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Ngôn ngữ nội dung">
          {LOCALES.map((l) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              aria-selected={locale === l.key}
              onClick={() => setLocale(l.key)}
              className={`px-4 h-9 rounded text-sm font-semibold border ${locale === l.key ? "bg-steel-600 text-white border-steel-600" : "bg-white text-slate-700 border-slate-300"}`}
            >
              {l.label}
              {missing[l.key] && <span title="Còn trường chưa dịch" className="ml-1.5 inline-block w-2 h-2 rounded-full bg-amber-400 align-middle" />}
            </button>
          ))}
          <span className="text-xs text-slate-500">Các ô văn bản đang hiển thị theo ngôn ngữ đã chọn; ô để trống ở ZH/KO sẽ dùng tiếng Việt.</span>
        </div>
      )}

      <div className="mt-5 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col gap-5">
        {resource.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
            locale={locale}
            errors={errors}
            path={field.name}
          />
        ))}
      </div>
      {id && <HistoryPanel resource={resource.key} id={id} />}
    </form>
  );
}
