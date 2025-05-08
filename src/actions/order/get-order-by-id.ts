"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (uuid: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { ok: false, message: "Debe estar autenticado" };
  }

  try {
    const order = await prisma.ordenes.findUnique({
      where: { uuid },
      include: {
        item_orden: {
          include: {
            productos: {
              select: {
                nombre: true,
                imagenes: {
                  select: { imagen: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${uuid} no existe`;

    return { ok: true, order };
  } catch {
    return { ok: false, message: "Orden no encontrada" };
  }
};
