import { getOrderStatusByUuid } from "@/actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params; // ✅ await aquí es obligatorio

  const result = await getOrderStatusByUuid(uuid);

  return Response.json(result);
}
