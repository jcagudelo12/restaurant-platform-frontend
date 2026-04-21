import { useState } from "react";
import type { Table } from "../../types";
import { Modal, Button, Badge } from "@restaurant/ui";
import { useAuth } from "../../context/AuthContext";
import { useTables } from "../../context/TablesContext";

type TableDetailProps = {
  table: Table | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: (tableId: string, tableNumber: number) => void;
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

function getElapsedTime(since: string): string {
  const diff = Date.now() - new Date(since).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

const STATUS_BADGES: Record<string, { variant: "success" | "info" | "warning" | "danger" | "default"; label: string }> = {
  free: { variant: "success", label: "Libre" },
  occupied: { variant: "info", label: "Ocupada" },
  bill_requested: { variant: "warning", label: "Pide cuenta" },
  reserved: { variant: "default", label: "Reservada" },
  dirty: { variant: "default", label: "Sucia" },
};

export function TableDetail({ table, isOpen, onClose, onOpenOrder }: TableDetailProps) {
  const { user } = useAuth();
  const { seatTable, freeTable, updateTableStatus } = useTables();
  const [guests, setGuests] = useState(2);

  if (!table) return null;

  const statusBadge = STATUS_BADGES[table.status];

  const handleSeat = () => {
    seatTable(table.id, guests, user?.name ?? "Sin asignar");
    onClose();
  };

  const handleSeatAndOrder = () => {
    seatTable(table.id, guests, user?.name ?? "Sin asignar");
    onClose();
    onOpenOrder(table.id, table.number);
  };

  const handleFree = () => {
    freeTable(table.id);
    onClose();
  };

  const handleMarkDirty = () => {
    updateTableStatus(table.id, "dirty");
    onClose();
  };

  const handleMarkClean = () => {
    updateTableStatus(table.id, "free");
    onClose();
  };

  const handleRequestBill = () => {
    updateTableStatus(table.id, "bill_requested");
    onClose();
  };

  const handleOpenOrder = () => {
    onClose();
    onOpenOrder(table.id, table.number);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Mesa ${table.number}`} size="sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          <span className="text-sm text-text-muted">🪑 {table.capacity} personas</span>
        </div>

        {(table.status === "occupied" || table.status === "bill_requested") && (
          <div className="bg-surface-secondary rounded-lg p-3 space-y-2">
            {table.waiterName && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Mesero</span>
                <span className="text-text-primary font-medium">{table.waiterName}</span>
              </div>
            )}
            {table.guests && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Comensales</span>
                <span className="text-text-primary font-medium">{table.guests}</span>
              </div>
            )}
            {table.occupiedSince && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tiempo</span>
                <span className="text-text-primary font-medium">{getElapsedTime(table.occupiedSince)}</span>
              </div>
            )}
            {table.totalAmount !== undefined && (
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-text-muted">Total</span>
                <span className="text-text-primary font-bold">{formatCurrency(table.totalAmount)}</span>
              </div>
            )}
          </div>
        )}

        {table.status === "reserved" && table.reservedFor && (
          <div className="bg-surface-secondary rounded-lg p-3">
            <p className="text-sm text-text-secondary">📅 {table.reservedFor}</p>
          </div>
        )}

        {table.status === "free" && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              ¿Cuántas personas?
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
              >
                −
              </Button>
              <span className="text-2xl font-bold text-text-primary w-12 text-center">
                {guests}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setGuests(Math.min(table.capacity, guests + 1))}
                disabled={guests >= table.capacity}
              >
                +
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          {table.status === "free" && (
            <Button variant="primary" fullWidth onClick={handleSeatAndOrder}>
              📋 Tomar pedido ({guests} {guests === 1 ? "persona" : "personas"})
            </Button>
          )}

          {table.status === "occupied" && (
            <>
              <Button variant="primary" fullWidth onClick={handleOpenOrder}>
                📋 Tomar pedido
              </Button>
              <Button variant="secondary" fullWidth onClick={handleRequestBill}>
                💳 Pedir cuenta
              </Button>
              <Button variant="danger" fullWidth onClick={handleMarkDirty}>
                Liberar (marcar sucia)
              </Button>
            </>
          )}

          {table.status === "bill_requested" && (
            <>
              <Button variant="success" fullWidth onClick={handleOpenOrder}>
                💳 Cobrar
              </Button>
              <Button variant="danger" fullWidth onClick={handleMarkDirty}>
                Liberar (marcar sucia)
              </Button>
            </>
          )}

          {table.status === "dirty" && (
            <Button variant="success" fullWidth onClick={handleMarkClean}>
              ✅ Marcar como limpia
            </Button>
          )}

          {table.status === "reserved" && (
            <>
              <Button variant="primary" fullWidth onClick={handleSeat}>
                🪑 Llegó la reserva — Sentar
              </Button>
              <Button variant="danger" fullWidth onClick={handleFree}>
                Cancelar reserva
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}