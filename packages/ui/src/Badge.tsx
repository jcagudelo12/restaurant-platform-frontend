import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
};

export function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded-full";

  const variants: Record<string, string> = {
    default: "bg-gray-100 text-text-secondary",
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    danger: "bg-danger-100 text-danger-700",
    info: "bg-primary-100 text-primary-700",
  };

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}