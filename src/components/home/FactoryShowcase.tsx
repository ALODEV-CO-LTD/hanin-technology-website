"use client";

import { useState } from "react";

const TABS = [
  {
    id: "tab-factory",
    label: "01 — NHÀ MÁY",
    sector: "PHÂN KHU: NHÀ_MÁY_01_A",
    tagline: "KHOANG XỬ LÝ KHÍ THẢI & BỂ DUNG DỊCH",
    order: "01 / TỔ HỢP NHÀ XƯỞNG CÔNG NGHIỆP",
    title: "Hệ thống nhà xưởng hiện đại tối ưu hóa luồng vật liệu",
    desc: "Mặt sàn phủ epoxy kháng hóa chất cao cấp, trần thông gió cưỡng bức hai cấp, kết hợp hệ thống thu hồi và trung hòa hơi axit tự động liên tục 24/7.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg",
  },
  {
    id: "tab-line",
    label: "02 — DÂY CHUYỀN",
    sector: "PHÂN KHU: DÂY_CHUYỀN_02_B",
    tagline: "DÂY CHUYỀN MẠ TỰ ĐỘNG",
    order: "02 / DÂY CHUYỀN GIA CÔNG MẠ",
    title: "Dây chuyền mạ tự động kiểm soát PLC chính xác",
    desc: "Lập trình hành trình bể ngâm, kiểm soát cường độ dòng điện và thời gian xử lý theo từng loại vật liệu.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
  },
  {
    id: "tab-lab",
    label: "03 — PHÒNG KIỂM NGHIỆM",
    sector: "PHÂN KHU: PHÒNG_LAB_03_C",
    tagline: "PHÒNG PHÂN TÍCH & KIỂM TRA",
    order: "03 / KIỂM SOÁT CHẤT LƯỢNG",
    title: "Phòng kiểm nghiệm đạt chuẩn quốc tế",
    desc: "Máy đo huỳnh quang tia X (XRF), buồng thử nghiệm sương muối ASTM B117 và kiểm tra độ bám dính lớp mạ.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
  },
  {
    id: "tab-equipment",
    label: "04 — THIẾT BỊ",
    sector: "PHÂN KHU: THIẾT_BỊ_04_D",
    tagline: "THIẾT BỊ & PHỤ TRỢ CHUYÊN DỤNG",
    order: "04 / DANH MỤC THIẾT BỊ",
    title: "Hệ thống thiết bị phụ trợ chuyên dụng",
    desc: "Hệ thống lọc tuần hoàn, trao đổi nhiệt tự động và sấy khô chân không công nghiệp phục vụ toàn bộ dây chuyền.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KJVXFxeFOjgqXWkBiF9FpvBa5qKIYmcY81aCaskvAP4hSt2ZAzELb8QZw0bgB-yM4zwk995zEP0O10jp5eBR9O9BQCXTmbuboBg4M9R2uef8_bWiWogphX6f8LTo52el2OlctLIvZriqnpDZaRDeFXPJqagO_IBs8ycl8QTHYgZinLz1RGFn2z-ICjotF9EmSHqaxYSCNWmJnEHrtFrXhWLfdYzj9JCX7fZpcuStogJf__GS-1mcHg",
  },
];

export default function FactoryShowcase() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <span className="text-label-technical uppercase tracking-[0.2em] text-steel-600 font-bold">
              TỪ NHÀ XƯỞNG ĐẾN THÀNH PHẨM
            </span>
            <h2 className="text-headline-xl text-slate-900 font-bold">
              Không gian vận hành & Thiết bị công nghệ
            </h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">
            Hệ thống nhà xưởng hiện đại tối ưu hóa luồng vật liệu và kiểm soát
            nghiêm ngặt các tiêu chuẩn môi trường sản xuất.
          </p>
        </div>

        <div className="w-full flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                className={`px-5 py-2.5 rounded text-label-technical uppercase tracking-wider transition-colors whitespace-nowrap ${
                  tab.id === activeId
                    ? "bg-steel-600 text-white shadow-sm font-semibold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full h-[460px] md:h-[540px] rounded overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={active.title}
              className="w-full h-full object-cover object-center transition-all duration-300 filter brightness-95"
              src={active.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-2 rounded text-right shadow-md">
              <p className="text-[10px] text-steel-600 uppercase font-mono font-bold">{active.sector}</p>
              <p className="text-label-technical text-slate-800 font-semibold">{active.tagline}</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xl bg-white/95 backdrop-blur-md p-space-lg rounded shadow-xl border border-slate-200">
              <span className="text-[11px] text-steel-600 uppercase tracking-widest block mb-1 font-bold">
                {active.order}
              </span>
              <h3 className="text-headline-sm text-slate-900 font-semibold mb-2">{active.title}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{active.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
