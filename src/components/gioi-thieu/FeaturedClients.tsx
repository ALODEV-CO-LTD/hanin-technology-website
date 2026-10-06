import { useTranslations } from "next-intl";
import { getClients, type ClientData } from "@/server/public";

function ClientCard({ client, hidden }: { client: ClientData; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      title={client.legalName || client.name}
      className="flex h-28 w-56 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-4 text-center md:w-64"
    >
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt={hidden ? "" : client.name} loading="lazy" className="max-h-14 max-w-[80%] object-contain" />
      ) : (
        <span className="text-title-md font-bold uppercase tracking-wide text-slate-800">{client.name}</span>
      )}
      {client.legalName && <span className="line-clamp-2 text-xs leading-snug text-slate-500">{client.legalName}</span>}
    </li>
  );
}

function Row({ clients, reverse }: { clients: ClientData[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {/* 6 bản sao (2 nửa giống nhau) để dải luôn phủ kín màn hình rộng và vòng lặp nối liền không thấy điểm cắt. */}
        {[0, 1, 2, 3, 4, 5].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-space-md pr-space-md" aria-hidden={copy > 0 || undefined}>
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} hidden={copy > 0} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedClients() {
  const t = useTranslations("GioiThieu.FeaturedClients");
  const clients = getClients();
  if (clients.length === 0) return null;
  // Ít khách hàng thì dồn vào 1 dải để không có dải trống.
  const half = clients.length >= 6 ? Math.ceil(clients.length / 2) : clients.length;

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200" aria-labelledby="featured-clients-title">
      <div className="mx-auto px-margin">
        <div className="max-w-3xl mb-space-lg">
          <span className="text-label-technical text-steel-600 font-bold uppercase tracking-widest">{t("eyebrow")}</span>
          <h2 id="featured-clients-title" className="mt-space-xs text-headline-lg text-slate-900 uppercase tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-space-sm text-body-md text-slate-600 leading-relaxed">{t("description")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-space-md">
        <Row clients={clients.slice(0, half)} />
        {clients.length > half && <Row clients={clients.slice(half)} reverse />}
      </div>
      {/* Danh sách chữ cho người dùng đọc màn hình (bản marquee chỉ mang tính trình diễn). */}
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.id}>{c.legalName || c.name}</li>
        ))}
      </ul>
    </section>
  );
}
