import { useMessages } from "next-intl";

/**
 * Nội dung chi tiết của từng dịch vụ nằm ở DichVu.ServiceDetail.<slug>.<Mục>.
 * Dịch vụ chưa có bộ riêng thì dùng bộ chung (DichVu.<Mục>, nội dung mạ niken hóa học).
 */
export function useServiceNs(slug: string, section: string): string {
  const messages = useMessages() as { DichVu?: { ServiceDetail?: Record<string, Record<string, unknown>> } };
  const own = messages.DichVu?.ServiceDetail?.[slug]?.[section];
  return own ? `DichVu.ServiceDetail.${slug}.${section}` : `DichVu.${section}`;
}

/** Bản dùng ngoài hook (trang server async): truyền sẵn messages từ getMessages(). */
export function serviceNs(messages: unknown, slug: string, section: string): string {
  const m = messages as { DichVu?: { ServiceDetail?: Record<string, Record<string, unknown>> } };
  return m.DichVu?.ServiceDetail?.[slug]?.[section] ? `DichVu.ServiceDetail.${slug}.${section}` : `DichVu.${section}`;
}
