// Sin 'use client': solo muestra datos, no tiene estado ni eventos.
// La única parte interactiva (el botón) es un componente de cliente aparte.

import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Link href={`/products/${product.id}`}>
        {/* <img> y no next/image para no tener que configurar dominios remotos */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-44 w-full bg-slate-50 object-contain p-4"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-slate-500">{product.category}</p>

        <Link
          href={`/products/${product.id}`}
          className="font-medium text-slate-900 hover:underline"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="text-lg font-semibold text-slate-900">
            ${product.price}
          </span>
          <span className="text-xs text-slate-500">
            {product.stock} disponibles
          </span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
