type OrderTotalsProps = {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function OrderTotals({ subtotal, tax, total, itemCount }: OrderTotalsProps) {
  return (
    <div className="space-y-1.5 pt-3 border-t border-border">
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Subtotal ({itemCount} ítems)</span>
        <span className="text-text-primary">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">IVA (8%)</span>
        <span className="text-text-primary">{formatPrice(tax)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold pt-1.5 border-t border-border">
        <span className="text-text-primary">Total</span>
        <span className="text-primary-600">{formatPrice(total)}</span>
      </div>
    </div>
  );
}