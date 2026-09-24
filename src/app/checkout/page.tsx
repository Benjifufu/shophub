"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage() {
  const { items, clearCart, totalPrice } = useCart();

  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    metodoPago: "",
    aceptaTerminos: false, // boolean, no string "on"
  });

  // Qué campos ya perdieron el foco al menos una vez. Los mensajes de
  // error solo se muestran si touched[campo] es true -> así no aparecen
  // apenas se abre la página, antes de que el usuario escriba nada.
  const [touched, setTouched] = useState({ nombre: false, email: false });

  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const nombreValido = datos.nombre.trim().length >= 5;
  const emailValido = EMAIL_REGEX.test(datos.email);
  const esValido =
    nombreValido && emailValido && datos.metodoPago.length > 0 && datos.aceptaTerminos;

  // Sirve para los inputs de texto y el select (comparten name/value).
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  // El checkbox usa .checked (booleano), no .value: en el DOM, .value de
  // un checkbox sin atributo value explícito siempre es "on", marcado o
  // no -> usar handleChange aquí haría que nunca se pudiera desmarcar.
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos((prev) => ({ ...prev, aceptaTerminos: e.target.checked }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "nombre" || name === "email") {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esValido) return;

    setEnviando(true);
    // Simula la espera de red; evita envíos duplicados porque el botón
    // queda disabled mientras enviando es true.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    clearCart();
    setConfirmado(true);
    setEnviando(false);
  };

  // Este chequeo va ANTES del de "carrito vacío" a propósito: clearCart()
  // deja items en [], así que si el orden fuera al revés, apenas se
  // confirma el pedido la página mostraría "no hay nada para pedir" en
  // vez del mensaje de éxito.
  if (confirmado) {
    return (
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-900">¡Pedido confirmado!</p>
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

      <h1 className="mb-4 mt-4 text-2xl font-semibold text-slate-900">
        Confirmar pedido
      </h1>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nombre completo"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          {touched.nombre && !nombreValido && (
            <p className="mt-1 text-xs text-red-600">Mínimo 5 caracteres.</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={datos.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Correo electrónico"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          {touched.email && !emailValido && (
            <p className="mt-1 text-xs text-red-600">Formato de correo inválido.</p>
          )}
        </div>

        <select
          name="metodoPago"
          value={datos.metodoPago}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Selecciona un método</option>
          <option value="tarjeta-debito">Tarjeta débito</option>
          <option value="tarjeta-credito">Tarjeta crédito</option>
          <option value="efectivo">Efectivo</option>
        </select>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={datos.aceptaTerminos}
            onChange={handleCheckbox}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          Acepto los términos y condiciones
        </label>

        <button
          type="submit"
          disabled={!esValido || enviando}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-300"
        >
          {enviando ? "Procesando…" : "Confirmar pedido"}
        </button>
      </form>
    </section>
  );
}
