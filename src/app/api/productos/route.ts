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
      take: 20,
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
