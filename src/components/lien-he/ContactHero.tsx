import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const SPEC_HIGHLIGHT_KEYS = ["nda", "cad", "consulting"] as const;
const SPEC_HIGHLIGHT_ICONS: Record<(typeof SPEC_HIGHLIGHT_KEYS)[number], string> = {
  nda: "verified_user",
  cad: "file_present",
  consulting: "science",
};

export default function ContactHero() {
  const t = useTranslations("LienHe.ContactHero");

  return (
    <>
      {/* Breadcrumb */}
      <section className="w-full bg-slate-100 border-b border-slate-200">
        <div className="mx-auto px-margin py-space-sm">
          <PageBreadcrumb
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />
        </div>
      </section>

      {/* Page hero: technical contact & RFQ portal */}
      <section className="w-full bg-white py-space-xl">
        <div className="mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left hero content */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <h1 className="text-headline-xl-mobile lg:text-display-hero font-bold tracking-tight text-slate-900 uppercase">
                {t("titlePrefix")}{" "}
                <span className="text-steel-600 underline decoration-steel-600/30 decoration-4 underline-offset-8">
                  {t("titleHighlight")}
                </span>{" "}
                {t("titleSuffix")}
              </h1>
              <p className="text-body-lg text-slate-600 leading-relaxed">{t("description")}</p>

              {/* Engineering spec highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                {SPEC_HIGHLIGHT_KEYS.map((key) => (
                  <div
                    key={key}
                    className="p-space-md bg-slate-50 border border-slate-200 rounded shadow-sm flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2 text-steel-600">
                      <span className="material-symbols-outlined text-[20px]">
                        {SPEC_HIGHLIGHT_ICONS[key]}
                      </span>
                      <span className="text-label-sm uppercase tracking-wider font-bold">
                        {t(`specHighlights.${key}.label`)}
                      </span>
                    </div>
                    <span className="text-body-sm text-slate-600">
                      {t(`specHighlights.${key}.desc`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right hero visual anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white border border-slate-200 rounded overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t("imageAlt")}
                  className="w-full h-80 lg:h-[420px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMAHR12DSPrsWOQHWfdTlDaNpp1LwgPnGnq6D7BdQzZ6xmVyK6MjotF4vVi7AmWKi92WGLKtgCUn84s6Iz8U6HKcl2LaJFMIAUD15w17JHyk1lcgy3m8Ct2ZKPFvoGwcoftf8ZNRrli07g18kQAWUAMBu4F5GoAmoiQxJiuEiUVJQWmhdq2KIs2ju1_DUY8vIA8cBP_UnnSRlCyz26_u4obDo1zxnsNlp9WLKHvm8HWCWhIfbve8rbwg"
                />
                {/* Technical overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-space-md rounded shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-label-sm uppercase tracking-wider text-slate-500 block">
                      {t("overlayLabel")}
                    </span>
                    <span className="text-title-md font-bold text-slate-900 block">
                      {t("overlayLocation")}
                    </span>
                    <span className="text-label-sm text-steel-600 font-semibold">
                      {t("overlayCoordinates")}
                    </span>
                  </div>
                  <a
                    href="#map-section"
                    className="w-10 h-10 rounded bg-steel-600 hover:bg-steel-700 text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">near_me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
