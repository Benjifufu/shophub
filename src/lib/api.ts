import { Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

// Catálogo: 8 productos con solo los campos que la tarjeta necesita.
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}?limit=8&select=id,title,price,category,thumbnail,stock`
  );

  if (!res.ok) {
    throw new Error("No se pudo cargar el catálogo");
  }

  // DummyJSON envuelve el arreglo dentro de { products, total, skip, limit }
  const data = await res.json();
  return data.products;
}

// Detalle: un solo producto con todos sus campos.
// Devuelve null si el id no existe, para que la página decida qué mostrar.
export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}
