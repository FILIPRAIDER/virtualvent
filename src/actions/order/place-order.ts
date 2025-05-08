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
    // Filtramos productId válidos
    const validProductIds = products
      .map((p) => p.productId)
      .filter((id): id is string => typeof id === "string");

    // Obtenemos productos válidos desde la base de datos
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

    // Construimos los ítems a partir de los productos válidos
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

    const total = items.reduce(
      (acc, item) => acc + Number(item.precio) * item.cantidad,
      0
    );

    // Creamos la orden y los items en transacción
    const createdOrder = await prisma.$transaction(async (tx) => {
      const orden = await tx.ordenes.create({
        data: {
          uuid: crypto.randomUUID(),
          total,
          num_items: items.reduce((sum, i) => sum + i.cantidad, 0),
          pagado: false,
          fecha_pago: new Date(),
        },
      });

      await tx.item_orden.createMany({
        data: items.map((item) => ({
          ...item,
          orden_id: orden.id,
          uuid: crypto.randomUUID(), // asignar uuid a cada item
        })),
      });

      return orden;
    });

    return {
      ok: true,
      order: {
        uuid: createdOrder.uuid, // solo pasar uuid para evitar errores con BigInt/Decimal
      },
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error al crear orden:", err);
    return { ok: false, message: err.message };
  }
};
