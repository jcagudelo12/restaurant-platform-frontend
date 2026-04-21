import { useState, useMemo } from "react";
import { useOrder } from "../context/OrderContext";
import { CATEGORIES, PRODUCTS } from "../data/menuData";
import { CategoryBar } from "../components/order/CategoryBar";
import { ProductGrid } from "../components/order/ProductGrid";
import { ProductModifierModal } from "../components/order/ProductModifierModal";
import { OrderTicket } from "../components/order/OrderTicket";
import { QuickSearchBar } from "../components/order/QuickSearchBar";
import type { Product, SelectedModifier } from "../types";

type OrderScreenProps = {
  tableId: string;
  tableNumber: number;
  onBack: () => void;
};

export function OrderScreen({ tableId, tableNumber, onBack }: OrderScreenProps) {
  const { order, startOrder, addItem } = useOrder();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [modifierProduct, setModifierProduct] = useState<Product | null>(null);

  // Iniciar pedido si no existe
  if (!order) {
    startOrder(tableId, tableNumber);
  }

  // Conteos por categoría
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      counts[cat.id] = PRODUCTS.filter((p) => p.categoryId === cat.id && p.available).length;
    }
    return counts;
  }, []);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    } else {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    return result;
  }, [activeCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    if (!product.available) return;

    // Si tiene modificadores, abrir modal
    if (product.modifierGroups && product.modifierGroups.length > 0) {
      setModifierProduct(product);
      return;
    }

    // Si no tiene modificadores, agregar directo
    addItem({
      productId: product.id,
      productName: product.name,
      basePrice: product.price,
      quantity: 1,
      modifiers: [],
    });
  };

  const handleModifierConfirm = (product: Product, modifiers: SelectedModifier[], notes: string) => {
    addItem({
      productId: product.id,
      productName: product.name,
      basePrice: product.price,
      quantity: 1,
      modifiers,
      notes: notes || undefined,
    });
    setModifierProduct(null);
  };

  const itemCount = order?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  return (
    <div className="flex h-full -m-4">
      {/* Lado izquierdo: Catálogo */}
      <div className="flex-1 flex flex-col min-w-0 p-4">
        {/* Header con botón volver */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:bg-surface-secondary transition-colors"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-text-primary">
              Mesa {tableNumber}
            </h1>
            <p className="text-xs text-text-muted">
              {itemCount > 0 ? `${itemCount} ítems en el pedido` : "Selecciona productos del menú"}
            </p>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="mb-3">
          <QuickSearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Categorías (se ocultan si hay búsqueda activa) */}
        {!searchQuery && (
          <div className="mb-3">
            <CategoryBar
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              productCounts={productCounts}
            />
          </div>
        )}

        {/* Indicador de búsqueda */}
        {searchQuery && (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Resultados para "{searchQuery}" ({filteredProducts.length})
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Limpiar
            </button>
          </div>
        )}

        {/* Grid de productos */}
        <div className="flex-1 overflow-y-auto">
          <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
        </div>
      </div>

      {/* Lado derecho: Ticket */}
      <OrderTicket onClose={onBack} />

      {/* Modal de modificadores */}
      <ProductModifierModal
        product={modifierProduct}
        isOpen={modifierProduct !== null}
        onClose={() => setModifierProduct(null)}
        onConfirm={handleModifierConfirm}
      />
    </div>
  );
}