"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./api";
import SaveButton, { useSavedFlash } from "./SaveButton";
import { parseContentKey } from "./content-labels";
import { toast } from "@/components/ct999/thong-bao-toast/store";

type Locale = "vi" | "en" | "zh" | "ko";
interface Entry {
  key: string;
  values: Record<Locale, string>;
  overridden: Record<Locale, boolean>;
}
interface Target {
  key: string;
  scope: string;
  original: string;
}

/** Thẻ luôn là một dòng chữ riêng (không gộp lên cha). */
const LINE_TAG = /^(P|H[1-6]|LI|A|BUTTON|LABEL|DT|DD|TD|TH|SUMMARY|FIGCAPTION|BLOCKQUOTE)$/;
const norm = (s: string) => s.replace(/\s+/g, " ").trim();
/** Giá trị người dùng nhập: giữ các lần xuống dòng, gọn khoảng trắng thừa. */
const val = (s: string) => s.replace(/\r/g, "").replace(/[ \t\u00a0]+/g, " ").replace(/ ?\n ?/g, "\n").replace(/^\n+|\n+$/g, "").trim();
/** Ô không phải chữ người xem thấy trên trang. */
const HIDDEN = /(^|\.)(alt|[a-zA-Z]*Alt|breadcrumb[a-zA-Z]*|ariaLabel|[a-zA-Z]*AriaLabel)$/;

/**
 * Sửa văn bản ngay trên trang thật: mở đúng trang website trong khung, mỗi đoạn chữ khớp với một ô nội dung được bật
 * chế độ gõ tại chỗ. Bấm vào chữ nào sửa chữ đó; "Lưu" ghi mọi đoạn đã sửa (cùng API với danh sách văn bản).
 */
