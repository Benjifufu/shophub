"use client";
// Cliente completo: esta página no hace fetch a ningún servicio externo,
// solo lee y modifica el estado del contexto (useCart -> useContext).

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-slate-600">Tu carrito está vacío.</p>
        <Link
          href="/"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link href="/" className="text-sm text-slate-600 hover:underline">
        Volver al catálogo
      </Link>

      <h1 className="mb-6 mt-4 text-2xl font-semibold text-slate-900">
        Tu carrito
      </h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
          >
            {/* La imagen también lleva al detalle del producto */}
            <Link href={`/products/${item.id}`} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-20 rounded-md bg-slate-50 object-contain"
              />
            </Link>

            <div className="flex-1">
              <Link
                href={`/products/${item.id}`}
                className="font-medium text-slate-900 hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-slate-500">${item.price} c/u</p>
              <Link
                href={`/products/${item.id}`}
                className="text-xs text-slate-600 hover:underline"
              >
                Ver detalle
              </Link>
            </div>

            {/* Control de cantidad: - / número / +
                Sin disabled en el "-": al llegar a 0, updateQuantity ya
                elimina el ítem automáticamente (ver CartContext). */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-100"
              >
                −
              </button>

              <span className="w-6 text-center text-sm font-medium text-slate-900">
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-100"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold text-slate-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-lg font-semibold text-slate-900">Total</span>
        <span className="text-lg font-semibold text-slate-900">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={clearCart}
          className="rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
        >
          Vaciar carrito
        </button>

        <Link
          href="/checkout"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Finalizar compra
        </Link>
      </div>
    </section>
  );
}
