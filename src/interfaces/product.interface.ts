import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  categoriaNombre?: string; // opcional, si incluyes join con categorías
  corporativoId: string;
  imagenes: ProductImage[];
}

export interface ProductoConImagen {
  id: string; // porque lo convertimos desde bigint
  nombre: string;
  descripcion: string;
  stock: number;
  precio: string; // lo convertimos desde Decimal
  unidad: string;
  imagenes: { imagen: string }[];
}

export interface producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: Decimal; // Cambiado de 'number' a 'Decimal'
  stock: number;
  unidad: string;
  imagenes: {
    id: string;
    producto_id: string;
    imagen: string;
  }[];
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}
// interfaces/producto-client.ts
export interface ProductoClient {
  id: string;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  unidad: string;
  categoria_id: bigint;
  corporativo_id: bigint;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  imagenes: { imagen: string }[];
}

export interface ProductoSlideShow {
  nombre: string;
  precio: number;
  unidad: string;
  imagen: string;
  descripcion: string;
  stock: number;
}

export interface ProductImage {
  id: string;
  imagen: string; // URL
  productoId: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  stock: number;
  quantity: number;
  image: string;
}
