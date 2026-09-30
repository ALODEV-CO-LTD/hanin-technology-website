"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const TAB_KEYS = ["0", "1", "2", "3"] as const;

const IMAGES: Record<(typeof TAB_KEYS)[number], string> = {
  "0": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg",
  "1": "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
  "2": "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
  "3": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg",
};

export default function FactoryShowcase() {
  const t = useTranslations("Home.FactoryShowcase");
  const [activeKey, setActiveKey] = useState<(typeof TAB_KEYS)[number]>(TAB_KEYS[0]);

  const activeImage = IMAGES[activeKey];
  const activeTitle = t(`tabs.${activeKey}.title`);
  const activeOrder = t(`tabs.${activeKey}.order`);
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
          <p className="text-body-sm text-slate-600 max-w-md">
            {t("description")}
          </p>
        </div>

        <div className="w-full flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs overflow-x-auto pb-2">
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={activeTitle}
              className="w-full h-full object-cover object-center transition-all duration-300 filter brightness-95"
              src={activeImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xl bg-white/95 backdrop-blur-md p-space-lg rounded shadow-xl border border-slate-200">
              <span className="text-[11px] text-steel-600 uppercase tracking-widest block mb-1 font-bold">
                {activeOrder}
              </span>
              <h3 className="text-headline-sm text-slate-900 font-semibold mb-2">{activeTitle}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{activeDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
