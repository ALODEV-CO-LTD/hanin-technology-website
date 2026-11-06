/** Biểu tượng xoay nhỏ cho nút đang xử lý. */
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 animate-spin ${className}`} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
