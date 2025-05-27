import { checkCliente } from "@/actions/cliente/check-cliente";
import { redirect } from "next/navigation";

export default async function DatosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await checkCliente();

  if (result.redirectTo) {
    redirect(result.redirectTo);
  }

  return <>{children}</>; // solo renderiza el formulario si pasa la validación
}
