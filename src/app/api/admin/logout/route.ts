import { destroySession } from "@/server/auth";
import { route } from "@/server/api";

export const POST = route(
  async () => {
    await destroySession();
    return { ok: true };
  },
  { auth: "none" },
);
