import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, AuthState } from "../types";

const MOCK_USERS: User[] = [
  { id: "1", name: "Camilo Agudelo", email: "camilo@restaurante.com", role: "admin", avatarInitials: "CA" },
  { id: "2", name: "María López", email: "maria@restaurante.com", role: "cashier", avatarInitials: "ML" },
  { id: "3", name: "Carlos Ruiz", email: "carlos@restaurante.com", role: "waiter", avatarInitials: "CR" },
];

type AuthContextType = AuthState & {
  loginWithCredentials: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const loginWithCredentials = (email: string, password: string) => {
    // Mock: valida que el email exista y el password sea "1234"
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: "No existe una cuenta con ese correo" };
    }
    if (password !== "1234") {
      return { success: false, error: "Contraseña incorrecta" };
    }

    setAuth({ user, isAuthenticated: true });
    return { success: true };
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{ ...auth, loginWithCredentials, logout }}
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