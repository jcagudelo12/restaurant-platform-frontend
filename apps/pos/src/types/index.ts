export type User = {
  id: string;
  name: string;
  email: string;
  role: "cashier" | "waiter" | "supervisor" | "admin";
  avatarInitials: string;
  avatarUrl?: string;
};

export type Store = {
  id: string;
  name: string;
  address: string;
};

export type AuthState = {
  user: User | null;
  store: Store | null;
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