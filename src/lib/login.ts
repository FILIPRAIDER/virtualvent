"use client";

import { signIn } from "next-auth/react";

export const login = async (
  email: string,
  password: string,
  callbackUrl: string = "/"
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!result) {
      return {
        ok: false,
        error: "No se pudo conectar con el servidor de autenticación.",
      };
    }

    if (result.ok) return { ok: true };

    return {
      ok: false,
      error: result.error || "Credenciales inválidas",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Error inesperado al iniciar sesión.",
    };
  }
};
