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

    return {
      ...p,
      id: p.id.toString(), // bigint → string
      precio: Number(p.precio), // Decimal → number
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  } finally {
    // Asegúrate de desconectar después de la consulta
    await prisma.$disconnect();
  }
};
