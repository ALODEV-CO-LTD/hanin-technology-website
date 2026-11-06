"use client";

// Kho toast toàn cục - singleton cấp module nên gọi được từ BẤT KỲ đâu trong
// client (kể cả ngoài React tree), không cần useContext. Dùng useSyncExternalStore
// để <Toaster/> render đồng bộ.

export type ToastKind = "success" | "error" | "info";
export type ToastAction = { label: string; run: () => void };
export type Toast = { id: number; kind: ToastKind; message: string; action?: ToastAction };

let toasts: Toast[] = [];
let seq = 1;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSnapshot(): Toast[] {
  return toasts;
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

function push(kind: ToastKind, message: string, ms = 3200, action?: ToastAction) {
  const id = seq++;
  toasts = [...toasts, { id, kind, message, action }];
  emit();
  if (typeof window !== "undefined") {
    window.setTimeout(() => dismissToast(id), ms);
  }
  return id;
}

/** API mệnh lệnh: gọi `toast.success("Đã lưu thay đổi")` ở bất kỳ client nào. */
export const toast = {
  success: (message = "Đã lưu thay đổi") => push("success", message),
  error: (message = "Có lỗi xảy ra") => push("error", message, 4500),
  info: (message: string) => push("info", message),
  /**
   * Toast kèm nút "Hoàn tác". `onUndo` chạy khi người dùng bấm. Hiện lâu hơn
   * (mặc định 6.5s) để kịp bấm. Dùng cho MỌI thao tác có thể đảo ngược.
   */
  undo: (message: string, onUndo: () => void, ms = 6500) =>
    push("success", message, ms, { label: "Hoàn tác", run: onUndo }),
};
