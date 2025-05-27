"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth.config";

export const checkCliente = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return { redirectTo: "/auth/login" };
  }

  const cliente = await prisma.clientes.findUnique({
    where: { user_id: Number(session.user.id) },
  });

  if (cliente) {
    return { redirectTo: "/checkout" };
  }

  return { session };
};
