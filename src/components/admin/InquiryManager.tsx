"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";
import Dropdown from "./Dropdown";
import { formatSize } from "./MediaPicker";
import { useToast } from "./Toast";

interface Inquiry {
  id: number;
  kind: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectName: string;
  platingService: string;
  volume: string;
  message: string;
  files: { original: string; size: number }[];
  source: string;
  locale: string;
  status: string;
  note: string;
  createdAt: string;
}

const STATUSES = [
  { value: "new", label: "Mới", cls: "bg-red-100 text-red-700" },
  { value: "processing", label: "Đang xử lý", cls: "bg-amber-100 text-amber-800" },
  { value: "done", label: "Đã xử lý", cls: "bg-emerald-100 text-emerald-800" },
  { value: "spam", label: "Spam", cls: "bg-slate-200 text-slate-600" },
];
const KINDS: Record<string, string> = { rfq: "Báo giá", contact: "Liên hệ", application: "Ứng tuyển" };

export default function InquiryManager({ initialStatus = "" }: { initialStatus?: string }) {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(initialStatus);
  const [kind, setKind] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const [error, setError] = useState("");
  const toast = useToast();

  const [version, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set("status", status);
    if (kind) params.set("kind", kind);
    if (q) params.set("q", q);
    let cancelled = false;
    api<{ items: Inquiry[]; total: number }>(`inquiries?${params}`)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Không tải được danh sách");
      });
    return () => {
      cancelled = true;
    };
  }, [page, status, kind, q, version]);

  async function patch(id: number, body: Record<string, unknown>) {
    try {
      await api(`inquiries/${id}`, { method: "PATCH", body });
      toast.success("Đã cập nhật yêu cầu.");
      reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không cập nhật được");
      toast.error(err instanceof ApiError ? err.message : "Không cập nhật được");
    }
  }

  async function remove(id: number) {
    if (!confirm("Xoá yêu cầu này và toàn bộ tệp đính kèm? Không thể hoàn tác.")) return;
    await api(`inquiries/${id}`, { method: "DELETE" });
    toast.success("Đã xoá yêu cầu.");
    setOpen(null);
    reload();
  }

  const select = "h-10 px-3 border border-slate-300 rounded bg-white text-sm";
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-4">Liên hệ & Ứng tuyển</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Dropdown
          className="w-full sm:w-52"
          ariaLabel="Lọc trạng thái"
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
          options={[{ value: "", label: "Mọi trạng thái" }, ...STATUSES.map((s) => ({ value: s.value, label: s.label }))]}
        />
        <Dropdown
          className="w-full sm:w-44"
          ariaLabel="Lọc loại"
          value={kind}
          onChange={(v) => {
            setKind(v);
            setPage(1);
          }}
          options={[{ value: "", label: "Mọi loại" }, ...Object.entries(KINDS).map(([k, l]) => ({ value: k, label: l }))]}
        />
        <input className={select + " w-full sm:w-64"} placeholder="Tìm tên, công ty, email…" value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} />
      </div>
      {error && <p role="alert" className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const st = STATUSES.find((s) => s.value === item.status);
          const expanded = open === item.id;
          return (
            <article key={item.id} className="bg-white border border-slate-200 rounded-lg">
              <button
                className="w-full text-left px-4 py-3 flex flex-wrap items-center justify-between gap-2"
                onClick={() => {
                  setOpen(expanded ? null : item.id);
                  if (!expanded && item.status === "new") void patch(item.id, { status: "processing" });
                }}
                aria-expanded={expanded}
              >
                <span className="min-w-0">
                  <strong className="text-slate-900">{item.fullName}</strong>
                  {item.company && <span className="text-slate-500"> · {item.company}</span>}
                  <span className="block text-xs text-slate-500 truncate">{item.message || item.projectName || item.source}</span>
                </span>
                <span className="flex items-center gap-2 text-xs shrink-0">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">{KINDS[item.kind] ?? item.kind}</span>
                  <span className={`px-2 py-0.5 rounded font-semibold ${st?.cls}`}>{st?.label}</span>
                  <span className="text-slate-500">{item.createdAt.slice(0, 16)}</span>
                </span>
              </button>
              {expanded && (
                <div className="border-t border-slate-100 px-4 py-4 grid gap-4 text-sm">
                  <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    <Info label="Email"><a className="text-steel-600 hover:underline" href={`mailto:${item.email}`}>{item.email}</a></Info>
                    {item.phone && <Info label="Điện thoại"><a className="text-steel-600 hover:underline" href={`tel:${item.phone}`}>{item.phone}</a></Info>}
                    {item.projectName && <Info label="Dự án / vị trí">{item.projectName}</Info>}
                    {item.platingService && <Info label="Dịch vụ quan tâm">{item.platingService}</Info>}
                    {item.volume && <Info label="Quy mô">{item.volume}</Info>}
                    {item.source && <Info label="Nguồn">{item.source}</Info>}
                    <Info label="Ngôn ngữ">{item.locale.toUpperCase()}</Info>
                  </dl>
                  {item.message && <p className="whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded p-3">{item.message}</p>}
                  {item.files.length > 0 && (
                    <div>
                      <p className="font-semibold mb-1">Tệp đính kèm (bảo mật — chỉ tải khi đã đăng nhập)</p>
                      <ul className="flex flex-col gap-1">
                        {item.files.map((f, index) => (
                          <li key={index}>
                            <a className="text-steel-600 hover:underline" href={`/api/admin/inquiries/${item.id}/files/${index}`}>
                              {f.original}
                            </a>{" "}
                            <span className="text-slate-400">({formatSize(f.size)})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <NoteEditor item={item} onSave={(note) => patch(item.id, { note })} />
                  <div className="flex flex-wrap items-center gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => patch(item.id, { status: s.value })}
                        className={`px-3 h-9 rounded border text-xs font-semibold ${item.status === s.value ? "bg-steel-600 text-white border-steel-600" : "bg-white border-slate-300"}`}
                      >
                        {s.label}
                      </button>
                    ))}
                    <button onClick={() => remove(item.id)} className="ml-auto px-3 h-9 rounded border border-red-200 text-red-700 text-xs font-semibold bg-white">Xoá</button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
        {items.length === 0 && <p className="text-center text-sm text-slate-500 py-10">Không có yêu cầu nào.</p>}
      </div>

      {total > 20 && (
        <div className="flex items-center justify-center gap-3 mt-4 text-sm">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 border rounded bg-white disabled:opacity-40">Trước</button>
          <span>Trang {page} / {Math.ceil(total / 20)}</span>
          <button disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(page + 1)} className="px-3 py-1.5 border rounded bg-white disabled:opacity-40">Sau</button>
        </div>
      )}
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-slate-900">{children}</dd>
    </div>
  );
}

function NoteEditor({ item, onSave }: { item: Inquiry; onSave: (note: string) => void }) {
  const [note, setNote] = useState(item.note);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-semibold" htmlFor={`note-${item.id}`}>Ghi chú nội bộ</label>
      <textarea id={`note-${item.id}`} rows={2} className="px-3 py-2 border border-slate-300 rounded" value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={() => onSave(note)} disabled={note === item.note} className="self-start px-3 h-8 rounded border border-slate-300 bg-white text-xs disabled:opacity-40">Lưu ghi chú</button>
    </div>
  );
}
