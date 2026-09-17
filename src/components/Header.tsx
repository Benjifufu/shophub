"use client";
// Cliente porque consume el contexto (useCart -> useContext).

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Link de Next: navega sin recargar la página (SPA) */}
        <Link href="/" className="text-lg font-semibold text-slate-900">
          ShopHub
        </Link>

        {/* Link normal: el carrito ahora es una página propia en /cart */}
        <Link href="/cart" className="flex items-center gap-2 text-sm text-slate-700">
          <span>Carrito</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-medium text-white">
            {totalItems}
          </span>
        </Link>
      </nav>
    </header>
  );
}
