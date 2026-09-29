import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBreadcrumb() {
  const t = useTranslations("TinTuc.NewsBreadcrumb");

  return (
    <section className="w-full bg-slate-50 border-b border-slate-200">
      <div className="mx-auto px-margin py-space-sm">
        <PageBreadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: t("news") },
          ]}
        />
      </div>
    </section>
  );
}
