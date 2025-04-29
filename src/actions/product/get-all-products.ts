"use server";

import { prisma } from "@/lib/prisma";

import { ProductoConImagen } from "@/interfaces";

export const getProductos = async (): Promise<ProductoConImagen[]> => {
  const productos = await prisma.productos.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      imagenes: {
        select: {
          imagen: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return productos.map((producto) => ({
    id: producto.id.toString(), // ✅ bigint → string
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    stock: producto.stock,
    precio: producto.precio.toString(), // ✅ Decimal → string
    unidad: "Unidad", // ✅ Valor mock (hasta que lo agregues a la base)
    imagenes: producto.imagenes,
  }));
};
