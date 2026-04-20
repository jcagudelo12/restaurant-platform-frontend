type NumericKeypadProps = {
  onInput: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  showDecimal?: boolean;
};

export function NumericKeypad({
  onInput,
  onDelete,
  onClear,
  onConfirm,
  confirmLabel = "OK",
  showDecimal = true,
}: NumericKeypadProps) {
  const buttonClass =
    "h-[var(--size-touch-xl)] rounded-lg text-xl font-semibold transition-colors active:scale-95 select-none";

  const numberClass = `${buttonClass} bg-surface border border-border text-text-primary hover:bg-surface-secondary active:bg-gray-100`;

  const actionClass = `${buttonClass} bg-surface-secondary border border-border text-text-secondary hover:bg-gray-200`;

  const confirmClass = `${buttonClass} bg-primary-600 text-text-inverse hover:bg-primary-700 active:bg-primary-800`;

  return (
    <div className="grid grid-cols-3 gap-2">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
        <button key={n} className={numberClass} onClick={() => onInput(n)}>
          {n}
        </button>
      ))}

      {showDecimal ? (
        <button className={numberClass} onClick={() => onInput(".")}>
          .
        </button>
      ) : (
        <button className={actionClass} onClick={onClear}>
          C
        </button>
      )}

      <button className={numberClass} onClick={() => onInput("0")}>
        0
      </button>

      <button className={actionClass} onClick={onDelete}>
        ←
      </button>

      {showDecimal && (
        <button className={actionClass} onClick={onClear}>
          C
        </button>
      )}

      {onConfirm && (
        <button
          className={`${confirmClass} ${showDecimal ? "col-span-2" : "col-span-3"}`}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      )}
    </div>
  );
}