export type User = {
  id: string;
  name: string;
  email: string;
  role: "cashier" | "waiter" | "supervisor" | "admin";
  avatarInitials: string;
  avatarUrl?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

// ===== MESAS =====

export type TableStatus = "free" | "occupied" | "bill_requested" | "reserved" | "dirty";

export type Floor = {
  id: string;
  name: string;
  icon: string;
};

export type Table = {
  id: string;
  number: number;
  floorId: string;
  status: TableStatus;
  capacity: number;
  guests?: number;
  waiterName?: string;
  orderId?: string;
  occupiedSince?: string; // ISO string
  reservedFor?: string;
  totalAmount?: number;
};

// ===== PRODUCTOS / MENÚ =====

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Modifier = {
  id: string;
  name: string;
  price: number;
};

export type ModifierGroup = {
  id: string;
  name: string;
  required: boolean;
  maxSelections: number; // 1 = selección única, >1 = múltiple
  modifiers: Modifier[];
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  image?: string;
  modifierGroups?: ModifierGroup[];
  available: boolean;
};

// ===== PEDIDO =====

export type SelectedModifier = {
  groupId: string;
  groupName: string;
  modifierId: string;
  modifierName: string;
  price: number;
};

export type OrderItem = {
  id: string; // UUID único del ítem en el pedido
  productId: string;
  productName: string;
  basePrice: number;
  quantity: number;
  modifiers: SelectedModifier[];
  notes?: string;
  subtotal: number; // (basePrice + sum(modifier prices)) * quantity
};

export type Order = {
  id: string;
  tableId: string;
  tableNumber: number;
  items: OrderItem[];
  notes?: string;
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "completed" | "cancelled";
  createdAt: string;
};