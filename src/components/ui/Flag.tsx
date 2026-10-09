/** Quốc kỳ dạng SVG (hiện đúng trên mọi hệ điều hành, khác với emoji cờ). */
export function Flag({ locale, className = "h-4 w-6" }: { locale: string; className?: string }) {
  const common = { viewBox: "0 0 30 20", className: `${className} shrink-0 rounded-[2px] ring-1 ring-black/10`, "aria-hidden": true } as const;
  if (locale === "zh")
    return (
      <svg {...common}>
        <rect width="30" height="20" fill="#DE2910" />
        <polygon points="5.00,2.00 5.67,4.07 7.85,4.07 6.09,5.35 6.76,7.43 5.00,6.15 3.24,7.43 3.91,5.35 2.15,4.07 4.33,4.07" fill="#FFDE00" />
        <polygon points="9.14,2.51 9.62,1.97 9.25,1.34 9.91,1.63 10.39,1.08 10.33,1.80 11.00,2.09 10.29,2.25 10.22,2.97 9.85,2.35" fill="#FFDE00" />
      <polygon points="11.01,4.14 11.66,3.82 11.56,3.10 12.07,3.62 12.72,3.30 12.38,3.95 12.88,4.47 12.17,4.34 11.83,4.99 11.73,4.27" fill="#FFDE00" />
      <polygon points="11.04,6.73 11.76,6.70 11.96,6.00 12.21,6.68 12.94,6.66 12.37,7.10 12.62,7.79 12.01,7.38 11.44,7.83 11.64,7.13" fill="#FFDE00" />
      <polygon points="9.22,8.38 9.90,8.63 10.35,8.06 10.32,8.79 11.00,9.05 10.30,9.24 10.26,9.96 9.87,9.36 9.16,9.55 9.62,8.98" fill="#FFDE00" />
      </svg>
    );
  if (locale === "ko")
    return (
      <svg {...common}>
        <rect width="30" height="20" fill="#fff" />
        <circle cx="15" cy="10" r="5" fill="#CD2E3A" />
        <path d="M10 10a5 5 0 0 0 10 0a2.5 2.5 0 0 0 -5 0a2.5 2.5 0 0 1 -5 0z" fill="#0047A0" />
        <g transform="translate(5 4.2) rotate(-34)"><rect x="-2" y="-1.7" width="4" height="0.6" fill="#111" /><rect x="-2" y="-0.5" width="4" height="0.6" fill="#111" /><rect x="-2" y="0.7" width="4" height="0.6" fill="#111" /></g>
        <g transform="translate(25 15.8) rotate(-34)"><rect x="-2" y="-1.7" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="-1.7" width="1.7" height="0.6" fill="#111" /><rect x="-2" y="-0.5" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="-0.5" width="1.7" height="0.6" fill="#111" /><rect x="-2" y="0.7" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="0.7" width="1.7" height="0.6" fill="#111" /></g>
        <g transform="translate(25 4.2) rotate(34)"><rect x="-2" y="-1.7" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="-1.7" width="1.7" height="0.6" fill="#111" /><rect x="-2" y="-0.5" width="4" height="0.6" fill="#111" /><rect x="-2" y="0.7" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="0.7" width="1.7" height="0.6" fill="#111" /></g>
        <g transform="translate(5 15.8) rotate(34)"><rect x="-2" y="-1.7" width="4" height="0.6" fill="#111" /><rect x="-2" y="-0.5" width="1.7" height="0.6" fill="#111" /><rect x="0.3" y="-0.5" width="1.7" height="0.6" fill="#111" /><rect x="-2" y="0.7" width="4" height="0.6" fill="#111" /></g>
      </svg>
    );
  return (
    <svg {...common}>
      <rect width="30" height="20" fill="#DA251D" />
      <polygon points="15.00,4.60 16.35,8.75 20.71,8.75 17.18,11.31 18.53,15.45 15.00,12.89 11.47,15.45 12.82,11.31 9.29,8.75 13.65,8.75" fill="#FFFF00" />
    </svg>
  );
}
