import { useTranslations } from "next-intl";

const GALLERY = [
  {
    key: "line",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMN0lym82cEAA9k9kEK85J37YJBabdX5LVykdHImAJrf6CHqddqInsnSorwbmqZLTQAqRIsizQmmahLAPP4kP--Zi_rvgLXB14CZxIER1vTsym4bh6b1rI8RH_x9HyH4YcURRVskMZtdr5b09X-hZx5pPqRRMkjyQX4kyg55rB450Ml7kTRsX42xU0XLaH1kjzmQYE5wU-i1I_UaxnfjxxejVysfKwY5jFgQimj8WXl4xHV8G24IqbtA",
  },
  {
    key: "surface",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Xw9eOyudtTLmQvqdVGja2EonIBH4tKUbz072lUcI_mBD7CTRy3TrsMbeqYGNRWcHwS2mg0Pv-E0zxnTzTOKTvjx9shbTlEaqk0xrRdF4BipjR-HtJyqK8BqnbDoY9jivQzwGUtxtO7QsbdOhm3VTuoK-mDH_Kh4UO1qBz3HGm98Fpa7ICg57TAYbOlxe-ByVuYAd2s98yqBtwr4Gyt0e4dlX8ADUPGleTymrJTqGDbL3DvsixipDqw",
  },
  {
    key: "prep",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgVrz_RyVKAbQ7apx81Lz8pWXfaHja0O5t5Qgvu-KURvxUyjxk0_9BkIVPKgggNW-uT198ZNx2MkQlJ4dZ2dKr9vJy1n2tB-7kdSPTiqKt0QVTGGJDX3L1vAS8MHSvulwgWXjwIIuK0U-TgdDTE9SFIxXk3bYEgRwSbHqPXzM3MAtDzOOXPkoLUoSTqGiac02De4AS7PmEdbXMkgbJSjvX_oEyHeppTmJPuHXad1UOQJeGo6V8B5ikMQ",
  },
] as const;

export default function DetailGallery() {
  const t = useTranslations("DichVu.DetailGallery");

  return (
    <section className="w-full bg-slate-50 mb-space-xl">
      <div className="flex items-center justify-between pb-space-sm mb-space-md flex-wrap gap-space-sm">
        <div>
          <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
        </div>
        <span className="text-label-sm text-slate-500 hidden sm:inline">{t("subtitle")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {GALLERY.map((item) => (
          <div key={item.key} className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-64 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t(`${item.key}.alt`)} className="w-full h-full object-cover" src={item.src} />
            </div>
            <div className="p-space-sm flex flex-col flex-1 justify-between bg-white">
              <h4 className="text-title-md text-slate-900 uppercase mb-1 font-bold">{t(`${item.key}.title`)}</h4>
              <p className="text-body-md text-slate-600">{t(`${item.key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
