"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
}

export const placeOrder = async (products: ProductToOrder[]) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return { ok: false, message: "No hay sesión activa" };
  }

  try {
    const validProductIds = products
      .map((p) => p.productId)
      .filter((id): id is string => typeof id === "string");

    const dbProducts = await prisma.productos.findMany({
      where: {
        uuid: { in: validProductIds },
      },
      select: {
        uuid: true,
        id: true,
        precio: true,
        stock: true,
      },
    });

    const items = products.map((item) => {
      const dbProduct = dbProducts.find((p) => p.uuid === item.productId);
      if (!dbProduct) {
        throw new Error(`Producto no encontrado: ${item.productId}`);
      }

      return {
        producto_id: dbProduct.id,
        cantidad: item.quantity,
        precio: dbProduct.precio,
      };
    });

    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.precio) * item.cantidad,
      0
    );

    // ✅ Aplicar descuento si corresponde
    const ahora = new Date();
    const fechaLimite = new Date("2025-06-15T00:00:00-05:00");
    const aplicaDescuento = subtotal >= 100000 && ahora < fechaLimite;
    const totalConDescuento = aplicaDescuento
      ? Math.round(subtotal * 0.8)
      : subtotal;

    const createdOrder = await prisma.$transaction(async (tx) => {
      const orden = await tx.ordenes.create({
        data: {
          uuid: crypto.randomUUID(),
          total: totalConDescuento, // 👈 Total con descuento aplicado
          num_items: items.reduce((sum, i) => sum + i.cantidad, 0),
          pagado: false,
          fecha_pago: new Date(),
          user_id: BigInt(userId),
        },
      });

      await tx.item_orden.createMany({
        data: items.map((item) => ({
          ...item,
          orden_id: orden.id,
          uuid: crypto.randomUUID(),
        })),
      });

      return orden;
    });

    return {
      ok: true,
      order: {
        uuid: createdOrder.uuid,
      },
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error al crear orden:", err);
    return { ok: false, message: err.message };
  }
};
