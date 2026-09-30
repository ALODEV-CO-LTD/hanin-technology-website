"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "./api";

interface Def {
  key: string;
  label: string;
  help?: string;
  group: string;
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
    } catch (err) {
      setMessage({ ok: false, text: err instanceof ApiError ? err.message : "Không lưu được" });
    }
  }

  const groups = [...new Set(defs.map((d) => d.group))];
  return (
    <form onSubmit={onSubmit} className="max-w-3xl flex flex-col gap-6">
      {groups.map((group) => (
        <fieldset key={group} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
          <legend className="px-2 font-bold text-slate-900">{group}</legend>
          {defs.filter((d) => d.group === group).map((d) => (
            <label key={d.key} className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
              {d.label}
              <input
                value={values[d.key] ?? ""}
                onChange={(e) => setValues({ ...values, [d.key]: e.target.value })}
                className="h-10 px-3 border border-slate-300 rounded font-normal"
                placeholder="https://…"
              />
              {d.help && <span className="text-xs font-normal text-slate-500">{d.help}</span>}
            </label>
          ))}
        </fieldset>
      ))}
      <div className="flex items-center gap-3">
        <button className="h-10 px-6 rounded bg-steel-600 hover:bg-steel-700 text-white font-semibold text-sm">Lưu</button>
        {message && <span role="status" className={`text-sm ${message.ok ? "text-emerald-700" : "text-red-700"}`}>{message.text}</span>}
      </div>
    </form>
  );
}
