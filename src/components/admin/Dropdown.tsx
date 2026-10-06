"use client";

import { useEffect, useId, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

/**
 * Ô chọn dạng danh sách xổ xuống bung NGAY BÊN DƯỚI ô (không đè lên nội dung phía trên
 * như <select> gốc của hệ điều hành). Hỗ trợ bàn phím: ↑ ↓ Enter Esc.
 */
export default function Dropdown({
  id,
  value,
  options,
  onChange,
  allowEmpty,
  className = "",
  ariaLabel,
}: {
  id?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  allowEmpty?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  const items: Option[] = allowEmpty ? [{ value: "", label: "—" }, ...options] : options;
  const current = items.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function openList() {
    setActive(Math.max(0, items.findIndex((o) => o.value === value)));
    setOpen(true);
  }

  function choose(v: string) {
    onChange(v);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openList();
      else setActive((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openList();
      else setActive((i) => Math.max(0, i - 1));
    } else if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      choose(items[active].value);
    }
  }

  return (
    <div ref={root} className={`relative min-w-0 ${className}`.trim()} onKeyDown={onKeyDown}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openList())}
        className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-sm text-left flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-steel-600"
      >
        <span className="truncate">{current?.label ?? "—"}</span>
        <svg viewBox="0 0 20 20" className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-40 max-h-64 overflow-auto rounded border border-slate-200 bg-white py-1 shadow-xl"
        >
          {items.map((o, i) => (
            <li
              key={o.value || "empty"}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(o.value)}
              className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between gap-2 ${
                i === active ? "bg-steel-50 text-steel-800" : "text-slate-700"
              } ${o.value === value ? "font-semibold" : ""}`}
            >
              <span>{o.label}</span>
              {o.value === value && <span aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
