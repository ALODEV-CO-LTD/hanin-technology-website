import { Children, isValidElement, type CSSProperties, type ReactNode } from "react";

function textLength(node: ReactNode): number {
  let n = 0;
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") n += String(child).length;
    else if (isValidElement<{ children?: ReactNode }>(child)) n += textLength(child.props.children);
  });
  return n;
}

/** Tiêu đề h1 của banner: từ 640px trở lên luôn nằm trên một dòng, cỡ chữ co giãn theo chiều rộng màn hình và độ dài tiêu đề. */
export default function BannerH1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`banner-title ${className}`} style={{ "--chars": Math.max(textLength(children), 8) } as CSSProperties}>
      {children}
    </h1>
  );
}
