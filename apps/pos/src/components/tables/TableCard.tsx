import { useState, useEffect } from "react";
import type { Table, TableStatus } from "../../types";

type TableCardProps = {
  table: Table;
  onClick: (table: Table) => void;
};

const STATUS_CONFIG: Record<TableStatus, { bg: string; border: string; label: string; dot: string }> = {
  free: { bg: "bg-success-50", border: "border-success-500", label: "Libre", dot: "bg-success-500" },
  occupied: { bg: "bg-primary-50", border: "border-primary-500", label: "Ocupada", dot: "bg-primary-500" },
  bill_requested: { bg: "bg-warning-50", border: "border-warning-500", label: "Pide cuenta", dot: "bg-warning-500" },
  reserved: { bg: "bg-purple-50", border: "border-purple-500", label: "Reservada", dot: "bg-purple-500" },
  dirty: { bg: "bg-gray-100", border: "border-gray-400", label: "Sucia", dot: "bg-gray-400" },
};

function getElapsedTime(since: string): string {
  const diff = Date.now() - new Date(since).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function TableCard({ table, onClick }: TableCardProps) {
  const config = STATUS_CONFIG[table.status];
  const [elapsed, setElapsed] = useState(
    table.occupiedSince ? getElapsedTime(table.occupiedSince) : ""
  );

  // Actualiza el tiempo cada 30 segundos
  useEffect(() => {
    if (!table.occupiedSince) return;
    const interval = setInterval(() => {
      setElapsed(getElapsedTime(table.occupiedSince!));
    }, 30000);
    return () => clearInterval(interval);
  }, [table.occupiedSince]);

  const isUrgent =
    table.occupiedSince &&
    Date.now() - new Date(table.occupiedSince).getTime() > 60 * 60000;

  return (
    <button
      onClick={() => onClick(table)}
      className={`relative w-full p-4 rounded-xl border-2 ${config.bg} ${config.border} text-left transition-all hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
    >
      {/* Header: número + estado */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-text-primary">
          {table.number}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className="text-xs font-medium text-text-secondary">
            {config.label}
          </span>
        </span>
      </div>

      {/* Capacidad */}
      <div className="flex items-center gap-1 text-sm text-text-muted mb-1">
        <span>🪑</span>
        <span>
          {table.guests !== undefined
            ? `${table.guests}/${table.capacity}`
            : table.capacity}
        </span>
      </div>

      {/* Info según estado */}
      {table.status === "occupied" || table.status === "bill_requested" ? (
        <div className="mt-2 space-y-1">
          {table.waiterName && (
            <p className="text-xs text-text-secondary truncate">
              👤 {table.waiterName}
            </p>
          )}
          {elapsed && (
            <p className={`text-xs font-medium ${isUrgent ? "text-danger-600" : "text-text-muted"}`}>
              ⏱️ {elapsed}
            </p>
          )}
          {table.totalAmount !== undefined && table.totalAmount > 0 && (
            <p className="text-sm font-semibold text-text-primary">
              {formatCurrency(table.totalAmount)}
            </p>
          )}
        </div>
      ) : table.status === "reserved" && table.reservedFor ? (
        <p className="mt-2 text-xs text-text-secondary truncate">
          📅 {table.reservedFor}
        </p>
      ) : null}

      {/* Indicador urgente */}
      {table.status === "bill_requested" && (
        <div className="absolute top-2 right-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-warning-500" />
          </span>
        </div>
      )}
    </button>
  );
}