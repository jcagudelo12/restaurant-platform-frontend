import type { Product } from "../../types";

type ProductCardProps = {
  product: Product;
  onClick: (product: Product) => void;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasModifiers = product.modifierGroups && product.modifierGroups.length > 0;

  return (
    <button
      onClick={() => onClick(product)}
      disabled={!product.available}
      className={`w-full text-left p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
        product.available
          ? "bg-surface border-border hover:border-primary-300 hover:shadow-md active:scale-[0.98] cursor-pointer"
          : "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
      }`}
    >
      {/* Nombre */}
      <p className="font-semibold text-text-primary text-sm leading-tight mb-1 line-clamp-2">
        {product.name}
      </p>

      {/* Descripción */}
      {product.description && (
        <p className="text-xs text-text-muted line-clamp-2 mb-2">
          {product.description}
        </p>
      )}

      {/* Footer: precio + indicador de modificadores */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-bold text-primary-600">
          {formatPrice(product.price)}
        </span>
        {hasModifiers && (
          <span className="text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded font-medium">
            Opciones
          </span>
        )}
        {!product.available && (
          <span className="text-xs bg-danger-50 text-danger-600 px-1.5 py-0.5 rounded font-medium">
            Agotado
          </span>
        )}
      </div>
    </button>
  );
}