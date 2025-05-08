// /api/tiendas/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tiendas = await prisma.corporativos.findMany({
      select: { razon_social: true, logo: true },
    });

    return NextResponse.json(tiendas);
  } catch (error) {
    console.error("Error en /api/tiendas:", error);
    return new NextResponse("Error del servidor", { status: 500 });
  } finally {
    await prisma.$disconnect(); // <--- cerrar conexión
  }
}
