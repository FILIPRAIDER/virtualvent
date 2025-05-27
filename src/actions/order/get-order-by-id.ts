// src/actions/orders.ts (o donde tengas la función)

import { prisma } from "@/lib/prisma";

export const getOrderById = async (uuid: string, userId: bigint) => {
  try {
    const order = await prisma.ordenes.findFirst({
      where: {
        uuid,
        user_id: userId,
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
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) throw new Error(`${uuid} no existe o no tienes permiso`);

    // Conversión de tipos (BigInt, Decimal, fechas)
    const plainOrder = {
      ...order,
      user_id: order.user_id.toString(),
      total: Number(order.total),
      fecha_pago: order.fecha_pago ? order.fecha_pago.toISOString() : null,
      created_at: order.created_at ? order.created_at.toISOString() : null,
      updated_at: order.updated_at ? order.updated_at.toISOString() : null,
      item_orden: order.item_orden.map((item) => ({
        ...item,
        precio: Number(item.precio),
        created_at: item.created_at ? item.created_at.toISOString() : null,
        updated_at: item.updated_at ? item.updated_at.toISOString() : null,
      })),
    };

    return { ok: true, order: plainOrder };
  } catch (error: unknown) {
    const err = error as Error;
    return { ok: false, message: err.message || "Orden no encontrada" };
  }
};
