import { useLocale, useTranslations } from "next-intl";
import { localizeLegalName } from "@/lib/legal-name";
import { getClients, type ClientData } from "@/server/public";
import Photo from "@/components/ui/Photo";

function ClientCard({ client, hidden, locale }: { client: ClientData; hidden?: boolean; locale: string }) {
  const legalName = client.legalName ? localizeLegalName(client.legalName, locale) : "";
  return (
    <li
      aria-hidden={hidden || undefined}
      title={legalName || client.name}
      className="flex h-28 w-56 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-4 text-center md:w-64"
    >
      {client.logo ? (
        <Photo src={client.logo} alt={hidden ? "" : client.name} sizes="160px" loading="lazy" className="h-14 w-auto max-w-[80%] object-contain" />
      ) : (
        <span className="text-title-md font-bold uppercase tracking-wide text-slate-800">{client.name}</span>
      )}
      {legalName && <span className="line-clamp-2 text-xs leading-snug text-slate-500">{legalName}</span>}
    </li>
  );
}

function Row({ clients, reverse, locale }: { clients: ClientData[]; reverse?: boolean; locale: string }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {/* 6 bản sao (2 nửa giống nhau) để dải luôn phủ kín màn hình rộng và vòng lặp nối liền không thấy điểm cắt. */}
        {[0, 1, 2, 3, 4, 5].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-space-md pr-space-md" aria-hidden={copy > 0 || undefined}>
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} hidden={copy > 0} locale={locale} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedClients() {
  const t = useTranslations("GioiThieu.FeaturedClients");
  const locale = useLocale();
  const clients = getClients();
  if (clients.length === 0) return null;
  // Ít khách hàng thì dồn vào 1 dải để không có dải trống.
  const half = clients.length >= 6 ? Math.ceil(clients.length / 2) : clients.length;

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200" aria-labelledby="featured-clients-title">
      <div className="mx-auto px-margin">
        <div className="max-w-3xl mb-space-lg">
          <span className="text-label-technical text-steel-600 font-bold uppercase tracking-wider">{t("eyebrow")}</span>
          <h2 id="featured-clients-title" className="mt-space-xs text-headline-lg text-slate-900 uppercase tracking-tight font-bold">
            {t("title")}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-space-md">
        <Row clients={clients.slice(0, half)} locale={locale} />
        {clients.length > half && <Row clients={clients.slice(half)} reverse locale={locale} />}
      </div>
      {/* Danh sách chữ cho người dùng đọc màn hình (bản marquee chỉ mang tính trình diễn). */}
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.id}>{c.legalName ? localizeLegalName(c.legalName, locale) : c.name}</li>
        ))}
      </ul>
    </section>
  );
}
