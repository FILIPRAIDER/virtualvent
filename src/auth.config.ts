import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.data as typeof session.user;
      return session;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) throw new Error("Credenciales inválidas");

        const { email, password } = parsed.data;

        const user = await prisma.users.findUnique({
          where: {
            email: email.toLowerCase(),
          },
          include: {
            tipousuarios: true,
          },
        });

        if (!user) throw new Error("El usuario no existe");

        const passwordMatch = bcryptjs.compareSync(password, user.password);

        if (!passwordMatch) throw new Error("Contraseña incorrecta");

        // Deshabilitar temporalmente la regla ESLint para esta línea
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userSafe } = user; // Renombramos `password` a `_` para eliminarlo

        return {
          id: userSafe.id.toString(), // <- Asegura que no sea BigInt
          name: userSafe.name,
          email: userSafe.email,
          tipousuarios: userSafe.tipousuarios
            ? {
                id: userSafe.tipousuarios.id.toString(),
                nombre: userSafe.tipousuarios.nombre,
              }
            : null,
        };
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
