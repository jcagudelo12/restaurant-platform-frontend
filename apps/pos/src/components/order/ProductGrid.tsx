import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
};

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-text-muted">
        <span className="text-3xl mb-2">🔍</span>
        <p className="text-sm">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
}