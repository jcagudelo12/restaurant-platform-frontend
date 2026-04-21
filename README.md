# Restaurant Platform — Frontend

Monorepo con el frontend del sistema POS para restaurantes. Construido con React, TypeScript, Vite y Tailwind CSS v4, organizado con Turbo + pnpm workspaces.

---

## Estructura del proyecto

```
restaurant-platform-frontend/
├── apps/
│   └── pos/              # Aplicación POS principal
└── packages/
    └── ui/               # Librería de componentes compartidos
```

### `apps/pos`

Aplicación de punto de venta para meseros y cajeros. Permite gestionar el estado de las mesas, tomar pedidos y manejar modificadores de productos.

```
src/
├── screens/
│   ├── LoginScreen.tsx       # Autenticación con PIN / credenciales
│   ├── TablesScreen.tsx      # Mapa de salones y estado de mesas
│   ├── OrderScreen.tsx       # Toma de pedidos con catálogo y ticket
│   └── PosScreen.tsx         # Router principal entre pantallas
├── components/
│   ├── tables/               # FloorMap, FloorSelector, TableCard, TableDetail
│   └── order/                # CategoryBar, ProductGrid, OrderTicket, modales
├── context/
│   ├── AuthContext.tsx        # Sesión de usuario y sucursal
│   ├── TablesContext.tsx      # Estado y acciones sobre mesas
│   └── OrderContext.tsx       # Carrito, totales e IVA
├── data/
│   └── menuData.ts           # Categorías y productos del menú
└── types/index.ts            # Tipos globales (Table, Order, Product, etc.)
```

### `packages/ui`

Componentes reutilizables (`Button`, `Badge`, `Modal`, `NumericKeypad`, `Toast`, `Spinner`, etc.) consumidos por las apps del monorepo vía `@restaurant/ui`.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 18 |
| Lenguaje | TypeScript 5 |
| Build | Vite 5 |
| Estilos | Tailwind CSS v4 |
| Estado | React Context API |
| Monorepo | Turbo 2 + pnpm workspaces |
| Linting | ESLint (flat config) |

---

## Requisitos previos

- Node.js >= 20
- pnpm >= 9

---

## Primeros pasos

```bash
# Instalar dependencias
pnpm install

# Levantar todos los servidores de desarrollo
pnpm dev

# Construir todos los paquetes y apps
pnpm build

# Ejecutar linter en todo el monorepo
pnpm lint

# Limpiar artefactos de compilación
pnpm clean
```

La app POS queda disponible en `http://localhost:5173` por defecto.

### Credenciales de prueba

| Campo | Valor |
|---|---|
| Email | cualquiera de los mocks (`camilo@rest.com`, etc.) |
| Contraseña | `1234` |

---

## Flujo principal

1. **Login** → selección de usuario y sucursal
2. **Mapa de mesas** → vista por salón con filtros de estado (libre, ocupada, pide cuenta, reservada, sucia)
3. **Toma de pedido** → click en mesa libre → selector de comensales → catálogo de productos con modificadores → ticket en tiempo real
4. **Cierre** → solicitud de cuenta o liberación de mesa

---

## Convenciones

- Los estados de mesa se manejan exclusivamente a través de `TablesContext` (`seatTable`, `freeTable`, `updateTableStatus`).
- El IVA aplicado es del **8%** (consumo de restaurantes en Colombia).
- Los datos de mesas y menú son mocks locales; no existe una capa de API aún.
- El tema de colores se define en `apps/pos/src/index.css` usando variables CSS de Tailwind v4 — no hay `tailwind.config.js`.
