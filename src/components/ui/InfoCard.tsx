import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

type Tone = "steel" | "sky" | "slate";

const TONES: Record<Tone, { bar: string; icon: string }> = {
  steel: { bar: "bg-steel-600", icon: "text-steel-600" },
  sky: { bar: "bg-sky-700", icon: "text-sky-700" },
  slate: { bar: "bg-slate-500", icon: "text-slate-600" },
};

interface InfoCardProps {
  icon: string;
  tone?: Tone;
  badge: string;
  title: string;
  /** Các dòng nội dung (dùng <InfoField/> hoặc văn bản). */
  children?: ReactNode;
  /** Dải chân thẻ — luôn dính đáy, các thẻ cùng hàng cao bằng nhau. */
  footer?: ReactNode;
}

/** Thẻ thông tin: thanh màu, icon, nhãn, tiêu đề, nội dung và chân thẻ cố định ở đáy. */
export default function InfoCard({ icon, tone = "steel", badge, title, children, footer }: InfoCardProps) {
  const c = TONES[tone];
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className={`h-1 w-full shrink-0 ${c.bar}`} />
      <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
        <div className="flex items-center gap-space-sm">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-100 ${c.icon}`}>
            <Icon name={icon} className="text-[22px]" />
          </span>
          <span className="text-label-sm font-semibold uppercase tracking-wider text-slate-500">{badge}</span>
        </div>
        <h3 className="text-title-md font-bold text-slate-900">{title}</h3>
        {children ? <div className="flex flex-col gap-space-sm text-body-sm text-slate-600">{children}</div> : null}
      </div>
      {footer ? (
        <div className="flex min-h-[52px] items-center border-t border-slate-100 bg-slate-50 px-space-lg py-space-sm text-label-sm text-slate-500">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

/** Một cặp nhãn – giá trị; truyền `href` để thành liên kết. */
export function InfoField({ label, value, href, strong }: { label: string; value: string; href?: string; strong?: boolean }) {
  const cls = `block ${strong ? "text-title-md font-bold text-steel-600" : "font-semibold text-slate-900"}`;
  return (
    <div>
      <span className="block text-label-sm text-slate-500">{label}</span>
      {href ? (
        <a href={href} className={`${cls} hover:underline`}>
          {value}
        </a>
      ) : (
        <span className={cls}>{value}</span>
      )}
    </div>
  );
}
