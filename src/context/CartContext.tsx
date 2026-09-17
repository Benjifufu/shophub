"use client";
// 'use client' porque este módulo usa hooks (useState, useContext).
// Todo componente que consuma este contexto también debe ser de cliente.

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, CartItem } from "@/types/product";

// 1. Qué expone el contexto hacia afuera.
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addItem: (product: Product) => void;
}

// 2. Se crea el contexto. Arranca en null porque su valor real
//    solo existe cuando el Provider lo entrega.
const CartContext = createContext<CartContextType | null>(null);

// 3. El Provider: es un componente que recibe children y les entrega el valor.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      // Si ya está en el carrito, se crea un arreglo NUEVO donde ese ítem
      // se reemplaza por una copia con quantity + 1. Nada se muta.
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Si no está, se retorna un arreglo nuevo con el producto al final.
      // No se usa prevItems.push(...) porque eso mutaría el estado anterior
      // y React no detectaría el cambio.
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Valor derivado: no necesita su propio useState, se recalcula en cada render.
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Hook de consumo. Evita repetir useContext(CartContext) en cada componente
//    y avisa si alguien lo usa por fuera del Provider.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
}
