import type { Floor } from "../../types";

type FloorSelectorProps = {
  floors: Floor[];
  activeFloor: string;
  onFloorChange: (floorId: string) => void;
  tableCounts: Record<string, { total: number; free: number }>;
};

export function FloorSelector({ floors, activeFloor, onFloorChange, tableCounts }: FloorSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {/* Botón "Todas" */}
      <button
        onClick={() => onFloorChange("all")}
        className={`flex items-center gap-2 px-4 h-[var(--size-touch-sm)] rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          activeFloor === "all"
            ? "bg-primary-600 text-text-inverse"
            : "bg-surface border border-border text-text-secondary hover:bg-surface-secondary"
        }`}
      >
        🏪 Todas
      </button>

      {floors.map((floor) => {
        const counts = tableCounts[floor.id] ?? { total: 0, free: 0 };
        const isActive = activeFloor === floor.id;
        return (
          <button
            key={floor.id}
            onClick={() => onFloorChange(floor.id)}
            className={`flex items-center gap-2 px-4 h-[var(--size-touch-sm)] rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? "bg-primary-600 text-text-inverse"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-secondary"
            }`}
          >
            <span>{floor.icon}</span>
            <span>{floor.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-surface-secondary text-text-muted"
              }`}
            >
              {counts.free}/{counts.total}
            </span>
          </button>
        );
      })}
    </div>
  );
}