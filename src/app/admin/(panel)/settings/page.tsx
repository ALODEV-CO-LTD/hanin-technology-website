import SettingsForm from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Liên kết & mạng xã hội</h1>
      <p className="text-sm text-slate-500 mb-5">Các liên kết hiển thị ở chân trang và trang Liên hệ. Để trống nếu chưa dùng.</p>
      <SettingsForm />
    </div>
  );
}
