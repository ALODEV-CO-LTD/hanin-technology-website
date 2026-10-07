import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { listDeleted, restoreDeleted } from "@/server/cms/crud";
import { getResource } from "@/server/cms/resources";
import { revalidateSite } from "@/server/revalidate";

type Params = { resource: string };

function resourceOr404(key: string) {
  const resource = getResource(key);
  if (!resource) throw new HttpError(404, "Không tìm thấy loại nội dung");
  return resource;
}

/** Các mục đã xoá gần đây. */
export const GET = route<Params>(async (_request, { params }) => ({ items: listDeleted(resourceOr404(params.resource)) }));

/** Khôi phục mục đã xoá: body {revisionId}. */
export const POST = route<Params>(async (request, { params }) => {
  const resource = resourceOr404(params.resource);
  const body = await readJson(request);
  const record = restoreDeleted(resource, Number(body.revisionId));
  if (!record) throw new HttpError(404, "Không tìm thấy mục đã xoá");
  revalidateSite();
  return record;
});
