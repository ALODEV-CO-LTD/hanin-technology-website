/** Biểu đồ cho trang Tổng quan quản trị: dựng bằng HTML/CSS và SVG, không dùng thư viện. */

const STEEL = "#2b5a7a";

export function DailyBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const top = Math.max(2, Math.ceil(max / 2) * 2);
  const ticks = [top, top / 2, 0];
  return (
    <div className="flex gap-3">
      <div className="flex h-44 flex-col justify-between pb-6 text-right text-[11px] leading-none text-slate-500 tabular-nums">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[calc(11rem-1.5rem)] flex-col justify-between">
          {ticks.map((t) => (
            <div key={t} className="border-t border-dashed border-slate-200" />
          ))}
        </div>
        <div className="relative flex h-44 items-end gap-[3px] pb-6">
          {data.map((d, i) => {
            const pct = (d.value / top) * 100;
            const showLabel = i % 6 === 0 || i === data.length - 1;
            return (
              <div key={d.label} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.label}: ${d.value} yêu cầu`}>
                <div
                  className="w-full rounded-t-sm transition-colors group-hover:opacity-80"
                  style={{ height: d.value ? `${Math.max(pct, 4)}%` : "2px", background: d.value ? STEEL : "#e2e8f0" }}
                />
                {showLabel && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] leading-none text-slate-500">{d.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HorizontalBars({ data, color = STEEL }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <ul className="flex flex-col gap-3.5">
      {data.map((d) => (
        <li key={d.label} className="grid grid-cols-[minmax(0,10rem)_1fr_2rem] items-center gap-3 text-sm">
          <span className="truncate text-slate-700">{d.label}</span>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: color }} />
          </div>
          <span className="text-right font-semibold tabular-nums text-slate-900">{d.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function Donut({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const GAP = data.filter((d) => d.value > 0).length > 1 ? 3 : 0;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 140 140" role="img" aria-label="Cơ cấu yêu cầu" className="h-full w-full -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          {total > 0 &&
            data
              .filter((d) => d.value > 0)
              .map((d) => {
                const len = (d.value / total) * C;
                const el = (
                  <circle
                    key={d.label}
                    cx="70"
                    cy="70"
                    r={R}
                    fill="none"
                    stroke={d.color}
                    strokeWidth="14"
                    strokeDasharray={`${Math.max(len - GAP, 0.5)} ${C}`}
                    strokeDashoffset={-offset}
                  />
                );
                offset += len;
                return el;
              })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold leading-none text-slate-900 tabular-nums">{total}</span>
          <span className="mt-1 text-xs text-slate-500">yêu cầu</span>
        </div>
      </div>
      <ul className="flex w-full min-w-0 flex-col gap-3 text-sm">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
            <span className="flex-1 truncate text-slate-700">{d.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">{d.value}</span>
            <span className="w-10 text-right text-xs tabular-nums text-slate-500">{total ? Math.round((d.value / total) * 100) : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackedStatus({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
        {total > 0 &&
          data
            .filter((d) => d.value > 0)
            .map((d) => <div key={d.label} title={`${d.label}: ${d.value}`} style={{ width: `${(d.value / total) * 100}%`, background: d.color }} />)}
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
            <span className="flex-1 truncate text-slate-700">{d.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
