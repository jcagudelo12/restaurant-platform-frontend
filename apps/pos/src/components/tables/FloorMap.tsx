import type { Table } from "../../types";
import { TableCard } from "./TableCard";

type FloorMapProps = {
  tables: Table[];
  onTableClick: (table: Table) => void;
};

export function FloorMap({ tables, onTableClick }: FloorMapProps) {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-muted">
        <span className="text-4xl mb-3">🪑</span>
        <p className="text-lg font-medium">No hay mesas en esta zona</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {tables.map((table) => (
        <TableCard key={table.id} table={table} onClick={onTableClick} />
      ))}
    </div>
  );
}