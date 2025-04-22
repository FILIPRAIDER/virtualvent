export interface Product {
  id: string; // Prisma lo define como BigInt, pero puedes convertirlo a string en el cliente
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  categoriaNombre?: string; // opcional, si incluyes join con categorías
  corporativoId: string;
  imagenes: ProductImage[];
}

export interface ProductImage {
  id: string;
  imagen: string; // URL
  productoId: string;
}

export interface CartProduct {
  id: string;
  nombre: string;
  slug: string; // podrías usar un campo adicional en productos para esto
  precio: number;
  cantidad: number;
  imagen: string;
}
