import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { getSettings, isSafeLink, isSafeMapEmbed, normalizePhones, saveSettings, SETTING_DEFS } from "@/server/settings";
import { revalidateSite } from "@/server/revalidate";
import { SOCIAL_CHANNELS, normalizeSocialUrl } from "@/lib/social";

export const GET = route(async () => ({ defs: SETTING_DEFS, values: getSettings() }));

export const PUT = route(async (request) => {
  const body = await readJson(request);
  const values: Record<string, string> = {};
  for (const def of SETTING_DEFS) {
    if (!(def.key in body)) continue;
    let value = String(body[def.key] ?? "").trim();
    const social = SOCIAL_CHANNELS.find((c) => c.settingKey === def.key);
    if (social) value = normalizeSocialUrl(social.key, value);
    if (def.kind === "phone") {
      const phones = normalizePhones(value);
      if (phones === null) {
        throw new HttpError(422, `${def.label}: mỗi số phải đúng 10 chữ số, bắt đầu bằng 0 (ví dụ 0975080648), không trùng nhau, tối đa 20 số`);
      }
      if (phones === "" && def.defaultValue) continue; // hotline chính không được để trống: giữ giá trị cũ
      values[def.key] = phones;
      continue;
    }
    const isEmail = def.key === "inquiryNotifyEmail" || def.kind === "email";
    const valid = isEmail
      ? value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : def.key === "mapEmbedUrl"
        ? isSafeMapEmbed(value)
        : def.key === "profileUrl"
          ? isSafeLink(value) || /^\/uploads\/[\w./-]+$/.test(value)
          : isSafeLink(value);
    if (!valid) throw new HttpError(422, `${def.label}: giá trị không hợp lệ`);
    if (def.defaultValue && !value) continue;
    values[def.key] = value;
  }
  saveSettings(values);
  revalidateSite();
  return { ok: true, values: getSettings() };
});
