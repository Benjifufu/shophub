"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function CheckoutPage() {
  const { items, clearCart } = useCart();


  const [datos, setDatos] = useState({ nombre: "", email: "", metodoPago: "", terminosycondiciones:"" });
  const [confirmado, setConfirmado] = useState(false);

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();      
    setConfirmado(true);
    clearCart();              
  };

  const esValido =
    datos.nombre.length > 3 && datos.email.includes("@") && datos.metodoPago.length > 0 && datos.terminosycondiciones === "on";


  if (confirmado) {
    return (
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-900">¡Pedido confirmado</p>
        <p className="text-slate-600">Te escribimos a {datos.email}.</p>
        <Link href="/" prefetch={false} className="text-slate-900 underline">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-slate-600">No hay nada en el carrito para pedir.</p>
        <Link href="/" prefetch={false} className="text-slate-900 underline">
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


      <h1 className="mb-4 text-2xl font-semibold text-slate-900">Confirmar pedido</h1>

      
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="email"  
          name="email"
          value={datos.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          name="metodoPago"
          value={datos.metodoPago}
          onChange={handleChange}
          placeholder="Método de pago (Tarjeta Debito, Tarjeta Crédito, Efectivo)"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            name="terminosycondiciones"
            checked={datos.terminosycondiciones === "on"}
            onChange={handleChange}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          Acepto los términos y condiciones
        </label>

    
        <button
          type="submit"
          disabled={!esValido}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-300"
        >
          Confirmar pedido
        </button>
      </form>
    </section>
  );
}