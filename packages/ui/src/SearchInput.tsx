import { useState, useEffect, useRef } from "react";

type SearchInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  autoFocus?: boolean;
};

export function SearchInput({
  value: controlledValue,
  onChange,
  placeholder = "Buscar...",
  debounceMs = 300,
  autoFocus = false,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(val), debounceMs);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange("");
  };

  return (
    <div className="relative">
      {/* Icono de búsqueda */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
        🔍
      </span>

      <input
        type="text"
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full h-[var(--size-touch-md)] pl-10 pr-10 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
      />

      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-secondary"
        >
          ✕
        </button>
      )}
    </div>
  );
}