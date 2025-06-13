"use server";

import { prisma } from "@/lib/prisma";

export const getOrderStatusByUuid = async (uuid: string) => {
  try {
    const order = await prisma.ordenes.findUnique({
      where: { uuid },
      select: {
        pagado: true,
        updated_at: true,
      },
    });

    if (!order) return { ok: false, error: "Orden no encontrada" };

    return {
      ok: true,
      pagado: order.pagado,
      updated_at: order.updated_at,
    };
  } catch (error) {
    console.error("Error al consultar orden:", error);
    return { ok: false, error: "Error interno" };
  }
};
