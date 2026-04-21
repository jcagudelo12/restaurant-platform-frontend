import { useOrder } from "../../context/OrderContext";
import { OrderItemRow } from "./OrderItemRow";
import { OrderTotals } from "./OrderTotals";
import { OrderNotes } from "./OrderNotes";
import { Button } from "@restaurant/ui";

type OrderTicketProps = {
  onClose: () => void;
};

export function OrderTicket({ onClose }: OrderTicketProps) {
  const { order, removeItem, updateItemQuantity, setOrderNotes, clearOrder, sendOrder } = useOrder();

  if (!order) return null;

  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const isSent = order.status === "sent";

  return (
    <div className="w-80 xl:w-96 bg-surface border-l border-border flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-bold text-text-primary">Mesa {order.tableNumber}</h2>
          <p className="text-xs text-text-muted">
            {isSent ? "✅ Enviado a cocina" : "📝 Borrador"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-md flex items-center justify-center text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4">
        {order.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted py-12">
            <span className="text-4xl mb-3">🛒</span>
            <p className="text-sm font-medium">Pedido vacío</p>
            <p className="text-xs mt-1">Selecciona productos del menú</p>
          </div>
        ) : (
          <div className="py-2">
            {order.items.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                onQuantityChange={(qty) => updateItemQuantity(item.id, qty)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Notas + Totales + Acciones */}
      {order.items.length > 0 && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          <OrderNotes notes={order.notes ?? ""} onChange={setOrderNotes} />

          <OrderTotals
            subtotal={order.subtotal}
            tax={order.tax}
            total={order.total}
            itemCount={totalItems}
          />

          <div className="flex gap-2">
            <Button variant="secondary" size="md" onClick={clearOrder} className="flex-1">
              🗑️ Limpiar
            </Button>
            <Button
              variant="success"
              size="md"
              onClick={sendOrder}
              className="flex-[2]"
              disabled={isSent}
            >
              {isSent ? "✅ Enviado" : "📤 Enviar a cocina"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}