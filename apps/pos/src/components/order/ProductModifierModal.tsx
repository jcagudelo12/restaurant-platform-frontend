import { useState, useEffect } from "react";
import type { Product, SelectedModifier } from "../../types";
import { Modal, Button } from "@restaurant/ui";

type ProductModifierModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, modifiers: SelectedModifier[], notes: string) => void;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function ProductModifierModal({ product, isOpen, onClose, onConfirm }: ProductModifierModalProps) {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset cuando cambia el producto
  useEffect(() => {
    if (product) {
      setSelections({});
      setNotes("");
      setErrors({});
    }
  }, [product]);

  if (!product) return null;

  const groups = product.modifierGroups ?? [];

  const handleToggle = (groupId: string, modifierId: string, maxSelections: number) => {
    setSelections((prev) => {
      const current = prev[groupId] ?? [];
      if (maxSelections === 1) {
        return { ...prev, [groupId]: [modifierId] };
      }
      if (current.includes(modifierId)) {
        return { ...prev, [groupId]: current.filter((id) => id !== modifierId) };
      }
      if (current.length >= maxSelections) return prev;
      return { ...prev, [groupId]: [...current, modifierId] };
    });
    setErrors((prev) => ({ ...prev, [groupId]: "" }));
  };

  const handleConfirm = () => {
    // Validar requeridos
    const newErrors: Record<string, string> = {};
    for (const group of groups) {
      if (group.required && !(selections[group.id]?.length > 0)) {
        newErrors[group.id] = `Selecciona ${group.name}`;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Construir modificadores seleccionados
    const selectedModifiers: SelectedModifier[] = [];
    for (const group of groups) {
      const selected = selections[group.id] ?? [];
      for (const modId of selected) {
        const mod = group.modifiers.find((m) => m.id === modId);
        if (mod) {
          selectedModifiers.push({
            groupId: group.id,
            groupName: group.name,
            modifierId: mod.id,
            modifierName: mod.name,
            price: mod.price,
          });
        }
      }
    }

    onConfirm(product, selectedModifiers, notes);
  };

  // Calcular precio total con modificadores
  const modifiersTotal = Object.entries(selections).reduce((total, [groupId, modIds]) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return total;
    return total + modIds.reduce((sum, modId) => {
      const mod = group.modifiers.find((m) => m.id === modId);
      return sum + (mod?.price ?? 0);
    }, 0);
  }, 0);

  const totalPrice = product.price + modifiersTotal;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} size="md">
      <div className="space-y-5">
        {/* Descripción y precio base */}
        <div>
          {product.description && (
            <p className="text-sm text-text-muted mb-1">{product.description}</p>
          )}
          <p className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</p>
        </div>

        {/* Grupos de modificadores */}
        {groups.map((group) => {
          const selected = selections[group.id] ?? [];
          return (
            <div key={group.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  {group.name}
                  {group.required && <span className="text-danger-500 ml-1">*</span>}
                </h3>
                <span className="text-xs text-text-muted">
                  {group.maxSelections === 1 ? "Elige 1" : `Hasta ${group.maxSelections}`}
                </span>
              </div>

              <div className="space-y-1.5">
                {group.modifiers.map((mod) => {
                  const isSelected = selected.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => handleToggle(group.id, mod.id, group.maxSelections)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all ${
                        isSelected
                          ? "bg-primary-50 border-primary-500 text-primary-700"
                          : "bg-surface border-border text-text-primary hover:border-border-strong hover:bg-surface-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-${group.maxSelections === 1 ? "full" : "md"} border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-primary-600 border-primary-600"
                              : "border-border-strong"
                          }`}
                        >
                          {isSelected && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span>{mod.name}</span>
                      </div>
                      {mod.price > 0 && (
                        <span className="text-text-muted">+{formatPrice(mod.price)}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {errors[group.id] && (
                <p className="text-xs text-danger-600 mt-1">{errors[group.id]}</p>
              )}
            </div>
          );
        })}

        {/* Notas */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Notas (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Sin cebolla, extra salsa, alergia a mariscos..."
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        </div>

        {/* Footer con total y botón */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-text-muted">Total por unidad</p>
            <p className="text-xl font-bold text-text-primary">{formatPrice(totalPrice)}</p>
          </div>
          <Button variant="primary" size="lg" onClick={handleConfirm}>
            Agregar al pedido
          </Button>
        </div>
      </div>
    </Modal>
  );
}