"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  name?: string;
  id?: string;
  required?: boolean;
  /** Chế độ controlled. */
  value?: string;
  /** Chế độ uncontrolled (dùng trong form không có state). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Class cho nút hiển thị (chiều cao, viền, nền...). */
  className?: string;
  ariaLabel?: string;
}

/**
 * Dropdown tuỳ biến thay cho <select> gốc (danh sách gốc do hệ điều hành vẽ, không theo giao diện site).
 * Vẫn render một <select> ẩn để form (name, required, reset, FormData) hoạt động như bình thường.
 */
export default function Select({
  options,
  name,
  id,
  required,
  value,
  defaultValue,
  onChange,
  className = "",
  ariaLabel,
}: SelectProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? "");
  const current = value ?? inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === current));
  const selected = options[selectedIndex];

  useEffect(() => {
    const form = wrapRef.current?.closest("form");
    if (!form) return;
    const onReset = () => setInner(defaultValue ?? options[0]?.value ?? "");
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [defaultValue, options]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    const next = options[index];
    if (!next) return;
    setInner(next.value);
    onChange?.(next.value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) { e.preventDefault(); setActive(0); }
        break;
      case "End":
        if (open) { e.preventDefault(); setActive(options.length - 1); }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) { e.preventDefault(); setOpen(false); }
        break;
      case "Tab":
        setOpen(false);
        break;
      default: {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          const from = open ? active + 1 : selectedIndex + 1;
          const ordered = [...options.slice(from), ...options.slice(0, from)];
          const hit = ordered.findIndex((o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()));
          if (hit >= 0) {
            const idx = (from + hit) % options.length;
            if (open) setActive(idx);
            else choose(idx);
          }
        }
      }
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Giữ ngữ nghĩa form (required, FormData, reset); không nhận tương tác trực tiếp. */}
      <select
        name={name}
        required={required}
        value={current}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${baseId}-list`}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-steel-600/40 ${className}`}
      >
        <span className="min-w-0 flex-1 truncate">{selected?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-[18px] w-[18px] shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${baseId}-list`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded border border-slate-200 bg-white py-1 shadow-lg"
        >
          {options.map((o, i) => {
            const isSelected = i === selectedIndex;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-2 px-3 py-2 text-body-md transition-colors ${
                  i === active ? "bg-steel-50 text-steel-700" : "text-slate-700"
                } ${isSelected ? "font-semibold" : ""}`}
              >
                <span className="min-w-0 flex-1">{o.label}</span>
                {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-steel-600" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
