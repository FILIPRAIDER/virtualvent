import { verificarPagoConEpayco } from "@/lib/epayco/epayco-verificacion";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;

  // Buscar la orden por UUID
  const orden = await prisma.ordenes.findUnique({
    where: { uuid },
    select: {
      id: true,
      pagado: true,
      uuid: true,
    },
  });

  if (!orden) {
    return Response.json(
      { ok: false, message: "Orden no encontrada" },
      { status: 404 }
    );
  }

  // Si ya está pagada, retornamos
  if (orden.pagado) {
    return Response.json({ ok: true, pagado: true });
  }

  // Fallback: Buscar el último intento de pago relacionado
  const intento = await prisma.intentos_pago.findFirst({
    where: { orden_id: orden.id },
    orderBy: { created_at: "desc" },
  });

  if (!intento) {
    return Response.json({
      ok: true,
      pagado: false,
      message: "Sin intentos de pago",
    });
  }

  // Verificar con ePayco directamente usando el UUID del intento como refPayco
  const pagoExitoso = await verificarPagoConEpayco(intento.uuid);

  if (pagoExitoso) {
    await prisma.ordenes.update({
      where: { id: orden.id },
      data: {
        pagado: true,
        updated_at: new Date(),
      },
    });

    await prisma.intentos_pago.update({
      where: { id: intento.id },
      data: {
        pagado: true,
        estado: "aprobado",
        updated_at: new Date(),
      },
    });

    return Response.json({ ok: true, pagado: true });
  }

  return Response.json({ ok: true, pagado: false });
}
