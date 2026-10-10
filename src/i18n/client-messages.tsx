import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";

/**
 * Chỉ gửi xuống trình duyệt những bản dịch mà component phía client thật sự dùng (useTranslations trong file "use client").
 * Trước đây toàn bộ bản dịch của mọi trang (hơn 100 KB) nằm trong HTML của từng trang, làm chậm lượt tải đầu trên mạng di động.
 * Layout chỉ gửi phần dùng chung (LAYOUT_KEYS); mỗi trang có component client bọc nội dung bằng <ClientMessages keys=[…]>
 * (layout không render lại khi chuyển trang kiểu client nên không thể lọc theo route ở đó).
 *
 * Khi thêm useTranslations("Ns.Key") vào một component "use client": thêm khoá đó vào <ClientMessages> của trang chứa nó.
 */
type Messages = Record<string, unknown>;

export const LAYOUT_KEYS = ["Nav", "LanguageSwitcher"];

/** Lấy các khoá dạng "Ns" hoặc "Ns.Sub" (không có thì bỏ qua). */
export function pickMessages(messages: Messages, keys: string[]): Messages {
  const out: Messages = {};
  for (const dotted of keys) {
    const parts = dotted.split(".");
    let from: unknown = messages;
    let to = out;
    for (let i = 0; i < parts.length; i++) {
      if (typeof from !== "object" || from === null) break;
      const value = (from as Messages)[parts[i]];
      if (value === undefined) break;
      if (i === parts.length - 1) to[parts[i]] = value;
      else {
        to = (to[parts[i]] ??= {}) as Messages;
        from = value;
      }
    }
  }
  return out;
}

export default async function ClientMessages({ keys, children }: { keys: string[]; children: ReactNode }) {
  return <NextIntlClientProvider messages={pickMessages(await getMessages(), keys)}>{children}</NextIntlClientProvider>;
}
