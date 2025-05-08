"use server";

import { prisma } from "@/lib/prisma";
import { ProductoConImagen } from "@/interfaces";

export const getProductos = async (): Promise<ProductoConImagen[]> => {
  const productos = await prisma.productos.findMany({
    where: { deleted_at: null },
    include: { imagenes: { select: { imagen: true } } },
    orderBy: { created_at: "desc" },
  });

  return productos.map((producto) => ({
    id: producto.uuid || "",
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    stock: producto.stock,
    precio: producto.precio.toString(),
    unidad: producto.unidad,
    imagenes: producto.imagenes,
  }));
};
