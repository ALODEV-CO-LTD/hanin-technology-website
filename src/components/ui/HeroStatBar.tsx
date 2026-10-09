import type { ReactNode } from "react";

/** Dải số liệu nằm ở đáy banner: số trắng lớn, nhãn nhỏ bên dưới, nền tối trong mờ. */
export default function HeroStatBar({ items, id }: { items: { key: string; label: string; value: ReactNode }[]; id?: string }) {
  return (
    <div id={id} className="relative z-10 w-full border-t border-white/25 bg-slate-950/65 scroll-mt-[var(--header-h)]">
      <div className="px-margin">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center justify-center gap-1 px-space-sm py-space-md text-center border-white/20 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b lg:border-r lg:last:border-r-0"
            >
              <dd className="order-1 text-headline-lg lg:text-headline-xl text-white font-bold tabular-nums">{item.value}</dd>
              <dt className="order-2 text-label-technical text-white uppercase tracking-wider font-semibold">{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
