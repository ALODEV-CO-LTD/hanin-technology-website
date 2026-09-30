import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { createRecord, listRecords } from "@/server/cms/crud";
import { getResource } from "@/server/cms/resources";
import { revalidateSite } from "@/server/revalidate";

type Params = { resource: string };

function resourceOr404(key: string) {
  const resource = getResource(key);
  if (!resource) throw new HttpError(404, "Không tìm thấy loại nội dung");
  return resource;
}

export const GET = route<Params>(async (request, { params }) => {
  const resource = resourceOr404(params.resource);
  const url = new URL(request.url);
  const filters: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    if (!["q", "page", "pageSize"].includes(key)) filters[key] = value;
  }
  return listRecords(resource, {
    q: url.searchParams.get("q") ?? undefined,
    page: Number(url.searchParams.get("page") ?? 1),
    pageSize: Number(url.searchParams.get("pageSize") ?? 20),
    filters,
  });
});

export const POST = route<Params>(async (request, { params }) => {
  const resource = resourceOr404(params.resource);
  const record = createRecord(resource, await readJson(request));
  revalidateSite();
  return Response.json(record, { status: 201 });
});
