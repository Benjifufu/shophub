import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Catálogo de productos con carrito global",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/*
          El Provider envuelve TODO. Como el layout no se vuelve a montar al
          navegar entre rutas, el estado del carrito sobrevive a la navegación.
          El Header queda dentro del Provider para poder leer el contador.
        */}
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
