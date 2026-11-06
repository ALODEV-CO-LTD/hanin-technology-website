import { ask, type DialogRequest } from "@/components/ct999/hop-thoai-promise/store";

type ConfirmOptions = Omit<DialogRequest, "id" | "kind" | "defaultValue" | "placeholder" | "required" | "multiline">;

/**
 * Bộ bọc tiếng Việt cho ask.confirm của thư viện ct999 (README thư viện: luôn đặt confirmLabel tiếng Việt).
 * Việc nguy hiểm (danger) mặc định nút "Xoá"; việc thường là "Đồng ý".
 */
export function confirm(options: ConfirmOptions): Promise<boolean> {
  return ask.confirm({ cancelLabel: "Huỷ", confirmLabel: options.danger ? "Xoá" : "Đồng ý", ...options });
}
