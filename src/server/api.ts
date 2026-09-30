import { NextResponse } from "next/server";
import { assertSameOrigin, HttpError, requireUser, type Role, type SessionUser } from "./auth";
import { ConflictError, ValidationError } from "./cms/crud";

type Ctx<P> = { params: Promise<P> };

interface Options {
  /** "none": public; "user": editor hoặc admin; "admin": chỉ admin. */
  auth?: "none" | Role | "user";
}

/**
 * Bọc route handler: kiểm tra đăng nhập, CSRF (Origin) cho method đổi dữ liệu,
 * và chuẩn hoá lỗi thành JSON {error, errors?}.
 */
export function route<P = Record<string, never>>(
  fn: (request: Request, ctx: { params: P; user: SessionUser | null }) => Promise<Response | unknown>,
  options: Options = {},
) {
  const auth = options.auth ?? "user";
  return async (request: Request, context: Ctx<P>): Promise<Response> => {
    try {
      if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) assertSameOrigin(request);
      const user = auth === "none" ? null : await requireUser(auth === "admin" ? "admin" : undefined);
      const params = (await context?.params) ?? ({} as P);
      const result = await fn(request, { params, user });
      if (result instanceof Response) return result;
      return NextResponse.json(result ?? { ok: true });
    } catch (err) {
      if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
      if (err instanceof ValidationError) {
        return NextResponse.json({ error: err.message, errors: err.errors }, { status: 422 });
      }
      if (err instanceof ConflictError) return NextResponse.json({ error: err.message }, { status: 409 });
      console.error("[api]", request.method, new URL(request.url).pathname, err);
      return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
    }
  };
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    if (body && typeof body === "object" && !Array.isArray(body)) return body as Record<string, unknown>;
  } catch {
    /* fallthrough */
  }
  throw new HttpError(400, "Body JSON không hợp lệ");
}
