import { route } from "@/server/api";

export const GET = route(async (_request, { user }) => ({ user }));
