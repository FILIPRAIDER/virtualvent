// actions/ordenes/actualizar-orden.ts
import { prisma } from "@/lib/prisma";

export const actualizarOrdenComoPagada = async (uuid: string) => {
  try {
    await prisma.ordenes.update({
      where: { uuid },
      data: { pagado: true, fecha_pago: new Date() },
    });
  } catch (error) {
    console.error("Error al actualizar orden como pagada:", error);
    throw new Error("No se pudo actualizar la orden.");
  }
};
