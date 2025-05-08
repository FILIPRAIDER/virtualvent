"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
}

interface Address {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const placeOrder = async (
  products: ProductToOrder[],
  address: Address
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return { ok: false, message: "No hay sesión activa" };
  }

  try {
    const dbProducts = await prisma.productos.findMany({
      where: {
        uuid: { in: products.map((p) => p.productId) },
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
      if (!dbProduct)
        throw new Error(`Producto no encontrado: ${item.productId}`);

      return {
        producto_id: dbProduct.id,
        cantidad: item.quantity,
        precio: dbProduct.precio,
      };
    });

    const total = items.reduce((acc, item) => {
      return acc + Number(item.precio) * item.cantidad;
    }, 0);

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
        })),
      });

      return orden;
    });

    return { ok: true, order: createdOrder };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error al crear orden:", err);
    return { ok: false, message: err.message };
  }
};
