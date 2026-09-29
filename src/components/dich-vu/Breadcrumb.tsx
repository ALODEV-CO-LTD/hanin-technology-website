interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded px-space-md py-space-sm mb-space-md">
      <nav className="flex flex-wrap items-center gap-2 text-label-technical uppercase tracking-wider text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-orange-600 transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className={isLast ? "text-orange-600 font-bold" : ""}>{item.label}</span>
              )}
              {!isLast && <span className="text-slate-300">/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
