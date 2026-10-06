"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

const FAQ_INDEXES = [0, 1, 2, 3, 4] as const;

export default function ContactFaq() {
  const t = useTranslations("LienHe.ContactFaq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="max-w-4xl mx-auto px-margin">
        <div className="text-center mb-space-xl">
          <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-body-md text-slate-500 mt-2">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col gap-space-sm">
          {FAQ_INDEXES.map((index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden"
              >
                <button
                  className="w-full p-space-md text-left flex items-center justify-between gap-space-md text-title-md font-bold text-slate-900 hover:text-steel-600 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span>{t(`items.${index}.question`)}</span>
                  <Icon name="expand_more" className={`text-[20px] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "" }`} />
                </button>
                {isOpen && (
                  <div className="px-space-md pb-space-md pt-1 text-slate-600 text-body-md leading-relaxed">
                    {t(`items.${index}.answer`)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
