import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
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

        const { email, password: parsedPassword } = parsed.data;

        const user = await prisma.users.findUnique({
          where: { email: email.toLowerCase() },
          include: { tipousuarios: true },
        });

        if (!user) throw new Error("El usuario no existe");

        const passwordMatch = bcryptjs.compareSync(
          parsedPassword,
          user.password
        );
        if (!passwordMatch) throw new Error("Contraseña incorrecta");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userSafe } = user;

        return {
          id: userSafe.id.toString(),
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
