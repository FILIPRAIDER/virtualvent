// src/actions/cliente/check-cliente.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const checkCliente = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Verifica si ya tiene cliente registrado usando user_id
  const cliente = await prisma.clientes.findUnique({
    where: { user_id: Number(session.user.id) },
  });

  if (cliente) {
    redirect("/checkout");
  }

  return session;
};
