"use server";

import { prisma } from "@/lib/prisma";

export const getAllShops = async (): Promise<{ id: string; nombre: string; logo: string | null }[]> => {
  const tiendas = await prisma.corporativos.findMany({
    where: {
      deleted_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return tiendas.map((tienda) => ({
    id: tienda.uuid || "",
    nombre: tienda.razon_social,
    logo: tienda.logo
  }));
};
