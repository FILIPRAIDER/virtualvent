// /app/api/productos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Función para serializar BigInt y otros posibles valores no serializables
function serialize(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

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

    // Aplicamos la función serialize para convertir BigInt a string
    return NextResponse.json(serialize(productos));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
