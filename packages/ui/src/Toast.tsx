import { useEffect } from "react";

type ToastProps = {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  durationMs?: number;
};

export function Toast({
  message,
  variant = "info",
  isVisible,
  onClose,
  durationMs = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && durationMs > 0) {
      const timer = setTimeout(onClose, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isVisible, durationMs, onClose]);

  if (!isVisible) return null;

  const variants: Record<string, string> = {
    success: "bg-success-600 text-text-inverse",
    error: "bg-danger-600 text-text-inverse",
    warning: "bg-warning-500 text-text-primary",
    info: "bg-surface-dark text-text-inverse",
  };

  const icons: Record<string, string> = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg ${variants[variant]} animate-in slide-in-from-bottom-4 fade-in`}
      >
        <span className="text-lg">{icons[variant]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}