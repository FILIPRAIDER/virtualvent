// /app/api/productos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.productos.findMany({
      where: { deleted_at: null },
      include: {
        imagenes: {
          select: { imagen: true },
        },
      },
      orderBy: { created_at: "desc" },
      take: 20, // ✅ limita los resultados
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error en /api/productos:", error);
    return new NextResponse(JSON.stringify({ error: "Error del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