export default function LivePageEditor({ url, locale, namespaces, scope, scopeNs }: { url: string; locale: Locale; namespaces: string[]; scope: string; scopeNs: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const mapRef = useRef<Map<string, Target[]>>(new Map());
  const editsRef = useRef<Map<string, string>>(new Map()); // "scope|key" -> giá trị mới
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [matched, setMatched] = useState(0);
  const { saved, flash } = useSavedFlash();
  const [frameKey, setFrameKey] = useState(0);
  const [emptied, setEmptied] = useState<{ key: string; scope: string; label: string }[]>([]);
  const [showEmptied, setShowEmptied] = useState(false);

  // Danh sách ô nội dung của trang (kèm nội dung riêng của dịch vụ/sản phẩm đang chọn), ưu tiên nội dung riêng.
  useEffect(() => {
    let cancelled = false;
    const jobs: Promise<{ scope: string; entries: Entry[] }>[] = [];
    if (scope && scopeNs) jobs.push(api<{ entries: Entry[] }>(`content?namespace=${scopeNs}&scope=${encodeURIComponent(scope)}`).then((d) => ({ scope, entries: d.entries })));
    for (const ns of namespaces) jobs.push(api<{ entries: Entry[] }>(`content?namespace=${ns}`).then((d) => ({ scope: "", entries: d.entries })));
    Promise.all(jobs).then((groups) => {
      if (cancelled) return;
      const map = new Map<string, Target[]>();
      const gone: { key: string; scope: string; label: string }[] = [];
      for (const g of groups) {
        for (const e of g.entries) {
          if (HIDDEN.test(e.key)) continue;
          const v = e.values[locale];
          const text = norm(v);
          if (!text) {
            // Ô người dùng đã xoá trống: không hiện trên trang nữa, liệt kê để khôi phục khi cần.
            if (e.overridden[locale] && !gone.some((x) => x.key === e.key)) {
              const k = parseContentKey(e.key);
              gone.push({ key: e.key, scope: g.scope, label: `${k.sectionLabel}${k.sub ? ` › ${k.sub}` : ""} › ${k.field}` });
            }
            continue;
          }
          const list = map.get(text) ?? [];
          if (!list.some((t) => t.key === e.key)) list.push({ key: e.key, scope: g.scope, original: v });
          map.set(text, list);
        }
      }
      mapRef.current = map;
      setEmptied(gone);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [namespaces.join(","), scope, scopeNs, locale, frameKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const reloadFrame = useCallback(() => {
    editsRef.current.clear();
    setCount(0);
    setFrameKey((v) => v + 1);
  }, []);

  const record = useCallback((targets: Target[], value: string) => {
    for (const t of targets) {
      const k = `${t.scope}|${t.key}`;
      if (value === val(t.original)) editsRef.current.delete(k);
      else editsRef.current.set(k, value);
    }
    setCount(editsRef.current.size);
  }, []);

  const enhance = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc?.body || mapRef.current.size === 0) return;
    const win = doc.defaultView;
    if (!win) return;
    if (!doc.getElementById("cms-live-style")) {
      const st = doc.createElement("style");
      st.id = "cms-live-style";
      st.textContent = `
        [data-cms-edit]{white-space:pre-wrap;cursor:text;outline:1px dashed transparent;outline-offset:3px;border-radius:3px;transition:outline-color .12s,background .12s}
        [data-cms-edit]:hover{outline-color:#2563eb;background:rgba(37,99,235,.08)}
        [data-cms-edit]:focus{outline:2px solid #2563eb;background:rgba(37,99,235,.12)}
        [data-cms-edit][data-cms-dirty]{outline:2px solid #f59e0b}
        [data-cms-edit] svg,[data-cms-edit] img{pointer-events:none}
        [data-cms-edit] [data-cms-key]:empty{display:inline-block!important;min-width:2ch;min-height:1.1em;background:rgba(245,158,11,.25)}
        a,button{cursor:text!important}
        .page-fade-in,.reveal{opacity:1!important;transform:none!important;animation:none!important}
      `;
      doc.head.appendChild(st);
    }

    // 1) Mọi đoạn chữ trên trang khớp với một ô nội dung.
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const found: { node: Text; targets: Target[] }[] = [];
    let n: Node | null;
    while ((n = walker.nextNode())) {
      const node = n as Text;
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|OPTION)$/.test(parent.tagName)) continue;
      if (parent.closest("[data-cms-edit]")) continue; // đã nằm trong một ô sửa
      const text = norm(node.nodeValue ?? "");
      const targets = text ? mapRef.current.get(text) : undefined;
      if (targets) found.push({ node, targets });
    }

    // 2) Mỗi đoạn chữ thuộc về một "dòng": phần tử khối gần nhất (bỏ qua thẻ chữ nội tuyến như strong/span thường).
    const boxOf = (el: HTMLElement): HTMLElement => {
      let cur = el;
      while (cur.parentElement && cur.parentElement !== doc.body && win.getComputedStyle(cur).display === "inline" && !LINE_TAG.test(cur.tagName)) cur = cur.parentElement;
      return cur;
    };
    let groups = new Map<HTMLElement, { node: Text; targets: Target[] }[]>();
    for (const f of found) {
      const box = boxOf(f.node.parentElement as HTMLElement);
      groups.set(box, [...(groups.get(box) ?? []), f]);
    }

    // 3) Chữ đi cùng icon hoặc cùng hàng ngang (flex hàng) thì gộp vào một ô: gộp lên phần tử cha khi cha chỉ chứa
    //    các ô chữ (thẻ không phải p/h/li/a/button) và icon không chữ.
    const iconOnly = (el: Element) => !(el.textContent ?? "").trim();
    for (let pass = 0; pass < 2; pass++) {
      const parents = new Map<HTMLElement, HTMLElement[]>();
      for (const box of groups.keys()) {
        const p = box.parentElement;
        if (!p || p === doc.body || LINE_TAG.test(box.tagName)) continue;
        parents.set(p, [...(parents.get(p) ?? []), box]);
      }
      for (const [p, kids] of parents) {
        const cs = win.getComputedStyle(p);
        const row = cs.display.includes("flex") && !cs.flexDirection.startsWith("column");
        if (!row && cs.display !== "inline") continue;
        if (![...p.children].every((c) => groups.has(c as HTMLElement) || iconOnly(c))) continue;
        if (p.querySelector("p,h1,h2,h3,h4,h5,h6,li,ul,ol,table")) continue;
        const merged = kids.flatMap((k) => groups.get(k) ?? []);
        for (const k of kids) groups.delete(k);
        groups.set(p, [...(groups.get(p) ?? []), ...merged]);
      }
      groups = new Map(groups);
    }

    // 4) Bật chế độ gõ tại chỗ cho từng ô; mỗi đoạn chữ bọc một span để biết thuộc ô nội dung nào (icon giữ nguyên).
    let hits = doc.querySelectorAll("[data-cms-edit]").length;
    for (const [box, items] of groups) {
      if (box.closest("[data-cms-edit]") || box.querySelector("[data-cms-edit]")) continue;
      const regs: { span: HTMLElement; targets: Target[] }[] = [];
      for (const it of items) {
        const span = doc.createElement("span");
        span.setAttribute("data-cms-key", "1");
        it.node.replaceWith(span);
        span.appendChild(it.node);
        regs.push({ span, targets: it.targets });
      }
      box.setAttribute("data-cms-edit", "1");
      box.setAttribute("contenteditable", "true");
      box.setAttribute("spellcheck", "false");
      box.querySelectorAll("svg,img").forEach((x) => x.setAttribute("contenteditable", "false"));
      const shared = regs.reduce((m, r) => Math.max(m, r.targets.length), 1);
      box.setAttribute("title", shared > 1 ? `Sửa (có đoạn dùng chung ${shared} chỗ cùng nội dung)` : "Bấm để sửa");
      box.addEventListener("input", () => {
        for (const r of regs) record(r.targets, box.contains(r.span) ? val(r.span.textContent ?? "") : "");
        if (regs.some((r) => r.targets.some((t) => editsRef.current.has(`${t.scope}|${t.key}`)))) box.setAttribute("data-cms-dirty", "1");
        else box.removeAttribute("data-cms-dirty");
      });
      box.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          doc.execCommand("insertText", false, "\n");
        }
      });
      box.addEventListener("paste", (e) => {
        e.preventDefault();
        doc.execCommand("insertText", false, e.clipboardData?.getData("text/plain") ?? "");
      });
      hits += 1;
    }
    setMatched(hits);
  }, [record]);

  const onLoad = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    // Bấm vào liên kết/nút không rời trang; chỉ để sửa chữ.
    doc.addEventListener(
      "click",
      (e) => {
        const a = (e.target as HTMLElement).closest("a,button,summary");
        if (a) e.preventDefault();
      },
      true,
    );
    doc.addEventListener("submit", (e) => e.preventDefault(), true);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(enhance, 350);
    });
    obs.observe(doc.body, { childList: true, subtree: true });
    setTimeout(enhance, 700);
    setTimeout(enhance, 2500);
  }, [enhance]);

  useEffect(() => {
    if (ready) setTimeout(enhance, 300);
  }, [ready, enhance]);

  async function restore(item: { key: string; scope: string }) {
    try {
      await api("content", { method: "PUT", body: { changes: [{ locale, key: item.key, scope: item.scope, value: null }] } });
      toast.success("Đã khôi phục nội dung gốc.");
      reloadFrame();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không khôi phục được");
    }
  }

  async function save() {
    const changes = [...editsRef.current].map(([k, value]) => {
      const [sc, key] = [k.slice(0, k.indexOf("|")), k.slice(k.indexOf("|") + 1)];
      return { locale, key, scope: sc, value };
    });
    if (changes.length === 0) return;
    setSaving(true);
    try {
      await api("content", { method: "PUT", body: { changes } });
      toast.success(`Đã lưu ${changes.length} nội dung. Website cập nhật ngay.`);
      flash();
      reloadFrame();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không lưu được");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="sticky top-14 lg:top-0 z-20 -mx-4 sm:-mx-8 xl:-mx-10 px-4 sm:px-8 xl:px-10 py-2.5 mb-3 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex flex-wrap items-center gap-3">
        <SaveButton type="button" onClick={save} saving={saving} saved={saved} disabled={count === 0} className="min-w-[11rem]">
          {`Lưu thay đổi${count ? ` (${count})` : ""}`}
        </SaveButton>
        {count > 0 && (
          <button type="button" onClick={reloadFrame} className="h-10 px-3 rounded border border-slate-300 bg-white text-sm">
            Bỏ thay đổi
          </button>
        )}
        {emptied.length > 0 && (
          <button type="button" onClick={() => setShowEmptied((v) => !v)} className="h-10 px-3 rounded border border-slate-300 bg-white text-sm">
            Đã ẩn ({emptied.length})
          </button>
        )}
        <span className="text-xs text-slate-500">
          Bấm thẳng vào chữ trên trang để sửa (Enter để xuống dòng; xoá hết chữ rồi lưu để ẩn){ready ? ` · ${matched} đoạn sửa được` : " · đang tải…"}. Viền cam = đã sửa, chưa lưu.
        </span>
      </div>
      {showEmptied && emptied.length > 0 && (
        <div className="mb-3 bg-white border border-slate-200 rounded-lg p-3 text-sm">
          <p className="font-semibold text-slate-800 mb-2">Các ô đã xoá trống (đang ẩn trên website). Bấm “Khôi phục” để hiện lại nội dung gốc.</p>
          <ul className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {emptied.map((it) => (
              <li key={`${it.scope}|${it.key}`} className="py-1.5 flex items-center justify-between gap-3">
                <span className="min-w-0 text-slate-700">{it.label}</span>
                <button type="button" onClick={() => restore(it)} className="shrink-0 h-8 px-3 rounded border border-steel-600 text-steel-700 bg-white text-xs font-semibold">↺ Khôi phục</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <iframe
        key={`${url}-${frameKey}`}
        ref={frameRef}
        src={url}
        onLoad={onLoad}
        title="Trang website để sửa nội dung"
        className="w-full bg-white border border-slate-300 rounded-lg"
        style={{ height: "calc(100vh - 11rem)", minHeight: 520 }}
      />
    </div>
  );
}
