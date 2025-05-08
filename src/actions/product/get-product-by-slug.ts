import { ProductoClient } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const getProductBySlug = async (
  slug: string
): Promise<ProductoClient | null> => {
  try {
    const p = await prisma.productos.findFirst({
      where: { nombre: slug },
      include: { imagenes: true },
    });

    if (!p) return null;

    if (!p.uuid) throw new Error("El producto no tiene UUID");

    return {
      ...p,
      uuid: p.uuid, // ahora garantizado que es string
      id: p.id.toString(), // bigint → string
      precio: Number(p.precio), // Decimal → number
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
