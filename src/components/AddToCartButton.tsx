"use client";
// Cliente porque tiene un onClick y consume el contexto.

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      disabled={product.stock === 0}
      className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
    </button>
  );
}
