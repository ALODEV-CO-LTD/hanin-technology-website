interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function PageBreadcrumb({
  items,
  className = "",
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-wider text-slate-500 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <a href={item.href} className="hover:text-steel-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className={isLast ? "text-slate-900 font-bold" : ""}>{item.label}</span>
            )}
            {!isLast && <span className="text-slate-300">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
