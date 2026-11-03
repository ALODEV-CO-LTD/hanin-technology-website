/** Hai nhãn trên thẻ sản phẩm: loại lớp mạ và vật liệu nền (không dùng hook, dùng được ở server lẫn client). */
export default function ProductBadges({
  plating,
  substrate,
  platingLabel,
  substrateLabel,
}: {
  plating: string;
  substrate: string;
  platingLabel: string;
  substrateLabel: string;
}) {
  return (
    <ul className="flex flex-wrap gap-1.5 text-label-technical font-semibold">
      <li className="max-w-full truncate rounded border border-steel-200 bg-steel-50 px-2 py-0.5 text-steel-700" title={`${platingLabel}: ${plating}`}>
        <span className="sr-only">{platingLabel}: </span>
        {plating}
      </li>
      <li className="max-w-full truncate rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-slate-700" title={`${substrateLabel}: ${substrate}`}>
        <span className="sr-only">{substrateLabel}: </span>
        {substrate}
      </li>
    </ul>
  );
}
