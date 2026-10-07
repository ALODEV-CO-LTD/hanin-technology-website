"use client";

import { useState } from "react";

const PHONE_RE = /^0\d{9}$/;

/** Ô nhập NHIỀU số điện thoại: gõ số rồi bấm Enter / dấu phẩy / khoảng trắng để thêm; mỗi số là một thẻ có nút xoá. */
export default function PhoneListInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const numbers = value.split(/[\s,;]+/).filter(Boolean);

  function commit(raw: string) {
    const parts = raw.split(/[\s,;]+/).filter(Boolean);
    if (!parts.length) return;
    const next = [...numbers];
    for (const part of parts) {
      if (!PHONE_RE.test(part)) return setError(`“${part}” chưa đúng: phải đủ 10 chữ số, bắt đầu bằng 0 (ví dụ 0975080648).`);
      if (next.includes(part)) return setError(`Số ${part} đã có trong danh sách.`);
      if (next.length >= 20) return setError("Tối đa 20 số.");
      next.push(part);
    }
    setError("");
    setDraft("");
    onChange(next.join(","));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 min-h-10 px-2 py-1.5 border border-slate-300 rounded bg-white focus-within:ring-2 focus-within:ring-steel-600">
        {numbers.map((n) => (
          <span key={n} className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded bg-steel-50 border border-steel-200 text-steel-800 font-mono text-sm font-normal">
            {n}
            <button
              type="button"
              aria-label={`Xoá số ${n}`}
              onClick={() => onChange(numbers.filter((x) => x !== n).join(","))}
              className="w-5 h-5 inline-flex items-center justify-center rounded hover:bg-steel-200 text-steel-700"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          inputMode="numeric"
          autoComplete="off"
          placeholder={numbers.length ? "Thêm số khác…" : "0975080648"}
          onChange={(e) => {
            const v = e.target.value;
            if (/[\s,;]$/.test(v)) commit(v);
            else setDraft(v.replace(/[^\d]/g, "").slice(0, 10));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit(draft);
            } else if (e.key === "Backspace" && !draft && numbers.length) {
              onChange(numbers.slice(0, -1).join(","));
            }
          }}
          onBlur={() => draft && commit(draft)}
          className="flex-1 min-w-32 h-8 px-1 outline-none bg-transparent font-mono text-sm font-normal"
        />
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs font-normal text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
