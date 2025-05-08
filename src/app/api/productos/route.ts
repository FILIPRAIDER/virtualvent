import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Función segura para serializar BigInt
function serialize<T>(obj: T): T {
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

    return NextResponse.json(serialize(productos));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
