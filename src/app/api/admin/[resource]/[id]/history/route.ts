import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { listRevisions, restoreRevision } from "@/server/cms/crud";
import { getResource } from "@/server/cms/resources";
import { revalidateSite } from "@/server/revalidate";

type Params = { resource: string; id: string };

function resolve(params: Params) {
  const resource = getResource(params.resource);
  const id = Number(params.id);
  if (!resource || !Number.isInteger(id)) throw new HttpError(404, "Không tìm thấy");
  return { resource, id };
}

/** Lịch sử các lần sửa của một bản ghi. */
export const GET = route<Params>(async (_request, { params }) => {
  const { resource, id } = resolve(params);
  return { items: listRevisions(resource, id) };
});

/** Khôi phục về một phiên bản: body {revisionId}. */
export const POST = route<Params>(async (request, { params, user }) => {
  const { resource, id } = resolve(params);
  const body = await readJson(request);
  const record = restoreRevision(resource, id, Number(body.revisionId), user?.email ?? "");
  if (!record) throw new HttpError(404, "Không tìm thấy phiên bản");
  revalidateSite();
  return record;
});
