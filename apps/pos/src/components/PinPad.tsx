import { useState } from "react";
import { NumericKeypad } from "@restaurant/ui";

type PinPadProps = {
  onSubmit: (pin: string) => void;
  error?: string;
  maxLength?: number;
};

export function PinPad({ onSubmit, error, maxLength = 4 }: PinPadProps) {
  const [pin, setPin] = useState("");

  const handleInput = (value: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + value;
      setPin(newPin);
      // Auto-submit cuando se completa el PIN
      if (newPin.length === maxLength) {
        setTimeout(() => {
          onSubmit(newPin);
          setPin("");
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Dots del PIN */}
      <div className="flex gap-3">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              i < pin.length
                ? "bg-primary-600 scale-110"
                : "bg-border-strong"
            }`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-danger-600 text-sm font-medium animate-pulse">
          {error}
        </p>
      )}

      {/* Keypad */}
      <div className="w-64">
        <NumericKeypad
          onInput={handleInput}
          onDelete={handleDelete}
          onClear={handleClear}
          showDecimal={false}
        />
      </div>
    </div>
  );
}