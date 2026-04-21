import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Order, OrderItem, SelectedModifier } from "../types";

type OrderContextType = {
  order: Order | null;
  startOrder: (tableId: string, tableNumber: number) => void;
  addItem: (item: Omit<OrderItem, "id" | "subtotal">) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  setOrderNotes: (notes: string) => void;
  clearOrder: () => void;
  sendOrder: () => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

const TAX_RATE = 0.08; // 8% IVA consumo restaurantes en Colombia

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function calculateItemSubtotal(basePrice: number, quantity: number, modifiers: SelectedModifier[]): number {
  const modifiersTotal = modifiers.reduce((sum, m) => sum + m.price, 0);
  return (basePrice + modifiersTotal) * quantity;
}

function recalculateOrder(order: Order): Order {
  const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  return { ...order, subtotal, tax, total };
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null);

  const startOrder = useCallback((tableId: string, tableNumber: number) => {
    setOrder({
      id: generateId(),
      tableId,
      tableNumber,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      status: "draft",
      createdAt: new Date().toISOString(),
    });
  }, []);

  const addItem = useCallback((item: Omit<OrderItem, "id" | "subtotal">) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const subtotal = calculateItemSubtotal(item.basePrice, item.quantity, item.modifiers);
      const newItem: OrderItem = { ...item, id: generateId(), subtotal };
      const updated = { ...prev, items: [...prev.items, newItem] };
      return recalculateOrder(updated);
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, items: prev.items.filter((i) => i.id !== itemId) };
      return recalculateOrder(updated);
    });
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        items: prev.items.map((i) =>
          i.id === itemId
            ? { ...i, quantity, subtotal: calculateItemSubtotal(i.basePrice, quantity, i.modifiers) }
            : i
        ),
      };
      return recalculateOrder(updated);
    });
  }, []);

  const setOrderNotes = useCallback((notes: string) => {
    setOrder((prev) => (prev ? { ...prev, notes } : prev));
  }, []);

  const clearOrder = useCallback(() => {
    setOrder(null);
  }, []);

  const sendOrder = useCallback(() => {
    setOrder((prev) => (prev ? { ...prev, status: "sent" } : prev));
    // TODO: enviar al backend y a cocina
  }, []);

  return (
    <OrderContext.Provider
      value={{ order, startOrder, addItem, removeItem, updateItemQuantity, setOrderNotes, clearOrder, sendOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder debe usarse dentro de OrderProvider");
  return context;
}