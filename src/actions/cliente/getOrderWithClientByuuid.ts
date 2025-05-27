"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderWithClientByUuid = async (uuid: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { ok: false, message: "Debe estar autenticado" };
  }

  try {
    const order = await prisma.ordenes.findFirst({
      where: {
        uuid,
        user_id: BigInt(session.user.id),
      },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            clientes: true, // aquí incluimos también la relación clientes
          },
        },
      },
    });

    if (!order) throw new Error(`${uuid} no existe o no tienes permiso`);

    return { ok: true, order };
  } catch (error: unknown) {
    const err = error as Error;
    return { ok: false, message: err.message || "Orden no encontrada" };
  }
};
