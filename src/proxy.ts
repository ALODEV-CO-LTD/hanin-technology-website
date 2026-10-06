import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Gắn đường dẫn gốc vào header của request để src/i18n/request.ts biết đang render trang chi tiết
 * (dịch vụ/sản phẩm) nào và áp nội dung riêng của mục đó (xem server/content.ts → scope).
 */
export default function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-hanin-path", request.nextUrl.pathname);
  return intlMiddleware(new NextRequest(request, { headers }));
}

export const config = {
  matcher: ["/((?!api|admin|uploads|_next|_vercel|.*\\..*).*)"],
};
