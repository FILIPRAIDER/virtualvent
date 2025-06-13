"use server";

import { prisma } from "@/lib/prisma";

export async function getIntentoPagoUuid(
  ordenUuid: string
): Promise<string | null> {
  const orden = await prisma.ordenes.findUnique({
    where: { uuid: ordenUuid },
    include: {
      intentos_pago: {
        orderBy: { created_at: "desc" },
        take: 1,
      },
    },
  });

  return orden?.intentos_pago[0]?.uuid || null;
}
