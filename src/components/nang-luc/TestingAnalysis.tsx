import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";

const RELIABILITY = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10"] as const;

// Ảnh thiết bị thử tương ứng r1–r10 (trích từ Company Profile). r2, r5, r10 chưa xác nhận tên máy nên chỉ minh họa.
const RELIABILITY_IMAGES: Record<(typeof RELIABILITY)[number], string> = {
  r1: "may-thu-mai-mon-rca-tester",
  r2: "thiet-bi-thu-nuoc-nong-hot-water",
  r3: "tu-thu-nhiet-do-cao-do-am-cao",
  r4: "may-do-tia-uv",
  r5: "may-thu-cha-xat-ba-dau",
  r6: "may-thu-chi-do-cung-but-chi",
  r7: "may-thu-roi-dropping-tester",
  r8: "may-do-do-day-cam-tay-thickness-measure",
  r9: "may-danh-bong-hai-dia-polisher",
  r10: "may-thu-co-cau-ban-le-nghieng",
};

const ITEMS = [
  { key: "lab", no: "01" },
  { key: "hullCell", no: "02" },
  { key: "thickness", no: "03" },
  { key: "saltSpray", no: "04" },
] as const;

export default function TestingAnalysis() {
  const t = useTranslations("NangLuc.TestingAnalysis");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200 scroll-mt-[var(--header-h)]" id="kiem-nghiem">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* LEFT: Metrology Photo */}
          <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 aspect-[16/10] lg:aspect-auto min-h-0 lg:min-h-[380px] shadow-sm flex flex-col justify-end p-space-lg">
            <Photo
              alt={t("image.alt")}
              className="absolute inset-0 w-full h-full object-cover"
              src={siteImg("nang-luc/TestingAnalysis#1", "/images/hanin/slide10-may-thu-hull-cell.webp")}
            />
          </div>

          {/* RIGHT: 3 Technical Information Blocks */}
          <div className="lg:col-span-6 flex flex-col gap-space-sm">
            {ITEMS.map((item) => (
              <div
                key={item.key}
                className="p-space-md sm:p-space-lg bg-white border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 transition-colors"
              >
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="w-7 h-7 rounded bg-steel-100 text-steel-600 flex items-center justify-center text-label-technical font-bold">
                    {item.no}
                  </span>
                  <h3 className="text-headline-sm text-slate-900 uppercase">{t(`items.${item.key}.title`)}</h3>
                </div>
                <p className="text-body-sm text-slate-600 leading-relaxed sm:pl-9">{t(`items.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-space-lg p-space-md sm:p-space-lg bg-white border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("reliability.title")}</h3>
          <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">{t("reliability.desc")}</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-space-lg">
            {RELIABILITY.map((r, i) => (
              <li key={r} className="flex items-center gap-3 border-b border-slate-200 py-2.5">
                <Photo
                  src={`/images/profile-lib/${RELIABILITY_IMAGES[r]}.jpg`}
                  alt={t(`reliability.items.${r}`)}
                  sizes="64px"
                  className="h-12 w-16 shrink-0 rounded border border-slate-200 object-cover"
                />
                <span className="w-6 shrink-0 text-body-sm font-bold tabular-nums text-steel-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body-sm font-medium text-slate-900">{t(`reliability.items.${r}`)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
