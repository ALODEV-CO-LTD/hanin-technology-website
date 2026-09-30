"use client";

import { MediaLibrary } from "@/components/admin/MediaPicker";

export default function MediaPage() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Thư viện ảnh</h1>
      <p className="text-sm text-slate-500 mb-5">Tải ảnh lên tại đây hoặc trực tiếp trong ô chọn ảnh của từng nội dung. Đường dẫn ảnh dạng /uploads/…</p>
      <MediaLibrary />
    </div>
  );
}
