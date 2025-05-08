// src/actions/cliente/get-cliente-by-user-id.ts
"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getClienteByUserId = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const cliente = await prisma.clientes.findUnique({
    where: { user_id: BigInt(session.user.id) }, // 👈 importante: convertir a BigInt si tu DB lo usa así
  });

  return cliente;
};
