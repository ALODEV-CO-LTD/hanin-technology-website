import SiteImages from "@/components/admin/SiteImages";

export default function SiteImagesPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Hình ảnh trang</h1>
      <p className="text-sm text-slate-500 mb-5 max-w-3xl">
        Đổi ảnh minh họa trong từng khối của website (giới thiệu, năng lực, tuyển dụng…). Bấm “Đổi ảnh” để chọn ảnh có sẵn hoặc tải ảnh mới lên.
        Ảnh banner đầu trang nằm ở mục Banner; ảnh dịch vụ/sản phẩm/tin tức sửa ngay trong từng mục.
      </p>
      <SiteImages />
    </div>
  );
}
