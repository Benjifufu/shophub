    "use client";
// Cliente completo: esta página no hace fetch a ningún servicio externo,
// solo lee y modifica el estado del contexto (useCart -> useContext).

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem } = useCart();

  // Valor derivado, igual que totalItems en el contexto: se recalcula
  // en cada render a partir de items, no se guarda en un useState aparte.
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-slate-600">Tu carrito está vacío.</p>
        <Link href="/" className="text-sm font-medium text-slate-900 hover:underline">
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">Tu carrito</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-20 w-20 rounded-md bg-slate-50 object-contain"
            />

            <div className="flex-1">
              <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                {item.title}
              </Link>
              <p className="text-sm text-slate-500">
                {item.quantity} × ${item.price}
              </p>
            </div>

            <p className="font-semibold">${item.price * item.quantity}</p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">${total}</span>
      </div>
    </section>
  );
}
