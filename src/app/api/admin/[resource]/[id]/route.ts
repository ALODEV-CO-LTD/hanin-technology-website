import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { deleteRecord, getRecord, updateRecord } from "@/server/cms/crud";
import { getResource } from "@/server/cms/resources";
import { revalidateSite } from "@/server/revalidate";

type Params = { resource: string; id: string };

function resolve(params: Params) {
  const resource = getResource(params.resource);
  const id = Number(params.id);
  if (!resource || !Number.isInteger(id)) throw new HttpError(404, "Không tìm thấy");
  return { resource, id };
}

export const GET = route<Params>(async (_request, { params }) => {
  const { resource, id } = resolve(params);
  const record = getRecord(resource, id);
  if (!record) throw new HttpError(404, "Không tìm thấy");
  return record;
});

export const PUT = route<Params>(async (request, { params, user }) => {
  const { resource, id } = resolve(params);
  const record = updateRecord(resource, id, await readJson(request), user?.email ?? "");
  if (!record) throw new HttpError(404, "Không tìm thấy");
  revalidateSite();
  return record;
});

export const DELETE = route<Params>(async (_request, { params, user }) => {
  const { resource, id } = resolve(params);
  if (!deleteRecord(resource, id, user?.email ?? "")) throw new HttpError(404, "Không tìm thấy");
  revalidateSite();
  return { ok: true };
});
