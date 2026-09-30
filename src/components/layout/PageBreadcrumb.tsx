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
      className={`flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-wider ${
        isDark ? "text-orange-200 [text-shadow:0_1px_3px_rgba(15,23,42,0.85),0_2px_10px_rgba(15,23,42,0.55)]" : "text-slate-500"
      } ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <a href={item.href} className={isDark ? "hover:text-orange-300 transition-colors" : "hover:text-steel-600 transition-colors"}>
                {item.label}
              </a>
            ) : (
              <span className={isLast ? (isDark ? "text-orange-400 font-bold" : "text-slate-900 font-bold") : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <span className={isDark ? "text-orange-300/50" : "text-slate-300"}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
