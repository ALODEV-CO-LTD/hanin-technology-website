import type { SVGProps } from "react";
import { LUCIDE } from "./lucide.generated";

/**
 * Icon Lucide nhúng trực tiếp từ file SVG (src/assets/lucide, dựng bằng scripts/build-lucide.mjs).
 * Hình học giữ nguyên bản gốc 24x24, nét currentColor; kích thước và màu đặt qua className.
 */
export function LucideIcon({ name, strokeWidth = 2, children, ...props }: { name: string; strokeWidth?: number | string } & SVGProps<SVGSVGElement>) {
  const nodes = LUCIDE[name];
  if (!nodes) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {nodes.map(([tag, attrs], i) => {
        const Tag = tag as "path";
        return <Tag key={i} {...attrs} />;
      })}
      {children}
    </svg>
  );
}

/** Dựng icon vẽ tay cùng bộ nét (thương hiệu mà Lucide v1 không có). */
export function CustomStrokeIcon({ nodes, strokeWidth = 2, ...props }: { nodes: [string, Record<string, string>][]; strokeWidth?: number | string } & SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {nodes.map(([tag, attrs], i) => {
        const Tag = tag as "path";
        return <Tag key={i} {...attrs} />;
      })}
    </svg>
  );
}
