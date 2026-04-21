import { useState, useMemo } from "react";
import { useTables } from "../context/TablesContext";
import { FloorSelector } from "../components/tables/FloorSelector";
import { FloorMap } from "../components/tables/FloorMap";
import { TableDetail } from "../components/tables/TableDetail";
import { Badge } from "@restaurant/ui";
import type { Table, TableStatus } from "../types";

const STATUS_FILTERS: { value: TableStatus | "all"; label: string; icon: string }[] = [
  { value: "all", label: "Todas", icon: "📊" },
  { value: "free", label: "Libres", icon: "🟢" },
  { value: "occupied", label: "Ocupadas", icon: "🔵" },
  { value: "bill_requested", label: "Piden cuenta", icon: "🟡" },
  { value: "reserved", label: "Reservadas", icon: "🟣" },
  { value: "dirty", label: "Sucias", icon: "⚫" },
];

type TablesScreenProps = {
  onOpenOrder: (tableId: string, tableNumber: number) => void;
};

export function TablesScreen({ onOpenOrder }: TablesScreenProps) {
  const { floors, tables } = useTables();
  const [activeFloor, setActiveFloor] = useState("all");
  const [statusFilter, setStatusFilter] = useState<TableStatus | "all">("all");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const tableCounts = useMemo(() => {
    const counts: Record<string, { total: number; free: number }> = {};
    for (const floor of floors) {
      const floorTables = tables.filter((t) => t.floorId === floor.id);
      counts[floor.id] = {
        total: floorTables.length,
        free: floorTables.filter((t) => t.status === "free").length,
      };
    }
    return counts;
  }, [floors, tables]);

  const stats = useMemo(() => {
    const total = tables.length;
    const free = tables.filter((t) => t.status === "free").length;
    const occupied = tables.filter((t) => t.status === "occupied").length;
    const billRequested = tables.filter((t) => t.status === "bill_requested").length;
    const revenue = tables.reduce((sum, t) => sum + (t.totalAmount ?? 0), 0);
    return { total, free, occupied, billRequested, revenue };
  }, [tables]);

  const filteredTables = useMemo(() => {
    let result = tables;
    if (activeFloor !== "all") {
      result = result.filter((t) => t.floorId === activeFloor);
    }
    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }
    return result.sort((a, b) => a.number - b.number);
  }, [tables, activeFloor, statusFilter]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface rounded-lg border border-border p-3">
          <p className="text-xs text-text-muted">Libres</p>
          <p className="text-xl font-bold text-success-600">{stats.free}</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-3">
          <p className="text-xs text-text-muted">Ocupadas</p>
          <p className="text-xl font-bold text-primary-600">{stats.occupied}</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-3">
          <p className="text-xs text-text-muted">Piden cuenta</p>
          <p className="text-xl font-bold text-warning-600">{stats.billRequested}</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-3">
          <p className="text-xs text-text-muted">Venta activa</p>
          <p className="text-xl font-bold text-text-primary">{formatCurrency(stats.revenue)}</p>
        </div>
      </div>

      <FloorSelector
        floors={floors}
        activeFloor={activeFloor}
        onFloorChange={setActiveFloor}
        tableCounts={tableCounts}
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((filter) => {
          const isActive = statusFilter === filter.value;
          const count =
            filter.value === "all"
              ? filteredTables.length
              : filteredTables.filter((t) => t.status === filter.value).length;
          return (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-text-primary text-text-inverse"
                  : "bg-surface border border-border text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              <Badge size="sm" variant="default">
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto">
        <FloorMap tables={filteredTables} onTableClick={setSelectedTable} />
      </div>

      <TableDetail
        table={selectedTable}
        isOpen={selectedTable !== null}
        onClose={() => setSelectedTable(null)}
        onOpenOrder={onOpenOrder}
      />
    </div>
  );
}