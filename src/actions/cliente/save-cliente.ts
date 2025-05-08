"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth.config";
import { z } from "zod";
import { redirect } from "next/navigation";

const schema = z.object({
  primer_nombre: z.string().min(1),
  segundo_nombre: z.string().optional(),
  primer_apellido: z.string().min(1),
  segundo_apellido: z.string().optional(),
  tipo_documento: z.string(),
  numero_documento: z.string(),
  telefono: z.string(),
  sexo: z.string(),
  fecha_nacimiento: z.coerce.date(),
});

export const saveCliente = async (formData: FormData): Promise<void> => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const data = Object.fromEntries(formData.entries());

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error("Datos inválidos");
    return;
  }

  const existing = await prisma.clientes.findUnique({
    where: { user_id: BigInt(session.user.id) },
  });

  if (existing) {
    redirect("/checkout");
  }

  await prisma.clientes.create({
    data: {
      uuid: crypto.randomUUID(),
      user_id: BigInt(session.user.id),
      ...parsed.data,
    },
  });

  redirect("/checkout");
};
