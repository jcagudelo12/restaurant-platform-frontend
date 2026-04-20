import { useState } from "react";
import {
  Button,
  Badge,
  Modal,
  NumericKeypad,
  SearchInput,
  Toast,
  ConfirmDialog,
  Spinner,
  OfflineBanner,
} from "@restaurant/ui";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  }>({ visible: false, message: "", variant: "success" });
  const [search, setSearch] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="min-h-screen bg-surface-secondary p-8 font-sans">
      <OfflineBanner isOffline={isOffline} />

      <h1 className="text-2xl font-bold text-text-primary mb-8">
        POS Restaurante — Componentes Base
      </h1>

      {/* Botones */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="success">Éxito</Button>
          <Button variant="danger">Peligro</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="success">Libre</Badge>
          <Badge variant="warning">Ocupada</Badge>
          <Badge variant="danger">Cuenta</Badge>
          <Badge variant="info">Reservada</Badge>
        </div>
      </section>

      {/* Search */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Search</h2>
        <div className="max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar producto..."
          />
          {search && (
            <p className="mt-2 text-sm text-text-secondary">Buscando: {search}</p>
          )}
        </div>
      </section>

      {/* Numeric Keypad */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Numeric Keypad (PIN: {pinValue || "---"})
        </h2>
        <div className="max-w-xs">
          <NumericKeypad
            onInput={(v) => setPinValue((prev) => prev + v)}
            onDelete={() => setPinValue((prev) => prev.slice(0, -1))}
            onClear={() => setPinValue("")}
            onConfirm={() => {
              setToast({ visible: true, message: `PIN ingresado: ${pinValue}`, variant: "success" });
              setPinValue("");
            }}
            confirmLabel="Entrar"
            showDecimal={false}
          />
        </div>
      </section>

      {/* Spinner */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Spinner</h2>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      {/* Acciones */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Modals & Dialogs</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Anular pedido
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsOffline(!isOffline)}
          >
            {isOffline ? "Simular Online" : "Simular Offline"}
          </Button>
          <Button
            variant="success"
            onClick={() =>
              setToast({ visible: true, message: "Pedido enviado a cocina", variant: "success" })
            }
          >
            Mostrar Toast
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Detalles del pedido">
        <p className="text-text-secondary mb-4">
          Acá iría el contenido del pedido, modificadores, notas, etc.
        </p>
        <div className="flex justify-end">
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </div>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() =>
          setToast({ visible: true, message: "Pedido anulado", variant: "danger" })
        }
        title="¿Anular pedido?"
        message="Esta acción no se puede deshacer. Se eliminarán todos los ítems del pedido."
        confirmLabel="Sí, anular"
        cancelLabel="No, volver"
        variant="danger"
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        variant={toast.variant}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
      {/* Toast verde - éxito */}
      <Button
        variant="success"
        onClick={() =>
          setToast({ visible: true, message: "Pedido enviado a cocina", variant: "success" })
        }
      >
        Toast Éxito
      </Button>

      {/* Toast rojo - error */}
      <Button
        variant="danger"
        onClick={() =>
          setToast({ visible: true, message: "Error al procesar pago", variant: "error" })
        }
      >
        Toast Error
      </Button>

      {/* Toast amarillo - warning */}
      <Button
        className="bg-warning-500"
        // variant="secondary"
        onClick={() =>
          setToast({ visible: true, message: "Stock bajo: Cerveza Club", variant: "warning" })
        }
      >
        Toast Warning
      </Button>

      {/* Toast oscuro - info */}
      <Button
        variant="ghost"
        onClick={() =>
          setToast({ visible: true, message: "Mesa 5 reservada para las 8pm", variant: "info" })
        }
      >
        Toast Info
      </Button>
    </div>
  );
}

export default App;