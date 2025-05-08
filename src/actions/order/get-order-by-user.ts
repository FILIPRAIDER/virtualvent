"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { ok: false, message: "Debe estar autenticado" };
  }

  const orders = await prisma.ordenes.findMany({
    orderBy: { created_at: "desc" },
  });

  return { ok: true, orders };
};
