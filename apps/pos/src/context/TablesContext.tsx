import { createContext, useContext, useState, type ReactNode } from "react";
import type { Table, Floor, TableStatus } from "../types";

const MOCK_FLOORS: Floor[] = [
  { id: "main", name: "Salón principal", icon: "🏠" },
  { id: "terrace", name: "Terraza", icon: "☀️" },
  { id: "bar", name: "Barra", icon: "🍺" },
  { id: "private", name: "Privado", icon: "🚪" },
];

const MOCK_TABLES: Table[] = [
  // Salón principal
  { id: "t1", number: 1, floorId: "main", status: "occupied", capacity: 4, guests: 3, waiterName: "Carlos Ruiz", occupiedSince: new Date(Date.now() - 45 * 60000).toISOString(), totalAmount: 87500 },
  { id: "t2", number: 2, floorId: "main", status: "free", capacity: 2 },
  { id: "t3", number: 3, floorId: "main", status: "bill_requested", capacity: 6, guests: 5, waiterName: "María López", occupiedSince: new Date(Date.now() - 90 * 60000).toISOString(), totalAmount: 234000 },
  { id: "t4", number: 4, floorId: "main", status: "occupied", capacity: 4, guests: 4, waiterName: "Carlos Ruiz", occupiedSince: new Date(Date.now() - 20 * 60000).toISOString(), totalAmount: 45000 },
  { id: "t5", number: 5, floorId: "main", status: "free", capacity: 4 },
  { id: "t6", number: 6, floorId: "main", status: "reserved", capacity: 8, reservedFor: "Familia García - 7:30 PM" },
  { id: "t7", number: 7, floorId: "main", status: "dirty", capacity: 4 },
  { id: "t8", number: 8, floorId: "main", status: "occupied", capacity: 2, guests: 2, waiterName: "María López", occupiedSince: new Date(Date.now() - 10 * 60000).toISOString(), totalAmount: 28000 },
  { id: "t9", number: 9, floorId: "main", status: "free", capacity: 4 },
  { id: "t10", number: 10, floorId: "main", status: "free", capacity: 6 },

  // Terraza
  { id: "t11", number: 11, floorId: "terrace", status: "occupied", capacity: 4, guests: 2, waiterName: "Carlos Ruiz", occupiedSince: new Date(Date.now() - 35 * 60000).toISOString(), totalAmount: 62000 },
  { id: "t12", number: 12, floorId: "terrace", status: "free", capacity: 4 },
  { id: "t13", number: 13, floorId: "terrace", status: "free", capacity: 6 },
  { id: "t14", number: 14, floorId: "terrace", status: "occupied", capacity: 2, guests: 2, waiterName: "María López", occupiedSince: new Date(Date.now() - 55 * 60000).toISOString(), totalAmount: 95000 },

  // Barra
  { id: "t15", number: 15, floorId: "bar", status: "occupied", capacity: 1, guests: 1, waiterName: "Carlos Ruiz", occupiedSince: new Date(Date.now() - 15 * 60000).toISOString(), totalAmount: 18000 },
  { id: "t16", number: 16, floorId: "bar", status: "free", capacity: 1 },
  { id: "t17", number: 17, floorId: "bar", status: "free", capacity: 1 },
  { id: "t18", number: 18, floorId: "bar", status: "occupied", capacity: 1, guests: 1, waiterName: "María López", occupiedSince: new Date(Date.now() - 5 * 60000).toISOString(), totalAmount: 12000 },

  // Privado
  { id: "t19", number: 19, floorId: "private", status: "reserved", capacity: 12, reservedFor: "Evento corporativo - 6:00 PM" },
  { id: "t20", number: 20, floorId: "private", status: "free", capacity: 8 },
];

type TablesContextType = {
  floors: Floor[];
  tables: Table[];
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  seatTable: (tableId: string, guests: number, waiterName: string) => void;
  freeTable: (tableId: string) => void;
};

const TablesContext = createContext<TablesContextType | null>(null);

export function TablesProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<Table[]>(MOCK_TABLES);

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status } : t))
    );
  };

  const seatTable = (tableId: string, guests: number, waiterName: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: "occupied" as TableStatus,
              guests,
              waiterName,
              occupiedSince: new Date().toISOString(),
              totalAmount: 0,
            }
          : t
      )
    );
  };

  const freeTable = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: "free" as TableStatus,
              guests: undefined,
              waiterName: undefined,
              occupiedSince: undefined,
              orderId: undefined,
              totalAmount: undefined,
              reservedFor: undefined,
            }
          : t
      )
    );
  };

  return (
    <TablesContext.Provider value={{ floors: MOCK_FLOORS, tables, updateTableStatus, seatTable, freeTable }}>
      {children}
    </TablesContext.Provider>
  );
}

export function useTables() {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error("useTables debe usarse dentro de TablesProvider");
  }
  return context;
}