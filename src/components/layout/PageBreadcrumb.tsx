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
        isDark ? "text-white banner-text" : "text-slate-500"
      } ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <a href={item.href} className={isDark ? "hover:text-white transition-colors" : "hover:text-steel-600 transition-colors"}>
                {item.label}
              </a>
            ) : (
              <span className={isLast ? (isDark ? "text-white font-bold" : "text-slate-900 font-bold") : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <span className={isDark ? "text-white" : "text-slate-300"}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
