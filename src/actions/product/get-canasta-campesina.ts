"use server";

import { prisma } from "@/lib/prisma";
import { ProductoConImagen } from "@/interfaces";

export const getCanastaCampesina = async (): Promise<ProductoConImagen[]> => {
  const productos = await prisma.productos.findMany({
    where: {
      deleted_at: null,
      nombre: {
        equals: "Canasta campesina",
      },
    },
    include: {
      imagenes: { select: { imagen: true } },
    },
    orderBy: { created_at: "desc" },
  });

  return productos.map((producto) => ({
    id: producto.uuid || "",
    uuid: producto.uuid || "",
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    stock: producto.stock,
    precio: producto.precio.toString(),
    unidad: producto.unidad,
    imagenes: producto.imagenes,
  }));
};
