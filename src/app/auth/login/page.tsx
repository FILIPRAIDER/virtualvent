"use client";

import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "./ui/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex flex-col min-h-screen pt-32 gap-4">
        <Image
          src="/LogoVirtualVent.svg"
          width={300}
          height={60}
          alt="Logo"
          className="w-5/6 md:w-1/2 mx-auto"
          priority
        />
        <article className="flex flex-col items-center text-center mb-10">
          <h1 className="text-xl my-2 poppins font-light">
            Inicia sesión en <strong className="font-bold">Virtual Vent</strong>
          </h1>
          <p className="poppins text-sm font-light text-[#575757]">
            Ingresa tus datos para acceder a tu cuenta.
          </p>
        </article>
        <LoginForm />

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center md:absolute md:right-4 md:top-4 md:bg-[#349999] poppins font-bold md:text-white p-2 rounded-md md:w-[200px] hover:bg-[#349999]/80 transition-all"
        >
          Registrarse
        </Link>
      </main>
    </Suspense>
  );
}
