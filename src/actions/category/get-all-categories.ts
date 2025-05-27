"use server";

import { prisma } from "@/lib/prisma";

export const getAllCategories = async () => {
  const tiendas = await prisma.categorias.findMany({
    select: {
      uuid: true,
      nombre: true,
      descripcion: true,
    },
  });

  return tiendas.map((tienda) => ({
    uuid: tienda.uuid,
    nombre: tienda.nombre,
    descripcion: tienda.descripcion,
    logo: "/imgs/categoria.png",
  }));
};
