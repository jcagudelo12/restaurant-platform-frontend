import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Spinner } from "@restaurant/ui";

export function LoginScreen() {
  const { stores, loginWithCredentials } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedStore, setSelectedStore] = useState(stores[0]?.id ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico");
      return;
    }
    if (!password) {
      setError("Ingresa tu contraseña");
      return;
    }

    setIsLoading(true);
    // Simula delay de red
    await new Promise((r) => setTimeout(r, 800));

    const result = loginWithCredentials(email, password, selectedStore);
    if (!result.success) {
      setError(result.error ?? "Error al iniciar sesión");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-lg w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 px-8 py-6 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🍽️</span>
          </div>
          <h1 className="text-xl font-bold text-white">POS Restaurante</h1>
          <p className="text-primary-200 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        <div className="p-8">
          {/* Selector de sucursal */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Sucursal
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full h-[var(--size-touch-md)] px-3 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="correo@restaurante.com"
                autoComplete="email"
                disabled={isLoading}
                className="w-full h-[var(--size-touch-md)] px-3 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full h-[var(--size-touch-md)] px-3 pr-12 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors text-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-danger-50 border border-danger-200 text-danger-700 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Ingresando...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-text-muted">o</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Hint para desarrollo */}
          <div className="mt-4 bg-surface-secondary rounded-lg px-3 py-2">
            <p className="text-text-muted text-xs text-center">
              Prueba: camilo@restaurante.com · contraseña: 1234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}