"use server";

import { prisma } from "@/lib/prisma";

export const getAllShops = async () => {
  const tiendas = await prisma.corporativos.findMany({
    select: {
      id: true,
      razon_social: true,
      logo: true,
    },
  });

  return tiendas.map((tienda) => ({
    id: tienda.id,
    razon_social: tienda.razon_social,
    logo: tienda.logo ?? "/default-logo.png", // aseguramos que logo siempre sea string
  }));
};
