"use server";

import { ProductoClient } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const getProductBySlug = async (
  slug: string
): Promise<ProductoClient | null> => {
  const p = await prisma.productos.findFirst({
    where: { nombre: slug },
    include: { imagenes: true },
  });

  if (!p) return null;

  return {
    ...p,
    id: p.id.toString(), // bigint → string
    precio: Number(p.precio), // Decimal → number
  };
};
