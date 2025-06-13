import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function crearIntentoPago(ordenId: number) {
  const intento = await prisma.intentos_pago.create({
    data: {
      uuid: uuidv4(),
      orden_id: ordenId,
    },
  });

  return intento;
}
