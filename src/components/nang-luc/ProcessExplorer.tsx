"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  COMPACT_STEPS,
  PROCESSES,
  STEP_STAGE,
  type ProcessFamily,
  type StepStage,
} from "@/lib/process-data";

const FAMILIES: ProcessFamily[] = ["quay", "treo"];

const STAGE_STYLE: Record<StepStage, { chip: string; dot: string }> = {
  prep: { chip: "bg-sky-50 text-sky-700 border-sky-200", dot: "bg-sky-500" },
  plate: { chip: "bg-steel-50 text-steel-700 border-steel-200", dot: "bg-steel-600" },
  finish: { chip: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  qc: { chip: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

export default function ProcessExplorer() {
  const t = useTranslations("QuyTrinh");
  const [family, setFamily] = useState<ProcessFamily>("quay");
  const [selected, setSelected] = useState<Record<ProcessFamily, string>>({
    quay: PROCESSES.find((p) => p.family === "quay")!.id,
    treo: PROCESSES.find((p) => p.family === "treo")!.id,
  });

  const list = useMemo(() => PROCESSES.filter((p) => p.family === family), [family]);
  const process = list.find((p) => p.id === selected[family]) ?? list[0];

  // Công đoạn "rửa" lấy nhóm của công đoạn chính đứng trước nó để không chia nhỏ các giai đoạn.
  const steps = useMemo(() => {
    let lastStage: StepStage = "prep";
    return process.steps.map((key, i) => {
      const compact = COMPACT_STEPS.has(key);
      const stage = compact ? lastStage : STEP_STAGE[key];
      if (!compact) lastStage = stage;
      return { key, no: i + 1, compact, stage };
    });
  }, [process]);

  const platingCount = steps.filter((s) => !s.compact && STEP_STAGE[s.key] === "plate").length;

  return (
    <section id="quy-trinh-cong-doan" className="w-full py-space-xl bg-slate-50 border-t border-slate-200 scroll-mt-[86px]">
      <div className="mx-auto px-margin w-full">
        <div className="max-w-3xl mb-space-lg">
          <span className="text-label-technical text-steel-600 font-bold uppercase tracking-widest">{t("eyebrow")}</span>
          <h2 className="mt-space-xs text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
          <p className="mt-space-sm text-body-md text-slate-600 leading-relaxed">{t("lead")}</p>
        </div>

        {/* Cách đọc */}
        <div className="mb-space-xl rounded-lg border border-slate-200 bg-white p-space-md">
          <h3 className="text-label-technical uppercase tracking-widest text-slate-500 font-bold mb-space-sm">{t("howTo.title")}</h3>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {(["one", "two", "three"] as const).map((k, i) => (
              <li key={k} className="flex gap-space-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steel-600 text-white text-label-technical font-bold">{i + 1}</span>
                <div>
                  <p className="text-title-md text-slate-900 font-bold">{t(`howTo.items.${k}.title`)}</p>
                  <p className="text-body-sm text-slate-600 leading-relaxed">{t(`howTo.items.${k}.desc`)}</p>
                </div>
              </li>
            ))}
          </ol>
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
                  active ? "border-steel-600 bg-white ring-2 ring-steel-600/20" : "border-slate-200 bg-white hover:border-steel-300"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className={`text-headline-sm uppercase font-bold ${active ? "text-steel-700" : "text-slate-800"}`}>{t(`families.${f}.name`)}</span>
                  <span className="text-label-sm text-slate-500">{t(`families.${f}.short`)}</span>
                </span>
                <span className="mt-1 block text-body-sm text-slate-600 leading-relaxed">{t(`families.${f}.desc`)}</span>
              </button>
            );
          })}
        </div>

        {/* Chọn loại quy trình */}
        <div className="mb-space-md flex flex-wrap gap-2" role="tablist">
          {list.map((p) => {
            const active = p.id === process.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected((s) => ({ ...s, [family]: p.id }))}
                className={`min-h-11 rounded-full border px-4 text-body-sm font-semibold transition-colors ${
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
                <dt className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold">
                  {t(k === "material" ? "factMaterial" : k === "result" ? "factResult" : "factUsage")}
                </dt>
                <dd className="mt-0.5 text-body-sm text-slate-900 font-semibold">{t(`processes.${process.id}.${k}`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Các công đoạn */}
        <h3 className="text-label-technical uppercase tracking-widest text-slate-500 font-bold mb-space-sm">{t("stepsTitle")}</h3>
        <ol className="relative">
          {steps.map((s, i) => {
            const prev = steps[i - 1];
            const showStage = !prev || prev.stage !== s.stage;
            const style = STAGE_STYLE[s.stage];
            return (
              <li key={`${process.id}-${s.no}`}>
                {showStage && (
                  <div className="flex items-center gap-2 pt-space-md pb-space-sm">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-label-technical uppercase font-bold tracking-wider ${style.chip}`}>
                      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                      {t(`stages.${s.stage}`)}
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                )}

                {s.compact ? (
                  <div className="ml-4 flex items-start gap-space-sm border-l-2 border-slate-200 pl-space-md py-1.5">
                    <span className="w-7 shrink-0 text-label-technical text-slate-400 font-bold">{s.no}</span>
                    <p className="text-body-sm text-slate-600">
                      <span className="font-semibold text-slate-800">{t(`steps.${s.key}.name`)}</span>
                      <span className="text-slate-500"> — {s.key === "rinse" ? t("rinseNote") : t(`steps.${s.key}.desc`)}</span>
                    </p>
                  </div>
                ) : (
                  <article className="ml-4 border-l-2 border-steel-200 pl-space-md py-space-xs">
                    <div className="rounded-lg border border-slate-200 bg-white p-space-md">
                      <div>
                        <div className="flex items-center gap-space-sm">
                          <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-steel-600 px-2 text-label-technical font-bold text-white">{s.no}</span>
                          <h4 className="text-title-md text-slate-900 font-bold">{t(`steps.${s.key}.name`)}</h4>
                        </div>
                        <p className="mt-space-xs text-body-md text-slate-600 leading-relaxed">{t(`steps.${s.key}.desc`)}</p>
                      </div>
                    </div>
                  </article>
                )}
              </li>
            );
          })}
        </ol>

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
