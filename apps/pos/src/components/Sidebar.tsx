import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "tables", label: "Mesas", icon: "🪑" },
  { id: "quick-sale", label: "Venta rápida", icon: "⚡" },
  { id: "orders", label: "Pedidos", icon: "📋" },
  { id: "kitchen", label: "Cocina", icon: "👨‍🍳" },
  { id: "cash", label: "Caja", icon: "💰" },
  { id: "products", label: "Productos", icon: "📦" },
];

type SidebarProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-surface border-r border-border flex flex-col shrink-0 transition-all duration-200 ${
        collapsed ? "w-16" : "w-48"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors border-b border-border"
      >
        {collapsed ? "→" : "←"}
      </button>

      {/* Nav items */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 h-[var(--size-touch-md)] text-left transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                  : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
              }`}
            >
              <span className="text-lg w-6 text-center shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <p className="text-xs text-text-muted text-center">v0.1.0</p>
        </div>
      )}
    </aside>
  );
}