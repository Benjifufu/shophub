// Contrato de datos de la aplicación.
// Todo lo que venga de DummyJSON o se pase entre componentes se tipa aquí.

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;

  // Opcionales: solo llegan en el endpoint de detalle (/products/{id}),
  // no en el listado, porque ahí usamos ?select=...
  description?: string;
  brand?: string;
}

// Un ítem del carrito es un producto + cuántas unidades lleva el usuario.
export interface CartItem extends Product {
  quantity: number;
}
