import { getTranslations } from "next-intl/server";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export interface LegalSection {
  title: string;
  body: string[];
}

/** Khung trang văn bản pháp lý: tiêu đề, ngày cập nhật, các mục đánh số. */
export default async function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const tNav = await getTranslations("Nav");
  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto max-w-[860px] px-margin flex flex-col gap-space-lg">
        <PageBreadcrumb items={[{ label: tNav("trangChu"), href: "/" }, { label: title }]} />
        <header className="flex flex-col gap-space-sm">
          <h1 className="text-headline-lg uppercase tracking-tight text-slate-900">{title}</h1>
          <p className="text-label-technical text-slate-600">{updated}</p>
          <p className="text-body-md text-slate-600 leading-relaxed">{intro}</p>
        </header>
        {sections.map((s, i) => (
          <article key={s.title} className="flex flex-col gap-space-sm">
            <h2 className="text-headline-sm text-slate-900">
              {i + 1}. {s.title}
            </h2>
            {s.body.map((p) => (
              <p key={p} className="text-body-md text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
