import { useState, useEffect } from "react";
import { Badge } from "@restaurant/ui";
import { useAuth } from "../context/AuthContext";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  cashier: "Cajero",
  waiter: "Mesero",
  supervisor: "Supervisor",
};

export function Header() {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Reloj en tiempo real
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!user) return null;

  const timeString = currentTime.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = currentTime.toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 shrink-0">
      {/* Izquierda: Sucursal */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-sm">🍽️</span>
        </div>
      </div>

      {/* Centro: Fecha y hora */}
      <div className="text-center">
        <p className="text-lg font-semibold text-text-primary tabular-nums">
          {timeString}
        </p>
        <p className="text-xs text-text-muted capitalize">{dateString}</p>
      </div>

      {/* Derecha: Estado + Usuario */}
      <div className="flex items-center gap-4">
        {/* Estado de conexión */}
        <Badge variant={isOnline ? "success" : "warning"} size="sm">
          {isOnline ? "● Online" : "● Offline"}
        </Badge>

        {/* Usuario */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-secondary transition-colors"
          >
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
              {user.avatarInitials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-text-primary leading-tight">
                {user.name}
              </p>
              <p className="text-xs text-text-muted leading-tight">
                {ROLE_LABELS[user.role]}
              </p>
            </div>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-12 z-50 bg-surface border border-border rounded-lg shadow-lg py-1 w-48">
                <div className="px-3 py-2 border-b border-border sm:hidden">
                  <p className="text-sm font-medium text-text-primary">
                    {user.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {ROLE_LABELS[user.role]}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}