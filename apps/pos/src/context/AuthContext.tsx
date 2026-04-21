import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, Store, AuthState } from "../types";

const MOCK_USERS: User[] = [
  { id: "1", name: "Camilo Agudelo", email: "camilo@restaurante.com", role: "admin", avatarInitials: "CA" },
  { id: "2", name: "María López", email: "maria@restaurante.com", role: "cashier", avatarInitials: "ML" },
  { id: "3", name: "Carlos Ruiz", email: "carlos@restaurante.com", role: "waiter", avatarInitials: "CR" },
];

const MOCK_STORES: Store[] = [
  { id: "1", name: "Sede Centro", address: "Cra 45 #32-12, Medellín" },
  { id: "2", name: "Sede Poblado", address: "Cra 43A #16Sur-47, Medellín" },
  { id: "3", name: "Sede Laureles", address: "Cir 73 #39B-14, Medellín" },
];

type AuthContextType = AuthState & {
  stores: Store[];
  loginWithCredentials: (email: string, password: string, storeId: string) => { success: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    store: null,
    isAuthenticated: false,
  });

  const loginWithCredentials = (email: string, password: string, storeId: string) => {
    // Mock: valida que el email exista y el password sea "1234"
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const store = MOCK_STORES.find((s) => s.id === storeId);

    if (!user) {
      return { success: false, error: "No existe una cuenta con ese correo" };
    }
    if (password !== "1234") {
      return { success: false, error: "Contraseña incorrecta" };
    }
    if (!store) {
      return { success: false, error: "Selecciona una sucursal" };
    }

    setAuth({ user, store, isAuthenticated: true });
    return { success: true };
  };

  const logout = () => {
    setAuth({ user: null, store: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{ ...auth, stores: MOCK_STORES, loginWithCredentials, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}