"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import PhoneListInput from "./PhoneListInput";

interface Def {
  key: string;
  label: string;
  help?: string;
  group: string;
  kind?: string;
  defaultValue?: string;
}

export default function SettingsForm() {
  const [defs, setDefs] = useState<Def[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    void api<{ defs: Def[]; values: Record<string, string> }>("settings").then((d) => {
      setDefs(d.defs);
      setValues(d.values);
    });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    try {
      await api("settings", { method: "PUT", body: values });
      setMessage({ ok: true, text: "Đã lưu. Website cập nhật ngay." });
      // Lấy lại giá trị đã chuẩn hoá từ server.
      void api<{ values: Record<string, string> }>("settings").then((d) => setValues(d.values));
    } catch (err) {
      setMessage({ ok: false, text: err instanceof ApiError ? err.message : "Không lưu được" });
    }
  }

  const groups = [...new Set(defs.map((d) => d.group))];
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {groups.map((group) => (
        <fieldset key={group} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
          <legend className="px-2 font-bold text-slate-900">{group}</legend>
          {defs.filter((d) => d.group === group).map((d) =>
            d.kind === "phone" ? (
              <div key={d.key} className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
                <label htmlFor={`f-${d.key}`}>{d.label}</label>
                <PhoneListInput id={`f-${d.key}`} value={values[d.key] ?? ""} onChange={(v) => setValues({ ...values, [d.key]: v })} />
                {d.help && <span className="text-xs font-normal text-slate-500">{d.help}</span>}
                <RestoreDefault def={d} value={values[d.key]} onRestore={() => setValues({ ...values, [d.key]: d.defaultValue ?? "" })} />
              </div>
            ) : (
            <label key={d.key} className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
              {d.label}
              <input
                value={values[d.key] ?? ""}
                onChange={(e) => setValues({ ...values, [d.key]: e.target.value })}
                className="h-10 px-3 border border-slate-300 rounded font-normal"
                placeholder="https://…"
              />
              {d.help && <span className="text-xs font-normal text-slate-500">{d.help}</span>}
              <RestoreDefault def={d} value={values[d.key]} onRestore={() => setValues({ ...values, [d.key]: d.defaultValue ?? "" })} />
            </label>
            ),
          )}
        </fieldset>
      ))}
      <div className="flex items-center gap-3">
        <button className="h-10 px-6 rounded bg-steel-600 hover:bg-steel-700 text-white font-semibold text-sm">Lưu</button>
        {message && <span role="status" className={`text-sm ${message.ok ? "text-emerald-700" : "text-red-700"}`}>{message.text}</span>}
      </div>
    </form>
  );
}

/** Nút khôi phục giá trị mặc định (chỉ hiện khi giá trị đang khác mặc định và mục đó có mặc định). */
function RestoreDefault({ def, value, onRestore }: { def: Def; value: string | undefined; onRestore: () => void }) {
  if (def.defaultValue === undefined || (value ?? "") === def.defaultValue) return null;
  return (
    <button type="button" onClick={onRestore} className="self-start h-8 px-3 rounded border border-steel-600 text-steel-700 bg-white text-xs font-semibold hover:bg-steel-50">
      ↺ Khôi phục mặc định{def.defaultValue ? `: ${def.defaultValue.length > 40 ? def.defaultValue.slice(0, 40) + "…" : def.defaultValue}` : ""}
    </button>
  );
}
