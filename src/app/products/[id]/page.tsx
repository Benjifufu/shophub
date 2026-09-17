import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

// La carpeta [id] hace que el segmento de la URL sea un parámetro.
// En Next 15+ params llega como Promise, por eso el await.
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  // Si el id no existe, Next muestra la pantalla 404.
  if (!product) {
    notFound();
  }

  return (
    <section>
      <Link href="/" className="text-sm text-slate-600 hover:underline">
        Volver al catálogo
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 rounded-lg border border-slate-200 bg-white p-6 md:grid-cols-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-80 w-full rounded-md bg-slate-50 object-contain p-6"
        />

        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-500">
            {product.brand ?? product.category}
          </p>

          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <p className="text-2xl font-semibold">${product.price}</p>

          <p className="text-sm text-slate-500">
            {product.stock} unidades disponibles
          </p>

          <p className="leading-relaxed text-slate-700">
            {product.description}
          </p>

          <div className="mt-auto pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
