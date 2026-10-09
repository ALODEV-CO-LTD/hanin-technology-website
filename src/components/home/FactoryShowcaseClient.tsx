"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";

const TAB_KEYS = ["0", "1", "2", "3"] as const;

export default function FactoryShowcaseClient({
  images,
}: {
  images: Record<(typeof TAB_KEYS)[number], string>;
}) {
  const t = useTranslations("Home.FactoryShowcase");
  const [activeKey, setActiveKey] = useState<(typeof TAB_KEYS)[number]>(TAB_KEYS[0]);

  const activeImage = images[activeKey];
  const activeTitle = t(`tabs.${activeKey}.title`);
  const activeDesc = t(`tabs.${activeKey}.desc`);

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <h2 className="text-headline-xl text-slate-900 font-bold">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col gap-space-md">
          <div role="group" aria-label={t("title")} className="flex items-center gap-space-xs overflow-x-auto pb-2">
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={key === activeKey}
                onClick={() => setActiveKey(key)}
                className={`px-5 py-2.5 rounded text-label-technical uppercase tracking-wider transition-colors whitespace-nowrap ${
                  key === activeKey
                    ? "bg-steel-600 text-white shadow-sm font-semibold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t(`tabs.${key}.label`)}
              </button>
            ))}
          </div>

          <div className="relative w-full h-[460px] md:h-[540px] rounded overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
            <Photo
              alt={activeTitle}
              className="w-full h-full object-cover transition-all duration-300 filter brightness-95"
              // Khung chiếm toàn chiều ngang: phải khai báo 100vw để trình duyệt tải bản ảnh lớn (nét),
              // nếu không sẽ chọn bản nhỏ rồi kéo giãn.
              sizes="100vw"
              src={activeImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xl banner-text">
              <h3 className="text-headline-sm text-white font-semibold mb-2">{activeTitle}</h3>
              <p className="text-body-sm text-white leading-relaxed">{activeDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
