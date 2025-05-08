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

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        tipousuario_id: 3,
        created_at: new Date(),
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
        id: user.id.toString(),
      },
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    console.error("[REGISTER_USER_ERROR]", error);

    if (error instanceof Error && (error as PrismaError).code) {
      const prismaError = error as PrismaError;

      if (
        prismaError.code === "P2002" &&
        prismaError.meta?.target?.includes("email")
      ) {
        return {
          ok: false,
          message: "El correo ya está registrado.",
        };
      }
    }

    return {
      ok: false,
      message: "Error al registrar el usuario.",
    };
  }
};
