import { authOptions } from "@/auth.config"; // ⬅️ tu configuración personalizada
import { getServerSession } from "next-auth"; // ⬅️ función oficial de NextAuth
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); // ⬅️ usa getServerSession correctamente

  if (!session?.user) {
    redirect("/auth/login?redirectTo=/checkout/address");
  }

  return <>{children}</>;
}
