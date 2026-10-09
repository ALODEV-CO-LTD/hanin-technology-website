"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";
import {
  COMPACT_STEPS,
  PROCESSES,
  STEP_STAGE,
  type ProcessFamily,
  type StepStage,
} from "@/lib/process-data";

const FAMILIES: ProcessFamily[] = ["quay", "treo"];

const STAGES: StepStage[] = ["prep", "plate", "finish", "qc"];

export default function ProcessExplorer() {
  const t = useTranslations("QuyTrinh");
  const [family, setFamily] = useState<ProcessFamily>("quay");
  const [openStages, setOpenStages] = useState<StepStage[]>(["prep"]);
  const [selected, setSelected] = useState<Record<ProcessFamily, string>>({
    quay: PROCESSES.find((p) => p.family === "quay")!.id,
    treo: PROCESSES.find((p) => p.family === "treo")!.id,
  });

  const list = useMemo(() => PROCESSES.filter((p) => p.family === family), [family]);
  const process = list.find((p) => p.id === selected[family]) ?? list[0];

  // Công đoạn "rửa" lấy nhóm của công đoạn chính đứng trước nó để không chia nhỏ các giai đoạn.
  const steps = useMemo(() => {
    const result: { key: string; no: number; compact: boolean; stage: StepStage }[] = [];
    let lastStage: StepStage = "prep";
    for (const [i, key] of process.steps.entries()) {
      const compact = COMPACT_STEPS.has(key);
      const stage: StepStage = compact ? lastStage : STEP_STAGE[key];
      if (!compact) lastStage = stage;
      result.push({ key, no: i + 1, compact, stage });
    }
    return result;
  }, [process]);

  const platingCount = steps.filter((s) => !s.compact && STEP_STAGE[s.key] === "plate").length;

  return (
    <section id="quy-trinh-cong-doan" className="w-full py-space-xl bg-slate-50 border-t border-slate-200 scroll-mt-[var(--header-h)]">
      <div className="mx-auto px-margin w-full">
        <div className="max-w-3xl mb-space-lg">
          <span className="text-label-technical text-steel-600 font-bold uppercase tracking-wider">{t("eyebrow")}</span>
          <h2 className="mt-space-xs text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
        </div>

        {/* Chọn nhóm mạ */}
        <div role="tablist" aria-label={t("eyebrow")} className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mb-space-md">
          {FAMILIES.map((f) => {
            const active = f === family;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFamily(f)}
                className={`text-left rounded-lg border p-space-md transition-colors min-h-11 ${
                  active ? "border-steel-600 bg-white" : "border-slate-200 bg-white hover:border-steel-300"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className={`text-headline-sm uppercase font-bold ${active ? "text-steel-700" : "text-slate-800"}`}>{t(`families.${f}.name`)}</span>
                  <span className="text-label-sm text-slate-600">{t(`families.${f}.short`)}</span>
                </span>
                <span className="mt-1 block text-body-sm text-slate-600 leading-relaxed">{t(`families.${f}.desc`)}</span>
              </button>
            );
          })}
        </div>

        {/* Chọn loại quy trình */}
        <div className="mb-space-md flex flex-wrap gap-2" role="tablist" aria-label={t(`families.${family}.name`)}>
          {list.map((p) => {
            const active = p.id === process.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected((s) => ({ ...s, [family]: p.id }))}
                className={`min-h-11 rounded border px-4 text-body-sm font-semibold transition-colors ${
                  active ? "border-steel-600 bg-steel-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-steel-400 hover:text-steel-700"
                }`}
              >
                {t(`processes.${p.id}.name`)}
              </button>
            );
          })}
        </div>

        {/* Tóm tắt quy trình */}
        <div className="rounded-lg border border-slate-200 bg-white p-space-lg mb-space-lg">
          <div className="flex flex-wrap items-start justify-between gap-space-sm">
            <div className="max-w-3xl">
              <h3 className="text-headline-md text-slate-900 uppercase tracking-tight font-bold">{t(`processes.${process.id}.name`)}</h3>
              <p className="mt-1 text-title-md text-steel-600 font-semibold">{t(`processes.${process.id}.tagline`)}</p>
            </div>
            <div className="flex gap-space-sm">
              <span className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-label-technical text-slate-700 font-semibold">{t("stepsCount", { count: process.steps.length })}</span>
              <span className="rounded border border-steel-200 bg-steel-50 px-3 py-1.5 text-label-technical text-steel-700 font-semibold">{t("platingStepsCount", { count: platingCount })}</span>
            </div>
          </div>
          <p className="mt-space-sm text-body-md text-slate-600 leading-relaxed max-w-4xl">{t(`processes.${process.id}.intro`)}</p>
          <dl className="mt-space-md grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {(["material", "result", "usage"] as const).map((k) => (
              <div key={k} className="rounded border border-slate-200 bg-slate-50 p-space-sm">
                <dt className="text-label-sm uppercase tracking-wider text-slate-600 font-semibold">
                  {t(k === "material" ? "factMaterial" : k === "result" ? "factResult" : "factUsage")}
                </dt>
                <dd className="mt-0.5 text-body-sm text-slate-900 font-semibold">{t(`processes.${process.id}.${k}`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Các công đoạn: 4 danh mục lớn, bấm để xem các công đoạn bên trong */}
        <h3 className="text-label-technical uppercase tracking-wider text-slate-600 font-bold mb-space-sm">{t("stepsTitle")}</h3>
        <div className="flex flex-col divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {STAGES.map((stage) => {
            const group = steps.filter((s) => s.stage === stage);
            if (group.length === 0) return null;
            const isOpen = openStages.includes(stage);
            const panelId = `${process.id}-${stage}`;
            return (
              <div key={stage}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenStages((cur) => (cur.includes(stage) ? cur.filter((x) => x !== stage) : [...cur, stage]))
                  }
                  className="flex min-h-12 w-full items-center justify-between gap-space-sm px-space-md py-space-sm text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-space-sm">
                    <span className="text-title-md font-bold text-slate-900">{t(`stages.${stage}`)}</span>
                    <span className="text-label-sm text-slate-600">{t("categoryCount", { count: group.length })}</span>
                  </span>
                  <span className={`flex shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <Icon name="expand_more" className="text-[22px]" />
                  </span>
                </button>

                {isOpen && (
                  <ol id={panelId} className="grid grid-cols-1 border-t border-slate-200 bg-slate-50 px-space-md py-space-xs sm:grid-cols-2 sm:gap-x-space-lg lg:grid-cols-3">
                    {group.map((s) => (
                      <li key={`${process.id}-${s.no}`} className="flex items-baseline gap-3 border-b border-slate-200 py-2.5 last:border-b-0">
                        <span className="w-6 shrink-0 text-body-sm font-bold tabular-nums text-steel-600">{String(s.no).padStart(2, "0")}</span>
                        <span className="text-body-sm font-medium leading-snug text-slate-900">{t(`steps.${s.key}.name`)}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-space-lg rounded-lg border border-slate-200 bg-white p-space-md text-body-sm text-slate-600 leading-relaxed">{t("note")}</p>

        <div className="mt-space-lg flex flex-wrap items-center justify-between gap-space-md rounded-lg bg-slate-900 p-space-lg">
          <div className="max-w-2xl">
            <h3 className="text-headline-sm text-white uppercase font-bold">{t("ctaTitle")}</h3>
            <p className="mt-1 text-body-md text-slate-200">{t("ctaDesc")}</p>
          </div>
          <Link
            href="/lien-he#rfq-form"
            className="inline-flex min-h-11 items-center justify-center rounded bg-steel-600 px-space-lg py-3 text-label-technical font-semibold uppercase tracking-wider text-white transition-colors hover:bg-steel-700"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
