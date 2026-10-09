import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function PageBreadcrumb({
  items,
  className = "",
  variant = "light",
}: {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-wider ${
        isDark ? "text-white banner-text" : "text-slate-600"
      } ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                // py-3/-my-3: vùng bấm cao ~44px trên điện thoại mà không đổi bố cục
                className={`py-3 -my-3 ${isDark ? "hover:text-white" : "hover:text-steel-600"} transition-colors`}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={isLast ? (isDark ? "text-white font-bold" : "text-slate-900 font-bold") : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <span aria-hidden="true" className={isDark ? "text-white" : "text-slate-400"}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
