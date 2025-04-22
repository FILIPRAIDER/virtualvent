"use server";

import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface PrismaError extends Error {
  code?: string;
  meta?: { target?: string[] };
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<{
  ok: boolean;
  user?: { id: string; name: string; email: string };
  message?: string;
}> => {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        ok: false,
        message: "Ya existe un usuario con ese correo electrónico.",
      };
    }

    // Hashear la contraseña
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Crear el usuario
    const user = await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        created_at: new Date(), // opcional si tu DB no lo autogenera
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: {
        ...user,
        id: user.id.toString(), // convertir BigInt a string para frontend
      },
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    console.error("[REGISTER_USER_ERROR]", error);

    // Verificar si el error es una instancia de PrismaError
    if (error instanceof Error && (error as PrismaError).code) {
      const prismaError = error as PrismaError;

      // Manejo específico de errores únicos de Prisma
      if (
        prismaError.code === "P2002" &&
        prismaError.meta?.target?.includes("email")
      ) {
        return {
          ok: false,
          message: "El correo ya está registrado.",
        };
      }

      return {
        ok: false,
        message: "Error al registrar el usuario.",
      };
    }

    return {
      ok: false,
      message: "Error al registrar el usuario.",
    };
  }
};
