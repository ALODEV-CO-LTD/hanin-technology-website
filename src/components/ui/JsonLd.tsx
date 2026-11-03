/** Nhúng dữ liệu có cấu trúc (schema.org) vào trang. Không hiển thị gì cho người xem. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // Thay "<" để chuỗi trong dữ liệu không thể đóng thẻ script.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
