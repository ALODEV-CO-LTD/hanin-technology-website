import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";
import { getFeaturedClients } from "@/server/clients";

export default function ClientsGrid() {
  const t = useTranslations("HomeTrust.clients");
  const clients = getFeaturedClients();

  return (
    <div className="flex flex-col gap-space-md" aria-labelledby="home-clients-title">
      <h3 id="home-clients-title" className="text-title-md text-slate-900 font-semibold">
        {t("title")}
      </h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {clients.map((c) => (
          <li
            key={c.name}
            className="flex h-24 flex-col items-center justify-center rounded border border-slate-200 bg-white px-3 text-center"
          >
            {c.logo ? (
              <Photo
                src={c.logo}
                alt={t("logoAlt", { name: c.name })}
                sizes="160px"
                className="h-12 w-auto max-w-[85%] object-contain"
              />
            ) : (
              <span className="text-body-sm font-semibold text-slate-800">{c.name}</span>
            )}
            {c.logo && <span className="mt-1 line-clamp-1 text-xs text-slate-500">{c.name}</span>}
          </li>
        ))}
      </ul>
      <p className="text-body-sm text-slate-500">{t("note")}</p>
    </div>
  );
}
