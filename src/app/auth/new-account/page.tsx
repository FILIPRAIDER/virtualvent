"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
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
          Registrarse en <strong className="font-bold">Virtual Vent</strong>
        </h1>
        <p className="poppins text-sm font-light text-[#575757]">
          Ingresa tus datos para crear tu cuenta.
        </p>
      </article>
      <RegisterForm />
    </main>
  );
}
