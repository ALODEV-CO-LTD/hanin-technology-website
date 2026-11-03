import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

type Item = { key: string; label: string; value: ReactNode; icon?: string };

/**
 * Dải số liệu nằm ở đáy banner: số trắng lớn, nhãn nhỏ bên dưới, nền tối trong mờ.
 * variant="left": căn trái, icon bên trái từng ô, vạch dọc mảnh; ô đầu thẳng lề với khối chữ banner phía trên.
 */
export default function HeroStatBar({ items, id, variant = "center" }: { items: Item[]; id?: string; variant?: "center" | "left" }) {
  const left = variant === "left";
  return (
    <div id={id} className="relative z-10 w-full border-t border-white/25 bg-slate-950/65 scroll-mt-[var(--header-h)]">
      <div className="px-margin">
        <dl className={`grid grid-cols-2 lg:grid-cols-4 ${left ? "lg:divide-x lg:divide-white/15" : ""}`}>
          {items.map((item) =>
            left ? (
              <div
                key={item.key}
                className="flex items-center gap-2 sm:gap-3 py-space-md pr-space-sm max-lg:even:pl-space-md lg:px-space-lg lg:first:pl-0 border-white/15 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b"
              >
                {item.icon ? (
                  <span aria-hidden="true" className="flex size-9 sm:size-10 lg:size-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-amber-400">
                    <Icon name={item.icon} className="text-[20px]" />
                  </span>
                ) : null}
                <div className="flex min-w-0 flex-col gap-1 text-left">
                  <dd className="order-1 whitespace-nowrap max-sm:text-xl text-headline-lg lg:text-headline-xl text-white font-bold tabular-nums leading-none">{item.value}</dd>
                  <dt className="order-2 text-label-technical text-white uppercase tracking-wider font-semibold">{item.label}</dt>
                </div>
              </div>
            ) : (
              <div
                key={item.key}
                className="flex flex-col items-center justify-center gap-1 px-space-sm py-space-md text-center border-white/20 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b lg:border-r lg:last:border-r-0"
              >
                <dd className="order-1 text-headline-lg lg:text-headline-xl text-white font-bold tabular-nums">{item.value}</dd>
                <dt className="order-2 text-label-technical text-white uppercase tracking-wider font-semibold">{item.label}</dt>
              </div>
            ),
          )}
        </dl>
      </div>
    </div>
  );
}
