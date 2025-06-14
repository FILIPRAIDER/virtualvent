"use server";

import { prisma } from "@/lib/prisma";

export async function getIntentoPagoUuid(
  ordenUuid: string
): Promise<string | null> {
  try {
    const orden = await prisma.ordenes.findUnique({
      where: { uuid: ordenUuid },
    });

    if (!orden) return null;

    // Buscar intento más reciente
    const intentoExistente = await prisma.intentos_pago.findFirst({
      where: { orden_id: orden.id },
      orderBy: { created_at: "desc" },
    });

    if (intentoExistente) {
      return intentoExistente.uuid;
    }

    // Si no existe, crearlo
    const nuevoIntento = await prisma.intentos_pago.create({
      data: {
        orden_id: orden.id,
      },
    });

    return nuevoIntento.uuid;
  } catch (error) {
    console.error("❌ Error en getIntentoPagoUuid:", error);
    return null;
  }
}
