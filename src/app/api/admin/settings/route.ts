import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { getSettings, isSafeLink, isSafeMapEmbed, saveSettings, SETTING_DEFS } from "@/server/settings";
import { revalidateSite } from "@/server/revalidate";

export const GET = route(async () => ({ defs: SETTING_DEFS, values: getSettings() }));

export const PUT = route(async (request) => {
  const body = await readJson(request);
  const values: Record<string, string> = {};
  for (const def of SETTING_DEFS) {
    if (!(def.key in body)) continue;
    const value = String(body[def.key] ?? "").trim();
    const isEmail = def.key === "inquiryNotifyEmail";
    const valid = isEmail
      ? value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : def.key === "mapEmbedUrl"
        ? isSafeMapEmbed(value)
        : isSafeLink(value);
    if (!valid) throw new HttpError(422, `${def.label}: giá trị không hợp lệ`);
    values[def.key] = value;
  }
  saveSettings(values);
  revalidateSite();
  return { ok: true, values: getSettings() };
});
