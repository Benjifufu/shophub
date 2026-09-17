// Server Component asíncrono: el fetch ocurre en el servidor, antes de
// enviar el HTML. Por eso no se necesita useEffect ni estado de carga.

import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">Catálogo</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
