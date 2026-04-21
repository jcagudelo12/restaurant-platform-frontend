import type { OrderItem } from "../../types";

type OrderItemRowProps = {
  item: OrderItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function OrderItemRow({ item, onQuantityChange, onRemove }: OrderItemRowProps) {
  return (
    <div className="group py-2.5 border-b border-border last:border-0">
      {/* Primera línea: nombre + subtotal */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-sm font-medium text-text-primary flex-1 leading-tight">
          {item.productName}
        </p>
        <p className="text-sm font-semibold text-text-primary whitespace-nowrap">
          {formatPrice(item.subtotal)}
        </p>
      </div>

      {/* Modificadores */}
      {item.modifiers.length > 0 && (
        <div className="mb-1.5">
          {item.modifiers.map((mod) => (
            <p key={mod.modifierId} className="text-xs text-text-muted leading-snug">
              + {mod.modifierName}
              {mod.price > 0 && <span className="ml-1">({formatPrice(mod.price)})</span>}
            </p>
          ))}
        </div>
      )}

      {/* Notas del ítem */}
      {item.notes && (
        <p className="text-xs text-warning-600 mb-1.5 italic">📝 {item.notes}</p>
      )}

      {/* Controles de cantidad */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => (item.quantity === 1 ? onRemove() : onQuantityChange(item.quantity - 1))}
            className="w-7 h-7 rounded-md bg-surface-secondary border border-border text-text-secondary hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
          >
            {item.quantity === 1 ? "🗑️" : "−"}
          </button>
          <span className="w-8 text-center text-sm font-semibold text-text-primary">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="w-7 h-7 rounded-md bg-surface-secondary border border-border text-text-secondary hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-xs text-text-muted">
          {formatPrice(item.basePrice + item.modifiers.reduce((s, m) => s + m.price, 0))} c/u
        </p>
      </div>
    </div>
  );
}