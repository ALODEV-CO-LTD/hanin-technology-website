export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string>,
  ) {
    super(message);
  }
}

/** Gọi API admin, ném ApiError khi lỗi (kèm lỗi theo từng trường nếu có). */
export async function api<T = unknown>(path: string, options: { method?: string; body?: unknown; form?: FormData } = {}): Promise<T> {
  const init: RequestInit = { method: options.method ?? (options.body || options.form ? "POST" : "GET"), credentials: "same-origin" };
  if (options.form) {
    init.body = options.form;
  } else if (options.body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(options.body);
  }
  const res = await fetch(`/api/admin/${path}`, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") window.location.href = "/admin/login";
    throw new ApiError(data.error ?? "Có lỗi xảy ra", res.status, data.errors);
  }
  return data as T;
}
