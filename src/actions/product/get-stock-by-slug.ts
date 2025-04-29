"use server";

import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (nombre: string): Promise<number> => {
  try {
    const producto = await prisma.productos.findFirst({
      where: { nombre },
      select: { stock: true },
    });

    return producto?.stock ?? 0;
  } catch (error) {
    console.error("Error en getStockBySlug:", error);
    return 0;
  }
};
