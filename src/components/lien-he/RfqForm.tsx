import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";

/** Form báo giá ở trang Liên hệ dùng chung mẫu gọn với trang Dịch vụ, kèm ảnh nhà máy bên trái. */
export default function RfqForm() {
  const t = useTranslations("LienHe.LocationMap");
  return (
    <section className="w-full bg-slate-50 py-space-lg">
      <div className="mx-auto px-margin">
        <RfqFormCategory
          className=""
          aside={
            <>
              <Photo
                alt={t("gateLabel")}
                className="absolute inset-0 w-full h-full object-cover"
                src={siteImg("lien-he/RfqForm#1", "/images/factory/ma-quay-6.jpg")}
                sizes="(min-width:1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-space-md left-space-md right-space-md text-white">
                <p className="text-title-md font-bold uppercase">{t("gateLabel")}</p>
                <p className="text-body-sm text-white">{t("plotLabel")}</p>
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}
