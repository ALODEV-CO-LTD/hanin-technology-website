import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function FinalCta() {
  const t = useTranslations("Home.FinalCta");

  return (
    <section className="w-full py-space-xl bg-white scroll-mt-[var(--header-h)]" id="bao-gia">
      <div className="mx-auto px-margin">
        <div className="relative overflow-hidden rounded border border-slate-200 bg-white shadow-md px-space-md py-space-xl sm:px-space-xl text-center flex flex-col items-center gap-space-md before:absolute before:inset-x-0 before:top-0 before:h-1 before:[background:var(--color-steel-600)] before:content-['']">
          <h2 className="text-headline-xl md:text-display-hero text-slate-900 font-bold leading-tight uppercase">
            {t("title")}
          </h2>
          <p className="text-body-lg text-slate-600 max-w-2xl">{t("description")}</p>
          <Link
            href="/lien-he#rfq-form"
            className="mt-space-xs inline-flex min-h-12 items-center justify-center gap-3 px-8 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md"
          >
            <span>{t("cta")}</span>
            <Icon name="send" className="text-[20px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
