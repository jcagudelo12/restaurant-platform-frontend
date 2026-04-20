import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-primary-600 text-text-inverse hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800",
    secondary:
      "bg-surface border border-border-strong text-text-primary hover:bg-surface-secondary focus:ring-primary-500 active:bg-gray-100",
    danger:
      "bg-danger-600 text-text-inverse hover:bg-danger-700 focus:ring-danger-500 active:bg-danger-800",
    success:
      "bg-success-600 text-text-inverse hover:bg-success-700 focus:ring-success-500 active:bg-success-800",
    ghost:
      "bg-transparent text-text-secondary hover:bg-surface-secondary focus:ring-primary-500 active:bg-gray-100",
  };

  const sizes: Record<string, string> = {
    sm: "h-[var(--size-touch-sm)] px-3 text-sm",
    md: "h-[var(--size-touch-md)] px-4 text-base",
    lg: "h-[var(--size-touch-lg)] px-6 text-lg",
    xl: "h-[var(--size-touch-xl)] px-8 text-xl",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}