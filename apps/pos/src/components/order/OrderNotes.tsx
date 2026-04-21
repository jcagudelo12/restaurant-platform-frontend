import { useState } from "react";

type OrderNotesProps = {
  notes: string;
  onChange: (notes: string) => void;
};

export function OrderNotes({ notes, onChange }: OrderNotesProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing && !notes) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="w-full text-left px-3 py-2 rounded-lg border border-dashed border-border text-sm text-text-muted hover:bg-surface-secondary hover:border-border-strong transition-colors"
      >
        📝 Agregar nota al pedido...
      </button>
    );
  }

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        autoFocus={isEditing}
        placeholder="Cumpleaños mesa 5, alergia al maní..."
        rows={2}
        className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
      />
    </div>
  );
}